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
    id: `am-curated-${id}`,
    name,
    category,
    region: "Norte",
    uf: "AM",
    state: "Amazonas",
    city,
    address,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address}, ${city} - AM`,
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

const pac =
  "https://www.sejusc.am.gov.br/conpronto-atendimento-ao-cidadao-pac/";
const cetam = "https://www.cetam.am.gov.br/interior/";
const defensoriaInterior =
  "https://defensoria.am.def.br/2025/08/27/defensoria-publica-expande-atendimento-no-interior-do-amazonas-e-chega-a-32-unidades-fisicas-fora-da-capital/";

const amazonas = [
  record({
    id: "manaus-ptrig",
    name: "Posto de Interiorização e Triagem — PTRIG",
    category: "outros",
    city: "Manaus",
    address: "Avenida Brasil, 2665, PAC Compensa, Compensa",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl:
      "https://www.sejusc.am.gov.br/governo-do-amazonas-garante-atendimento-a-migrantes-refugiados-e-apatridas-no-pac-compensa-zona-oeste-de-manaus/",
  }),
  record({
    id: "manaus-pra",
    name: "Posto de Recepção e Apoio aos Migrantes e Refugiados — PRA",
    category: "acolhimento",
    city: "Manaus",
    address: "Avenida Torquato Tapajós, 1047, Da Paz",
    hours: "24 horas",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl:
      "https://www.sejusc.am.gov.br/sejusc-realiza-mais-de-38-mil-atendimentos-a-migrantes-refugiados-e-apatridas-em-2025/",
  }),
  record({
    id: "manaus-sine",
    name: "SINE Amazonas",
    category: "trabalho",
    city: "Manaus",
    address: "Avenida Djalma Batista, 1018, Galeria +, Chapada",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "AFEAM — Governo do Amazonas",
    sourceUrl: "https://www.afeam.am.gov.br/parceiros-tecnicos/",
  }),
  record({
    id: "manaus-hps-28-agosto",
    name: "Hospital e Pronto-Socorro 28 de Agosto",
    category: "saude",
    city: "Manaus",
    address: "Avenida Mário Ypiranga, 1581, Adrianópolis",
    phone: "(92) 3643-7100",
    hours: "24 horas",
    source: "Secretaria de Estado de Saúde do Amazonas",
    sourceUrl:
      "https://www.saude.am.gov.br/unidades-de-saude/hospital-e-pronto-socorro-28-de-agosto/",
  }),
  record({
    id: "itacoatiara-pac",
    name: "Pronto Atendimento ao Cidadão — PAC Itacoatiara",
    category: "outros",
    city: "Itacoatiara",
    address: "Avenida Parque, 762, Centro",
    phone: "(92) 98459-2220",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl: pac,
  }),
  record({
    id: "itacoatiara-defensoria",
    name: "Defensoria Pública — Polo do Médio Amazonas",
    category: "outros",
    city: "Itacoatiara",
    address: "Rua Borba, 2233, Pedreiras",
    phone: "(92) 98559-1599",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Defensoria Pública do Estado do Amazonas",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "itacoatiara-cetam",
    name: "Escola de Educação Profissional Moyses Benarrós Israel — Cetam",
    category: "trabalho",
    city: "Itacoatiara",
    address: "Avenida Mário Andreazza, s/n, São Francisco",
    phone: "(92) 99120-4051",
    hours: "Das 8h às 22h; confirmar dias de atendimento",
    source: "Cetam — Governo do Amazonas",
    sourceUrl: cetam,
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "itacoatiara-hospital-jose-mendes",
    name: "Hospital Regional José Mendes",
    category: "saude",
    city: "Itacoatiara",
    address: "Rua Acácio Leite, 2593, Iracy",
    phone: "(92) 3521-4373",
    hours: "24 horas",
    source: "CNES — Ministério da Saúde",
    sourceUrl:
      "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=1301902016923",
  }),
  record({
    id: "manacapuru-pac",
    name: "Pronto Atendimento ao Cidadão — PAC Manacapuru",
    category: "outros",
    city: "Manacapuru",
    address: "Rua Raimundo Pacheco Teles, 1685, Terra Preta",
    phone: "(92) 98461-9716",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl: pac,
  }),
  record({
    id: "manacapuru-defensoria",
    name: "Defensoria Pública — Polo do Rio Negro-Solimões",
    category: "outros",
    city: "Manacapuru",
    address: "Rua União, s/n, Aparecida",
    phone: "(92) 98559-1599",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Defensoria Pública do Estado do Amazonas",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "manacapuru-cetam",
    name: "Escola de Educação Profissional Syria Flores da Silva — Cetam",
    category: "trabalho",
    city: "Manacapuru",
    address: "Rua Manoel Gonçalves Bastos, 363, Terra Preta",
    phone: "(92) 99137-9438",
    hours: "Das 7h às 21h; confirmar dias de atendimento",
    source: "Cetam — Governo do Amazonas",
    sourceUrl: cetam,
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "manacapuru-hospital-geral",
    name: "Hospital Geral de Manacapuru",
    category: "saude",
    city: "Manacapuru",
    address: "Rua Carolina Fernandes, s/n, São José",
    phone: "(92) 3361-1907",
    hours: "24 horas",
    source: "CNES — Ministério da Saúde",
    sourceUrl:
      "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=1302502013258",
  }),
  record({
    id: "parintins-pac",
    name: "Pronto Atendimento ao Cidadão — PAC Parintins",
    category: "outros",
    city: "Parintins",
    address: "Avenida Jonatas Pedrosa, 437, Centro",
    phone: "(92) 98447-4310",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl: pac,
  }),
  record({
    id: "parintins-defensoria",
    name: "Defensoria Pública — Polo do Baixo Amazonas",
    category: "outros",
    city: "Parintins",
    address: "Estrada do Macurany, s/n, Conjunto João Novo",
    phone: "(92) 98559-1599",
    hours: "Segunda a sexta, das 8h às 14h",
    source: "Defensoria Pública do Estado do Amazonas",
    sourceUrl: defensoriaInterior,
  }),
  record({
    id: "parintins-cetam",
    name: "Escola de Educação Profissional Professor Jair Mendes — Cetam",
    category: "trabalho",
    city: "Parintins",
    address: "Avenida Amazonas, 2700, Centro",
    phone: "(92) 99401-3442",
    hours: "Das 8h às 22h; confirmar dias de atendimento",
    source: "Cetam — Governo do Amazonas",
    sourceUrl: cetam,
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "parintins-hospital-jofre-cohen",
    name: "Hospital Regional Dr. Jofre de Matos Cohen",
    category: "saude",
    city: "Parintins",
    address: "Rua Herbert de Azevedo, 985, Santa Clara",
    hours: "24 horas",
    source: "CNES — Ministério da Saúde",
    sourceUrl:
      "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=1303403210243",
    reasons: ["Telefone publicado no CNES está incompleto e foi omitido"],
  }),
  record({
    id: "tefe-pac",
    name: "Pronto Atendimento ao Cidadão — PAC Tefé",
    category: "outros",
    city: "Tefé",
    address: "Rua Getúlio Vargas, 167, Centro",
    phone: "(97) 98400-4713",
    hours: "Segunda a sexta, das 8h às 17h",
    source: "SEJUSC — Governo do Amazonas",
    sourceUrl: pac,
  }),
  record({
    id: "tefe-defensoria",
    name: "Defensoria Pública — Polo do Médio Solimões",
    category: "outros",
    city: "Tefé",
    address: "Estrada do Aeroporto, 4775, São Francisco",
    phone: "(92) 98559-1599",
    hours: "Dias úteis, das 8h às 14h; plantão até as 18h todos os dias",
    source: "Defensoria Pública do Estado do Amazonas",
    sourceUrl:
      "https://defensoria.am.def.br/2025/09/24/defensoria-amplia-atendimento-da-populacao-do-medio-solimoes-com-inauguracao-de-nova-sede-em-tefe/",
  }),
  record({
    id: "tefe-cetam",
    name: "Escola de Educação Profissional José Márcio Ayres — Cetam",
    category: "trabalho",
    city: "Tefé",
    address: "Rua Olavo Bilac, 341, Centro",
    phone: "(92) 99521-1516",
    hours: "Das 8h às 22h; confirmar dias de atendimento",
    source: "Cetam — Governo do Amazonas",
    sourceUrl: cetam,
    reasons: ["A fonte consultada não especifica os dias de atendimento"],
  }),
  record({
    id: "tefe-hospital-regional",
    name: "Hospital Regional de Tefé",
    category: "saude",
    city: "Tefé",
    address: "Estrada da Bexiga, s/n, Fonte Boa",
    phone: "(97) 98445-3221",
    hours: "24 horas",
    source: "CNES — Ministério da Saúde",
    sourceUrl:
      "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=1304202016141",
  }),
];

portal.services = portal.services
  .filter((service) => !service.id.startsWith("am-curated-"))
  .concat(amazonas);

portal.meta.updated = "2026-06-28";
portal.meta.coverage.amazonas = {
  cities: ["Manaus", "Itacoatiara", "Manacapuru", "Parintins", "Tefé"],
  selection:
    "Cinco municípios mais populosos segundo as Estimativas da População 2025 do IBGE",
  source:
    "https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf",
  records: amazonas.length,
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
      amazonasRecords: amazonas.length,
      total: portal.meta.stats.total,
      withPhone: portal.meta.stats.withPhone,
      withSource: portal.meta.stats.withSource,
      cities: portal.meta.stats.cities,
    },
    null,
    2,
  ),
);
