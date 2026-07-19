# Security policy

## Project boundary

Portal do Imigrante is a static public-information site. It has no login,
server-side database, payment flow, analytics, or form that requests personal
data. The public interface must never request or store a person's name, CPF,
documents, precise location, immigration case details, or authentication data.

HTML, CSS, JavaScript, and public JSON sent to a browser are public by design.
Secrets, private research notes, credentials, and personal data must never be
placed in those files or committed to the public repository.

## Reporting a vulnerability

Do not publish exploit details, credentials, or personal data in a public issue.
Use the repository's private vulnerability reporting option under **Security**
when it is available. If that option is unavailable, contact the maintainer
through the GitHub profile first and share only enough information to arrange a
private report.

Include the affected page, a concise reproduction, the expected impact, and a
suggested correction when possible. Never include real documents or data from
a migrant, refugee, asylum seeker, or stateless person.

## Publication rules

- Only HTTPS source and map URLs may be rendered as external links.
- Unverified records must not expose operational contact details.
- Official-source records require a named source, an HTTPS source URL, and a
  valid verification date.
- Research drafts, discovered-source files, and validation reports remain local
  and are excluded by `.gitignore`.
- Run `node scripts/audit-project.js` before every publication.

## Supported version

Security corrections are applied to the current `main` branch and the live
GitHub Pages deployment.

## Copyright boundary

Security controls reduce accidental exposure and unsafe browser behavior, but
browser-delivered code remains technically visible. Reuse of the project's
code, interface, visual identity, original writing, research workflow,
validation methodology, and data organization is governed by `LICENSE` and
`NOTICE.md`. Public facts and third-party materials remain governed by their
original sources.
