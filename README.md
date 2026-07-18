# Portal do Imigrante

<img src="assets/logo.png" alt="Portal do Imigrante logo" width="120">

Portal estatico e Research Desk para mapear, validar e publicar servicos publicos e redes de apoio para migrantes e refugiados no Brasil.

Created by Filipe dos Santos Alves for OpenAI Build Week 2026.

## Hackathon pitch

Migrants and refugees often need urgent access to shelter, health care, documentation, social assistance, work services, and trusted local support. The hard part is not only listing services; it is keeping public information traceable, conservative, and safe enough to use.

Portal do Imigrante combines a public service portal with an internal Research Desk. The Research Desk organizes work by state and city, keeps drafts separate from published records, checks official-source evidence, and rebuilds the public dataset only after validation.

## Current status

Consolidated on 2026-07-18:

- 807 records in the safer public export.
- 818 raw records in the modular research workspace.
- 11 superseded legacy records removed from the public export.
- 322 records with official-source evidence.
- 16 of 27 Brazilian federative units reviewed.
- 11 federative units still pending.
- Minas Gerais pilot: 32 services, 26 official-source records, 5 cities organized.
- Santa Catarina review: 56 services, 26 official-source records, Joinville rebuilt with official municipal evidence.
- Recommended next state: Para.

The public portal keeps 28 historical records without UF in `data/estados/Nao informado/`. The Research Desk contains 779 deduplicated UF-linked records and focuses on the 27 states with UF.

Google Maps may be kept as a candidate-discovery aid in the research workspace, but it is not treated as official evidence. Records without an official source are exported without operational phone, address, route, or opening-hour details.

## How to open

Open the public portal directly:

`index.html`

Open the multilingual rights and documents guide:

`guia/index.html`

Open the research and validation dashboard:

`research-desk/index.html`

Open the public data and methodology page:

`data/index.html`

A local server is optional because the portal uses `data/services.js` and the Research Desk uses `research-desk/data.js`.

## Project structure

- `index.html`: public Portal do Imigrante interface.
- `styles.css`: public portal layout and responsive design.
- `steps.css`: expandable explanations for the six-step checklist.
- `app.js`: public portal search, filters, checklist, favorites, and language support.
- `guia/`: multilingual guide to rights, documents, and current official channels.
- `research-desk/`: internal research and validation dashboard.
- `data/services.json`: consolidated public dataset.
- `data/services.js`: browser-ready copy of the public dataset.
- `data/estados/`: modular state/city workspace.
- `scripts/export-state-city-data.js`: recreates `data/estados/` from the consolidated dataset.
- `scripts/consolidate-state-city-data.js`: validates and rebuilds `data/services.json` and `data/services.js`.
- `scripts/build-research-desk-data.js`: generates `research-desk/data.js`.
- `scripts/create-research-packet.js`: creates safe city research files without overwriting existing work.
- `scripts/promote-city-drafts.js`: promotes reviewed drafts into city service files.
- `scripts/update-state-summary.js`: recalculates state summaries and the global index.

## Research workflow

New research should be saved in:

`data/estados/<state>/<city>/`

Each city can contain:

- `fontes-encontradas.json`: official and candidate sources found during research.
- `servicos.rascunho.json`: draft records not yet published.
- `relatorio-validacao.md`: validation notes, risks, and blocked records.
- `servicos.json`: records already published for that city.

The main rule is conservative:

`No official source, no validation badge.`

Missing phone numbers, addresses, and opening hours are marked as missing. They are not guessed.

Human review remains the publication gate. Official-source status requires a named source, an HTTPS source URL, and a valid verification date.

## Validation commands

Use the bundled or system Node executable:

```bash
node --check app.js
node --check sw.js
node --check research-desk/app.js
node --check scripts/consolidate-state-city-data.js
node scripts/consolidate-state-city-data.js
node scripts/build-research-desk-data.js
node scripts/clean-promoted-drafts.js
node scripts/audit-project.js
```

`clean-promoted-drafts.js` runs in dry-run mode by default. Use `--write` only after reviewing the listed exact matches.

## Built with

HTML, CSS, JavaScript, JSON, Node.js, OpenAI GPT-5.6 through Codex, public government sources, and official city/state/federal service pages.

GPT-5.6 and Codex were used as development and research assistants for restructuring data, reviewing translations, strengthening validation, and testing the interface. The deployed static portal does not claim to run an AI model or OpenAI API at runtime.

## License and attribution

The project code is released under the MIT License. Public-service information remains attributed to its original sources, and the license does not replace the terms or authority of those sources.

## Devpost positioning

Recommended project name:

`Portal do Imigrante Research Desk`

Recommended elevator pitch:

`AI-assisted public-service research and validation for migrants and refugees in Brazil.`

Recommended story angle:

- Inspiration: migrants and refugees need reliable local services, but public information is fragmented and often risky to trust without source checks.
- What it does: maps services by state/city, validates official-source evidence, separates drafts from published records, and exports a safer public portal.
- How it was built: static portal, modular JSON workspace, validation scripts, Research Desk dashboard, and Codex-assisted data/review workflow.
- Challenges: avoiding hallucinated contact details, keeping large datasets manageable, and designing a workflow that supports human review before publication.
- What we learned: for humanitarian information, safety comes from traceability, missing-data honesty, and conservative publishing.
