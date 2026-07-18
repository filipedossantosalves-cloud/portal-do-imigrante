const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const portal = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const verified = "28/06/2026";

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
    id: `ac-curated-${id}`,
    name,
    category,
    region: "Norte",
    uf: "AC",
    state: "Acre",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - AC`,
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

const stateService = "https://www.ac.gov.br/servico/cadastro-de-trabalhadores";
const rioHospitals =
  "https://portalcgm.riobranco.ac.gov.br/lai/encontre-em-rio-branco/hospital-clinicas/";
const rioCras =
  "https://portalcgm.riobranco.ac.gov.br/lai/encontre-em-rio-branco/assistencia-social2/";
const rioDefesa =
  "https://portalcgm.riobranco.ac.gov.br/lai/institucional/coordenadoria-municipal/";
const cruzeiroAddresses =
  "https://www.cruzeirodosul.ac.gov.br/paginas/endere%C3%A7os-municipais";
const tarauacaAddresses =
  "https://www.tarauaca.ac.gov.br/paginas/endere%C3%A7os-municipais";
const senaAddresses =
  "https://www.senamadureira.ac.gov.br/paginas/endere%C3%A7os-municipais";
const feijoAddresses =
  "https://www.feijo.ac.gov.br/paginas/endere%C3%A7os-municipais";

const acre = [
  record({
    id: "rio-branco-pronto-socorro",
    name: "Pronto-Socorro de Rio Branco",
    category: "saude",
    city: "Rio Branco",
    address: "Rua Isaura Parente, 23, Bosque",
    phone: "(68) 3223-3080",
    hours: "24 horas",
    source: "Prefeitura de Rio Branco — Portal da Transparência",
    sourceUrl: rioHospitals,
  }),
  record({
    id: "rio-branco-cras-sao-francisco",
    name: "CRAS São Francisco",
    category: "assistencia",
    city: "Rio Branco",
    address: "Rua Coronel Alexandrino, 157, Bosque",
    phone: "(68) 3211-2450",
    hours: "Dias úteis, das 8h às 12h e das 14h às 18h",
    source: "Prefeitura de Rio Branco — Portal da Transparência",
    sourceUrl: rioCras,
  }),
  record({
    id: "rio-branco-sine-oca",
    name: "SINE — OCA Rio Branco",
    category: "trabalho",
    city: "Rio Branco",
    address: "Rua Quintino Bocaiúva, 299, Centro",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Governo do Estado do Acre",
    sourceUrl: stateService,
  }),
  record({
    id: "rio-branco-defesa-civil",
    name: "Defesa Civil de Rio Branco",
    category: "outros",
    city: "Rio Branco",
    address: "Rua Carneiro Leão, 120, Betel Vargas",
    phone: "(68) 99985-2018",
    hours: "Emergência: 24 horas; administrativo: das 7h às 14h",
    source: "Prefeitura de Rio Branco — Portal da Transparência",
    sourceUrl: rioDefesa,
  }),
  record({
    id: "cruzeiro-do-sul-sine-oca",
    name: "SINE — OCA Cruzeiro do Sul",
    category: "trabalho",
    city: "Cruzeiro do Sul",
    address: "Rua Rui Barbosa, 267, Centro",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Governo do Estado do Acre",
    sourceUrl: stateService,
  }),
  record({
    id: "cruzeiro-do-sul-creas",
    name: "CREAS Cruzeiro do Sul",
    category: "assistencia",
    city: "Cruzeiro do Sul",
    address: "Rua Morada Feliz, 311, Formoso",
    phone: "(68) 3322-8739",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Cruzeiro do Sul",
    sourceUrl: cruzeiroAddresses,
  }),
  record({
    id: "cruzeiro-do-sul-conselho-tutelar",
    name: "Conselho Tutelar de Cruzeiro do Sul",
    category: "assistencia",
    city: "Cruzeiro do Sul",
    address: "Avenida 28 de Setembro, 264, Morro da Glória",
    phone: "(68) 3322-3737",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Cruzeiro do Sul",
    sourceUrl: cruzeiroAddresses,
  }),
  record({
    id: "cruzeiro-do-sul-caps",
    name: "Centro de Atenção Psicossocial — CAPS",
    category: "saude",
    city: "Cruzeiro do Sul",
    address: "Rua Afonso Pena, s/n, Cohab",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Cruzeiro do Sul — cadastro CNES municipal",
    sourceUrl: cruzeiroAddresses,
  }),
  record({
    id: "tarauaca-cras",
    name: "CRAS Tarauacá",
    category: "assistencia",
    city: "Tarauacá",
    address: "Rua Capitão Hipólito, 22, Triângulo",
    source: "Prefeitura de Tarauacá",
    sourceUrl: tarauacaAddresses,
  }),
  record({
    id: "tarauaca-creas",
    name: "CREAS Tarauacá",
    category: "assistencia",
    city: "Tarauacá",
    address: "Rua Quintino Bocaiúva, 188, Centro",
    source: "Prefeitura de Tarauacá",
    sourceUrl: tarauacaAddresses,
  }),
  record({
    id: "tarauaca-ubs-joao-wanderlei",
    name: "UBS João Wanderlei",
    category: "saude",
    city: "Tarauacá",
    address: "Rua Tancredo Neves, 880, Centro",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Prefeitura de Tarauacá — cadastro CNES municipal",
    sourceUrl: tarauacaAddresses,
  }),
  record({
    id: "tarauaca-ubs-24-de-abril",
    name: "UBS 24 de Abril",
    category: "saude",
    city: "Tarauacá",
    address: "Rua João Pessoa, 1730, Ipepaconha",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Prefeitura de Tarauacá — cadastro CNES municipal",
    sourceUrl: tarauacaAddresses,
  }),
  record({
    id: "sena-madureira-cras",
    name: "CRAS Sena Madureira",
    category: "assistencia",
    city: "Sena Madureira",
    address: "Avenida Avelino Chaves, 575, Centro",
    phone: "(68) 3612-3432",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Sena Madureira",
    sourceUrl: senaAddresses,
  }),
  record({
    id: "sena-madureira-creas",
    name: "CREAS Sena Madureira",
    category: "assistencia",
    city: "Sena Madureira",
    address: "Avenida Avelino Chaves, 1159, Centro",
    phone: "(68) 99248-0157",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Sena Madureira",
    sourceUrl: senaAddresses,
  }),
  record({
    id: "sena-madureira-caps",
    name: "CAPS Abibi Rodrigues Freire",
    category: "saude",
    city: "Sena Madureira",
    address: "Travessa Aeroporto, s/n, Centro",
    phone: "(68) 3612-2631",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Sena Madureira — cadastro CNES municipal",
    sourceUrl: senaAddresses,
  }),
  record({
    id: "sena-madureira-farmacia",
    name: "Farmácia Municipal Aguinaldo Ferreira Chaves",
    category: "saude",
    city: "Sena Madureira",
    address: "Travessa Aeroporto, 513, Centro",
    phone: "(68) 3612-2631",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Sena Madureira — cadastro CNES municipal",
    sourceUrl: senaAddresses,
  }),
  record({
    id: "feijo-cras",
    name: "CRAS Feijó",
    category: "assistencia",
    city: "Feijó",
    address: "Avenida Marechal Deodoro, 1358, Centro",
    phone: "(68) 3463-3253",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 16h",
    source: "Prefeitura de Feijó",
    sourceUrl: feijoAddresses,
  }),
  record({
    id: "feijo-creas",
    name: "CREAS Feijó",
    category: "assistencia",
    city: "Feijó",
    address: "Avenida Plácido de Castro, 672, Centro",
    phone: "(68) 3463-3373",
    hours: "Segunda a sexta, das 7h às 12h e das 14h às 17h",
    source: "Prefeitura de Feijó",
    sourceUrl: feijoAddresses,
  }),
  record({
    id: "feijo-centro-saude-diamantino",
    name: "Centro de Saúde Diamantino Macedo",
    category: "saude",
    city: "Feijó",
    address: "Avenida Presidente Costa e Silva, s/n, Segundo Distrito",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura de Feijó — cadastro CNES municipal",
    sourceUrl: feijoAddresses,
  }),
  record({
    id: "feijo-conselho-tutelar",
    name: "Conselho Tutelar de Feijó",
    category: "assistencia",
    city: "Feijó",
    address: "Rua Presidente Kennedy, s/n, Centro",
    phone: "(68) 3463-2494",
    source: "Prefeitura de Feijó",
    sourceUrl: feijoAddresses,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ac-curated-"))
  .concat(acre);

portal.meta.updated = "2026-06-28";
portal.meta.coverage.acre = {
  cities: ["Rio Branco", "Cruzeiro do Sul", "Tarauacá", "Sena Madureira", "Feijó"],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: acre.length,
  verified: "2026-06-28",
};

const unique = (values) => new Set(values.filter(Boolean)).size;
portal.meta.stats = {
  total: portal.services.length,
  withPhone: portal.services.filter((service) => service.contactConfirmed).length,
  withSource: portal.services.filter((service) => service.sourceRegistered).length,
  urgent: portal.services.filter((service) => service.priority === "Urgente").length,
  states: unique(portal.services.map((service) => service.uf)),
  cities: unique(
    portal.services.map((service) => `${service.uf}|${service.city}`.toLocaleLowerCase("pt-BR")),
  ),
  updated: "2026-06-28",
};

fs.writeFileSync(jsonPath, `${JSON.stringify(portal, null, 2)}\n`, "utf8");
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      acreRecords: acre.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
