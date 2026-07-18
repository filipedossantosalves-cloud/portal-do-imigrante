const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "data", "services.json");
const targetRoot = path.join(root, "data", "estados");

const portal = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

function cleanSegment(value, fallback) {
  return String(value || fallback)
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sortServices(a, b) {
  return (
    String(a.uf || "").localeCompare(String(b.uf || ""), "pt-BR") ||
    String(a.city || "").localeCompare(String(b.city || ""), "pt-BR") ||
    String(a.name || "").localeCompare(String(b.name || ""), "pt-BR") ||
    String(a.id || "").localeCompare(String(b.id || ""), "pt-BR")
  );
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value, "utf8");
}

function emptyDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

emptyDir(targetRoot);

writeText(
  path.join(targetRoot, "README.md"),
  `# Base por estado e cidade

Esta pasta e a area de trabalho da pesquisa.

Use este fluxo daqui em diante:

- edite ou crie registros em \`data/estados/<estado>/<cidade>/servicos.json\`;
- mantenha \`estado.json\` apenas como resumo da cobertura do estado;
- preserve fontes oficiais, data de verificacao e avisos de confirmacao em cada servico;
- consolide a base grande apenas ao fim de uma etapa, usando \`scripts/consolidate-state-city-data.js\`.

Arquivos de controle:

- \`_indice.json\`: resumo geral da estrutura modular;
- \`_portal.json\`: metadados gerais usados ao recompor a base principal.

A pasta \`Nao informado\` ou \`Não informado\` preserva registros antigos sem UF definida. Eles devem ser corrigidos aos poucos quando houver informacao suficiente.
`,
);

const services = [...portal.services].sort(sortServices);
const byState = new Map();

for (const service of services) {
  const stateName = cleanSegment(service.state, service.uf || "Estado nao informado");
  const cityName = cleanSegment(service.city, "Cidade nao informada");
  if (!byState.has(stateName)) {
    byState.set(stateName, {
      uf: service.uf || "",
      state: service.state || stateName,
      cities: new Map(),
    });
  }

  const state = byState.get(stateName);
  if (!state.cities.has(cityName)) {
    state.cities.set(cityName, []);
  }
  state.cities.get(cityName).push(service);
}

const portalMeta = {
  meta: portal.meta,
  exportedFrom: "data/services.json",
  exportedAt: new Date().toISOString(),
  note: "Edite os arquivos data/estados/<estado>/<cidade>/servicos.json durante a pesquisa. Use scripts/consolidate-state-city-data.js para recompor a base principal.",
};

writeJson(path.join(targetRoot, "_portal.json"), portalMeta);

const index = [];

for (const [stateFolder, state] of [...byState.entries()].sort((a, b) =>
  a[0].localeCompare(b[0], "pt-BR"),
)) {
  const statePath = path.join(targetRoot, stateFolder);
  const cities = [...state.cities.entries()].sort((a, b) =>
    a[0].localeCompare(b[0], "pt-BR"),
  );
  const coverageKey = Object.entries(portal.meta.coverage || {}).find(([, item]) =>
    item.cities?.some((city) => cities.some(([cityFolder]) => cityFolder === city)),
  )?.[0];

  const stateMeta = {
    uf: state.uf,
    state: state.state,
    coverageKey: coverageKey || null,
    coverage: coverageKey ? portal.meta.coverage[coverageKey] : null,
    cityCount: cities.length,
    serviceCount: cities.reduce((total, [, cityServices]) => total + cityServices.length, 0),
    officialServiceCount: cities.reduce(
      (total, [, cityServices]) =>
        total + cityServices.filter((service) => service.sourceRegistered).length,
      0,
    ),
    cities: cities.map(([cityFolder, cityServices]) => ({
      name: cityServices[0]?.city || cityFolder,
      folder: cityFolder,
      serviceCount: cityServices.length,
      officialServiceCount: cityServices.filter((service) => service.sourceRegistered).length,
    })),
  };

  writeJson(path.join(statePath, "estado.json"), stateMeta);

  for (const [cityFolder, cityServices] of cities) {
    const cityPayload = {
      uf: state.uf,
      state: state.state,
      city: cityServices[0]?.city || cityFolder,
      serviceCount: cityServices.length,
      officialServiceCount: cityServices.filter((service) => service.sourceRegistered).length,
      services: cityServices,
    };
    writeJson(path.join(statePath, cityFolder, "servicos.json"), cityPayload);
  }

  index.push({
    uf: state.uf,
    state: state.state,
    folder: stateFolder,
    cityCount: stateMeta.cityCount,
    serviceCount: stateMeta.serviceCount,
    officialServiceCount: stateMeta.officialServiceCount,
  });
}

writeJson(path.join(targetRoot, "_indice.json"), {
  totalFolders: index.length,
  totalStatesWithUf: index.filter((state) => state.uf).length,
  totalWithoutUf: index.filter((state) => !state.uf).length,
  totalCities: index.reduce((total, state) => total + state.cityCount, 0),
  totalServices: index.reduce((total, state) => total + state.serviceCount, 0),
  totalOfficialServices: index.reduce(
    (total, state) => total + state.officialServiceCount,
    0,
  ),
  states: index,
});

console.log(
  JSON.stringify(
    {
      target: path.relative(root, targetRoot),
      folders: index.length,
      statesWithUf: index.filter((state) => state.uf).length,
      withoutUf: index.filter((state) => !state.uf).length,
      cities: index.reduce((total, state) => total + state.cityCount, 0),
      services: index.reduce((total, state) => total + state.serviceCount, 0),
      officialServices: index.reduce((total, state) => total + state.officialServiceCount, 0),
    },
    null,
    2,
  ),
);
