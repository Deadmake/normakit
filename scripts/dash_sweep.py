#!/usr/bin/env python3
import re, sys

EMDASH = "—"
ENDASH = "–"
DASH_RE = re.compile(f"[{EMDASH}{ENDASH}]")

# numeric/currency range: e.g. 6-12, EUR12-15, £55-£197
RANGE_RE = re.compile(
    r"(?P<a>[€£$]?\d+(?:\.\d+)?)[" + EMDASH + ENDASH + r"](?P<b>[€£$]?\d+(?:\.\d+)?)"
)

# definition-style: "</b> —" or "**...** —" -> colon
DEF_RE = re.compile(r"(</b>|\*\*)[ \t]*[" + EMDASH + ENDASH + r"][ \t]*")

# heading/title lines: markdown #, or <title>/<h1>/<h2> content -> colon
HEADING_LINE_RE = re.compile(r"^\s*#{1,6}\s")
HEADING_TAG_RE = re.compile(r"</?(title|h1|h2)\b", re.IGNORECASE)

HEADING_DASH_RE = re.compile(r"[ \t]*[" + EMDASH + ENDASH + r"][ \t]*")

# generic " -- " -> ", "
GENERIC_RE = re.compile(r"[ \t]*[" + EMDASH + ENDASH + r"][ \t]*")

def fix_line(line):
    line = RANGE_RE.sub(lambda m: f"{m.group('a')} to {m.group('b')}", line)
    is_heading = HEADING_LINE_RE.search(line) or HEADING_TAG_RE.search(line)
    if is_heading:
        line = HEADING_DASH_RE.sub(": ", line)
    else:
        line = DEF_RE.sub(lambda m: f"{m.group(1)}: ", line)
        line = GENERIC_RE.sub(", ", line)
    return line.rstrip(" \t")

def fix(text):
    lines = text.split("\n")
    return "\n".join(fix_line(l) for l in lines)

def main(files):
    changed = []
    for f in files:
        with open(f, "r", encoding="utf-8") as fh:
            content = fh.read()
        if not DASH_RE.search(content):
            continue
        new_content = fix(content)
        remaining = DASH_RE.findall(new_content)
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(new_content)
        changed.append((f, len(remaining)))
    for f, rem in changed:
        print(f"{f}: remaining_dashes={rem}")

if __name__ == "__main__":
    main(sys.argv[1:])
