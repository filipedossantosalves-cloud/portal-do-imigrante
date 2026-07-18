const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const statesRoot = path.join(root, "data", "estados");

const [, , stateArg, cityArg] = process.argv;

if (!stateArg || !cityArg) {
  console.error("Uso: node scripts/promote-city-drafts.js <estado> <cidade>");
  process.exit(1);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function findDir(parent, wanted) {
  const target = normalize(wanted);
  return fs
    .readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .find((name) => normalize(name) === target);
}

function isBlockedDraft(service) {
  const text = normalize([
    service.name,
    service.notice,
    ...(Array.isArray(service.reasons) ? service.reasons : []),
  ].join(" "));
  return (
    text.includes("pagina oficial indisponivel") ||
    text.includes("revisar antes de promover") ||
    text.includes("preservados a partir do resultado")
  );
}

function isPublishableDraft(service) {
  return Boolean(
    service.id &&
      service.name &&
      service.uf &&
      service.state &&
      service.city &&
      service.sourceRegistered &&
      service.sourceUrl &&
      service.verified &&
      !isBlockedDraft(service),
  );
}

function serviceKey(service) {
  return normalize(`${service.category}|${service.name}|${service.city}`);
}

function likelyReplacedByDraft(legacy, drafts) {
  const legacyName = normalize(legacy.name);
  return drafts.some((draft) => {
    const draftName = normalize(draft.name);
    if (legacyName === draftName) return true;
    if (legacyName.includes("cras") && draftName.includes("cras")) return true;
    if (legacyName.includes("creas") && draftName.includes("creas")) return true;
    if (legacyName.includes("upa centro-sul") && draftName.includes("upa centro-sul")) return true;
    if (legacyName.includes("upa venda nova") && draftName.includes("upa venda nova")) return true;
    return false;
  });
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
const draftPath = path.join(cityPath, "servicos.rascunho.json");

const current = readJson(servicesPath);
const draft = readJson(draftPath);
const currentServices = Array.isArray(current.services) ? current.services : [];
const draftServices = Array.isArray(draft.services) ? draft.services : [];
const publishable = draftServices.filter(isPublishableDraft);
const blocked = draftServices.filter((service) => !isPublishableDraft(service));
const keptLegacy = currentServices.filter((service) => !likelyReplacedByDraft(service, publishable));
const merged = [...keptLegacy];
const seen = new Set(merged.map(serviceKey));

for (const service of publishable) {
  const key = serviceKey(service);
  if (seen.has(key)) continue;
  merged.push(service);
  seen.add(key);
}

merged.sort((a, b) => {
  const official = Number(Boolean(b.sourceRegistered)) - Number(Boolean(a.sourceRegistered));
  return (
    official ||
    String(a.category || "").localeCompare(String(b.category || ""), "pt-BR") ||
    String(a.name || "").localeCompare(String(b.name || ""), "pt-BR")
  );
});

current.services = merged;
current.serviceCount = merged.length;
current.officialServiceCount = merged.filter((service) => service.sourceRegistered).length;
current.updated = new Date().toISOString().slice(0, 10);

writeJson(servicesPath, current);

console.log(
  JSON.stringify(
    {
      state: current.state,
      city: current.city,
      promoted: publishable.length,
      blocked: blocked.map((service) => service.id || service.name),
      keptLegacy: keptLegacy.length,
      serviceCount: current.serviceCount,
      officialServiceCount: current.officialServiceCount,
    },
    null,
    2,
  ),
);
