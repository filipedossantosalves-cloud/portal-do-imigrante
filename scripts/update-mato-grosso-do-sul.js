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
    id: `ms-curated-${id}`,
    name,
    category,
    region: "Centro-Oeste",
    uf: "MS",
    state: "Mato Grosso do Sul",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - MS`,
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

const campoGrandeFunsatSource =
  "https://www.campogrande.ms.gov.br/cgnoticias/noticia/empregos-intermediados-pela-funsat-somam-114-opcoes-de-contratacao/";
const campoGrandeCrasSource =
  "https://www.campogrande.ms.gov.br/cgnoticias/noticia/recadastramento-dos-beneficiarios-do-cadunico-podem-ser-feitos-em-mais-de-25-unidades-da-sas/";
const campoGrandeUpaSource =
  "https://www.campogrande.ms.gov.br/cgnoticias/?p=74635";
const campoGrandeProconSource =
  "https://www.campogrande.ms.gov.br/cgnoticias/noticia/procon-municipal-e-aguas-guariroba-firmam-parceria-para-facilitar-atendimento-aos-consumidores-de-campo-grande/";

const douradosTrabalhoSource =
  "https://www.funtrab.ms.gov.br/casa-do-trabalhador-de-dourados-atende-em-novo-endereco-2/";
const douradosCrasSource =
  "https://portal.dourados.ms.gov.br/index.php/com-os-cras-prefeitura-leva-suporte-a-populacao-em-situacao-de-vulnerabilidade/";
const douradosUpaSource = "https://funsaud.dourados.ms.gov.br/";
const douradosProconSource =
  "https://portal.dourados.ms.gov.br/index.php/procon/";

const tresLagoasTrabalhoSource =
  "https://www.treslagoas.ms.gov.br/casa-do-trabalhador-esta-com-78-vagas-de-emprego-disponiveis-nesta-segunda-feira-12/";
const tresLagoasCrasSource =
  "https://www.treslagoas.ms.gov.br/cras-ruth-filgueiras-promove-oficina-com-familias-e-divulga-programa-estadual/";
const tresLagoasUpaSource =
  "https://www.treslagoas.ms.gov.br/secretariasmunicipais/sms/rededesaude/";
const tresLagoasProconSource =
  "https://www.treslagoas.ms.gov.br/wp-content/uploads/2023/02/1.-Geral.pdf";

const corumbaTrabalhoSource =
  "https://www.funtrab.ms.gov.br/funtrab-no-interior-semana-26-08-2024-a-30-08-2024/";
const corumbaCrasSource = "https://corumba.ms.gov.br/locais/11";
const corumbaProntoSocorroSource =
  "https://do.corumba.ms.gov.br/legislacao/corumba/detalhes/44388";
const corumbaProconSource =
  "https://corumba.ms.gov.br/noticias/procon-intensifica-monitoramento-de-precos-de-combustiveis-e-reforca-fiscalizacao";

const pontaPoraTrabalhoSource =
  "https://pontapora.ms.gov.br/v2/casa-do-trabalhador-segue-cadastrando-trabalhadores-para-obra-do-aeroporto/";
const pontaPoraTelefonesSource = "https://pontapora.ms.gov.br/v2/telefones/";
const pontaPoraProconSource =
  "https://pontapora.ms.gov.br/v2/central-de-servicos-e-sistemas-digitais/procon/";

const matoGrossoDoSul = [
  record({
    id: "campo-grande-funsat",
    name: "Agência de Empregos da Funsat",
    category: "trabalho",
    city: "Campo Grande",
    address: "Rua 14 de Julho, nº 992, Vila Glória",
    phone: "(67) 4042-0585, ramal 5837",
    hours: "Segunda a sexta, das 7h às 16h",
    source: "Prefeitura Municipal de Campo Grande",
    sourceUrl: campoGrandeFunsatSource,
  }),
  record({
    id: "campo-grande-cras-canguru",
    name: "CRAS Canguru",
    category: "assistencia",
    city: "Campo Grande",
    address: "Rua dos Topógrafos, nº 1175, Jardim Canguru",
    phone: "(67) 3314-4482",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Campo Grande",
    sourceUrl: campoGrandeCrasSource,
    reasons: [
      "A unidade foi reinaugurada em 2025; o expediente individual não foi publicado na fonte consultada",
    ],
  }),
  record({
    id: "campo-grande-upa-universitario",
    name: "UPA Universitário",
    category: "saude",
    city: "Campo Grande",
    address: "Avenida Guaicurus, nº 3757, Universitário",
    phone: "(67) 2020-1834",
    hours: "24h por dia",
    source: "Prefeitura Municipal de Campo Grande",
    sourceUrl: campoGrandeUpaSource,
    reasons: [
      "Endereço e telefone constam na relação municipal; a atividade da unidade foi reconferida no painel público de saúde em 2026",
    ],
  }),
  record({
    id: "campo-grande-procon",
    name: "Procon Municipal de Campo Grande",
    category: "outros",
    city: "Campo Grande",
    address: "Avenida Afonso Pena, nº 3128, Centro",
    phone: "156, opção 6",
    hours: "Segunda a sexta, das 7h30 às 11h e das 13h às 17h30",
    source: "Prefeitura Municipal de Campo Grande",
    sourceUrl: campoGrandeProconSource,
  }),

  record({
    id: "dourados-casa-trabalhador",
    name: "Casa do Trabalhador de Dourados",
    category: "trabalho",
    city: "Dourados",
    address: "Avenida Weimar Gonçalves Torres, nº 2548, Jardim Tropical",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Fundação do Trabalho de Mato Grosso do Sul",
    sourceUrl: douradosTrabalhoSource,
  }),
  record({
    id: "dourados-cras-cachoeirinha",
    name: "CRAS Cachoeirinha",
    category: "assistencia",
    city: "Dourados",
    address:
      "Rua Eulália Pires, s/n, ao lado da Escola Municipal Arthur Campos Mello, Vila Cachoeirinha",
    phone: "(67) 2222-1835 / (67) 98163-0225",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "Prefeitura Municipal de Dourados",
    sourceUrl: douradosCrasSource,
    reasons: [
      "O portal informa que o horário publicado em 2025 era temporário; confirme antes do deslocamento",
    ],
  }),
  record({
    id: "dourados-upa",
    name: "UPA 24h de Dourados",
    category: "saude",
    city: "Dourados",
    address: "Rua Frei Antônio, nº 3675, Terra Roxa",
    phone: "(67) 3425-0331",
    hours: "24h por dia, todos os dias",
    source: "Fundação de Serviços de Saúde de Dourados",
    sourceUrl: douradosUpaSource,
  }),
  record({
    id: "dourados-procon",
    name: "Procon Municipal de Dourados",
    category: "outros",
    city: "Dourados",
    address: "Rua Antônio Emílio de Figueiredo, nº 1910, Centro",
    phone: "(67) 3411-7792",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Dourados",
    sourceUrl: douradosProconSource,
  }),

  record({
    id: "tres-lagoas-casa-trabalhador",
    name: "Casa do Trabalhador de Três Lagoas",
    category: "trabalho",
    city: "Três Lagoas",
    address: "Rua Doutor Munir Thomé, nº 86, Centro",
    phone: "(67) 3929-1938",
    hours: "Segunda a sexta, das 7h às 17h, sem intervalo",
    source: "Prefeitura Municipal de Três Lagoas",
    sourceUrl: tresLagoasTrabalhoSource,
  }),
  record({
    id: "tres-lagoas-cras-ruth-filgueiras",
    name: "CRAS Ruth Máximo Filgueiras",
    category: "assistencia",
    city: "Três Lagoas",
    address: "Rua Macapá, nº 908, Guanabara",
    phone: "(67) 3929-1450 / (67) 3929-1451",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Três Lagoas",
    sourceUrl: tresLagoasCrasSource,
    reasons: [
      "A fonte confirma atividade da unidade em 2026; endereço e contatos foram cruzados com a relação municipal de CRAS",
    ],
  }),
  record({
    id: "tres-lagoas-upa",
    name: "UPA 24h de Três Lagoas",
    category: "saude",
    city: "Três Lagoas",
    address: "Rua Irmãos Spinelli, nº 1855, São Carlos",
    phone: "(67) 99250-8759 / (67) 99252-8134",
    hours: "24h por dia, todos os dias",
    source: "Prefeitura Municipal de Três Lagoas",
    sourceUrl: tresLagoasUpaSource,
  }),
  record({
    id: "tres-lagoas-procon",
    name: "Procon Municipal de Três Lagoas",
    category: "outros",
    city: "Três Lagoas",
    address: "Rua Orestes Prata Tibery, nº 1762, Colinos",
    phone: "(67) 3929-1820 / (67) 3929-1819 / 151",
    hours: "Confirmar no canal oficial",
    source: "Prefeitura Municipal de Três Lagoas",
    sourceUrl: tresLagoasProconSource,
  }),

  record({
    id: "corumba-casa-trabalhador",
    name: "Casa do Trabalhador de Corumbá",
    category: "trabalho",
    city: "Corumbá",
    address: "Rua 15 de Novembro, nº 32, primeiro andar, Centro",
    hours: "Segunda a sexta, das 7h30 às 12h30",
    source: "Fundação do Trabalho de Mato Grosso do Sul",
    sourceUrl: corumbaTrabalhoSource,
  }),
  record({
    id: "corumba-cras-i",
    name: "CRAS I — Centro América",
    category: "assistencia",
    city: "Corumbá",
    address: "Rua Cáceres, s/n, Centro América",
    phone: "(67) 98191-0115",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Prefeitura Municipal de Corumbá",
    sourceUrl: corumbaCrasSource,
  }),
  record({
    id: "corumba-pronto-socorro",
    name: "Pronto-Socorro Municipal de Corumbá",
    category: "saude",
    city: "Corumbá",
    address:
      "Rua Colombo, s/n, entre as ruas 15 de Novembro e 7 de Setembro, Centro",
    phone: "(67) 3231-5642 / (67) 3907-5380",
    hours: "24h por dia",
    source: "Diário Oficial do Município de Corumbá",
    sourceUrl: corumbaProntoSocorroSource,
  }),
  record({
    id: "corumba-procon",
    name: "Procon Municipal de Corumbá",
    category: "outros",
    city: "Corumbá",
    address: "Avenida General Rondon, nº 1206, Centro",
    phone: "(67) 98191-0203",
    hours: "Segunda a sexta, das 7h30 às 13h30",
    source: "Prefeitura Municipal de Corumbá",
    sourceUrl: corumbaProconSource,
  }),

  record({
    id: "ponta-pora-casa-trabalhador",
    name: "Casa do Trabalhador de Ponta Porã",
    category: "trabalho",
    city: "Ponta Porã",
    address: "Rua Sete de Setembro, nº 637, Centro",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "Prefeitura Municipal de Ponta Porã",
    sourceUrl: pontaPoraTrabalhoSource,
  }),
  record({
    id: "ponta-pora-cras-marambaia",
    name: "CRAS Marambaia",
    category: "assistencia",
    city: "Ponta Porã",
    address: "Rua João Brembati Calvoso, nº 433, Jardim Vitória",
    phone: "(67) 3010-0883 / (67) 99629-1995",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Prefeitura Municipal de Ponta Porã",
    sourceUrl: pontaPoraTelefonesSource,
  }),
  record({
    id: "ponta-pora-esf-neusa-maria",
    name: "ESF Neusa Maria Pereira — Jardim Vitória",
    category: "saude",
    city: "Ponta Porã",
    address: "Rua Cândido Garcia de Souza, s/n, Jardim Vitória",
    phone: "(67) 3010-0920",
    hours: "Segunda a sexta, das 7h às 11h e das 13h às 17h",
    source: "Prefeitura Municipal de Ponta Porã",
    sourceUrl: pontaPoraTelefonesSource,
  }),
  record({
    id: "ponta-pora-procon",
    name: "Procon Municipal de Ponta Porã",
    category: "outros",
    city: "Ponta Porã",
    address: "Rua Baltazar Saldanha, nº 281, Centro",
    phone: "(67) 3431-9090 / (67) 3432-1775 / 151",
    hours: "Segunda a sexta, das 7h às 13h",
    source: "Prefeitura Municipal de Ponta Porã",
    sourceUrl: pontaPoraProconSource,
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("ms-curated-"))
  .concat(matoGrossoDoSul);

portal.meta.updated = "2026-07-02";
portal.meta.coverage.matoGrossoDoSul = {
  cities: [
    "Campo Grande",
    "Dourados",
    "Três Lagoas",
    "Corumbá",
    "Ponta Porã",
  ],
  selection:
    "Cinco municípios mais populosos de Mato Grosso do Sul segundo as Estimativas da População 2025 do IBGE/SIDRA",
  source: ibgePopulationSource,
  records: matoGrossoDoSul.length,
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
      matoGrossoDoSulRecords: matoGrossoDoSul.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
