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
    id: `go-curated-${id}`,
    name,
    category,
    region: "Centro-Oeste",
    uf: "GO",
    state: "Goiás",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - GO`,
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

const goianiaTrabalhoSource =
  "https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-desenvolvimento-economico-trabalho-ciencia-e-tecnologia/";
const goianiaCrasSource =
  "https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-assistencia-social/secretaria-municipal-de-assistencia-social-2-2-2-2-2-2-3-2/cras-colorado/";
const goianiaUpaSource =
  "https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-saude/unidade-de-pronto-atendimento/upa-joao-batista-de-sousa-junior-itaipu/";
const goianiaServicosSource = "https://www.goiania.go.gov.br/servicos/";

const aparecidaSineSource =
  "https://aparecida.go.gov.br/sine-aparecida-realiza-selecao-para-225-vagas-de-emprego-a-partir-desta-terca-feira-29";
const aparecidaCrasSource =
  "https://aparecida.go.gov.br/assistencia-social-inaugura-cras-no-madre-germana-na-proxima-quarta-feira-1o-de-maio";
const aparecidaUpaSource =
  "https://aparecida.go.gov.br/prefeitura-de-aparecida-anuncia-reforma-geral-da-upa-brasicon-sem-interromper-atendimentos";
const aparecidaProconSource =
  "https://aparecida.go.gov.br/procon-oferece-diversos-atendimentos-nesta-quinta12";

const anapolisSineSource =
  "https://www.anapolis.go.gov.br/sine-anapolis-passa-a-funcionar-no-rapido-do-anashopping-a-partir-de-sexta-19-unidade-central-e-desativada/";
const anapolisCrasSource =
  "https://www.anapolis.go.gov.br/secretaria/secretaria-municipal-de-integracao-assistencia-social-cultura-esporte-trabalho-emprego-e-renda/cras-leste/";
const anapolisUpaSource =
  "https://www.anapolis.go.gov.br/com-instalacao-da-upa-no-antigo-hospital-municipal-alfredo-abrahao-volta-atender-perfil-habitual-de-traumas-e-queimaduras/";
const anapolisProconSource =
  "https://www.anapolis.go.gov.br/procon-anapolis-divulga-ranking-de-empresas-com-maior-numero-de-reclamacoes/";

const aguasServicosSource = "https://aguaslindasdegoias.go.gov.br/servicos/";
const aguasCrasSource =
  "https://aguaslindasdegoias.go.gov.br/estrutura/secretaria-de-assistencia-social-cidadania-e-juventude/centro-de-referencia-da-assistencia-social-cras-i-jardim-brasilia/";
const aguasUpaSource =
  "https://aguaslindasdegoias.go.gov.br/estrutura/secretaria-de-saude-2/upa/";
const aguasProconSource =
  "https://aguaslindasdegoias.go.gov.br/estrutura/secretaria-de-economia/procon/";

const rioVerdeSineSource =
  "https://www.rioverde.go.gov.br/download/sistema-nacional-de-emprego-sine/";
const rioVerdeCrasSource =
  "https://www.rioverde.go.gov.br/estrutura/secretaria-de-assistencia-social/superintendencia-tecnica/cras-regiao-norte-centro-de-referencia-da-assistencia-social/";
const rioVerdeUpaSource =
  "https://www.rioverde.go.gov.br/estrutura/secretaria-de-saude/upa-1-unidade-de-pronto-atendimento-dr-jose-povoa-mendes/";
const rioVerdeProconSource = "https://www.rioverde.go.gov.br/estrutura/procon/";

const goias = [
  record({
    id: "goiania-desenvolvimento-trabalho",
    name: "Secretaria Municipal de Desenvolvimento, Indústria, Comércio, Agricultura e Serviços",
    category: "trabalho",
    city: "Goiânia",
    address: "Avenida do Cerrado, nº 999, Park Lozandes",
    phone: "(62) 3416-6565",
    hours: "Segunda à sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Goiânia",
    sourceUrl: goianiaTrabalhoSource,
    reasons: [
      "Canal institucional municipal de desenvolvimento e trabalho; serviço específico de SINE deve ser confirmado antes do deslocamento",
    ],
  }),
  record({
    id: "goiania-cras-colorado",
    name: "CRAS Colorado",
    category: "assistencia",
    city: "Goiânia",
    address: "Avenida, Qd. 21, Lt. 09, Jardim Colorado",
    phone: "(62) 99207-5964",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura Municipal de Goiânia",
    sourceUrl: goianiaCrasSource,
    reasons: [
      "A fonte oficial publica o endereço como Avenida, quadra e lote, sem nome completo da via",
    ],
  }),
  record({
    id: "goiania-upa-itaipu",
    name: "UPA João Batista de Sousa Júnior — Itaipú",
    category: "saude",
    city: "Goiânia",
    address: "Av. Rio Vermelho, esquina com R-1-19, Qd. 14, Residencial Itaipú",
    phone: "(62) 3030-4118 / (62) 3030-2995 / (62) 3030-2996",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Goiânia",
    sourceUrl: goianiaUpaSource,
  }),
  record({
    id: "goiania-servicos-cidadao",
    name: "Serviços ao Cidadão de Goiânia",
    category: "outros",
    city: "Goiânia",
    address: "Avenida do Cerrado, nº 999, Park Lozandes",
    phone: "(62) 3416-6565",
    hours: "Segunda à sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Goiânia",
    sourceUrl: goianiaServicosSource,
    reasons: [
      "Canal geral para orientar o cidadão; unidade específica deve ser escolhida conforme o serviço necessário",
    ],
  }),

  record({
    id: "aparecida-sine",
    name: "SINE Aparecida",
    category: "trabalho",
    city: "Aparecida de Goiânia",
    address: "Rua Abraão Lourenço de Carvalho, quadra 20, lote 4, Setor Central",
    phone: "(62) 3545-5002",
    hours: "Atendimento regular a confirmar no canal oficial",
    source: "Prefeitura Municipal de Aparecida de Goiânia",
    sourceUrl: aparecidaSineSource,
    reasons: [
      "A fonte oficial confirma endereço e telefone, mas publica horário de ação específica, não expediente regular completo",
    ],
  }),
  record({
    id: "aparecida-cras-madre-germana",
    name: "CRAS Madre Germana",
    category: "assistencia",
    city: "Aparecida de Goiânia",
    address: "Avenida Silva Gomes de Melo, quadra 34, lote 04, Madre Germana",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Aparecida de Goiânia",
    sourceUrl: aparecidaCrasSource,
    reasons: [
      "A fonte oficial confirma a unidade e informa funcionamento de segunda a sexta, mas não publica horário integral",
    ],
  }),
  record({
    id: "aparecida-upa-brasicon",
    name: "UPA Brasicon",
    category: "saude",
    city: "Aparecida de Goiânia",
    address: "Setor Brasicon",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Aparecida de Goiânia",
    sourceUrl: aparecidaUpaSource,
    reasons: [
      "A fonte oficial confirma a UPA e a continuidade dos atendimentos durante reforma, mas não publica endereço completo nem telefone direto",
    ],
  }),
  record({
    id: "aparecida-procon",
    name: "Procon Aparecida — atendimento ao consumidor",
    category: "outros",
    city: "Aparecida de Goiânia",
    address: "Rua Gervásio Pinheiro, APM, Residencial Solar Central Park",
    phone: "(62) 3545-5800 / (62) 3545-5801",
    hours: "08h às 11h30 e 13h às 17h30",
    source: "Prefeitura Municipal de Aparecida de Goiânia",
    sourceUrl: aparecidaProconSource,
    reasons: [
      "Fonte oficial consultada confirma ações do Procon; endereço e telefone são do canal institucional municipal",
    ],
  }),

  record({
    id: "anapolis-sine-rapido-anashopping",
    name: "SINE Anápolis — Rápido do Anashopping",
    category: "trabalho",
    city: "Anápolis",
    address: "Av. Universitária, nº 2221, Vila Santa Isabel",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal de Anápolis",
    sourceUrl: anapolisSineSource,
  }),
  record({
    id: "anapolis-cras-leste-i",
    name: "CRAS Leste I",
    category: "assistencia",
    city: "Anápolis",
    address: "Av. JK, Qd. 12, s/n, Jardim Alvorada, Praça CEU Jardim Alvorada",
    phone: "0800 646 1121 - ramal 1604",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Anápolis",
    sourceUrl: anapolisCrasSource,
  }),
  record({
    id: "anapolis-upa-alair-mafra",
    name: "UPA 24h Alair Mafra — antigo Hospital Municipal Jamel Cecílio",
    category: "saude",
    city: "Anápolis",
    address: "Rua Estrela do Sul, Vila Jussara",
    hours: "Funcionamento ininterrupto",
    source: "Prefeitura Municipal de Anápolis",
    sourceUrl: anapolisUpaSource,
  }),
  record({
    id: "anapolis-procon",
    name: "Procon Anápolis — canal oficial",
    category: "outros",
    city: "Anápolis",
    address: "Rua Cap. Silvério, 01, Vila Santana",
    phone: "(62) 3902-2541 / (62) 3902-2637",
    hours: "Segunda a sexta, das 8h às 12h e das 14h às 18h",
    source: "Prefeitura Municipal de Anápolis",
    sourceUrl: anapolisProconSource,
    reasons: [
      "Página oficial consultada confirma atuação do Procon; contato usado é o canal institucional municipal",
    ],
  }),

  record({
    id: "aguas-lindas-servicos-trabalho",
    name: "Serviços Municipais de Águas Lindas — trabalho e atendimento ao cidadão",
    category: "trabalho",
    city: "Águas Lindas de Goiás",
    address: "Área Especial 4, Avenida 02, Jardim Querência",
    phone: "(61) 99303-9204",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Águas Lindas de Goiás",
    sourceUrl: aguasServicosSource,
    reasons: [
      "SINE municipal específico não foi localizado na fonte oficial; registro mantém canal oficial de serviços para encaminhamento",
    ],
  }),
  record({
    id: "aguas-lindas-cras-jardim-brasilia",
    name: "CRAS I — Jardim Brasília",
    category: "assistencia",
    city: "Águas Lindas de Goiás",
    address: "Quadra 53, Lote 1B, Jardim Brasília",
    phone: "(61) 99294-2109",
    hours: "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    source: "Prefeitura Municipal de Águas Lindas de Goiás",
    sourceUrl: aguasCrasSource,
  }),
  record({
    id: "aguas-lindas-upa",
    name: "UPA Mansões Odisseia",
    category: "saude",
    city: "Águas Lindas de Goiás",
    address: "Quadra 3B, Lote 1/3, Mansões Odisseia",
    phone: "(61) 3618-1602",
    hours: "24h",
    source: "Prefeitura Municipal de Águas Lindas de Goiás",
    sourceUrl: aguasUpaSource,
  }),
  record({
    id: "aguas-lindas-procon",
    name: "Procon Águas Lindas",
    category: "outros",
    city: "Águas Lindas de Goiás",
    address: "Quadra 18, Lote 29, Jardim Brasília",
    phone: "(61) 99305-4851",
    hours: "Segunda a sexta-feira, das 8h às 12h e das 13h às 17h",
    source: "Prefeitura Municipal de Águas Lindas de Goiás",
    sourceUrl: aguasProconSource,
  }),

  record({
    id: "rio-verde-sine",
    name: "Sistema Nacional de Emprego — SINE Rio Verde",
    category: "trabalho",
    city: "Rio Verde",
    address: "Rua RG 12, Lt. APM-9, Qd. 41, Residencial Gameleira II",
    phone: "(64) 3602-8000",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Rio Verde",
    sourceUrl: rioVerdeSineSource,
    reasons: [
      "Fonte oficial identifica o serviço do SINE; endereço e telefone usados são do canal institucional municipal para confirmação",
    ],
  }),
  record({
    id: "rio-verde-cras-regiao-norte",
    name: "CRAS Região Norte",
    category: "assistencia",
    city: "Rio Verde",
    address: "Avenida Quero-quero, s/n, Bairro Céu Azul",
    phone: "(64) 98160-0798 / (64) 3620-2174",
    hours: "Segunda a sexta, das 8h às 11h e das 13h às 17h30",
    source: "Prefeitura Municipal de Rio Verde",
    sourceUrl: rioVerdeCrasSource,
  }),
  record({
    id: "rio-verde-upa-dr-jose-povoa-mendes",
    name: "UPA 1 — Dr. José Povoa Mendes",
    category: "saude",
    city: "Rio Verde",
    address: "Rua Augusta Bastos, nº 1900, Centro",
    phone: "(64) 3620-2040",
    hours: "Segunda a sexta, das 7h às 18h; confirmar atendimento assistencial no canal oficial",
    source: "Prefeitura Municipal de Rio Verde",
    sourceUrl: rioVerdeUpaSource,
    reasons: [
      "A página oficial publica horário administrativo; confirmar fluxo de pronto atendimento antes do deslocamento",
    ],
  }),
  record({
    id: "rio-verde-procon",
    name: "Procon Rio Verde",
    category: "outros",
    city: "Rio Verde",
    address: "Rua Costa Gomes, nº 829, Centro",
    phone: "(64) 3602-8614",
    hours: "Segunda a sexta, das 7h às 17h",
    source: "Prefeitura Municipal de Rio Verde",
    sourceUrl: rioVerdeProconSource,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("go-curated-"))
  .concat(goias);

portal.meta.updated = "2026-06-29";
portal.meta.coverage.goias = {
  cities: [
    "Goiânia",
    "Aparecida de Goiânia",
    "Anápolis",
    "Águas Lindas de Goiás",
    "Rio Verde",
  ],
  selection:
    "Cinco municípios mais populosos de Goiás segundo as Estimativas da População 2025 do IBGE/SIDRA",
  source: ibgePopulationSource,
  records: goias.length,
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
      goiasRecords: goias.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
