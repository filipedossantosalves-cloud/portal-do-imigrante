const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const statesRoot = path.join(root, "data", "estados");

const [, , stateArg, cityArg] = process.argv;

if (!stateArg || !cityArg) {
  console.error("Uso: node scripts/create-research-packet.js <estado> <cidade>");
  process.exit(1);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJsonIfMissing(filePath, value) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return true;
}

function writeTextIfMissing(filePath, value) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, value, "utf8");
  return true;
}

function findDir(parent, wanted) {
  const normalized = wanted.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return fs
    .readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .find((name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === normalized);
}

function serviceRisks(service) {
  const risks = [];
  if (!service.sourceRegistered || !service.sourceUrl) risks.push("Sem fonte oficial registrada.");
  if (!service.verified) risks.push("Sem data de verificacao.");
  if (!service.phone) risks.push("Telefone nao publicado pela fonte.");
  if (!service.address) risks.push("Endereco ausente.");
  if (!service.hours) risks.push("Horario ausente.");
  return risks;
}

const stateFolder = findDir(statesRoot, stateArg);
if (!stateFolder) {
  console.error(`Estado nao encontrado: ${stateArg}`);
  process.exit(1);
}

const statePath = path.join(statesRoot, stateFolder);
const cityFolder = findDir(statePath, cityArg);
if (!cityFolder) {
  console.error(`Cidade nao encontrada em ${stateFolder}: ${cityArg}`);
  process.exit(1);
}

const cityPath = path.join(statePath, cityFolder);
const servicesPath = path.join(cityPath, "servicos.json");
const cityData = readJson(servicesPath);
const services = Array.isArray(cityData.services) ? cityData.services : [];
const today = new Date().toISOString().slice(0, 10);

const sourcesPath = path.join(cityPath, "fontes-encontradas.json");
const draftPath = path.join(cityPath, "servicos.rascunho.json");
const reportPath = path.join(cityPath, "relatorio-validacao.md");

const created = [];

if (
  writeJsonIfMissing(sourcesPath, {
    state: cityData.state || stateFolder,
    uf: cityData.uf || "",
    city: cityData.city || cityFolder,
    updated: today,
    status: "research",
    sources: [
      {
        title: "",
        url: "",
        sourceType: "official",
        serviceArea: "",
        notes: "",
        checkedAt: "",
      },
    ],
    sourceRules: [
      "Use only official city, state, or federal sources for validation.",
      "Do not use blogs, maps, social media, or directories as final validation sources.",
      "If the official page does not publish a field, keep the field empty and mark it for confirmation.",
    ],
  })
) {
  created.push(path.relative(root, sourcesPath));
}

if (
  writeJsonIfMissing(draftPath, {
    state: cityData.state || stateFolder,
    uf: cityData.uf || "",
    city: cityData.city || cityFolder,
    updated: today,
    status: "draft",
    services: [],
    draftRules: [
      "Drafts are not published services.",
      "Every drafted service must include sourceUrl before promotion.",
      "Missing phone, address, or hours must remain empty instead of inferred.",
    ],
  })
) {
  created.push(path.relative(root, draftPath));
}

const rows = services
  .map((service) => {
    const risks = serviceRisks(service);
    return `| ${service.id || ""} | ${service.name || ""} | ${service.sourceRegistered ? "official" : "legacy/draft"} | ${risks.length ? risks.join(" ") : "Ready"} |`;
  })
  .join("\n");

if (
  writeTextIfMissing(
    reportPath,
    `# Relatorio de validacao - ${cityData.city || cityFolder}

Estado: ${cityData.state || stateFolder} (${cityData.uf || ""})
Gerado em: ${today}

## Regra principal

No official source, no validation badge.

## Arquivos de trabalho

- \`fontes-encontradas.json\`
- \`servicos.rascunho.json\`
- \`servicos.json\`

## Registros existentes

| ID | Servico | Status | Riscos |
| --- | --- | --- | --- |
${rows || "| - | Nenhum registro existente | - | - |"}

## Checklist antes de promover rascunhos

- Fonte oficial registrada.
- URL oficial preenchida.
- Data de verificacao preenchida.
- Telefone publicado pela fonte ou campo vazio.
- Endereco publicado pela fonte ou campo vazio.
- Horario publicado pela fonte ou campo vazio.
- Aviso de confirmacao antes do deslocamento.
`,
  )
) {
  created.push(path.relative(root, reportPath));
}

console.log(
  JSON.stringify(
    {
      state: cityData.state || stateFolder,
      city: cityData.city || cityFolder,
      existingServices: services.length,
      created,
      skippedExisting: 3 - created.length,
    },
    null,
    2,
  ),
);
