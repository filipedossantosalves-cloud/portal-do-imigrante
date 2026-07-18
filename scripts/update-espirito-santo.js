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
    id: `es-curated-${id}`,
    name,
    category,
    region: "Sudeste",
    uf: "ES",
    state: "Espírito Santo",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - ES`,
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
  "https://cidades.ibge.gov.br/brasil/es/panorama";
const setadesSineSource = "https://setades.es.gov.br/agencias";
const setadesCrasSource = "https://setades.es.gov.br/as/cras";
const serraSineSource =
  "https://www.serra.es.gov.br/noticias/sine-da-serra-realiza-mutirao-com-50-vagas-para-auxiliar-de-logistica-nesta-terca-feira-30";
const serraProconSource = "https://www.serra.es.gov.br/pagina/procon";
const serraAssistenciaSource =
  "https://www.serra.es.gov.br/pagina/assistencia-social";
const serraSaudeSource = "https://www.serra.es.gov.br/pagina/saude";
const vilaVelhaSineSource =
  "https://www.vilavelha.es.gov.br/noticias/2026/06/sine-de-vila-velha-tem-895-vagas-de-emprego-em-oferta-nesta-semana-46592";
const vilaVelhaAssistenciaSource =
  "https://www.vilavelha.es.gov.br/secretaria/assistencia-social";
const vilaVelhaSaudeSource = "https://www.vilavelha.es.gov.br/secretaria/saude";
const vilaVelhaCartaSource =
  "https://transparencia.vilavelha.es.gov.br/CartaServico.Lista.aspx";
const cariacicaAssistenciaSource =
  "https://www.cariacica.es.gov.br/secretaria/ler/6/assistencia-social";
const cariacicaSaudeSource =
  "https://www.cariacica.es.gov.br/pagina/ler/541/unidades-basicas-de-saude-";
const cariacicaProconSource =
  "https://www.cariacica.es.gov.br/pagina/ler/73/procon-municipal";
const vitoriaTrabalhoSource =
  "https://www.vitoria.es.gov.br/semcid/agencia-municipal-do-trabalhador";
const vitoriaAssistenciaSource =
  "https://www.vitoria.es.gov.br/semas/assistencia-as-familias";
const vitoriaSaudeSource =
  "https://www.vitoria.es.gov.br/semus/servico-de-pronto-atendimento-visao-detalhada";
const vitoriaProconSource = "https://www.vitoria.es.gov.br/procon";
const cachoeiroAssistenciaSource =
  "https://www.cachoeiro.es.gov.br/desenvolvimento-social-semdes/";
const cachoeiroSaudeSource = "https://www.cachoeiro.es.gov.br/saude-semus/";
const cachoeiroProconSource = "https://www.cachoeiro.es.gov.br/procon/";

const espiritoSanto = [
  record({
    id: "serra-sine",
    name: "Sine da Serra",
    category: "trabalho",
    city: "Serra",
    address: "Avenida Talma Rodrigues Ribeiro, nº 5.416, Portal de Jacaraípe",
    hours:
      "Atendimento regular a confirmar; notícia oficial informa ação das 8h às 12h",
    source: "Prefeitura Municipal da Serra",
    sourceUrl: serraSineSource,
    reasons: [
      "A fonte confirma a sede do Sine, mas não publica telefone direto nem horário regular completo",
    ],
  }),
  record({
    id: "serra-procon",
    name: "Procon Serra",
    category: "outros",
    city: "Serra",
    address:
      "Avenida Talma Rodrigues Ribeiro, nº 5.416, Portal de Jacaraípe, Pró-Cidadão",
    phone: "(27) 3252-7243",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal da Serra",
    sourceUrl: serraProconSource,
  }),
  record({
    id: "serra-assistencia-social",
    name: "Secretaria de Assistência Social da Serra",
    category: "assistencia",
    city: "Serra",
    address: "Rua Maestro Antônio Cícero, 111, Caçaroca",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal da Serra",
    sourceUrl: serraAssistenciaSource,
    reasons: [
      "Página municipal consultada como canal institucional; unidade territorial de CRAS deve ser confirmada conforme bairro",
    ],
  }),
  record({
    id: "serra-saude",
    name: "Secretaria Municipal de Saúde da Serra",
    category: "saude",
    city: "Serra",
    address: "Rua Maestro Antônio Cícero, 111, Caçaroca",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal da Serra",
    sourceUrl: serraSaudeSource,
    reasons: [
      "Página municipal consultada como canal institucional; pronto atendimento deve ser confirmado conforme necessidade e território",
    ],
  }),

  record({
    id: "vila-velha-sine",
    name: "Sine Municipal de Vila Velha",
    category: "trabalho",
    city: "Vila Velha",
    address: "Boulevard Shopping, Subsolo A, Itaparica",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal de Vila Velha",
    sourceUrl: vilaVelhaSineSource,
  }),
  record({
    id: "vila-velha-assistencia-social",
    name: "Secretaria Municipal de Assistência Social de Vila Velha",
    category: "assistencia",
    city: "Vila Velha",
    address: "Avenida Santa Leopoldina, 840, Coqueiral de Itaparica",
    phone: "(27) 3149-7400",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Vila Velha",
    sourceUrl: vilaVelhaAssistenciaSource,
    reasons: [
      "Telefone e horário são do atendimento institucional publicado no portal municipal",
    ],
  }),
  record({
    id: "vila-velha-saude",
    name: "Secretaria Municipal de Saúde de Vila Velha",
    category: "saude",
    city: "Vila Velha",
    address: "Avenida Santa Leopoldina, 840, Coqueiral de Itaparica",
    phone: "(27) 3149-7400",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Vila Velha",
    sourceUrl: vilaVelhaSaudeSource,
    reasons: [
      "Telefone e horário são do atendimento institucional publicado no portal municipal",
    ],
  }),
  record({
    id: "vila-velha-carta-servicos",
    name: "Carta de Serviços de Vila Velha",
    category: "outros",
    city: "Vila Velha",
    address: "Avenida Santa Leopoldina, 840, Coqueiral de Itaparica",
    phone: "(27) 3149-7400",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Vila Velha — Carta de Serviços",
    sourceUrl: vilaVelhaCartaSource,
    reasons: [
      "Canal geral para localizar serviços como Procon, saúde, assistência e solicitações municipais",
    ],
  }),

  record({
    id: "cariacica-sine-faca-facil",
    name: "Sine Cariacica — Faça Fácil",
    category: "trabalho",
    city: "Cariacica",
    address: "Rodovia Leste-Oeste, nº 154, Santo André",
    phone: "(27) 3636-0047",
    hours:
      "Segunda a sexta-feira, das 8h às 17h; sábado, das 8h às 13h",
    source: "SETADES — Governo do Espírito Santo",
    sourceUrl: setadesSineSource,
  }),
  record({
    id: "cariacica-assistencia-social",
    name: "Secretaria Municipal de Assistência Social de Cariacica",
    category: "assistencia",
    city: "Cariacica",
    address: "Avenida Mário Gurgel, 2.502, Alto Lage",
    phone: "(27) 3354-5900",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Cariacica",
    sourceUrl: cariacicaAssistenciaSource,
    reasons: [
      "Contato institucional; CRAS/CREAS devem ser definidos pelo território de residência",
    ],
  }),
  record({
    id: "cariacica-ubs-alto-lage",
    name: "UBS Alto Lage",
    category: "saude",
    city: "Cariacica",
    address: "Rua Edmilson Varejão, nº 104, Alto Lage",
    phone: "(27) 3354-7012",
    hours: "Segunda a sexta-feira, das 7h às 16h",
    source: "Prefeitura Municipal de Cariacica",
    sourceUrl: cariacicaSaudeSource,
  }),
  record({
    id: "cariacica-procon",
    name: "Procon Municipal de Cariacica",
    category: "outros",
    city: "Cariacica",
    address: "Avenida Alice Coutinho, 109, Vera Cruz",
    phone: "(27) 3354-5130",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Cariacica",
    sourceUrl: cariacicaProconSource,
    reasons: [
      "Contato institucional do Centro Administrativo; confirmar setor antes do deslocamento",
    ],
  }),

  record({
    id: "vitoria-agencia-trabalhador",
    name: "Agência Municipal do Trabalhador de Vitória",
    category: "trabalho",
    city: "Vitória",
    address: "Avenida Maruípe, 2.544, Itararé",
    phone: "(27) 3132-5310",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal de Vitória",
    sourceUrl: vitoriaTrabalhoSource,
  }),
  record({
    id: "vitoria-cras-maria-gloria",
    name: "CRAS Maria da Glória Monteiro Alves",
    category: "assistencia",
    city: "Vitória",
    address: "Avenida Vitória, 1.419, Cruzamento",
    phone: "(27) 3132-8359",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal de Vitória",
    sourceUrl: vitoriaAssistenciaSource,
  }),
  record({
    id: "vitoria-pa-praia-sua",
    name: "Pronto Atendimento Praia do Suá",
    category: "saude",
    city: "Vitória",
    address: "Rua Almirante Tamandaré, 15, Praia do Suá",
    phone: "(27) 3137-2764",
    hours: "Todos os dias, 24 horas",
    source: "Prefeitura Municipal de Vitória",
    sourceUrl: vitoriaSaudeSource,
  }),
  record({
    id: "vitoria-procon",
    name: "Procon Municipal de Vitória",
    category: "outros",
    city: "Vitória",
    address: "Avenida Maruípe, 2.544, 1º piso, Bloco A, Itararé",
    phone: "156",
    hours: "Segunda a sexta-feira, das 8h às 18h",
    source: "Prefeitura Municipal de Vitória",
    sourceUrl: vitoriaProconSource,
    reasons: [
      "Atendimento mediante agendamento pelo portal municipal, aplicativo Procon Vitória ou telefone 156",
    ],
  }),

  record({
    id: "cachoeiro-sine",
    name: "Sine Cachoeiro de Itapemirim",
    category: "trabalho",
    city: "Cachoeiro de Itapemirim",
    address: "Rua Costa Pereira, nº 90, Centro",
    phone: "(28) 99252-4935",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "SETADES — Governo do Espírito Santo",
    sourceUrl: setadesSineSource,
  }),
  record({
    id: "cachoeiro-cras-alto-uniao",
    name: "CRAS Alto União",
    category: "assistencia",
    city: "Cachoeiro de Itapemirim",
    address: "Rua José Olímpio Gomes, 614-722, Alto União",
    phone: "(28) 3199-2007 ramal 4718",
    hours: "Segunda a sexta-feira, das 8h às 17h",
    source: "Prefeitura Municipal de Cachoeiro de Itapemirim",
    sourceUrl: cachoeiroAssistenciaSource,
  }),
  record({
    id: "cachoeiro-upa-marbrasa",
    name: "UPA do Marbrasa",
    category: "saude",
    city: "Cachoeiro de Itapemirim",
    address: "Rua Horaci Amarante Matos, s/n, Marbrasa",
    phone: "(28) 3199-1152",
    hours: "24 horas",
    source: "Prefeitura Municipal de Cachoeiro de Itapemirim",
    sourceUrl: cachoeiroSaudeSource,
  }),
  record({
    id: "cachoeiro-procon",
    name: "Procon Cachoeiro",
    category: "outros",
    city: "Cachoeiro de Itapemirim",
    address: "Rua Bernardo Horta, 204, Maria Ortiz",
    phone: "(28) 3199-1710",
    hours: "Segunda a sexta-feira, das 8h às 16h",
    source: "Prefeitura Municipal de Cachoeiro de Itapemirim",
    sourceUrl: cachoeiroProconSource,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("es-curated-"))
  .concat(espiritoSanto);

portal.meta.updated = "2026-06-29";
portal.meta.coverage.espiritoSanto = {
  cities: [
    "Serra",
    "Vila Velha",
    "Cariacica",
    "Vitória",
    "Cachoeiro de Itapemirim",
  ],
  selection:
    "Cinco municípios mais populosos do Espírito Santo segundo panorama/estimativas oficiais do IBGE",
  source: ibgePopulationSource,
  records: espiritoSanto.length,
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
      espiritoSantoRecords: espiritoSanto.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
