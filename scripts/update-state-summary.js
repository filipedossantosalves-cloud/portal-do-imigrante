const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const statesRoot = path.join(root, "data", "estados");
const indexPath = path.join(statesRoot, "_indice.json");
const [, , stateArg] = process.argv;

if (!stateArg) {
  console.error("Uso: node scripts/update-state-summary.js <estado>");
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

function rebuildIndex() {
  if (!fs.existsSync(indexPath)) return;

  const index = readJson(indexPath);
  const states = fs
    .readdirSync(statesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .map((folder) => {
      const file = path.join(statesRoot, folder, "estado.json");
      if (!fs.existsSync(file)) return null;
      const meta = readJson(file);
      return {
        uf: meta.uf || "",
        state: meta.state || folder,
        folder,
        cityCount: Number(meta.cityCount || 0),
        serviceCount: Number(meta.serviceCount || 0),
        officialServiceCount: Number(meta.officialServiceCount || 0),
      };
    })
    .filter(Boolean)
    .sort((a, b) => String(a.state).localeCompare(String(b.state), "pt-BR"));

  index.states = states;
  index.totalFolders = states.length;
  index.totalStatesWithUf = states.filter((state) => state.uf).length;
  index.totalWithoutUf = states.filter((state) => !state.uf).length;
  index.totalCities = states.reduce((total, state) => total + state.cityCount, 0);
  index.totalServices = states.reduce((total, state) => total + state.serviceCount, 0);
  index.totalOfficialServices = states.reduce(
    (total, state) => total + state.officialServiceCount,
    0,
  );

  writeJson(indexPath, index);
}

const stateFolder = findDir(statesRoot, stateArg);
if (!stateFolder) {
  console.error(`Estado nao encontrado: ${stateArg}`);
  process.exit(1);
}

const statePath = path.join(statesRoot, stateFolder);
const stateFile = path.join(statePath, "estado.json");
const stateMeta = readJson(stateFile);
const cities = fs
  .readdirSync(statePath, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, "pt-BR"))
  .map((cityFolder) => {
    const cityData = readJson(path.join(statePath, cityFolder, "servicos.json"));
    const services = Array.isArray(cityData.services) ? cityData.services : [];
    cityData.serviceCount = services.length;
    cityData.officialServiceCount = services.filter((service) => service.sourceRegistered).length;
    writeJson(path.join(statePath, cityFolder, "servicos.json"), cityData);
    return {
      name: cityData.city || cityFolder,
      folder: cityFolder,
      serviceCount: cityData.serviceCount,
      officialServiceCount: cityData.officialServiceCount,
    };
  });

stateMeta.cityCount = cities.length;
stateMeta.serviceCount = cities.reduce((total, city) => total + city.serviceCount, 0);
stateMeta.officialServiceCount = cities.reduce(
  (total, city) => total + city.officialServiceCount,
  0,
);
stateMeta.cities = cities;
if (stateMeta.coverage) {
  stateMeta.coverage.records = stateMeta.officialServiceCount;
}
stateMeta.updated =
  process.env.PORTAL_UPDATED_DATE ||
  process.env.PORTAL_CONSOLIDATED_DATE ||
  new Date().toISOString().slice(0, 10);

writeJson(stateFile, stateMeta);
rebuildIndex();

console.log(
  JSON.stringify(
    {
      state: stateMeta.state || stateFolder,
      cities: stateMeta.cityCount,
      services: stateMeta.serviceCount,
      officialServices: stateMeta.officialServiceCount,
    },
    null,
    2,
  ),
);
