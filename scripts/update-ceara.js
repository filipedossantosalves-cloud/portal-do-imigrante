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
    id: `ce-curated-${id}`,
    name,
    category,
    region: "Nordeste",
    uf: "CE",
    state: "Ceará",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - CE`,
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

const centralDefensoria = [
  "O telefone 129 é a central estadual, não o contato direto da unidade",
];
const diasIdt = [
  "A página informa a faixa de horário, mas não especifica os dias de atendimento",
];

const ceara = [
  record({
    id: "fortaleza-idt-centro",
    name: "IDT/Sine — Unidade Fortaleza Centro",
    category: "trabalho",
    city: "Fortaleza",
    address: "Rua Assunção, 699, Centro",
    phone: "(85) 2180-6214",
    hours: "Das 7h30 às 16h30; confirmar dias de atendimento",
    source: "Instituto de Desenvolvimento do Trabalho — IDT",
    sourceUrl: "https://www.idt.org.br/onde-estamos/fortaleza-centro",
    reasons: diasIdt,
  }),
  record({
    id: "fortaleza-defensoria-napi",
    name: "Defensoria Pública — Núcleo de Atendimento e Petição Inicial",
    category: "outros",
    city: "Fortaleza",
    address: "Rua Nelson Studart, s/n, Luciano Cavalcante",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Defensoria Pública do Estado do Ceará",
    sourceUrl:
      "https://www.defensoria.ce.def.br/noticia/dpce-lanca-programa-voltado-a-saude-e-qualidade-de-vida-em-parceria-com-o-corpo-de-bombeiros/",
    reasons: centralDefensoria,
  }),
  record({
    id: "fortaleza-ijf",
    name: "Instituto Dr. José Frota — Emergência e Ciatox",
    category: "saude",
    city: "Fortaleza",
    address: "Rua Barão do Rio Branco, 1816, Centro",
    phone: "(85) 3255-5012 / (85) 98439-7494",
    hours: "24 horas",
    source: "Prefeitura de Fortaleza",
    sourceUrl:
      "https://www.fortaleza.ce.gov.br/noticias/ijf-registra-mais-de-80-casos-de-acidentes-com-picadas-de-cobras-em-2025",
  }),
  record({
    id: "fortaleza-centro-pop-benfica",
    name: "Centro POP Benfica",
    category: "assistencia",
    city: "Fortaleza",
    address: "Avenida João Pessoa, 4180, Damas",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura de Fortaleza",
    sourceUrl:
      "https://www.fortaleza.ce.gov.br/noticias/com-capacidade-para-110-mil-atendimentos-prefeitura-entrega-requalificacao-do-centro-pop-benfica-nesta-sexta-feira-22-5",
  }),
  record({
    id: "caucaia-sine",
    name: "SINE Municipal de Caucaia",
    category: "trabalho",
    city: "Caucaia",
    address: "Rua 15 de Novembro, 1478, Centro",
    hours:
      "Segunda a quinta, das 8h às 16h; sexta, das 8h às 15h",
    source: "Prefeitura de Caucaia",
    sourceUrl: "https://www.caucaia.ce.gov.br/cartaservicos.php?id=151",
  }),
  record({
    id: "caucaia-defensoria",
    name: "Defensoria Pública — Núcleo de Caucaia",
    category: "outros",
    city: "Caucaia",
    address: "Avenida Presidente Getúlio Vargas, 384, Centro",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Defensoria Pública do Estado do Ceará",
    sourceUrl:
      "https://www.defensoria.ce.def.br/noticia/defensoria-inaugura-terceira-maior-sede-e-atende-demanda-historica-em-caucaia/",
    reasons: centralDefensoria,
  }),
  record({
    id: "caucaia-upa-centro",
    name: "UPA Centro Luiz Nerys Nunes de Miranda",
    category: "saude",
    city: "Caucaia",
    address: "Rua Tobias Correia, s/n, Centro",
    phone: "(85) 99762-0949",
    hours: "24 horas",
    source: "Prefeitura de Caucaia",
    sourceUrl: "https://caucaia.ce.gov.br/unidadesaude.php?id=261",
  }),
  record({
    id: "caucaia-centro-pop",
    name: "Centro POP Caucaia",
    category: "assistencia",
    city: "Caucaia",
    address: "Rua Pedro Gomes da Rocha, 63, Centro",
    phone: "(85) 98224-6803",
    hours: "Segunda a sexta, das 8h às 16h",
    source: "Prefeitura de Caucaia",
    sourceUrl: "https://caucaia.ce.gov.br/unidadeacaosocial.php?id=247",
  }),
  record({
    id: "juazeiro-idt",
    name: "IDT/Sine — Unidade Juazeiro do Norte",
    category: "trabalho",
    city: "Juazeiro do Norte",
    address: "Rua Interventor Francisco Erivano Cruz, 120, Centro, Vapt Vupt",
    phone: "(85) 2180-6225",
    hours: "Das 8h às 17h; confirmar dias de atendimento",
    source: "Instituto de Desenvolvimento do Trabalho — IDT",
    sourceUrl: "https://www.idt.org.br/onde-estamos/juazeiro_do_norte",
    reasons: diasIdt,
  }),
  record({
    id: "juazeiro-defensoria",
    name: "Defensoria Pública — Núcleo de Juazeiro do Norte",
    category: "outros",
    city: "Juazeiro do Norte",
    address: "Rua Presidente Médici, 631, Lagoa Seca",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Defensoria Pública do Estado do Ceará",
    sourceUrl:
      "https://www.defensoria.ce.def.br/noticia/defensoria-publica-inaugura-ampla-sede-em-juazeiro-do-norte/",
    reasons: centralDefensoria,
  }),
  record({
    id: "juazeiro-hrc",
    name: "Hospital Regional do Cariri",
    category: "saude",
    city: "Juazeiro do Norte",
    address: "Rua Catulo da Paixão Cearense, s/n, Triângulo",
    phone: "(88) 3566-3600",
    hours: "24 horas",
    source: "Instituto de Saúde e Gestão Hospitalar — ISGH",
    sourceUrl:
      "https://www.isgh.org.br/onde-estamos/hospital-regional-do-cariri",
  }),
  record({
    id: "juazeiro-centro-pop",
    name: "Centro POP Juazeiro do Norte",
    category: "assistencia",
    city: "Juazeiro do Norte",
    address: "Avenida Dr. Floro Bartolomeu, 1027-A, Juvêncio Santana",
    hours: "Segunda a sexta, das 7h30 às 12h e das 13h às 16h30",
    source: "Prefeitura de Juazeiro do Norte",
    sourceUrl: "https://www.juazeirodonorte.ce.gov.br/cartaservicos.php?id=79",
  }),
  record({
    id: "maracanau-idt",
    name: "IDT/Sine — Unidade Maracanaú",
    category: "trabalho",
    city: "Maracanaú",
    address: "Avenida Senador Virgílio Távora, 615, Distrito Industrial",
    phone: "(85) 2180-6220",
    hours: "Das 8h às 17h; confirmar dias de atendimento",
    source: "Instituto de Desenvolvimento do Trabalho — IDT",
    sourceUrl: "https://www.idt.org.br/onde-estamos/maracanau",
    reasons: diasIdt,
  }),
  record({
    id: "maracanau-defensoria",
    name: "Defensoria Pública — Núcleo de Maracanaú",
    category: "outros",
    city: "Maracanaú",
    address: "Shopping Feira Center, Avenida 1, 17, Jereissati I",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Defensoria Pública do Estado do Ceará",
    sourceUrl:
      "https://www.defensoria.ce.def.br/noticia/defensoria-em-maracanau-realiza-mais-de-7-mil-atendimentos-nos-ultimos-meses/",
    reasons: centralDefensoria,
  }),
  record({
    id: "maracanau-hospital-municipal",
    name: "Hospital Municipal Dr. João Elísio de Holanda",
    category: "saude",
    city: "Maracanaú",
    address: "Rua João Alencar, s/n, Centro",
    phone: "(85) 3521-5500",
    hours: "24 horas",
    source: "Prefeitura de Maracanaú",
    sourceUrl:
      "https://www.maracanau.ce.gov.br/hospital-municipal-joao-elisio-de-holanda/",
  }),
  record({
    id: "maracanau-centro-pop",
    name: "Centro POP Maracanaú",
    category: "assistencia",
    city: "Maracanaú",
    address: "Avenida X, 244, Jereissati II",
    source: "Prefeitura de Maracanaú",
    sourceUrl: "https://www.maracanau.ce.gov.br/servico/centro-pop/",
  }),
  record({
    id: "sobral-idt",
    name: "IDT/Sine — Unidade Sobral",
    category: "trabalho",
    city: "Sobral",
    address: "Rua Coronel José Silvestre, 201, Centro, Vapt Vupt",
    phone: "(85) 2180-6223",
    hours: "Das 8h às 17h; confirmar dias de atendimento",
    source: "Instituto de Desenvolvimento do Trabalho — IDT",
    sourceUrl: "https://www.idt.org.br/onde-estamos/sobral",
    reasons: diasIdt,
  }),
  record({
    id: "sobral-defensoria",
    name: "Defensoria Pública — Núcleo de Sobral",
    category: "outros",
    city: "Sobral",
    address: "Avenida Monsenhor José Aloísio Pinto, 1200, Dom Expedito",
    phone: "129",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Defensoria Pública do Estado do Ceará",
    sourceUrl:
      "https://www.defensoria.ce.def.br/noticia/defensoria-inaugura-sede-em-sobral-nesta-quinta-feira-47/",
    reasons: centralDefensoria,
  }),
  record({
    id: "sobral-hrn",
    name: "Hospital Regional Norte",
    category: "saude",
    city: "Sobral",
    address: "Avenida John Sanford, 1505, Junco",
    phone: "(88) 3677-9300",
    hours: "24 horas",
    source: "Instituto de Saúde e Gestão Hospitalar — ISGH",
    sourceUrl:
      "https://www.isgh.org.br/onde-estamos/hospital-regional-norte",
  }),
  record({
    id: "sobral-centro-pop",
    name: "Centro POP Sobral",
    category: "assistencia",
    city: "Sobral",
    address: "Avenida Dom José, 2147, Centro",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Secretaria dos Direitos Humanos e Assistência Social de Sobral",
    sourceUrl: "https://sedhas.sobral.ce.gov.br/equipamento/centro-pop",
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ce-curated-"))
  .concat(ceara);

portal.meta.updated = "2026-06-29";
portal.meta.coverage.ceara = {
  cities: [
    "Fortaleza",
    "Caucaia",
    "Juazeiro do Norte",
    "Maracanaú",
    "Sobral",
  ],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: ceara.length,
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
      cearaRecords: ceara.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
