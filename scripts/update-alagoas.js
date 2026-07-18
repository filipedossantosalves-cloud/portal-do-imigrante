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
    id: `al-curated-${id}`,
    name,
    category,
    region: "Nordeste",
    uf: "AL",
    state: "Alagoas",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - AL`,
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

const hospitals = "https://www.saude.al.gov.br/hospitais/";
const caps =
  "https://www.saude.al.gov.br/sesau-reforca-compromisso-com-luta-antimanicomial-e-a-promocao-da-saude-mental-em-alagoas/";
const ja = "https://ja.al.gov.br/duvidas";

const alagoas = [
  record({
    id: "maceio-hge",
    name: "Hospital Geral do Estado — HGE",
    category: "saude",
    city: "Maceió",
    address: "Avenida Siqueira Campos, 2095, Trapiche da Barra",
    phone: "(82) 3315-3281",
    hours: "24 horas",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl: hospitals,
  }),
  record({
    id: "maceio-centro-pop-jaragua",
    name: "Centro POP I — Jaraguá",
    category: "acolhimento",
    city: "Maceió",
    address: "Avenida da Paz, 1002, Jaraguá",
    phone: "(82) 3312-5931",
    hours: "Segunda a sexta, das 8h às 16h; refeições nos finais de semana",
    source: "Prefeitura de Maceió",
    sourceUrl:
      "https://maceio.al.gov.br/noticias/semdes/centro-pop-oferece-oportunidades-para-pessoas-em-situacao-de-rua-na-capital",
  }),
  record({
    id: "maceio-cras-area-lagunar",
    name: "CRAS Área Lagunar",
    category: "assistencia",
    city: "Maceió",
    address: "Rua Agnelo Barbosa, 527, Prado",
    phone: "(82) 3312-5945",
    source: "Prefeitura de Maceió",
    sourceUrl: "https://maceio.al.gov.br/p/semdes/cras",
  }),
  record({
    id: "maceio-sine",
    name: "SINE Maceió — Shopping Popular",
    category: "trabalho",
    city: "Maceió",
    address: "Rua do Livramento, 468, 2º piso, Shopping Popular, Centro",
    phone: "0800 082 6205",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Prefeitura de Maceió",
    sourceUrl:
      "https://maceio.al.gov.br/noticias/semtes/secretaria-do-trabalho-oferta-1-583-vagas-de-emprego-por-meio-do-sine-maceio",
  }),
  record({
    id: "arapiraca-emergencia-agreste",
    name: "Hospital de Emergência do Agreste Dr. Daniel Houly",
    category: "saude",
    city: "Arapiraca",
    address: "Rodovia AL-220, km 5, s/n, Senador Arnon de Melo",
    phone: "(82) 3529-2450",
    hours: "24 horas",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl:
      "https://cidadao.saude.al.gov.br/unidades/hospitais/unid-de-emerg-do-agreste/",
  }),
  record({
    id: "arapiraca-caps-nise",
    name: "CAPS Nise da Silveira",
    category: "saude",
    city: "Arapiraca",
    address: "Rua Vicente Nunes de Albuquerque, 611, Caititus",
    phone: "(82) 3522-1051",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl: caps,
  }),
  record({
    id: "arapiraca-sine",
    name: "SINE Arapiraca",
    category: "trabalho",
    city: "Arapiraca",
    address: "Rua São Francisco, 1234, Ouro Preto",
    phone: "(82) 3522-1902",
    source: "Portal Alagoas Digital — Governo de Alagoas",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/49",
    reasons: ["Expediente publicado apresenta inconsistência entre os dias da semana"],
  }),
  record({
    id: "arapiraca-central-ja",
    name: "Central Já! Arapiraca Garden Shopping",
    category: "outros",
    city: "Arapiraca",
    address: "Rua José Jaílson Nunes, 493, Santa Edwiges",
    hours: "Segunda a sexta, das 8h às 17h; atendimento mediante agendamento",
    source: "Agendamento Já — Governo de Alagoas",
    sourceUrl: ja,
  }),
  record({
    id: "rio-largo-hospital-ib-gatto",
    name: "Hospital Geral Professor Ib Gatto Falcão",
    category: "saude",
    city: "Rio Largo",
    address: "Rua Santo Antônio, s/n, Centro",
    phone: "(82) 3261-2414",
    hours: "24 horas",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl:
      "https://cidadao.saude.al.gov.br/unidades/hospitais/hospital-ib-gatto-falcao/",
  }),
  record({
    id: "rio-largo-defensoria",
    name: "Defensoria Pública — Subsede Rio Largo e Messias",
    category: "outros",
    city: "Rio Largo",
    address:
      "Avenida Presidente Fernando Afonso Collor de Mello, 98, Prefeito Antônio Lins de Souza",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Portal Alagoas Digital — Defensoria Pública",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1285",
  }),
  record({
    id: "rio-largo-tarifa-social-agua",
    name: "Loja Rio Largo — Tarifa Social de Água",
    category: "assistencia",
    city: "Rio Largo",
    address: "Rua Dr. Batista Acioly, 296, Centro",
    phone: "0800 771 0001",
    hours: "Segunda a sexta, das 9h às 17h, exceto feriados",
    source: "Portal Alagoas Digital — BRK Ambiental",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1378",
  }),
  record({
    id: "rio-largo-cisp",
    name: "12º Distrito Policial — CISP Rio Largo",
    category: "outros",
    city: "Rio Largo",
    address: "Travessa Intendente Júlio Calheiro, s/n, Mata do Rolo",
    phone: "(82) 3261-3755",
    hours: "Segunda a sexta, das 8h às 18h",
    source: "Portal Alagoas Digital — Polícia Civil",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/985",
  }),
  record({
    id: "palmeira-sine",
    name: "SINE Palmeira dos Índios",
    category: "trabalho",
    city: "Palmeira dos Índios",
    address:
      "Praça da Independência, s/n, sala 13, Centro Comercial Prefeito Helenildo Ribeiro",
    phone: "(82) 3421-4323",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Portal Alagoas Digital — Governo de Alagoas",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/56",
  }),
  record({
    id: "palmeira-defensoria",
    name: "Defensoria Pública — Palmeira dos Índios",
    category: "outros",
    city: "Palmeira dos Índios",
    address: "Avenida Graciliano Ramos, 179, Paraíso",
    phone: "(82) 3420-1164",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Portal Alagoas Digital — Defensoria Pública",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1274",
  }),
  record({
    id: "palmeira-caps-osvaldo",
    name: "CAPS Dr. Osvaldo Silva",
    category: "saude",
    city: "Palmeira dos Índios",
    address: "Rua Ozório Horácio, s/n, São Francisco",
    phone: "(82) 3421-4420",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl: caps,
  }),
  record({
    id: "palmeira-central-ja",
    name: "Central Já! Palmeira dos Índios",
    category: "outros",
    city: "Palmeira dos Índios",
    address: "Rua Deputado Jota Duarte, s/n, Juca Sampaio",
    hours: "Segunda a sexta, das 8h às 17h; atendimento mediante agendamento",
    source: "Portal Alagoas Digital — Governo de Alagoas",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1474",
  }),
  record({
    id: "marechal-sine",
    name: "SINE Marechal Deodoro",
    category: "trabalho",
    city: "Marechal Deodoro",
    address: "Rua Barão de Alagoas, Centro",
    phone: "(82) 3315-1875",
    source: "Portal Alagoas Digital — Governo de Alagoas",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1164",
    reasons: ["Expediente publicado apresenta inconsistência no horário de terça-feira"],
  }),
  record({
    id: "marechal-defensoria",
    name: "Defensoria Pública — Marechal Deodoro",
    category: "outros",
    city: "Marechal Deodoro",
    address: "Fórum Des. Ernande Lopes Dorvillé, Rodovia Edval Lemos, s/n, José Dias",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Portal Alagoas Digital — Defensoria Pública",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1267",
  }),
  record({
    id: "marechal-identificacao",
    name: "Posto de Identificação de Marechal Deodoro",
    category: "outros",
    city: "Marechal Deodoro",
    address:
      "Rodovia AL-101 Sul, Avenida Dr. Ib Gatto Marinho Falcão, 13, Carajás Home Center, Massagueira",
    phone: "(82) 98727-7205",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Portal Alagoas Digital — Instituto de Identificação",
    sourceUrl: "https://alagoasdigital.al.gov.br/unidade-de-atendimento/1468",
  }),
  record({
    id: "marechal-caps-maria-celia",
    name: "CAPS Dra. Maria Célia de Araújo Sarmento",
    category: "saude",
    city: "Marechal Deodoro",
    address: "Conjunto Liberalino Ribeiro, s/n, Porto Grande",
    phone: "(82) 3263-7588",
    source: "Secretaria de Estado da Saúde de Alagoas",
    sourceUrl: caps,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("al-curated-"))
  .concat(alagoas);

portal.meta.updated = "2026-06-28";
portal.meta.coverage.alagoas = {
  cities: [
    "Maceió",
    "Arapiraca",
    "Rio Largo",
    "Palmeira dos Índios",
    "Marechal Deodoro",
  ],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: alagoas.length,
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
      alagoasRecords: alagoas.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
