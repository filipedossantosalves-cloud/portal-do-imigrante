const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const statesRoot = path.join(root, "data", "estados");
const outputPath = path.join(root, "research-desk", "data.js");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listDirs(dirPath) {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function toCoverageKey(value) {
  const parts = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return parts
    .map((part, index) => {
      const lower = part.toLowerCase();
      return index === 0 ? lower : `${lower[0].toUpperCase()}${lower.slice(1)}`;
    })
    .join("");
}

function summarizeService(service) {
  return {
    id: service.id || "",
    name: service.name || "",
    category: service.category || "",
    city: service.city || "",
    state: service.state || "",
    uf: service.uf || "",
    sourceRegistered: Boolean(service.sourceRegistered),
    sourceUrl: service.sourceUrl || "",
    phone: service.phone || "",
    address: service.address || "",
    hours: service.hours || "",
    priority: service.priority || "",
    verified: service.verified || "",
  };
}

const index = readJson(path.join(statesRoot, "_indice.json"));
const portalMeta = readJson(path.join(statesRoot, "_portal.json")).meta || {};
const states = [];

for (const state of index.states.filter((item) => item.uf)) {
  const statePath = path.join(statesRoot, state.folder);
  const stateMetaPath = path.join(statePath, "estado.json");
  const stateMeta = fs.existsSync(stateMetaPath) ? readJson(stateMetaPath) : state;
  const coverageKey = stateMeta.coverageKey || toCoverageKey(stateMeta.state || state.state);
  const coverage = (portalMeta.coverage && portalMeta.coverage[coverageKey]) || stateMeta.coverage || null;
  const cities = [];

  for (const cityFolder of listDirs(statePath)) {
    const cityFile = path.join(statePath, cityFolder, "servicos.json");
    if (!fs.existsSync(cityFile)) continue;
    const draftFile = path.join(statePath, cityFolder, "servicos.rascunho.json");
    const sourcesFile = path.join(statePath, cityFolder, "fontes-encontradas.json");
    const reportFile = path.join(statePath, cityFolder, "relatorio-validacao.md");
    const cityData = readJson(cityFile);
    const services = Array.isArray(cityData.services) ? cityData.services : [];
    const draftData = fs.existsSync(draftFile) ? readJson(draftFile) : { services: [] };
    const drafts = Array.isArray(draftData.services) ? draftData.services : [];
    cities.push({
      name: cityData.city || cityFolder,
      folder: cityFolder,
      serviceCount: services.length,
      officialServiceCount: services.filter((service) => service.sourceRegistered).length,
      missingSourceCount: services.filter((service) => !service.sourceRegistered).length,
      hasResearchPacket: fs.existsSync(sourcesFile) && fs.existsSync(draftFile) && fs.existsSync(reportFile),
      draftServiceCount: drafts.length,
      draftOfficialServiceCount: drafts.filter((service) => service.sourceRegistered).length,
      services: services.map(summarizeService),
    });
  }

  const serviceCount = cities.reduce((total, city) => total + city.serviceCount, 0);
  const officialServiceCount = cities.reduce((total, city) => total + city.officialServiceCount, 0);
  const targetOfficialServiceCount = Number((coverage && coverage.records) || 20);
  const status =
    officialServiceCount >= targetOfficialServiceCount
      ? "reviewed"
      : officialServiceCount > 0
        ? "in-progress"
        : "pending";

  states.push({
    uf: state.uf,
    state: state.state,
    folder: state.folder,
    serviceCount,
    officialServiceCount,
    targetOfficialServiceCount,
    status,
    cityCount: cities.length,
    coverage,
    cities,
  });
}

const pendingStates = states.filter((state) => state.status !== "reviewed");
const payload = {
  generatedAt: new Date().toISOString(),
  totals: {
    states: states.length,
    cities: states.reduce((total, state) => total + state.cities.length, 0),
    services: states.reduce((total, state) => total + state.serviceCount, 0),
    officialServices: states.reduce((total, state) => total + state.officialServiceCount, 0),
    pendingStates: pendingStates.length,
  },
  recommendedNext:
    pendingStates.find((state) => state.uf === "MG") ||
    pendingStates.find((state) => state.status === "in-progress") ||
    pendingStates[0] ||
    null,
  states,
  validationRules: [
    "No official source, no validation badge.",
    "Do not infer phone numbers, addresses, or opening hours.",
    "Keep drafts separate from published service files.",
    "Mark missing official information explicitly.",
    "Publish only after source URL, verification date, and risk review are present.",
  ],
  sourceChecklist: [
    "City hall official website",
    "State government official website",
    "Federal service page or database",
    "Public health or social assistance directory",
    "Public defender, labor, migration, or citizen service portal",
  ],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `window.RESEARCH_DESK_DATA=${JSON.stringify(payload, null, 2)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      output: path.relative(root, outputPath),
      states: payload.totals.states,
      cities: payload.totals.cities,
      services: payload.totals.services,
      officialServices: payload.totals.officialServices,
      pendingStates: payload.totals.pendingStates,
      next: payload.recommendedNext ? payload.recommendedNext.state : null,
    },
    null,
    2,
  ),
);
