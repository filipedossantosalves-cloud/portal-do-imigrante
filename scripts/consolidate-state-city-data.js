const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const stateRoot = path.join(root, "data", "estados");
const portalMetaPath = path.join(stateRoot, "_portal.json");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const totalUnits = 27;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function unique(values) {
  return new Set(values.filter(Boolean)).size;
}

function normalizeKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function entityKey(service) {
  return [service.uf, service.city, service.name].map(normalizeKey).join("|");
}

function deduplicateLegacyServices(services) {
  const officialKeys = new Set(
    services.filter((service) => service.sourceRegistered).map(entityKey),
  );

  return services.filter(
    (service) => service.sourceRegistered || !officialKeys.has(entityKey(service)),
  );
}

function sanitizeForPublic(service) {
  if (service.sourceRegistered) return { ...service };

  return {
    ...service,
    address: "",
    map: "",
    phone: "",
    phoneLabel: "Não confirmado",
    hours: "Confirmar no canal oficial",
    source: "",
    sourceUrl: "",
    verified: "",
    contactConfirmed: false,
    addressSpecific: false,
    hoursInformed: false,
    reasons: [
      "Fonte não registrada",
      "Telefone não confirmado",
      "Endereço a confirmar",
      "Horário a confirmar",
    ],
    notice: "Informação de referência. Confirme no canal oficial antes de se deslocar.",
  };
}

function isValidVerificationDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || ""));
  if (!match) return false;
  const date = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  return (
    date.getUTCFullYear() === Number(match[3]) &&
    date.getUTCMonth() === Number(match[2]) - 1 &&
    date.getUTCDate() === Number(match[1])
  );
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch (_error) {
    return false;
  }
}

function sortServices(a, b) {
  return (
    String(a.uf || "").localeCompare(String(b.uf || ""), "pt-BR") ||
    String(a.city || "").localeCompare(String(b.city || ""), "pt-BR") ||
    String(a.name || "").localeCompare(String(b.name || ""), "pt-BR") ||
    String(a.id || "").localeCompare(String(b.id || ""), "pt-BR")
  );
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

function uniqueOrdered(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const label = String(value || "").trim();
    const key = label.toLocaleLowerCase("pt-BR");
    if (!label || seen.has(key)) continue;
    seen.add(key);
    result.push(label);
  }

  return result;
}

function collectOfficialCoverage(baseCoverage, services, stateInfoByName, verifiedDate) {
  const coverage = { ...baseCoverage };
  const officialByState = new Map();

  for (const service of services) {
    if (!service.sourceRegistered || !service.uf || !service.state) continue;

    if (!officialByState.has(service.state)) {
      officialByState.set(service.state, {
        records: 0,
        cities: [],
      });
    }

    const item = officialByState.get(service.state);
    item.records += 1;
    item.cities.push(service.city);
  }

  for (const [stateName, item] of officialByState.entries()) {
    const stateInfo = stateInfoByName.get(stateName) || {};
    const stateMeta = stateInfo.stateMeta || {};
    const key = stateMeta.coverageKey || toCoverageKey(stateName);
    const existing = coverage[key] || {};
    const metaCities = Array.isArray(stateMeta.cities)
      ? stateMeta.cities.map((city) => city && city.name)
      : [];

    coverage[key] = {
      ...existing,
      cities:
        Array.isArray(existing.cities) && existing.cities.length === 5
          ? existing.cities
          : uniqueOrdered(metaCities.length ? metaCities : item.cities).slice(0, 5),
      selection:
        existing.selection ||
        "Cinco municipios usados na etapa revisada do Portal do Imigrante.",
      source: existing.source || "",
      records: item.records,
      verified: existing.verified || verifiedDate,
    };
  }

  return coverage;
}

const portalMeta = readJson(portalMetaPath);
const portal = {
  meta: portalMeta.meta || {},
  services: [],
};
const stateInfoByName = new Map();

for (const stateFolder of listDirs(stateRoot)) {
  const statePath = path.join(stateRoot, stateFolder);
  const stateMetaPath = path.join(statePath, "estado.json");
  const stateMeta = fs.existsSync(stateMetaPath) ? readJson(stateMetaPath) : {};
  const stateName = stateMeta.name || stateFolder;
  stateInfoByName.set(stateName, {
    folder: stateFolder,
    stateMeta,
  });

  for (const cityFolder of listDirs(statePath)) {
    const cityPath = path.join(statePath, cityFolder, "servicos.json");
    if (!fs.existsSync(cityPath)) continue;
    const cityPayload = readJson(cityPath);
    if (!Array.isArray(cityPayload.services)) {
      throw new Error(`${cityPath}: campo services ausente ou invalido`);
    }
    portal.services.push(...cityPayload.services);
  }
}

const rawServiceCount = portal.services.length;
portal.services = deduplicateLegacyServices(portal.services).map(sanitizeForPublic);
const supersededLegacyRecords = rawServiceCount - portal.services.length;
portal.services.sort(sortServices);

const consolidated =
  process.env.PORTAL_CONSOLIDATED_DATE ||
  portal.meta.consolidated ||
  portal.meta.updated ||
  new Date().toISOString().slice(0, 10);
const coverage = collectOfficialCoverage(
  portal.meta.coverage || {},
  portal.services,
  stateInfoByName,
  consolidated,
);
portal.meta.coverage = coverage;

const errors = [];
const ids = new Set();

for (const service of portal.services) {
  if (!service.id) errors.push("Registro sem ID");
  else if (ids.has(service.id)) errors.push(`ID duplicado: ${service.id}`);
  else ids.add(service.id);

  for (const field of ["name", "state", "city"]) {
    if (!service[field]) errors.push(`${service.id || "sem-id"}: campo ${field} ausente`);
  }

  if (service.sourceRegistered && !service.uf) {
    errors.push(`${service.id}: registro oficial sem UF`);
  }

  if (service.sourceRegistered && !service.sourceUrl) {
    errors.push(`${service.id}: fonte oficial marcada sem URL`);
  }

  if (service.sourceRegistered && !service.source) {
    errors.push(`${service.id}: fonte oficial marcada sem nome da fonte`);
  }

  if (service.sourceRegistered && !isHttpsUrl(service.sourceUrl)) {
    errors.push(`${service.id}: URL oficial ausente, invalida ou sem HTTPS`);
  }

  if (service.sourceRegistered && !isValidVerificationDate(service.verified)) {
    errors.push(`${service.id}: data de verificacao ausente ou invalida`);
  }

  if (service.sourceRegistered && service.contactConfirmed && !service.phone) {
    errors.push(`${service.id}: contato confirmado sem telefone`);
  }

  if (!service.sourceRegistered) {
    const unsafeFields = [
      service.phone,
      service.address,
      service.map,
      service.sourceUrl,
      service.verified,
      service.contactConfirmed,
      service.addressSpecific,
      service.hoursInformed,
    ];
    if (unsafeFields.some(Boolean)) {
      errors.push(`${service.id}: registro sem fonte vazou dado operacional no export publico`);
    }
  }
}

const reviewedUnits = Object.keys(coverage).length;
const officialRecords = portal.services.filter((service) => service.sourceRegistered).length;
const declaredOfficialRecords = Object.values(coverage).reduce(
  (total, item) => total + Number(item.records || 0),
  0,
);

for (const [key, item] of Object.entries(coverage)) {
  if (!Array.isArray(item.cities) || item.cities.length !== 5) {
    errors.push(`${key}: cobertura deve conter cinco cidades`);
  }
}

if (officialRecords !== declaredOfficialRecords) {
  errors.push(
    `Cobertura declara ${declaredOfficialRecords} registros oficiais, mas a base contem ${officialRecords}`,
  );
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

portal.meta.updated = consolidated;
portal.meta.consolidated = consolidated;
portal.meta.coverageSummary = {
  reviewedUnits,
  pendingUnits: totalUnits - reviewedUnits,
  totalUnits,
  reviewedCities: unique(
    Object.values(coverage).flatMap((item) =>
      item.cities.map((city) => city.toLocaleLowerCase("pt-BR")),
    ),
  ),
  officialRecords,
};

portal.meta.stats = {
  total: portal.services.length,
  rawWorkspaceRecords: rawServiceCount,
  supersededLegacyRecords,
  withPhone: portal.services.filter((service) => service.contactConfirmed).length,
  withSource: officialRecords,
  urgent: portal.services.filter((service) => service.priority === "Urgente").length,
  states: unique(portal.services.map((service) => service.uf)),
  cities: unique(
    portal.services.map((service) =>
      `${service.uf}|${service.city}`.toLocaleLowerCase("pt-BR"),
    ),
  ),
  updated: consolidated,
};

writeJson(portalMetaPath, {
  ...portalMeta,
  meta: portal.meta,
});
writeJson(jsonPath, portal);
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      consolidated,
      services: portal.meta.stats.total,
      rawWorkspaceRecords: rawServiceCount,
      supersededLegacyRecords,
      officialRecords,
      reviewedUnits,
      pendingUnits: totalUnits - reviewedUnits,
      reviewedCities: portal.meta.coverageSummary.reviewedCities,
      errors: 0,
    },
    null,
    2,
  ),
);
