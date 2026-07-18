const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const portal = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const verified = "30/06/2026";

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
    id: `ma-curated-${id}`,
    name,
    category,
    region: "Nordeste",
    uf: "MA",
    state: "Maranhão",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - MA`,
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

const ibgePopulationSource =
  "https://apisidra.ibge.gov.br/values/t/6579/n6/all/v/9324/p/2025";

const saoLuisSineSource = "https://trabalho.ma.gov.br/nossas-unidades";
const saoLuisCrasSource =
  "https://www.saoluis.ma.gov.br/portal/carta-servicos/598/";
const redeEstadualSaudeSource =
  "https://www.ma.gov.br/servicos/unidades-de-saude";
const vivaProconSource = "https://sedihpop.ma.gov.br/viva";

const imperatrizSineSource =
  "https://imperatriz.ma.gov.br/noticias/sine-municipal-reforca-atendimento-com-numero-de-whatsapp-e-registra-mais-de-1400-atendimentos-no-primeiro-semestre.html";
const imperatrizCrasSource =
  "https://imperatriz.ma.gov.br/portal/secretaria/centros-de-referencia-de-assistencia-social-em-imperatriz.html";
const imperatrizUpaSource = "https://imperatriz.ma.gov.br/pmi/upa-24h/";
const imperatrizProconSource = "https://imperatriz.ma.gov.br/pmi/procon/";

const ribamarTrabalhoSource =
  "https://www.saojosederibamar.ma.gov.br/abrir_arquivo.aspx?arquivo=%7B14583A65-43AB-CCBA-D3A6-7C6AABCCBBC3%7D.pdf&cdLocal=12";
const ribamarCrasSource =
  "https://aplicacoes.mds.gov.br/sagi/atendimento/adm/lista_preenchimento_cras_unidade.php?p_id_cras=21112000703";
const canaisSaudeMaSource =
  "https://www.saude.ma.gov.br/canais-de-atendimento/";

const timonSineSource = "https://conecta.timon.ma.gov.br/site/servicos/331";
const timonCrasSource = "https://timon.ma.gov.br/?p=341498";
const timonProconSource = "https://timon.ma.gov.br/?p=356773";

const caxiasTrabalhoSource =
  "https://caxias.ma.gov.br/secretarias/secretaria-municipal-trabalho/";
const caxiasCrasSource =
  "https://caxias.ma.gov.br/2025/03/28/novo-centro-de-referencia-da-assistencia-social-do-bacuri-e-entregue-a-populacao/";
const caxiasUpaSource =
  "https://caxias.ma.gov.br/2025/08/04/unidade-de-pronto-atendimento-de-caxias-comemora-09-anos-de-servicos-prestados/";
const caxiasOuvidoriaSource =
  "https://transparencia.caxias.ma.gov.br/secretarias";

const maranhao = [
  record({
    id: "sao-luis-sine",
    name: "SINE São Luís — Dalplaza Center",
    category: "trabalho",
    city: "São Luís",
    address: "Avenida Jerônimo de Albuquerque, nº 619, Cohab Anil I",
    hours: "Segunda a sexta, das 8h às 16h",
    source: "Secretaria de Estado do Trabalho e da Economia Solidária",
    sourceUrl: saoLuisSineSource,
  }),
  record({
    id: "sao-luis-cras-centro",
    name: "CRAS Centro",
    category: "assistencia",
    city: "São Luís",
    address: "Rua Oswaldo Cruz, nº 1291, Diamante",
    phone: "(98) 99120-5128",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de São Luís",
    sourceUrl: saoLuisCrasSource,
  }),
  record({
    id: "sao-luis-upa-cidade-operaria",
    name: "UPA Cidade Operária",
    category: "saude",
    city: "São Luís",
    address: "Avenida Principal, s/n, Cidade Operária",
    phone: "(98) 3247-2393",
    hours: "Atendimento porta aberta, sem agendamento; confirmar horário",
    source: "Governo do Estado do Maranhão",
    sourceUrl: redeEstadualSaudeSource,
    reasons: [
      "A fonte oficial confirma atendimento porta aberta, mas não publica o horário integral da unidade",
    ],
  }),
  record({
    id: "sao-luis-viva-procon-beira-mar",
    name: "Viva/Procon Beira-Mar",
    category: "outros",
    city: "São Luís",
    address: "Avenida Beira-Mar, nº 384, Centro",
    phone: "(98) 3261-5100 / (98) 3261-5121 / 151",
    hours: "Confirmar no canal oficial",
    source: "Secretaria de Estado dos Direitos Humanos e Participação Popular",
    sourceUrl: vivaProconSource,
    reasons: [
      "O canal oficial confirma a unidade e os contatos gerais; o horário específico deve ser confirmado antes do deslocamento",
    ],
  }),

  record({
    id: "imperatriz-sine",
    name: "SINE Municipal de Imperatriz",
    category: "trabalho",
    city: "Imperatriz",
    address:
      "Rua Coriolano Milhomem, s/n, Centro, anexo ao Estádio Frei Epifânio",
    phone: "(99) 98486-5025",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Prefeitura Municipal de Imperatriz",
    sourceUrl: imperatrizSineSource,
  }),
  record({
    id: "imperatriz-cras-bacuri",
    name: "CRAS Bacuri",
    category: "assistencia",
    city: "Imperatriz",
    address: "Rua Santa Rita, nº 993-A, Bacuri",
    phone: "(99) 99141-3056",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Imperatriz",
    sourceUrl: imperatrizCrasSource,
  }),
  record({
    id: "imperatriz-upa-sao-jose",
    name: "UPA 24h São José",
    category: "saude",
    city: "Imperatriz",
    address: "Rua São Domingos, nº 163-221, Parque São José",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Imperatriz",
    sourceUrl: imperatrizUpaSource,
  }),
  record({
    id: "imperatriz-procon",
    name: "Procon Municipal de Imperatriz",
    category: "outros",
    city: "Imperatriz",
    address:
      "Rodovia BR-010, nº 100, Loja A, Jardim São Luís, Shopping Imperial — VIVA",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Imperatriz",
    sourceUrl: imperatrizProconSource,
  }),

  record({
    id: "ribamar-agencia-trabalho",
    name: "Agência do Trabalho e Empreendedorismo",
    category: "trabalho",
    city: "São José de Ribamar",
    address: "Avenida Gonçalves Dias, s/n",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de São José de Ribamar",
    sourceUrl: ribamarTrabalhoSource,
    reasons: [
      "O Diário Oficial confirma a unidade e o endereço em 2024; o expediente regular não foi publicado na fonte consultada",
    ],
  }),
  record({
    id: "ribamar-cras-sede",
    name: "CRAS Sede",
    category: "assistencia",
    city: "São José de Ribamar",
    address: "Rua João Alves Carneiro, s/n, Moropoia",
    hours: "Confirmar no canal oficial",
    source: "Ministério do Desenvolvimento e Assistência Social",
    sourceUrl: ribamarCrasSource,
    reasons: [
      "O sistema federal registra atendimentos da unidade até março de 2026, mas não publica telefone ou horário",
    ],
  }),
  record({
    id: "ribamar-upa-aracagi",
    name: "UPA Araçagi",
    category: "saude",
    city: "São José de Ribamar",
    address: "Avenida Conselheiro Hilton Rodrigues, s/n, Araçagi",
    phone: "(98) 3226-9700 / (98) 3246-1168",
    hours: "Atendimento porta aberta, sem agendamento; confirmar horário",
    source: "Governo do Estado do Maranhão",
    sourceUrl: redeEstadualSaudeSource,
    reasons: [
      "A fonte oficial confirma atendimento porta aberta, mas não publica o horário integral da unidade",
    ],
  }),
  record({
    id: "ribamar-viva-procon-patio-norte",
    name: "Viva/Procon Pátio Norte Shopping",
    category: "outros",
    city: "São José de Ribamar",
    address:
      "Estrada de São José de Ribamar, MA-201, km 5, nº 1000, Saramanta",
    hours: "Segunda a sexta, das 8h às 18h",
    source: "Secretaria de Estado da Saúde do Maranhão",
    sourceUrl: canaisSaudeMaSource,
  }),

  record({
    id: "timon-sine",
    name: "SINE Timon — cadastro e atendimento ao trabalhador",
    category: "trabalho",
    city: "Timon",
    address: "Rua Odilo Costa, nº 48, Centro",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Timon — Conecta Timon",
    sourceUrl: timonSineSource,
    reasons: [
      "O serviço oficial é vinculado à secretaria municipal situada neste endereço; o portal não publica telefone ou expediente específico do SINE",
    ],
  }),
  record({
    id: "timon-cras-parque-piaui",
    name: "CRAS Parque Piauí",
    category: "assistencia",
    city: "Timon",
    address:
      "Avenida Francisco Vitorino de Assunção, Avenida 03, nº 1126, Parque Piauí",
    hours: "Segunda a sexta, das 7h30 às 11h30 e das 13h30 às 17h30",
    source: "Prefeitura Municipal de Timon",
    sourceUrl: timonCrasSource,
  }),
  record({
    id: "timon-upa",
    name: "UPA Timon",
    category: "saude",
    city: "Timon",
    address: "Rua São Sebastião, s/n, Santo Antônio",
    phone: "(99) 3212-4077",
    hours: "Atendimento porta aberta, sem agendamento; confirmar horário",
    source: "Governo do Estado do Maranhão",
    sourceUrl: redeEstadualSaudeSource,
    reasons: [
      "A fonte oficial confirma atendimento porta aberta, mas não publica o horário integral da unidade",
    ],
  }),
  record({
    id: "timon-viva-procon",
    name: "Viva/Procon Timon — Cocais Shopping",
    category: "outros",
    city: "Timon",
    address: "Avenida Piauí, nº 700, lojas 275/276, Centro, Cocais Shopping",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Timon",
    sourceUrl: timonProconSource,
    reasons: [
      "O portal municipal confirma a sede no Cocais Shopping e o horário; o complemento de endereço foi conferido em documento oficial de transparência",
    ],
  }),

  record({
    id: "caxias-secretaria-trabalho",
    name: "Secretaria Municipal de Trabalho",
    category: "trabalho",
    city: "Caxias",
    address: "Avenida Getúlio Vargas, s/n, Centro",
    phone: "(99) 2221-0011 / (99) 2221-0012",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Prefeitura Municipal de Caxias",
    sourceUrl: caxiasTrabalhoSource,
    reasons: [
      "Canal municipal de políticas de emprego e apoio ao trabalhador; atendimento específico deve ser confirmado antes do deslocamento",
    ],
  }),
  record({
    id: "caxias-cras-bacuri",
    name: "CRAS Bacuri",
    category: "assistencia",
    city: "Caxias",
    address: "Avenida da Pedreira, nº 152, Residencial Eugênio Coutinho",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Caxias",
    sourceUrl: caxiasCrasSource,
  }),
  record({
    id: "caxias-upa",
    name: "UPA Caxias 24h",
    category: "saude",
    city: "Caxias",
    address: "Avenida Pirajá, s/n, Pirajá",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Caxias",
    sourceUrl: caxiasUpaSource,
    reasons: [
      "A notícia oficial confirma o atendimento 24h; o endereço foi conferido em documento oficial de transparência do município",
    ],
  }),
  record({
    id: "caxias-ouvidoria",
    name: "Ouvidoria Municipal de Caxias",
    category: "outros",
    city: "Caxias",
    address: "Praça Gonçalves Dias, s/n, Centro",
    phone: "(99) 99107-5046",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Portal da Transparência da Prefeitura de Caxias",
    sourceUrl: caxiasOuvidoriaSource,
    reasons: [
      "Canal oficial para elogios, reclamações, sugestões, críticas e encaminhamento de demandas municipais",
    ],
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ma-curated-"))
  .concat(maranhao);

portal.meta.updated = "2026-06-30";
portal.meta.coverage.maranhao = {
  cities: [
    "São Luís",
    "Imperatriz",
    "São José de Ribamar",
    "Timon",
    "Caxias",
  ],
  selection:
    "Cinco municípios mais populosos do Maranhão segundo as Estimativas da População 2025 do IBGE/SIDRA",
  source: ibgePopulationSource,
  records: maranhao.length,
  verified: "2026-06-30",
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
  updated: "2026-06-30",
};

fs.writeFileSync(jsonPath, `${JSON.stringify(portal, null, 2)}\n`, "utf8");
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      maranhaoRecords: maranhao.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
