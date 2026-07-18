const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const portal = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const consolidated = "2026-07-02";
const totalUnits = 27;

function unique(values) {
  return new Set(values.filter(Boolean)).size;
}

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
}

const coverage = portal.meta.coverage || {};
const reviewedUnits = Object.keys(coverage).length;
const officialRecords = portal.services.filter(
  (service) => service.sourceRegistered,
).length;
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
    `Cobertura declara ${declaredOfficialRecords} registros oficiais, mas a base contém ${officialRecords}`,
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

fs.writeFileSync(jsonPath, `${JSON.stringify(portal, null, 2)}\n`, "utf8");
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      consolidated,
      services: portal.meta.stats.total,
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
