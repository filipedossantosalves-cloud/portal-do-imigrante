const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const portal = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const verified = "29/06/2026";

function record({
  id,
  name,
  category,
  city,
  address,
  phone = "",
  hours = "Confirmar no canal oficial",
  source,
  sourceUrl,
  reasons = [],
}) {
  const missing = [...reasons];
  if (!phone) missing.push("Telefone direto não informado na fonte");
  if (hours === "Confirmar no canal oficial") missing.push("Horário a confirmar");
  return {
    id: `df-curated-${id}`,
    name,
    category,
    region: "Centro-Oeste",
    uf: "DF",
    state: "Distrito Federal",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - DF`,
    )}`,
    phone,
    phoneLabel: phone || "Não informado na fonte oficial",
    hours,
    source,
    sourceUrl,
    verified,
    contactConfirmed: Boolean(phone),
    addressSpecific: Boolean(address),
    hoursInformed: hours !== "Confirmar no canal oficial",
    sourceRegistered: true,
    priority: missing.length ? "Alta" : "Baixa",
    reasons: missing,
    notice: `Fonte oficial consultada em ${verified}. Confirme antes de se deslocar.`,
  };
}

const employmentSource =
  "https://www.sedet.df.gov.br/documents/d/sedet/edital-inscricoes-curso-preparacao-df-enem-pdf";
const crasSource = "https://www.sedes.df.gov.br/cras";
const creasSource =
  "https://www.sedes.df.gov.br/documents/d/sedes/contact-units-gerentes-pdf";

const distritoFederal = [
  record({
    id: "ceilandia-agencia-trabalhador",
    name: "Agência do Trabalhador de Ceilândia",
    category: "trabalho",
    city: "Ceilândia",
    address: "QNM 18/20, Bloco B",
    phone: "(61) 3773-9363",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Secretaria de Desenvolvimento Econômico, Trabalho e Renda do DF",
    sourceUrl: employmentSource,
  }),
  record({
    id: "ceilandia-cras-norte",
    name: "CRAS Ceilândia Norte",
    category: "assistencia",
    city: "Ceilândia",
    address: "QNN 15, Área Especial, Módulo A, Via Oeste",
    phone: "(61) 3773-7371 / (61) 3773-7372 / (61) 3773-7373 / (61) 3773-7374",
    hours: "Das 8h às 18h; confirmar dias de atendimento",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: crasSource,
    reasons: ["A fonte informa a faixa de horário, mas não especifica os dias"],
  }),
  record({
    id: "ceilandia-hospital-regional",
    name: "Hospital Regional de Ceilândia — Pronto-Socorro",
    category: "saude",
    city: "Ceilândia",
    address: "QNM 27, Área Especial 1, QNM 28",
    phone: "(61) 3449-6027 / (61) 3449-6028",
    hours: "24 horas",
    source: "Secretaria de Saúde do Distrito Federal",
    sourceUrl: "https://www.saude.df.gov.br/en/hospital-regional-de-ceilandia",
  }),
  record({
    id: "ceilandia-creas",
    name: "CREAS Ceilândia",
    category: "assistencia",
    city: "Ceilândia",
    address: "QNM 16, Área Especial, Módulo A, Ceilândia Norte",
    phone: "(61) 3773-7495 / (61) 3773-7496",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: creasSource,
  }),

  record({
    id: "samambaia-agencia-trabalhador",
    name: "Agência do Trabalhador de Samambaia",
    category: "trabalho",
    city: "Samambaia",
    address: "QN 303, Conjunto 1, Lote 3, Samambaia Sul",
    phone: "(61) 3773-9367",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Secretaria de Desenvolvimento Econômico, Trabalho e Renda do DF",
    sourceUrl: employmentSource,
  }),
  record({
    id: "samambaia-cras-sul",
    name: "CRAS Samambaia Sul",
    category: "assistencia",
    city: "Samambaia",
    address: "QN 317, Área Especial 2",
    phone: "(61) 3773-7449 / (61) 3773-7450 / (61) 3773-7451 / (61) 3773-7452",
    hours: "Das 8h às 17h; confirmar dias de atendimento",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: crasSource,
    reasons: ["A fonte informa a faixa de horário, mas não especifica os dias"],
  }),
  record({
    id: "samambaia-hospital-regional",
    name: "Hospital Regional de Samambaia — Emergência",
    category: "saude",
    city: "Samambaia",
    address: "QS 614, Conjunto C, Lotes 1/2",
    phone: "(61) 2017-2200",
    hours: "24 horas",
    source: "Secretaria de Saúde do Distrito Federal",
    sourceUrl: "https://saude.df.gov.br/servicos-para-voce-hrsam/",
  }),
  record({
    id: "samambaia-creas",
    name: "CREAS Samambaia",
    category: "assistencia",
    city: "Samambaia",
    address: "QN 419, Área Especial 1, Samambaia Norte",
    phone: "(61) 3773-7513 / (61) 3773-7514",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: creasSource,
  }),

  record({
    id: "plano-piloto-agencia-trabalhador",
    name: "Agência do Trabalhador do Plano Piloto I",
    category: "trabalho",
    city: "Plano Piloto",
    address: "SEPN 511, Bloco A, Térreo, Asa Norte",
    phone: "(61) 3773-9482 / (61) 3773-9470",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Secretaria de Desenvolvimento Econômico, Trabalho e Renda do DF",
    sourceUrl: employmentSource,
  }),
  record({
    id: "plano-piloto-cras-brasilia",
    name: "CRAS Brasília",
    category: "assistencia",
    city: "Plano Piloto",
    address: "Avenida L2 Sul, SGAS 614/615, Asa Sul",
    phone: "(61) 3773-7356 / (61) 3773-7357 / (61) 3773-7358",
    hours: "Das 8h às 18h; confirmar dias de atendimento",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: crasSource,
    reasons: ["A fonte informa a faixa de horário, mas não especifica os dias"],
  }),
  record({
    id: "plano-piloto-hran",
    name: "Hospital Regional da Asa Norte — Pronto-Socorro",
    category: "saude",
    city: "Plano Piloto",
    address: "SMHN, Quadra 101, Bloco A, Área Especial, Asa Norte",
    phone: "(61) 3449-4650 / (61) 3449-4651",
    hours: "24 horas",
    source: "Secretaria de Saúde do Distrito Federal",
    sourceUrl: "https://www.saude.df.gov.br/en/carta-servicos-hran",
  }),
  record({
    id: "plano-piloto-creas-brasilia",
    name: "CREAS Brasília",
    category: "assistencia",
    city: "Plano Piloto",
    address: "SGAS 614/615, Lote 104, Asa Sul",
    phone: "(61) 3773-7489 / (61) 3773-7490",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: creasSource,
  }),

  record({
    id: "planaltina-agencia-trabalhador",
    name: "Agência do Trabalhador de Planaltina",
    category: "trabalho",
    city: "Planaltina",
    address: "Avenida Uberdan Cardoso, Quadra 101, Área Especial, Administração Regional",
    phone: "(61) 3773-9595 / (61) 3773-9366",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Secretaria de Desenvolvimento Econômico, Trabalho e Renda do DF",
    sourceUrl: employmentSource,
  }),
  record({
    id: "planaltina-cras",
    name: "CRAS Planaltina",
    category: "assistencia",
    city: "Planaltina",
    address: "Área Especial H, Lote 6, Setor Educacional",
    phone: "(61) 3773-7419 / (61) 3773-7420 / (61) 3773-7421",
    hours: "Das 8h às 18h; confirmar dias de atendimento",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: crasSource,
    reasons: ["A fonte informa a faixa de horário, mas não especifica os dias"],
  }),
  record({
    id: "planaltina-hospital-regional",
    name: "Hospital Regional de Planaltina — Pronto-Socorro",
    category: "saude",
    city: "Planaltina",
    address: "Avenida WL4, Área Especial, Setor Hospitalar",
    phone: "(61) 3449-5753",
    hours: "24 horas",
    source: "Secretaria de Saúde do Distrito Federal",
    sourceUrl: "https://www.saude.df.gov.br/hospital-regional-de-planaltina",
  }),
  record({
    id: "planaltina-creas",
    name: "CREAS Planaltina",
    category: "assistencia",
    city: "Planaltina",
    address: "Área Especial H, Lote 6, Setor Central",
    phone: "(61) 3773-7510 / (61) 3773-7511",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: creasSource,
  }),

  record({
    id: "taguatinga-agencia-trabalhador",
    name: "Agência do Trabalhador de Taguatinga",
    category: "trabalho",
    city: "Taguatinga",
    address: "C 4, Lote 3, Avenida das Palmeiras, Taguatinga Centro",
    phone: "(61) 3773-9499",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Secretaria de Desenvolvimento Econômico, Trabalho e Renda do DF",
    sourceUrl: employmentSource,
  }),
  record({
    id: "taguatinga-cras",
    name: "CRAS Taguatinga",
    category: "assistencia",
    city: "Taguatinga",
    address: "QNG 27, Área Especial 4",
    phone: "(61) 3773-7469 / (61) 3773-7470 / (61) 3773-7471",
    hours: "Das 8h às 18h; confirmar dias de atendimento",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: crasSource,
    reasons: ["A fonte informa a faixa de horário, mas não especifica os dias"],
  }),
  record({
    id: "taguatinga-hospital-regional",
    name: "Hospital Regional de Taguatinga — Urgência e Emergência",
    category: "saude",
    city: "Taguatinga",
    address: "Setor C Norte, Área Especial 24, Taguatinga Norte",
    phone: "(61) 3449-6534 / (61) 3449-6535",
    hours: "24 horas",
    source: "Secretaria de Saúde do Distrito Federal",
    sourceUrl: "https://www.saude.df.gov.br/hospital-de-taguatinga",
  }),
  record({
    id: "taguatinga-creas",
    name: "CREAS Taguatinga",
    category: "assistencia",
    city: "Taguatinga",
    address: "Área Especial 9, Setor D Sul, Taguatinga Sul",
    phone: "(61) 3773-7519",
    source: "Secretaria de Desenvolvimento Social do Distrito Federal",
    sourceUrl: creasSource,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("df-curated-"))
  .concat(distritoFederal);

portal.meta.updated = "2026-06-29";
portal.meta.coverage.distritoFederal = {
  cities: [
    "Ceilândia",
    "Samambaia",
    "Plano Piloto",
    "Planaltina",
    "Taguatinga",
  ],
  territorialUnit: "Regiões administrativas",
  selection:
    "Cinco regiões administrativas mais populosas na projeção oficial de 2025 do IPEDF",
  source:
    "https://www.ipe.df.gov.br/documents/d/ipedf/estudo-projecoes-populacionais-para-as-regioes-administrativas-do-distrito-federal-2020-2030-resultados-pdf",
  records: distritoFederal.length,
  verified: "2026-06-29",
};

const unique = (values) => new Set(values.filter(Boolean)).size;
portal.meta.stats = {
  total: portal.services.length,
  withPhone: portal.services.filter((service) => service.contactConfirmed).length,
  withSource: portal.services.filter((service) => service.sourceRegistered).length,
  urgent: portal.services.filter((service) => service.priority === "Urgente").length,
  states: unique(portal.services.map((service) => service.uf)),
  cities: unique(
    portal.services.map((service) =>
      `${service.uf}|${service.city}`.toLocaleLowerCase("pt-BR"),
    ),
  ),
  updated: "2026-06-29",
};

fs.writeFileSync(jsonPath, `${JSON.stringify(portal, null, 2)}\n`, "utf8");
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      distritoFederalRecords: distritoFederal.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
