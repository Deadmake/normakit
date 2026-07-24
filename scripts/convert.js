// Converts the markdown documents in ../documents/*.md into a matching
// .docx + .pdf per document, then zips everything into a single bundle
// for delivery. Pure-JS (docx, pdfkit, marked), no headless browser or
// system binary (pandoc/libreoffice) required, since neither is available
// in this sandbox.
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const archiver = require("archiver");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
} = require("docx");
const PDFDocument = require("pdfkit");

const DOCS_DIR = path.join(__dirname, "..", "documents");
const OUT_DIR = path.join(__dirname, "..", "dist");
const BUNDLE_PATH = path.join(OUT_DIR, "NormaKit-v1-EN-IT.zip");

const unhandledTypes = new Set();

// marked escapes text for HTML output (&amp; &#39; &quot; ...); decode since
// we render straight to docx/pdf, not HTML.
const ENTITY_MAP = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decodeEntities(str) {
  return str.replace(/&(#(\d+)|#x([0-9a-fA-F]+)|([a-zA-Z]+));/g, (m, _w, dec, hex, name) => {
    if (dec) return String.fromCharCode(parseInt(dec, 10));
    if (hex) return String.fromCharCode(parseInt(hex, 16));
    return name && ENTITY_MAP[name] !== undefined ? ENTITY_MAP[name] : m;
  });
}

// ---------- inline (bold/italic/code) flattening, shared by both renderers ----------
function flattenInline(tokens, style = {}) {
  const runs = [];
  for (const t of tokens || []) {
    switch (t.type) {
      case "text":
      case "escape":
        if (t.tokens && t.tokens.length) {
          runs.push(...flattenInline(t.tokens, style));
        } else {
          runs.push({ text: decodeEntities(t.text), ...style });
        }
        break;
      case "strong":
        runs.push(...flattenInline(t.tokens, { ...style, bold: true }));
        break;
      case "em":
        runs.push(...flattenInline(t.tokens, { ...style, italic: true }));
        break;
      case "del":
        runs.push(...flattenInline(t.tokens, { ...style, strike: true }));
        break;
      case "codespan":
        runs.push({ text: decodeEntities(t.text), ...style, code: true });
        break;
      case "link":
        runs.push(...flattenInline(t.tokens, { ...style }));
        break;
      case "br":
        runs.push({ text: "\n", ...style });
        break;
      default:
        unhandledTypes.add("inline:" + t.type);
        if (t.text) runs.push({ text: decodeEntities(t.text), ...style });
    }
  }
  return runs;
}

function plainText(tokens) {
  return flattenInline(tokens).map((r) => r.text).join("");
}

// item.tokens is normally [{type:'text', tokens:[...]}] (tight list) or
// [{type:'paragraph', tokens:[...]}] (loose list); either way we want the
// inline runs plus any nested list token for a sub-list.
function listItemParts(item) {
  let inline = [];
  const nested = [];
  for (const sub of item.tokens || []) {
    if (sub.type === "text" || sub.type === "paragraph") {
      inline = inline.concat(sub.tokens || []);
    } else if (sub.type === "list") {
      nested.push(sub);
    } else {
      unhandledTypes.add("listitem:" + sub.type);
    }
  }
  return { inline, nested };
}

// ---------- DOCX rendering ----------
function docxRuns(runs) {
  return runs.map(
    (r) =>
      new TextRun({
        text: r.text,
        bold: !!r.bold,
        italics: !!r.italic,
        strike: !!r.strike,
        font: r.code ? "Courier New" : undefined,
      })
  );
}

function docxHeading(depth) {
  return (
    {
      1: HeadingLevel.HEADING_1,
      2: HeadingLevel.HEADING_2,
      3: HeadingLevel.HEADING_3,
      4: HeadingLevel.HEADING_4,
      5: HeadingLevel.HEADING_5,
      6: HeadingLevel.HEADING_6,
    }[depth] || HeadingLevel.HEADING_6
  );
}

function docxTable(token) {
  const headerCells = token.header.map(
    (cell) =>
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: "E8E8E8" },
        width: { size: 100 / token.header.length, type: WidthType.PERCENTAGE },
        children: [
          new Paragraph({ children: docxRuns(flattenInline(cell.tokens, { bold: true })) }),
        ],
      })
  );
  const rows = [new TableRow({ children: headerCells, tableHeader: true })];
  for (const row of token.rows) {
    rows.push(
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              width: { size: 100 / token.header.length, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: docxRuns(flattenInline(cell.tokens)) })],
            })
        ),
      })
    );
  }
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "AAAAAA" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "AAAAAA" },
      left: { style: BorderStyle.SINGLE, size: 2, color: "AAAAAA" },
      right: { style: BorderStyle.SINGLE, size: 2, color: "AAAAAA" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    },
  });
}

function docxBlocks(tokens, indentLevel = 0) {
  const out = [];
  const indent = indentLevel ? { left: indentLevel * 360 } : undefined;
  for (const t of tokens) {
    switch (t.type) {
      case "heading":
        out.push(
          new Paragraph({
            heading: docxHeading(t.depth),
            children: docxRuns(flattenInline(t.tokens)),
            spacing: { before: 200, after: 100 },
          })
        );
        break;
      case "paragraph":
        out.push(new Paragraph({ children: docxRuns(flattenInline(t.tokens)), indent, spacing: { after: 120 } }));
        break;
      case "blockquote":
        out.push(...docxBlocks(t.tokens, indentLevel + 1).map((p) => (p instanceof Paragraph ? p : p)));
        break;
      case "list": {
        t.items.forEach((item, i) => {
          const { inline, nested } = listItemParts(item);
          const prefix = t.ordered ? `${(t.start || 1) + i}. ` : "•  ";
          out.push(
            new Paragraph({
              children: [new TextRun({ text: prefix, bold: false }), ...docxRuns(flattenInline(inline))],
              indent: { left: (indentLevel + 1) * 360 },
              spacing: { after: 60 },
            })
          );
          nested.forEach((n) => out.push(...docxBlocks([n], indentLevel + 1)));
        });
        break;
      }
      case "table":
        out.push(docxTable(t));
        out.push(new Paragraph({ text: "", spacing: { after: 120 } }));
        break;
      case "hr":
        out.push(
          new Paragraph({
            text: "",
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999" } },
            spacing: { before: 200, after: 200 },
          })
        );
        break;
      case "code":
        out.push(
          new Paragraph({
            children: [new TextRun({ text: decodeEntities(t.text), font: "Courier New" })],
            spacing: { after: 120 },
          })
        );
        break;
      case "space":
        break;
      default:
        unhandledTypes.add("block:" + t.type);
    }
  }
  return out;
}

async function buildDocx(tokens, outPath) {
  const doc = new Document({
    sections: [{ children: docxBlocks(tokens) }],
    styles: {
      default: {
        document: { run: { size: 22, font: "Calibri" } }, // 11pt
      },
    },
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buf);
}

// ---------- PDF rendering ----------
const PDF_MARGIN = 56;

function pdfWriteRuns(doc, runs, opts = {}) {
  if (!runs.length) return;
  runs.forEach((r, i) => {
    doc
      .font(r.code ? "Courier" : r.bold && r.italic ? "Helvetica-BoldOblique" : r.bold ? "Helvetica-Bold" : r.italic ? "Helvetica-Oblique" : "Helvetica")
      .fontSize(opts.size || 10.5)
      .text(r.text, { continued: i < runs.length - 1, indent: opts.indent || 0 });
  });
}

function pdfTable(doc, token) {
  const cols = token.header.length;
  const usableWidth = doc.page.width - PDF_MARGIN * 2;
  const colWidth = usableWidth / cols;
  doc.font("Helvetica-Bold").fontSize(9.5);
  const startX = doc.x;
  let y = doc.y;
  const rowHeights = [];

  function rowHeight(cells) {
    return Math.max(
      ...cells.map((c) => doc.heightOfString(plainText(c.tokens), { width: colWidth - 8 }))
    ) + 8;
  }

  function drawRow(cells, bold) {
    doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(9.5);
    const h = rowHeight(cells);
    if (y + h > doc.page.height - PDF_MARGIN) {
      doc.addPage();
      y = doc.y;
    }
    cells.forEach((c, i) => {
      doc.text(plainText(c.tokens), startX + i * colWidth + 4, y + 4, { width: colWidth - 8 });
    });
    doc
      .moveTo(startX, y)
      .lineTo(startX + colWidth * cols, y)
      .strokeColor("#cccccc")
      .stroke();
    y += h;
  }

  drawRow(token.header, true);
  for (const row of token.rows) drawRow(row, false);
  doc
    .moveTo(startX, y)
    .lineTo(startX + colWidth * cols, y)
    .strokeColor("#cccccc")
    .stroke();
  doc.y = y + 10;
  doc.x = startX;
}

function pdfBlocks(doc, tokens, indentLevel = 0) {
  const indent = indentLevel * 14;
  for (const t of tokens) {
    switch (t.type) {
      case "heading": {
        const sizes = { 1: 18, 2: 15, 3: 13, 4: 11.5, 5: 10.5, 6: 10.5 };
        doc.moveDown(0.6);
        pdfWriteRuns(doc, flattenInline(t.tokens, { bold: true }), { size: sizes[t.depth] || 11, indent });
        doc.moveDown(0.3);
        break;
      }
      case "paragraph":
        pdfWriteRuns(doc, flattenInline(t.tokens), { size: 10.5, indent });
        doc.moveDown(0.5);
        break;
      case "blockquote":
        pdfBlocks(doc, t.tokens, indentLevel + 1);
        break;
      case "list":
        t.items.forEach((item, i) => {
          const { inline, nested } = listItemParts(item);
          const prefix = t.ordered ? `${(t.start || 1) + i}. ` : "•  ";
          pdfWriteRuns(doc, [{ text: prefix }, ...flattenInline(inline)], { size: 10.5, indent: indent + 14 });
          doc.moveDown(0.25);
          if (nested.length) pdfBlocks(doc, nested, indentLevel + 1);
        });
        doc.moveDown(0.25);
        break;
      case "table":
        doc.moveDown(0.3);
        pdfTable(doc, t);
        break;
      case "hr":
        doc.moveDown(0.4);
        doc
          .moveTo(PDF_MARGIN, doc.y)
          .lineTo(doc.page.width - PDF_MARGIN, doc.y)
          .strokeColor("#999999")
          .stroke();
        doc.moveDown(0.6);
        break;
      case "code":
        doc.font("Courier").fontSize(9).text(decodeEntities(t.text), { indent });
        doc.moveDown(0.5);
        break;
      case "space":
        break;
      default:
        unhandledTypes.add("block:" + t.type);
    }
  }
}

function buildPdf(tokens, outPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: PDF_MARGIN, size: "A4", bufferPages: true });
    const stream = fs.createWriteStream(outPath);
    stream.on("finish", resolve);
    stream.on("error", reject);
    doc.pipe(stream);
    pdfBlocks(doc, tokens);
    doc.end();
  });
}

// ---------- driver ----------
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md")).sort();
  const outputs = [];

  for (const file of files) {
    const base = path.basename(file, ".md");
    const md = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
    const tokens = marked.lexer(md);

    const docxPath = path.join(OUT_DIR, `${base}.docx`);
    const pdfPath = path.join(OUT_DIR, `${base}.pdf`);
    await buildDocx(tokens, docxPath);
    await buildPdf(tokens, pdfPath);
    outputs.push(docxPath, pdfPath);
    console.log(`converted ${file} -> ${base}.docx, ${base}.pdf`);
  }

  // zip bundle
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(BUNDLE_PATH);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    for (const f of outputs) archive.file(f, { name: `NormaKit/${path.basename(f)}` });
    archive.finalize();
  });

  console.log(`\nBundle: ${BUNDLE_PATH} (${(fs.statSync(BUNDLE_PATH).size / 1024).toFixed(0)} KB)`);
  if (unhandledTypes.size) {
    console.log("UNHANDLED TOKEN TYPES (review needed):", [...unhandledTypes].join(", "));
  } else {
    console.log("All markdown token types handled.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
