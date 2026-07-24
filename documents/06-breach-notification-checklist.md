# NormaKit: Personal Data Breach Notification Checklist (EN)

> **How to use this template:** Print or keep this accessible (not only
> inside the system that might be breached!). A "personal data breach" is any
> security incident leading to accidental or unlawful destruction, loss,
> alteration, unauthorised disclosure of, or access to, personal data,
> this includes lost laptops, misdirected emails, ransomware, and hacking, not
> just large-scale hacks.

---

## Step 0: The clock starts now

The moment anyone on your team becomes aware of a possible breach, the
**72-hour clock to notify the Garante starts** (Art. 33 GDPR), if notification
is required (see Step 2). Log the exact date/time you became aware in the
incident log (template at the end).

## Step 1: Contain and assess

- [ ] Contain the incident (revoke access, change passwords, isolate affected
      systems, take a compromised service offline if needed).
- [ ] Identify what happened: what data, how many data subjects (approximate
      is fine initially), what categories of data (is any of it special
      category, health, etc., or financial/ID data? this raises severity).
- [ ] Identify the cause (if known) and whether it's ongoing (is data still
      being exposed right now?).
- [ ] Preserve evidence (logs, screenshots) before remediating where possible,
you'll need this to explain what happened later.

## Step 2: Decision tree: must we notify the Garante (supervisory authority)?

**Notify the Garante within 72 hours UNLESS** the breach is "unlikely to
result in a risk to the rights and freedoms of natural persons" (Art. 33(1)).

Ask:
- Could this data be used to harm the affected people (fraud, identity theft,
  discrimination, reputational damage, financial loss)?
- Was the data encrypted/pseudonymised such that it's unusable to whoever
  accessed it (e.g. a stolen encrypted backup with no key exposed)?
- How many people are affected, and how sensitive is the data?

→ **If any real risk exists (the normal case for anything beyond a fully
encrypted, unreadable data loss), notify the Garante.** When in doubt,
notify, the fine for failing to notify a real breach is generally worse than
the friction of notifying.

**If 72 hours will be exceeded:** notify anyway with reasons for the delay
(Art. 33(1) allows phased/late notification with justification), do not
wait for a "complete" picture before making the initial notification.

**How to notify:** via the Garante's online breach notification portal
([www.garanteprivacy.it](https://www.garanteprivacy.it) → "Notifica violazione
dei dati personali" / data breach notification form). Include (Art. 33(3)):
nature of the breach, categories/approximate number of data subjects and
records, DPO/contact point, likely consequences, measures taken or proposed.

## Step 3: Decision tree: must we notify the affected individuals?

**Notify affected data subjects directly, without undue delay, IF the breach
is likely to result in a HIGH risk** to their rights and freedoms (Art. 34).

Ask:
- Is this the kind of data that, if misused, causes serious harm (passwords,
  financial details, ID documents, health data, precise location)?
- Is the affected group unable to protect themselves without knowing (e.g.
  they should change a reused password, watch for fraud)?

**Exception, you do NOT have to notify individuals if:**
- The exposed data was encrypted/otherwise unintelligible to any
  unauthorised party (Art. 34(3)(a)), OR
- You've taken subsequent measures ensuring the high risk is no longer likely
  to materialise (Art. 34(3)(b)), OR
- It would involve disproportionate effort, in which case use a public
  communication instead (Art. 34(3)(c)) (e.g. a site-wide notice), still
  ensuring individuals are informed in an equally effective manner.

## Step 4: Internal incident log (required regardless of whether you notify anyone)

Art. 33(5) requires documenting **every** breach internally, even ones you
decide not to report, the Garante can ask to see this log.

| Field | Entry |
|---|---|
| Date/time discovered | |
| Date/time occurred (if different/known) | |
| How discovered | |
| Description of the incident | |
| Data categories affected | |
| Approx. number of data subjects affected | |
| Risk assessment (why notify / why not) | |
| Garante notified? (Y/N, date) | |
| Data subjects notified? (Y/N, date, method) | |
| Containment/remediation actions taken | |
| Steps taken to prevent recurrence | |
| Person responsible for this entry | |

## Step 5: Notification letter templates

**A. To the Garante**: use the official online form at garanteprivacy.it;
have Step 4's answers ready before starting it, since the form times out.

**B. To affected individuals (template):**

> Subject: Important notice about your personal data
>
> Dear [Name],
>
> We are writing to inform you that on [date], we became aware of a security
> incident that may have affected some of your personal data held by
> [Business Name]. Specifically, [describe what happened and what data was
> involved, in plain language].
>
> We have taken the following steps: [containment/remediation actions].
>
> We recommend you: [practical advice, e.g. "change your password on our
> site and anywhere else you reused it", "monitor your bank statements for
> unusual activity"].
>
> If you have questions, contact us at [email/phone]. We take the security of
> your data seriously and apologise for any concern this causes.
>
> [Business Name]

---

**Disclaimer:** This document is a template provided for general informational
purposes only and does not constitute legal advice. It must be reviewed and
adapted to your specific business and, where appropriate, checked by a
qualified lawyer or data protection professional before use, especially in
an active incident, where you should also consider consulting a lawyer and,
for significant incidents, a cybersecurity professional. NormaKit and its
operator accept no liability for outcomes arising from use of this template.

---
---

# NormaKit: Checklist per la Notifica di Violazioni dei Dati Personali (IT)

> **Come usare questo modello:** stampalo o tienilo accessibile (non solo
> dentro il sistema che potrebbe essere violato!). Una "violazione di dati
> personali" è qualsiasi incidente di sicurezza che comporti distruzione,
> perdita, modifica accidentale o illecita, oppure divulgazione o accesso non
> autorizzati a dati personali, questo include laptop smarriti, email
> inviate per errore, ransomware e attacchi informatici, non solo violazioni
> su larga scala.

---

## Passo 0: Il tempo inizia ora

Nel momento in cui chiunque nel team viene a conoscenza di una possibile
violazione, **inizia a decorrere il termine di 72 ore per notificare al
Garante** (Art. 33 GDPR), se la notifica è richiesta (vedi Passo 2). Registra
data/ora esatte in cui ne sei venuto a conoscenza nel registro degli incidenti
(modello in fondo).

## Passo 1: Contenere e valutare

- [ ] Contieni l'incidente (revoca accessi, cambia password, isola i sistemi
      coinvolti, metti offline un servizio compromesso se necessario).
- [ ] Identifica cosa è successo: quali dati, quanti interessati (una stima
      iniziale va bene), quali categorie di dati (sono coinvolti dati
      particolari, salute, ecc., o dati finanziari/identificativi? questo
      aumenta la gravità).
- [ ] Identifica la causa (se nota) e se è ancora in corso (i dati sono
      ancora esposti in questo momento?).
- [ ] Conserva le prove (log, screenshot) prima di intervenire, ove possibile,
ti serviranno per spiegare cosa è successo in seguito.

## Passo 2: Albero decisionale: dobbiamo notificare al Garante?

**Notifica al Garante entro 72 ore SALVO CHE** la violazione sia
"improbabile che presenti un rischio per i diritti e le libertà delle persone
fisiche" (Art. 33(1)).

Chiediti:
- Questi dati potrebbero essere usati per danneggiare le persone coinvolte
  (frode, furto d'identità, discriminazione, danno reputazionale, perdita
  finanziaria)?
- I dati erano cifrati/pseudonimizzati in modo da risultare inutilizzabili
  per chi vi ha avuto accesso (es. un backup cifrato rubato senza esposizione
  della chiave)?
- Quante persone sono coinvolte e quanto sono sensibili i dati?

→ **Se esiste un rischio reale (il caso normale per qualsiasi cosa oltre una
perdita di dati completamente cifrati e illeggibili), notifica al Garante.**
Nel dubbio, notifica, la sanzione per non aver notificato una violazione
reale è generalmente peggiore dell'onere della notifica.

**Se le 72 ore verranno superate:** notifica comunque indicando i motivi del
ritardo (l'Art. 33(1) consente una notifica scaglionata/tardiva se
giustificata), non aspettare un quadro "completo" prima della notifica
iniziale.

**Come notificare:** tramite il portale online del Garante per la notifica
delle violazioni ([www.garanteprivacy.it](https://www.garanteprivacy.it) →
modulo "Notifica violazione dei dati personali"). Includi (Art. 33(3)):
natura della violazione, categorie/numero approssimativo di interessati e
record, DPO/punto di contatto, probabili conseguenze, misure adottate o
proposte.

## Passo 3: Albero decisionale: dobbiamo notificare gli interessati?

**Notifica direttamente gli interessati coinvolti, senza ingiustificato
ritardo, SE la violazione può presentare un rischio ELEVATO** per i loro
diritti e libertà (Art. 34).

Chiediti:
- Si tratta del tipo di dati che, se usati impropriamente, causano un danno
  grave (password, dati finanziari, documenti d'identità, dati sanitari,
  posizione precisa)?
- Il gruppo coinvolto non è in grado di proteggersi senza saperlo (es.
  dovrebbero cambiare una password riutilizzata, monitorare possibili frodi)?

**Eccezione, NON devi notificare gli interessati se:**
- I dati esposti erano cifrati/altrimenti incomprensibili per qualsiasi parte
  non autorizzata (Art. 34(3)(a)), OPPURE
- Hai adottato misure successive che garantiscono che il rischio elevato non
  sia più probabile (Art. 34(3)(b)), OPPURE
- Ciò comporterebbe uno sforzo sproporzionato, nel qual caso usa una
  comunicazione pubblica (Art. 34(3)(c)) (es. un avviso sull'intero sito),
  garantendo comunque che gli interessati siano informati con misura
  ugualmente efficace.

## Passo 4: Registro interno degli incidenti (obbligatorio a prescindere dalla notifica)

L'Art. 33(5) richiede di documentare **ogni** violazione internamente, anche
quelle che decidi di non segnalare, il Garante può richiedere di visionare
questo registro.

| Campo | Voce |
|---|---|
| Data/ora di scoperta | |
| Data/ora dell'accaduto (se diversa/nota) | |
| Come è stata scoperta | |
| Descrizione dell'incidente | |
| Categorie di dati coinvolte | |
| Numero approssimativo di interessati coinvolti | |
| Valutazione del rischio (perché notificare / perché no) | |
| Garante notificato? (Sì/No, data) | |
| Interessati notificati? (Sì/No, data, modalità) | |
| Azioni di contenimento/rimedio adottate | |
| Misure adottate per prevenire il ripetersi | |
| Responsabile di questa voce | |

## Passo 5: Modelli di lettera di notifica

**A. Al Garante**: usa il modulo online ufficiale su garanteprivacy.it;
prepara le risposte del Passo 4 prima di iniziare, poiché il modulo va in
timeout.

**B. Agli interessati (modello):**

> Oggetto: Comunicazione importante sui tuoi dati personali
>
> Gentile [Nome],
>
> Ti scriviamo per informarti che il [data] siamo venuti a conoscenza di un
> incidente di sicurezza che potrebbe aver coinvolto alcuni tuoi dati
> personali detenuti da [Nome Attività]. Nello specifico, [descrivi cosa è
> successo e quali dati sono coinvolti, in linguaggio semplice].
>
> Abbiamo adottato le seguenti misure: [azioni di contenimento/rimedio].
>
> Ti consigliamo di: [consigli pratici, es. "cambiare la password sul nostro
> sito e ovunque tu l'abbia riutilizzata", "monitorare gli estratti conto per
> attività insolite"].
>
> Per domande, contattaci a [email/telefono]. Prendiamo sul serio la
> sicurezza dei tuoi dati e ci scusiamo per la preoccupazione causata.
>
> [Nome Attività]

---

**Disclaimer:** Questo documento è un modello fornito a scopo puramente
informativo e non costituisce consulenza legale. Deve essere rivisto e
adattato alla specifica attività dell'acquirente e, ove opportuno, verificato
da un legale o da un esperto di protezione dati prima dell'uso, specialmente
durante un incidente attivo, in cui è consigliabile anche consultare un
legale e, per incidenti significativi, un esperto di sicurezza informatica.
NormaKit e il relativo gestore non si assumono responsabilità per gli esiti
derivanti dall'uso di questo modello.
