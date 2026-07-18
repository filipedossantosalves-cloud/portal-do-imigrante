# Devpost draft

## Project name

Portal do Imigrante Research Desk

## Elevator pitch

AI-assisted public-service research and validation for migrants and refugees in Brazil.

## Built with

HTML, CSS, JavaScript, JSON, Node.js, OpenAI GPT-5.6, OpenAI Codex, GitHub Pages, public government sources, official municipal/state/federal service pages.

## About the project

### Inspiration

Migrants and refugees often need urgent access to shelter, health care, documentation, social assistance, employment support, and local nonprofit services. In practice, this information is fragmented across city, state, federal, and civil-society websites. A wrong address, an outdated phone number, or an unverified shelter listing can create real risk for someone already in a vulnerable situation.

Portal do Imigrante was created around one principle: humanitarian information should be useful, but also conservative, traceable, and honest about what is missing.

### What it does

Portal do Imigrante has two parts:

1. A public portal where migrants, refugees, volunteers, and support workers can search services by location, category, urgency, and available information.
2. A Research Desk where the team organizes research by Brazilian state and city, checks official-source evidence, tracks validation progress, keeps drafts separate from published records, and exports the reviewed dataset back into the public portal.

The current pilot includes 807 records in a safer public export, 322 official-source records, 16 reviewed federative units, a Minas Gerais pilot with 32 mapped services across 5 cities, and a Santa Catarina review where Joinville has 26 official-source records and no pending drafts. The modular research workspace retains 818 raw records, while 11 superseded legacy duplicates are excluded from the public export.

### How we built it

We built the project as a static web application using HTML, CSS, JavaScript, and JSON so it can be opened and shared with very low infrastructure requirements.

The data workflow is modular:

- `data/estados/<state>/<city>/servicos.json` stores published city records.
- `fontes-encontradas.json` stores official and candidate research sources.
- `servicos.rascunho.json` stores draft records before publication.
- `relatorio-validacao.md` stores review notes, risks, and blocked records.
- Node.js validation scripts rebuild the public dataset only after consistency checks pass.

OpenAI GPT-5.6 through Codex helped accelerate research organization, validation logic, data restructuring, translation review, interface polishing, and the submission narrative. AI proposed and checked changes, while Filipe dos Santos Alves directed the product, reviewed results, chose the safety policy, and kept the final human publication gate: no official source means no validation badge.

The project began as a smaller static service portal. During Build Week, we added the state/city research workspace, Research Desk, validation and consolidation scripts, safer public export, data-transparency page, multilingual review, and GitHub Pages deployment. The live portal does not run an OpenAI model at runtime; GPT-5.6 and Codex were used transparently in the build and review workflow.

### Challenges

The main challenge was avoiding unsafe shortcuts. Public-service data can look complete even when it is not. Phone numbers, addresses, opening hours, and shelter availability must not be guessed.

Another challenge was dataset size. Rebuilding one large file after every research step was inefficient, so we changed the workflow to state/city folders and only consolidate at the end of a phase.

We also had to preserve legacy records while separating them from verified official-source records. The Research Desk makes that distinction visible instead of hiding uncertainty.

### What we learned

For humanitarian tools, accuracy is not only about having more records. It is about traceability, review discipline, and making uncertainty visible.

The strongest pattern we found was:

`research packet -> draft records -> validation report -> promoted services -> consolidated public portal`

This creates an auditable path from source research to public display.

### What's next

- Finish more Brazilian states using the same state/city workflow.
- Add a guided reviewer mode for volunteers.
- Add multilingual public-facing content for Portuguese, Spanish, English, French, and Haitian Creole.
- Add safer update reminders for services that have not been rechecked recently.

## Try it out links

- Public portal: https://filipedossantosalves-cloud.github.io/portal-do-imigrante/
- Research Desk: https://filipedossantosalves-cloud.github.io/portal-do-imigrante/research-desk/
- Data and methodology: https://filipedossantosalves-cloud.github.io/portal-do-imigrante/data/
- Source code: https://github.com/filipedossantosalves-cloud/portal-do-imigrante

## Video demo notes

Show this sequence:

1. Open the public portal and search for a service.
2. Open the Research Desk and show the national progress metrics.
3. Select Minas Gerais and show the official-source coverage.
4. Select Belo Horizonte or Contagem and show the research packet.
5. Explain the safety rule: no official source, no validation badge.
6. Show that the validated data is consolidated back into the public portal.
7. Show the Data page and explain the 807 safe public records versus 818 raw workspace records.

Upload the final demo with the visibility required by the Official Rules and verify that it plays without requiring a judge to sign in.
