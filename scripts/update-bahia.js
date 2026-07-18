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
    id: `ba-curated-${id}`,
    name,
    category,
    region: "Nordeste",
    uf: "BA",
    state: "Bahia",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - BA`,
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

const sacPhoneReason = [
  "A central geral do SAC não foi cadastrada como telefone direto da unidade",
];
const defensoriaInterior =
  "https://www.defensoria.ba.def.br/wp-content/uploads/2025/05/relacao-de-lotacao-de-defensores-no-interior-2025.pdf";
const cram = "https://www.ba.gov.br/mulheres/7119/crams";

const bahia = [
  record({
    id: "salvador-sac-liberdade",
    name: "Posto SAC Liberdade",
    category: "outros",
    city: "Salvador",
    address:
      "Estrada da Liberdade (antiga Lima e Silva), s/n, Shopping Liberdade, 3º piso, Liberdade",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SAC — Governo da Bahia",
    sourceUrl: "https://www.sac.ba.gov.br/unidades/1572",
    reasons: sacPhoneReason,
  }),
  record({
    id: "salvador-defensoria-pop-rua",
    name: "Defensoria Pública — Núcleo Pop Rua",
    category: "outros",
    city: "Salvador",
    address: "Rua Pedro Lessa, 123, Canela",
    phone: "129",
    source: "Defensoria Pública do Estado da Bahia",
    sourceUrl:
      "https://www.defensoria.ba.def.br/wp-content/uploads/2019/06/sanitize_220721-050720.pdf",
  }),
  record({
    id: "salvador-hge",
    name: "Hospital Geral do Estado — HGE",
    category: "saude",
    city: "Salvador",
    address: "Avenida Vasco da Gama, s/n, Vasco da Gama",
    phone: "(71) 3117-5876 / 3117-5879",
    source: "Secretaria da Saúde do Estado da Bahia",
    sourceUrl:
      "https://www.saude.ba.gov.br/hospital/hospital-geral-do-estado/",
  }),
  record({
    id: "salvador-cram-loreta-valadares",
    name: "Centro de Referência Loreta Valadares de Atendimento à Mulher",
    category: "acolhimento",
    city: "Salvador",
    address: "Avenida Tancredo Neves, Caminho das Árvores",
    phone: "(71) 3202-7396 / (71) 99972-6638",
    source: "Secretaria de Políticas para as Mulheres da Bahia",
    sourceUrl: cram,
  }),
  record({
    id: "feira-sac-centro",
    name: "Posto SAC Feira I — Centro",
    category: "outros",
    city: "Feira de Santana",
    address: "Rua Desembargador Filinto Bastos, 450, Centro",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "SAC — Governo da Bahia",
    sourceUrl: "https://www.sac.ba.gov.br/unidades/1585",
    reasons: sacPhoneReason,
  }),
  record({
    id: "feira-defensoria",
    name: "Defensoria Pública — Feira de Santana",
    category: "outros",
    city: "Feira de Santana",
    address: "Avenida Maria Quitéria, 1235, Centro",
    phone: "(75) 3614-8355 / 3614-6963",
    source: "Defensoria Pública do Estado da Bahia",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "feira-hgca",
    name: "Hospital Geral Clériston Andrade",
    category: "saude",
    city: "Feira de Santana",
    address: "Avenida Eduardo Fróes da Mota, s/n, 35º BI",
    phone: "(75) 3221-6789 / 3602-3300",
    source: "Secretaria da Saúde do Estado da Bahia",
    sourceUrl: "https://www.saude.ba.gov.br/hospital/hgca/",
  }),
  record({
    id: "feira-cram-maria-quiteria",
    name: "Centro de Referência Especializado de Atendimento à Mulher Maria Quitéria",
    category: "acolhimento",
    city: "Feira de Santana",
    address: "Rua Paris, 97, Santa Mônica",
    phone: "(75) 99968-4321",
    source: "Secretaria de Políticas para as Mulheres da Bahia",
    sourceUrl: cram,
  }),
  record({
    id: "vitoria-sac-conquista-ii",
    name: "Posto SAC Conquista II — Boulevard Shopping",
    category: "outros",
    city: "Vitória da Conquista",
    address: "Avenida Olívia Flores, 2500, Boulevard Shopping, 1º piso, Zona Leste",
    hours: "Segunda a sexta, das 9h às 18h",
    source: "SAC — Governo da Bahia",
    sourceUrl: "https://www.sac.ba.gov.br/unidades/1583",
    reasons: sacPhoneReason,
  }),
  record({
    id: "vitoria-defensoria",
    name: "Defensoria Pública — Sede Valdemir Pina",
    category: "outros",
    city: "Vitória da Conquista",
    address: "Loteamento Itamaraty, Rua Rio Doce, 2294, Candeias",
    phone: "(77) 3229-2050",
    source: "Defensoria Pública do Estado da Bahia",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "vitoria-hgvc",
    name: "Hospital Geral de Vitória da Conquista",
    category: "saude",
    city: "Vitória da Conquista",
    address: "Avenida Filipinas, s/n, Jardim Guanabara",
    phone: "(77) 3427-4606",
    source: "Secretaria da Saúde do Estado da Bahia",
    sourceUrl:
      "https://www.saude.ba.gov.br/hospital/hospital-geral-de-vitoria-da-conquista/",
  }),
  record({
    id: "vitoria-crav-albertina",
    name: "Centro de Referência da Mulher Albertina Vasconcelos",
    category: "acolhimento",
    city: "Vitória da Conquista",
    address: "Rua Jesiel Norberto, 40, Candeias",
    phone: "(77) 3424-5325 / (77) 98856-5171 / (77) 99206-5602",
    source: "Secretaria de Políticas para as Mulheres da Bahia",
    sourceUrl: cram,
  }),
  record({
    id: "camacari-sac",
    name: "Posto SAC Camaçari",
    category: "outros",
    city: "Camaçari",
    address: "Rodovia BA-535 (Via Parafuso), s/n, Boulevard Shopping, 1º piso, Industrial",
    hours: "Segunda a sexta, das 9h às 18h; sábado, das 9h às 13h",
    source: "SAC — Governo da Bahia",
    sourceUrl: "https://www.sac.ba.gov.br/unidades/1568",
    reasons: sacPhoneReason,
  }),
  record({
    id: "camacari-defensoria",
    name: "Defensoria Pública — Camaçari",
    category: "outros",
    city: "Camaçari",
    address: "Rua Monte Gordo, 63, Bela Vista",
    phone: "(71) 3622-6478 / 3627-4561",
    source: "Defensoria Pública do Estado da Bahia",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "camacari-hospital-geral",
    name: "Hospital Geral de Camaçari",
    category: "saude",
    city: "Camaçari",
    address: "Avenida Jorge Amado, s/n, Jardim Limoeiro",
    phone: "(71) 3621-2277 / 3621-7375 / 3621-2013 / 3621-8493",
    source: "Secretaria da Saúde do Estado da Bahia",
    sourceUrl: "https://www.saude.ba.gov.br/hospital/hospitalcamacari/",
  }),
  record({
    id: "camacari-cram-yolanda-pires",
    name: "Centro de Referência da Mulher Yolanda Pires",
    category: "acolhimento",
    city: "Camaçari",
    address: "Rua do Ambrósio, s/n, Dois de Julho",
    phone: "(71) 3627-2481",
    source: "Secretaria de Políticas para as Mulheres da Bahia",
    sourceUrl: cram,
  }),
  record({
    id: "juazeiro-sac",
    name: "Posto SAC Juazeiro",
    category: "outros",
    city: "Juazeiro",
    address: "Rodovia BR-407, km 5, 5318, Juá Garden Shopping, piso 1",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SAC — Governo da Bahia",
    sourceUrl: "https://www.sac.ba.gov.br/unidades/1593",
    reasons: sacPhoneReason,
  }),
  record({
    id: "juazeiro-defensoria",
    name: "Defensoria Pública — Juazeiro",
    category: "outros",
    city: "Juazeiro",
    address: "Rua do Paraíso, 306, Santo Antônio",
    phone: "(74) 3162-1079 / (71) 99952-9265",
    source: "Defensoria Pública do Estado da Bahia",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "juazeiro-hospital-regional",
    name: "Hospital Regional de Juazeiro",
    category: "saude",
    city: "Juazeiro",
    address: "Travessa do Hospital, s/n, Santo Antônio",
    phone: "(74) 3612-7808 / 3612-5625 / 3612-1441 / 3612-4144",
    source: "Secretaria da Saúde do Estado da Bahia",
    sourceUrl:
      "https://www.saude.ba.gov.br/hospital/hospital-regional-de-juazeiro/",
  }),
  record({
    id: "juazeiro-ciam",
    name: "Centro Integrado de Atendimento à Mulher — CIAM",
    category: "acolhimento",
    city: "Juazeiro",
    address: "Avenida Luís Inácio Lula da Silva, s/n, Maria Gorete",
    phone: "(74) 3614-2028 / (74) 98856-3393 / (74) 98809-5753",
    source: "Secretaria de Políticas para as Mulheres da Bahia",
    sourceUrl: cram,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ba-curated-"))
  .concat(bahia);

portal.meta.updated = "2026-06-28";
portal.meta.coverage.bahia = {
  cities: [
    "Salvador",
    "Feira de Santana",
    "Vitória da Conquista",
    "Camaçari",
    "Juazeiro",
  ],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: bahia.length,
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
      bahiaRecords: bahia.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
