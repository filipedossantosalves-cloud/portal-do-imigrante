const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "services.json");
const jsPath = path.join(root, "data", "services.js");
const portal = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const verified = "02/07/2026";

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
    id: `mt-curated-${id}`,
    name,
    category,
    region: "Centro-Oeste",
    uf: "MT",
    state: "Mato Grosso",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - MT`,
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

const cuiabaSineSource =
  "https://www.cuiaba.mt.gov.br/noticias/sine-municipal-de-cuiaba-passa-a-funcionar-em-novo-endereco";
const cuiabaCrasSource =
  "https://aplicacoes.mds.gov.br/sagi/atendimento/adm/lista_preenchimento_unidade.php?p_ibge=510340";
const cuiabaUpaSource =
  "https://www.cuiaba.mt.gov.br/secretarias/saude/telefones-unidades-de-pronto-atendimento-upas";
const cuiabaProconSource = "https://www.cuiaba.mt.gov.br/secretarias/procon-municipal";

const varzeaSineSource =
  "https://www.sedec.mt.gov.br/web/setas/w/centro-estadual-de-cidadania-realizou-mais-de-160-mil-atendimentos-em-2024";
const varzeaNetworkSource =
  "https://transparencia.mpmt.mp.br/uploads/201/375/cartilha_guia_de_servicos_da_rede_de_atendimento_vg_e_ns_2024_04.06_web.pdf";
const varzeaProconSource = "https://procon.varzeagrande.mt.gov.br/";

const rondonopolisSineSource =
  "https://www.rondonopolis.mt.gov.br/noticias/procon-possui-atendimento-no-ganha-tempo-para-facilitar-encaminhamentos-de-reclamacoes/";
const rondonopolisCrasSource =
  "https://aplicacoes.mds.gov.br/sagi/atendimento/adm/lista_preenchimento_cras_unidade.php?p_id_cras=51076040205";
const rondonopolisSaudeSource =
  "https://www.rondonopolis.mt.gov.br/rede-especializada/";
const rondonopolisProconSource =
  "https://www.rondonopolis.mt.gov.br/orgaos-municipais/procon/";

const sinopSineSource =
  "https://www.sinop.mt.gov.br/portal/noticias/0/3/12993/prefeitura-de-sinop-divulga-cerca-de-500-vagas-de-emprego-por-meio-do-sine-nesta-quarta-feira-28";
const sinopCrasSource =
  "https://www.sinop.mt.gov.br/portal/carta-servicos/104/";
const sinopUpaSource =
  "https://www.sinop.mt.gov.br/portal/telefones/2/0/0";
const sinopProconSource =
  "https://www.sinop.mt.gov.br/portal/secretarias/17/procon/";

const sorrisoSineSource =
  "https://site.sorriso.mt.gov.br/servicos/item?q=202&s=sine";
const sorrisoCrasSource =
  "https://site.sorriso.mt.gov.br/unidade/147/cras-sao-domingos";
const sorrisoUpaSource = "https://site.sorriso.mt.gov.br/servico/54/body";
const sorrisoProconSource = "https://site.sorriso.mt.gov.br/pages/procon";

const matoGrosso = [
  record({
    id: "cuiaba-sine",
    name: "SINE Municipal de Cuiabá",
    category: "trabalho",
    city: "Cuiabá",
    address: "Travessa Celso Luís M. de Almeida, nº 45, Poção",
    phone: "(65) 3645-7250",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Cuiabá",
    sourceUrl: cuiabaSineSource,
  }),
  record({
    id: "cuiaba-cras-pedregal",
    name: "CRAS Pedregal",
    category: "assistencia",
    city: "Cuiabá",
    address: "Rua Manaíra, s/n, Pedregal, antigo Centro da Juventude",
    phone: "(65) 99355-8364",
    hours: "Confirmar no canal oficial",
    source: "Ministério do Desenvolvimento e Assistência Social",
    sourceUrl: cuiabaCrasSource,
    reasons: [
      "Endereço conferido no cadastro federal e contato da equipe técnica na relação oficial da Prefeitura de Cuiabá",
    ],
  }),
  record({
    id: "cuiaba-upa-morada-do-ouro",
    name: "UPA Morada do Ouro",
    category: "saude",
    city: "Cuiabá",
    address:
      "Avenida Tancredo Neves, s/n, ruas 15, 16 e 17, quadra 26, Morada do Ouro II",
    phone: "(65) 3645-5700",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Cuiabá",
    sourceUrl: cuiabaUpaSource,
    reasons: [
      "A relação oficial publica endereço e telefone; o funcionamento contínuo foi reconferido em notícia municipal de 2026 sobre as UPAs",
    ],
  }),
  record({
    id: "cuiaba-procon",
    name: "Procon Municipal de Cuiabá",
    category: "outros",
    city: "Cuiabá",
    address: "Rua Joaquim Murtinho, nº 554, Centro-Sul",
    phone: "(65) 3324-9680",
    hours: "Segunda a sexta, das 8h às 12h e das 14h às 18h",
    source: "Prefeitura Municipal de Cuiabá",
    sourceUrl: cuiabaProconSource,
  }),

  record({
    id: "varzea-grande-sine",
    name: "SINE — Centro Estadual de Cidadania de Várzea Grande",
    category: "trabalho",
    city: "Várzea Grande",
    address:
      "Várzea Grande Shopping, segundo piso, Avenida Presidente Arthur Bernardes, nº 43, Jardim Aeroporto",
    hours: "Confirmar no canal oficial",
    source: "Governo do Estado de Mato Grosso",
    sourceUrl: varzeaSineSource,
    reasons: [
      "A fonte estadual confirma o SINE no Centro Estadual de Cidadania; o expediente específico deve ser confirmado antes do deslocamento",
    ],
  }),
  record({
    id: "varzea-grande-cras-cristo-rei",
    name: "CRAS Unidade I — Cristo Rei",
    category: "assistencia",
    city: "Várzea Grande",
    address:
      "Avenida Professora Isabel Pinto, nº 258, Cohab Cristo Rei, Cristo Rei",
    phone: "(65) 3688-3606",
    hours: "Segunda a sexta, das 7h30 às 17h30",
    source: "Ministério Público do Estado de Mato Grosso",
    sourceUrl: varzeaNetworkSource,
  }),
  record({
    id: "varzea-grande-upa-ipase",
    name: "UPA IPASE",
    category: "saude",
    city: "Várzea Grande",
    address: "Rua Guararapes, nº 274, Jardim Aeroporto, Centro-Sul",
    phone: "(65) 3686-2968",
    hours: "24h por dia",
    source: "Ministério Público do Estado de Mato Grosso",
    sourceUrl: varzeaNetworkSource,
  }),
  record({
    id: "varzea-grande-procon",
    name: "Procon Municipal de Várzea Grande",
    category: "outros",
    city: "Várzea Grande",
    address: "Avenida Castelo Branco, nº 2500, Centro-Sul, Paço Municipal",
    phone: "(65) 3692-2476 / (65) 3682-3054",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Prefeitura Municipal de Várzea Grande",
    sourceUrl: varzeaProconSource,
  }),

  record({
    id: "rondonopolis-sine",
    name: "SINE — Ganha Tempo de Rondonópolis",
    category: "trabalho",
    city: "Rondonópolis",
    address: "Rua João Pessoa, nº 802, Centro, Ganha Tempo",
    phone: "(66) 3439-7300 / (66) 3439-7349",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Rondonópolis",
    sourceUrl: rondonopolisSineSource,
    reasons: [
      "A Prefeitura confirma o SINE dentro do Ganha Tempo; endereço, telefones e expediente foram cruzados com a relação oficial estadual de postos",
    ],
  }),
  record({
    id: "rondonopolis-cras-central",
    name: "CRAS Central",
    category: "assistencia",
    city: "Rondonópolis",
    address: "Rua Poxoréo, nº 857, Centro",
    hours: "Confirmar no canal oficial",
    source: "Ministério do Desenvolvimento e Assistência Social",
    sourceUrl: rondonopolisCrasSource,
    reasons: [
      "O cadastro federal registra atividades da unidade até janeiro de 2026, sem telefone ou expediente público",
    ],
  }),
  record({
    id: "rondonopolis-hospital-cristyan-mary",
    name: "Hospital Cristyan Mary da Silveira e Lima",
    category: "saude",
    city: "Rondonópolis",
    address: "Avenida Lions Internacional, nº 266, Vila Aurora",
    phone: "(66) 3422-9983",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Rondonópolis",
    sourceUrl: rondonopolisSaudeSource,
  }),
  record({
    id: "rondonopolis-procon",
    name: "Procon Municipal de Rondonópolis",
    category: "outros",
    city: "Rondonópolis",
    address: "Rua Rio Branco, nº 2630, Jardim Santa Marta",
    phone: "(66) 98438-2460",
    hours: "Segunda a sexta, das 12h às 18h",
    source: "Prefeitura Municipal de Rondonópolis",
    sourceUrl: rondonopolisProconSource,
  }),

  record({
    id: "sinop-sine",
    name: "SINE Sinop — Ganha Tempo",
    category: "trabalho",
    city: "Sinop",
    address: "Avenida das Acácias, nº 280, Jardim Botânico, Ganha Tempo",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "Prefeitura Municipal de Sinop",
    sourceUrl: sinopSineSource,
  }),
  record({
    id: "sinop-cras-boa-esperanca",
    name: "CRAS Boa Esperança",
    category: "assistencia",
    city: "Sinop",
    address: "Rua Benedita Nogueira, s/n, Boa Esperança",
    phone: "(66) 99988-8675",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Sinop",
    sourceUrl: sinopCrasSource,
  }),
  record({
    id: "sinop-upa-andre-maggi",
    name: "UPA André Maggi",
    category: "saude",
    city: "Sinop",
    address: "Avenida André Maggi, s/n, Jardim das Acácias",
    phone: "(66) 3520-3400",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Sinop",
    sourceUrl: sinopUpaSource,
    reasons: [
      "A lista oficial de telefones confirma endereço e contato; o atendimento 24h foi reconferido em publicação municipal de 2025",
    ],
  }),
  record({
    id: "sinop-procon",
    name: "Procon Municipal de Sinop",
    category: "outros",
    city: "Sinop",
    address: "Rua das Aroeiras, nº 1116, Centro, fundos da Prefeitura",
    phone: "(66) 3520-7355 / (66) 99988-3708",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "Prefeitura Municipal de Sinop",
    sourceUrl: sinopProconSource,
  }),

  record({
    id: "sorriso-sine",
    name: "SINE Sorriso — Ganha Tempo Central",
    category: "trabalho",
    city: "Sorriso",
    address: "Rua Mato Grosso, nº 2458, Centro, Ganha Tempo Central",
    phone: "(66) 3907-8000",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "Prefeitura Municipal de Sorriso",
    sourceUrl: sorrisoSineSource,
    reasons: [
      "O serviço oficial informa atendimento no Ganha Tempo; endereço e contato foram cruzados com a página oficial da unidade Central",
    ],
  }),
  record({
    id: "sorriso-cras-sao-domingos",
    name: "CRAS São Domingos",
    category: "assistencia",
    city: "Sorriso",
    address: "Rua Santa Luzia, nº 230, São Domingos",
    phone: "(66) 3544-8974",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Prefeitura Municipal de Sorriso",
    sourceUrl: sorrisoCrasSource,
  }),
  record({
    id: "sorriso-upa",
    name: "UPA Sorriso",
    category: "saude",
    city: "Sorriso",
    address: "Avenida Porto Alegre, s/n, Centro",
    phone: "(66) 3544-5989",
    hours: "24h por dia, todos os dias",
    source: "Prefeitura Municipal de Sorriso",
    sourceUrl: sorrisoUpaSource,
  }),
  record({
    id: "sorriso-procon",
    name: "Procon Municipal de Sorriso",
    category: "outros",
    city: "Sorriso",
    address: "Rua Mato Grosso, nº 2458, Centro",
    phone: "(66) 3545-4771",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Sorriso",
    sourceUrl: sorrisoProconSource,
    reasons: [
      "A fonte oficial publica endereço e contato; o expediente específico do Procon deve ser confirmado antes do deslocamento",
    ],
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("mt-curated-"))
  .concat(matoGrosso);

portal.meta.updated = "2026-07-02";
portal.meta.coverage.matoGrosso = {
  cities: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Sorriso"],
  selection:
    "Cinco municípios mais populosos de Mato Grosso segundo as Estimativas da População 2025 do IBGE/SIDRA",
  source: ibgePopulationSource,
  records: matoGrosso.length,
  verified: "2026-07-02",
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
  updated: "2026-07-02",
};

fs.writeFileSync(jsonPath, `${JSON.stringify(portal, null, 2)}\n`, "utf8");
fs.writeFileSync(jsPath, `window.PORTAL_DATA=${JSON.stringify(portal)};\n`, "utf8");

console.log(
  JSON.stringify(
    {
      matoGrossoRecords: matoGrosso.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
