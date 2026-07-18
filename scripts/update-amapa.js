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
    id: `ap-curated-${id}`,
    name,
    category,
    region: "Norte",
    uf: "AP",
    state: "Amapá",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - AP`,
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

const defensoria =
  "https://defensoria.ap.def.br/?edp=bWVudQ%3D%3D&nm_icon=&nmpgn=VGVsZWZvbmVzIGUgRW5kZXJlw6dvcw%3D%3D&pgu=NTY%3D";
const ciretrans =
  "https://www.detran.ap.gov.br/detranap/wp-content/uploads/2025/12/EDITAL-N.-001-2025-HABILITA-AMAPA-10-12-2025-assinado.pdf";
const atendimentoMulher =
  "https://apdigital.portal.ap.gov.br/carta-de-servico/acolhimento-e-atendimento27";
const hospitais2025 =
  "https://diofe.portal.ap.gov.br/portal/edicoes/visualizar_pdf/2529/";

const amapa = [
  record({
    id: "macapa-centro-pop",
    name: "Centro POP Macapá",
    category: "acolhimento",
    city: "Macapá",
    address: "Passagem Ana Nery, s/n, Perpétuo Socorro",
    hours: "Sábado, das 9h às 13h; confirmar atendimento nos demais dias",
    source: "Prefeitura de Macapá",
    sourceUrl: "https://macapa.ap.gov.br/centro-pop-amplia-atendimento-para-os-sabados/",
    reasons: ["A fonte consultada informa somente o horário de sábado"],
  }),
  record({
    id: "macapa-cram",
    name: "Centro de Referência de Atendimento à Mulher — CRAM",
    category: "acolhimento",
    city: "Macapá",
    address: "Rua São José, 1500, Centro",
    source: "Amapá Digital — Governo do Amapá",
    sourceUrl: atendimentoMulher,
  }),
  record({
    id: "macapa-hospital-emergencia",
    name: "Hospital de Emergência Dr. Oswaldo Cruz",
    category: "saude",
    city: "Macapá",
    address: "Rua Hamilton Silva, 139, Centro",
    source: "Diário Oficial do Estado do Amapá — Secretaria de Saúde",
    sourceUrl: hospitais2025,
  }),
  record({
    id: "macapa-simer",
    name: "Sistema Municipal de Emprego e Renda — Simer",
    category: "trabalho",
    city: "Macapá",
    address: "Avenida Padre Júlio Maria Lombardi, 1614, Central",
    hours: "Das 8h às 18h; confirmar dias de atendimento",
    source: "Prefeitura de Macapá",
    sourceUrl:
      "https://agencia.macapa.ap.gov.br/simer-prefeitura-de-macapa-conecta-talentos-a-novas-oportunidades/",
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "santana-camuf",
    name: "Centro de Atendimento à Mulher e à Família — CAMUF",
    category: "acolhimento",
    city: "Santana",
    address: "Avenida Santana, 1815 B, Central",
    source: "Amapá Digital — Governo do Amapá",
    sourceUrl: atendimentoMulher,
  }),
  record({
    id: "santana-defensoria",
    name: "Defensoria Pública — Núcleo de Santana",
    category: "outros",
    city: "Santana",
    address: "Avenida Santana, 534, Comercial",
    phone: "(96) 98133-0422",
    source: "Defensoria Pública do Estado do Amapá",
    sourceUrl: defensoria,
  }),
  record({
    id: "santana-super-facil",
    name: "Super Fácil Santana",
    category: "outros",
    city: "Santana",
    address: "Avenida Castelo Branco, 702, Área Comercial",
    source: "Diário Oficial do Estado do Amapá",
    sourceUrl: "https://diofe.portal.ap.gov.br/portal/edicoes/visualizar_pdf/9759/",
  }),
  record({
    id: "santana-hospital-estadual",
    name: "Hospital Estadual de Santana",
    category: "saude",
    city: "Santana",
    address: "Rua Pedro Salvador Diniz, 187, Remédios",
    source: "Diário Oficial do Estado do Amapá — Secretaria de Saúde",
    sourceUrl: hospitais2025,
  }),
  record({
    id: "laranjal-super-facil",
    name: "Super Fácil Laranjal do Jari",
    category: "outros",
    city: "Laranjal do Jari",
    address: "Avenida Tancredo Neves, 2362, Agreste",
    hours: "Das 7h30 às 13h30; confirmar dias de atendimento",
    source: "Agência de Notícias — Governo do Amapá",
    sourceUrl:
      "https://agenciaamapa.com.br/noticia/29821/equipa-super-facil-governador-clecio-luis-estrutura-e-entrega-mobilias-e-equipamentos-para-unidade-do-laranjal-do-jari-no-sul-do-amapa",
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "laranjal-defensoria",
    name: "Defensoria Pública — Núcleo de Laranjal do Jari",
    category: "outros",
    city: "Laranjal do Jari",
    address: "Avenida Tancredo Neves, 2865, Agreste",
    phone: "(96) 98133-0422",
    source: "Defensoria Pública do Estado do Amapá",
    sourceUrl: defensoria,
  }),
  record({
    id: "laranjal-mais-saude-vascular",
    name: "Programa Mais Saúde Vascular",
    category: "saude",
    city: "Laranjal do Jari",
    address: "Avenida João Queiroga, prédio da Defesa Civil, Prosperidade",
    phone: "(96) 2027-0187",
    hours: "Segunda a sábado; confirmar o horário",
    source: "Agência de Notícias — Governo do Amapá",
    sourceUrl:
      "https://agenciaamapa.com.br/noticia/33008/hoje-danco-e-nao-sinto-mais-dor-diz-aposentada-ao-comemorar-tratamento-no-mais-saude-vascular-do-governo-do-amapa",
    reasons: ["A fonte consultada não informa o horário"],
  }),
  record({
    id: "laranjal-ciretran",
    name: "Ciretran Laranjal do Jari",
    category: "outros",
    city: "Laranjal do Jari",
    address: "Rua Niterói, 918, Cajari",
    source: "Detran Amapá",
    sourceUrl: ciretrans,
  }),
  record({
    id: "oiapoque-sine",
    name: "SINE Oiapoque — Super Fácil",
    category: "trabalho",
    city: "Oiapoque",
    address: "Rua Lélio Silva, 220, Centro",
    source: "Diário Oficial do Estado do Amapá — Conselho Estadual do Trabalho",
    sourceUrl: "https://diofe.portal.ap.gov.br/portal/edicoes/visualizar_pdf/9811/",
  }),
  record({
    id: "oiapoque-defensoria",
    name: "Defensoria Pública — Núcleo de Oiapoque",
    category: "outros",
    city: "Oiapoque",
    address: "Avenida Barão do Rio Branco, 200, Centro",
    phone: "(96) 98133-0422",
    source: "Defensoria Pública do Estado do Amapá",
    sourceUrl: defensoria,
  }),
  record({
    id: "oiapoque-ciretran",
    name: "Ciretran Oiapoque",
    category: "outros",
    city: "Oiapoque",
    address: "Rodovia BR-156, 3250, Universidade",
    source: "Detran Amapá",
    sourceUrl: ciretrans,
  }),
  record({
    id: "oiapoque-csa",
    name: "Agência de Atendimento CSA Oiapoque",
    category: "outros",
    city: "Oiapoque",
    address: "Rodovia BR-156, 877, Universidade",
    hours: "Das 8h às 17h; confirmar dias de atendimento",
    source: "CSA Equatorial",
    sourceUrl: "https://csa-equatorial.com.br/contato/unidades-presenciais-de-atendimento/",
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "mazagao-defensoria",
    name: "Defensoria Pública — Núcleo de Mazagão",
    category: "outros",
    city: "Mazagão",
    address: "Rua Coaracy Nunes, 781, União",
    phone: "(96) 98133-0422",
    source: "Defensoria Pública do Estado do Amapá",
    sourceUrl: defensoria,
  }),
  record({
    id: "mazagao-ciretran",
    name: "Ciretran Mazagão",
    category: "outros",
    city: "Mazagão",
    address: "Avenida Veiga Cabral, 421, São Tiago",
    source: "Detran Amapá",
    sourceUrl: ciretrans,
  }),
  record({
    id: "mazagao-ouvidoria",
    name: "Ouvidoria Geral e e-SIC de Mazagão",
    category: "outros",
    city: "Mazagão",
    address: "Rua Presidente Vargas, 101, Centro",
    phone: "(96) 99169-2387",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Prefeitura de Mazagão",
    sourceUrl: "https://www.mazagao.ap.gov.br/ouvidoria",
  }),
  record({
    id: "mazagao-assistencia-social",
    name: "Secretaria Municipal de Assistência Social",
    category: "assistencia",
    city: "Mazagão",
    address: "Rua Presidente Vargas, 200, Centro",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Prefeitura de Mazagão",
    sourceUrl: "https://mazagao.ap.gov.br/secretaria.php",
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ap-curated-"))
  .concat(amapa);

portal.meta.updated = "2026-06-28";
portal.meta.coverage.amapa = {
  cities: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: amapa.length,
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
      amapaRecords: amapa.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
