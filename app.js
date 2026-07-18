"use strict";

(function () {
  var data = [];
  var meta = {};
  var page = 1;
  var pageSize = 18;
  var favorites = new Set(JSON.parse(localStorage.getItem("pi_favorites") || "[]"));
  var checklist = JSON.parse(localStorage.getItem("pi_checklist") || "{}");
  var currentLang = localStorage.getItem("pi_lang") || "pt";

  var i18n = {
    pt: {
      htmlLang: "pt-BR",
      metaDescription: "Orientacao gratuita e segura para migrantes e refugiados encontrarem servicos essenciais no Brasil.",
      title: "Portal do Imigrante | Orientacao segura e gratuita",
      skip: "Pular para o conteudo",
      brandSub: "Informacao para recomecar com seguranca",
      headerAria: "Acessibilidade e idioma",
      languageAria: "Idioma da interface",
      font: "A+",
      fontAria: "Aumentar tamanho do texto",
      contrast: "Alto contraste",
      contrastAria: "Alternar alto contraste",
      emergencyAria: "Canais nacionais de emergencia",
      emergencyTitle: "Precisa de ajuda agora?",
      police: "Policia",
      ambulance: "SAMU",
      firefighters: "Bombeiros",
      women: "Violencia contra a mulher",
      humanRights: "Direitos Humanos",
      free: "Gratuito - sem cadastro - sem intermediarios",
      heroTitle: "Encontre orientacao para seus primeiros passos no Brasil",
      heroText: "Regularizacao, CPF, saude, assistencia, acolhimento, trabalho e educacao em uma jornada simples.",
      findService: "Encontrar um servico",
      seeSteps: "Ver os 6 passos",
      safetyTitle: "Sua seguranca vem primeiro",
      safetyText: "O portal nao cobra, nao pede documentos e nao substitui orgaos publicos. Nunca pague a terceiros por uma orientacao daqui.",
      trustPrivacyTitle: "Privacidade por padrao",
      trustPrivacyText: "Nenhum nome, CPF ou localizacao e solicitado.",
      trustDataTitle: "Transparencia dos dados",
      trustDataText: "Informacoes nao validadas aparecem com aviso claro.",
      trustSourcesTitle: "Fontes oficiais primeiro",
      trustSourcesText: "Os links nacionais levam diretamente a paginas do governo.",
      trustAria: "Compromissos do portal",
      stepsKicker: "Jornada essencial",
      stepsTitle: "Seus 6 primeiros passos",
      resetSteps: "Reiniciar checklist",
      supportKicker: "Rede de apoio",
      searchTitle: "Encontre servicos perto de voce",
      searchNote: "A base esta em validacao. Confirme telefone, endereco e horario antes de sair.",
      mappedServices: "servicos mapeados",
      officialSource: "com fonte oficial",
      reviewedUnits: "unidades revisadas",
      baseStatusAria: "Situacao da base",
      queryLabel: "O que voce procura?",
      queryPlaceholder: "Ex.: hospital, CRAS, emprego",
      regionLabel: "Regiao",
      stateLabel: "Estado",
      cityLabel: "Cidade",
      categoryLabel: "Necessidade",
      all: "Todas",
      allMasc: "Todos",
      searchButton: "Buscar",
      loadingServices: "Carregando servicos...",
      clearFilters: "Limpar filtros",
      officialKicker: "Comece por aqui",
      officialTitle: "Canais oficiais nacionais",
      officialNote: "Conteudo verificado em 28 de junho de 2026.",
      migration: "Regularizacao migratoria",
      migrationText: "Servicos de imigracao da Policia Federal",
      cpf: "CPF",
      cpfText: "Orientacoes da Receita Federal",
      sus: "Saude no SUS",
      susText: "Acesso de migrantes, refugiados e apatridas",
      protection: "Protecao e denuncias",
      protectionText: "Disque 100 e Ligue 180",
      openGov: "Abrir gov.br ->",
      privacyKicker: "Privacidade",
      privacyTitle: "Voce nao precisa se identificar",
      privacyText: "Favoritos e checklist ficam somente neste aparelho. O portal nao envia esses dados para um servidor. Ao abrir mapas ou sites oficiais, passam a valer as politicas desses servicos externos.",
      footerNote: "Projeto independente de orientacao humanitaria. Nao e um orgao do governo.",
      footerHome: "Inicio",
      footerSteps: "6 passos",
      footerSources: "Fontes oficiais",
      categories: {
        todos: "Todas as necessidades",
        saude: "Saude",
        assistencia: "Assistencia social",
        acolhimento: "Acolhimento",
        trabalho: "Trabalho",
        alimentacao: "Alimentacao",
        outros: "Outros",
      },
      steps: {
        regularizacao: { title: "Regularizacao migratoria", text: "Consulte a Policia Federal ou apoio juridico gratuito." },
        cpf: { title: "CPF", text: "Veja como solicitar ou regularizar seu CPF." },
        acolhimento: { title: "Emergencia e acolhimento", text: "Procure protecao, abrigo e alimentacao segura." },
        saude: { title: "Saude e Cartao SUS", text: "Encontre atendimento de saude. Em urgencia, ligue 192." },
        assistencia: { title: "Assistencia social", text: "Localize CRAS, CREAS, Centro POP e orientacao social." },
        integracao: { title: "Trabalho, escola e integracao", text: "Busque emprego, qualificacao e caminhos para estudar." },
      },
      done: "Concluido",
      markDone: "Marcar como feito",
      seeServices: "Ver servicos",
      stepDoneToast: "Passo concluido.",
      stepOpenToast: "Passo reaberto.",
      resetToast: "Checklist reiniciado.",
      confirmBefore: "Confirme antes de ir.",
      basicData: "Dados basicos disponiveis",
      additionalReview: "Confirmacao adicional recomendada",
      appointmentRequired: "Atendimento mediante agendamento previo",
      address: "Endereco",
      phone: "Telefone",
      hours: "Horario",
      bring: "O que levar",
      notConfirmed: "Nao confirmado",
      call: "Ligar",
      route: "Abrir rota",
      source: "Fonte oficial",
      saved: "Salvo",
      save: "Salvar",
      recordNote: "Registro da base informativa",
      reviewPriority: "prioridade de revisao",
      checkedAt: "conferido em",
      confirmTravel: "confirme antes do deslocamento",
      priorityLabels: {
        Urgente: "Urgente",
        Alta: "Alta",
        Media: "Media",
        "Média": "Média",
        Baixa: "Baixa",
      },
      service: "servico",
      foundOne: "encontrado",
      foundMany: "encontrados",
      noServiceTitle: "Nenhum servico encontrado.",
      noServiceText: "Tente remover um filtro ou consulte os canais oficiais abaixo.",
      baseUnavailable: "Base indisponivel.",
      baseUnavailableText: "Use os canais oficiais nacionais ou tente novamente.",
      baseLoadError: "Nao foi possivel carregar a base de servicos.",
      favoriteAdded: "Servico salvo neste aparelho.",
      favoriteRemoved: "Servico removido dos salvos.",
      prevPage: "Pagina anterior",
      nextPage: "Proxima pagina",
      paginationAria: "Paginacao dos servicos",
      docs: {
        saude: "Se tiver: documento de identificacao, CPF ou Cartao SUS. A falta desses documentos nao deve impedir acolhimento inicial.",
        assistencia: "Se tiver: documento pessoal, CPF e comprovante de residencia. Confirme exigencias com a unidade.",
        acolhimento: "Leve os documentos que possuir. Em risco imediato, priorize sua seguranca.",
        trabalho: "Se tiver: CPF, identificacao e Carteira de Trabalho Digital.",
        alimentacao: "Confirme antes se ha cadastro, encaminhamento ou documento exigido.",
        outros: "Confirme no canal oficial quais documentos sao necessarios.",
      },
    },
    en: {
      htmlLang: "en",
      metaDescription: "Free and safer guidance for migrants and refugees to find essential services in Brazil.",
      title: "Portal do Imigrante | Safe and free guidance",
      skip: "Skip to content",
      brandSub: "Information to restart with safety",
      headerAria: "Accessibility and language",
      languageAria: "Interface language",
      font: "A+",
      fontAria: "Increase text size",
      contrast: "High contrast",
      contrastAria: "Toggle high contrast",
      emergencyAria: "National emergency channels",
      emergencyTitle: "Need help now?",
      police: "Police",
      ambulance: "Ambulance",
      firefighters: "Firefighters",
      women: "Violence against women",
      humanRights: "Human Rights",
      free: "Free - no registration - no intermediaries",
      heroTitle: "Find guidance for your first steps in Brazil",
      heroText: "Migration status, CPF, healthcare, social support, shelter, work and education in one simple journey.",
      findService: "Find a service",
      seeSteps: "See the 6 steps",
      safetyTitle: "Your safety comes first",
      safetyText: "This portal does not charge fees, request documents or replace public authorities. Never pay third parties for this guidance.",
      trustPrivacyTitle: "Privacy by default",
      trustPrivacyText: "No name, CPF or location is requested.",
      trustDataTitle: "Data transparency",
      trustDataText: "Unvalidated information is shown with a clear warning.",
      trustSourcesTitle: "Official sources first",
      trustSourcesText: "National links go directly to government pages.",
      trustAria: "Portal commitments",
      stepsKicker: "Essential journey",
      stepsTitle: "Your first 6 steps",
      resetSteps: "Reset checklist",
      supportKicker: "Support network",
      searchTitle: "Find services near you",
      searchNote: "The database is under validation. Confirm phone, address and hours before leaving.",
      mappedServices: "mapped services",
      officialSource: "with official source",
      reviewedUnits: "reviewed units",
      baseStatusAria: "Database status",
      queryLabel: "What are you looking for?",
      queryPlaceholder: "Ex.: hospital, CRAS, job",
      regionLabel: "Region",
      stateLabel: "State",
      cityLabel: "City",
      categoryLabel: "Need",
      all: "All",
      allMasc: "All",
      searchButton: "Search",
      loadingServices: "Loading services...",
      clearFilters: "Clear filters",
      officialKicker: "Start here",
      officialTitle: "National official channels",
      officialNote: "Content verified on June 28, 2026.",
      migration: "Migration regularization",
      migrationText: "Federal Police immigration services",
      cpf: "CPF",
      cpfText: "Brazilian Federal Revenue guidance",
      sus: "Healthcare in SUS",
      susText: "Access for migrants, refugees and stateless people",
      protection: "Protection and reports",
      protectionText: "Dial 100 and Call 180",
      openGov: "Open gov.br ->",
      privacyKicker: "Privacy",
      privacyTitle: "You do not need to identify yourself",
      privacyText: "Favorites and checklist stay only on this device. The portal does not send this data to a server. When you open maps or official sites, their external service policies apply.",
      footerNote: "Independent humanitarian guidance project. It is not a government agency.",
      footerHome: "Home",
      footerSteps: "6 steps",
      footerSources: "Official sources",
      categories: {
        todos: "All needs",
        saude: "Healthcare",
        assistencia: "Social assistance",
        acolhimento: "Shelter",
        trabalho: "Work",
        alimentacao: "Food",
        outros: "Other",
      },
      steps: {
        regularizacao: { title: "Migration regularization", text: "Check the Federal Police or free legal support." },
        cpf: { title: "CPF", text: "Learn how to request or regularize your CPF." },
        acolhimento: { title: "Emergency and shelter", text: "Look for protection, shelter and safe food." },
        saude: { title: "Healthcare and SUS Card", text: "Find healthcare services. In an emergency, call 192." },
        assistencia: { title: "Social assistance", text: "Find CRAS, CREAS, Centro POP and social guidance." },
        integracao: { title: "Work, school and integration", text: "Find jobs, training and ways to study." },
      },
      done: "Done",
      markDone: "Mark as done",
      seeServices: "See services",
      stepDoneToast: "Step completed.",
      stepOpenToast: "Step reopened.",
      resetToast: "Checklist reset.",
      confirmBefore: "Confirm before going.",
      basicData: "Basic data available",
      additionalReview: "Additional confirmation recommended",
      appointmentRequired: "Service by prior appointment",
      address: "Address",
      phone: "Phone",
      hours: "Hours",
      bring: "What to bring",
      notConfirmed: "Not confirmed",
      call: "Call",
      route: "Open route",
      source: "Official source",
      saved: "Saved",
      save: "Save",
      recordNote: "Informational database record",
      reviewPriority: "review priority",
      checkedAt: "checked on",
      confirmTravel: "confirm before traveling",
      priorityLabels: {
        Urgente: "Urgent",
        Alta: "High",
        Media: "Medium",
        "Média": "Medium",
        Baixa: "Low",
      },
      service: "service",
      foundOne: "found",
      foundMany: "found",
      noServiceTitle: "No services found.",
      noServiceText: "Try removing a filter or check the official channels below.",
      baseUnavailable: "Database unavailable.",
      baseUnavailableText: "Use the national official channels or try again.",
      baseLoadError: "Could not load the service database.",
      favoriteAdded: "Service saved on this device.",
      favoriteRemoved: "Service removed from saved items.",
      prevPage: "Previous page",
      nextPage: "Next page",
      paginationAria: "Service pagination",
      docs: {
        saude: "If available: ID document, CPF or SUS Card. Missing documents should not block initial care.",
        assistencia: "If available: personal document, CPF and proof of address. Confirm requirements with the unit.",
        acolhimento: "Bring any documents you have. If there is immediate risk, prioritize your safety.",
        trabalho: "If available: CPF, ID and Digital Work Card.",
        alimentacao: "Confirm whether registration, referral or documents are required.",
        outros: "Confirm with the official channel which documents are required.",
      },
    },
    es: {
      htmlLang: "es",
      metaDescription: "Orientación gratuita y segura para que migrantes y refugiados encuentren servicios esenciales en Brasil.",
      title: "Portal do Imigrante | Orientación segura y gratuita",
      skip: "Saltar al contenido",
      brandSub: "Información para recomenzar con seguridad",
      headerAria: "Accesibilidad e idioma",
      languageAria: "Idioma de la interfaz",
      font: "A+",
      fontAria: "Aumentar tamaño del texto",
      contrast: "Alto contraste",
      contrastAria: "Alternar alto contraste",
      emergencyAria: "Canales nacionales de emergencia",
      emergencyTitle: "¿Necesita ayuda ahora?",
      police: "Policía",
      ambulance: "SAMU",
      firefighters: "Bomberos",
      women: "Violencia contra la mujer",
      humanRights: "Derechos Humanos",
      free: "Gratis - sin registro - sin intermediarios",
      heroTitle: "Encuentre orientación para sus primeros pasos en Brasil",
      heroText: "Regularización, CPF, salud, asistencia, acogida, trabajo y educación en un recorrido sencillo.",
      findService: "Encontrar un servicio",
      seeSteps: "Ver los 6 pasos",
      safetyTitle: "Su seguridad es lo primero",
      safetyText: "El portal no cobra, no solicita documentos y no sustituye a organismos públicos. Nunca pague a terceros por esta orientación.",
      trustPrivacyTitle: "Privacidad por defecto",
      trustPrivacyText: "No se solicita nombre, CPF ni ubicación.",
      trustDataTitle: "Transparencia de datos",
      trustDataText: "La información no validada aparece con una advertencia clara.",
      trustSourcesTitle: "Fuentes oficiales primero",
      trustSourcesText: "Los enlaces nacionales llevan directamente a páginas del gobierno.",
      trustAria: "Compromisos del portal",
      stepsKicker: "Ruta esencial",
      stepsTitle: "Sus 6 primeros pasos",
      resetSteps: "Reiniciar lista",
      supportKicker: "Red de apoyo",
      searchTitle: "Encuentre servicios cerca de usted",
      searchNote: "La base está en validación. Confirme teléfono, dirección y horario antes de salir.",
      mappedServices: "servicios mapeados",
      officialSource: "con fuente oficial",
      reviewedUnits: "unidades revisadas",
      baseStatusAria: "Situación de la base",
      queryLabel: "¿Qué busca?",
      queryPlaceholder: "Ej.: hospital, CRAS, empleo",
      regionLabel: "Región",
      stateLabel: "Estado",
      cityLabel: "Ciudad",
      categoryLabel: "Necesidad",
      all: "Todas",
      allMasc: "Todos",
      searchButton: "Buscar",
      loadingServices: "Cargando servicios...",
      clearFilters: "Limpiar filtros",
      officialKicker: "Empiece aquí",
      officialTitle: "Canales oficiales nacionales",
      officialNote: "Contenido verificado el 28 de junio de 2026.",
      migration: "Regularización migratoria",
      migrationText: "Servicios de inmigración de la Policía Federal",
      cpf: "CPF",
      cpfText: "Orientaciones de la Receita Federal",
      sus: "Salud en el SUS",
      susText: "Acceso para migrantes, refugiados y apátridas",
      protection: "Protección y denuncias",
      protectionText: "Llame al 100 y al 180",
      openGov: "Abrir gov.br ->",
      privacyKicker: "Privacidad",
      privacyTitle: "No necesita identificarse",
      privacyText: "Favoritos y lista quedan solo en este dispositivo. El portal no envía estos datos a un servidor. Al abrir mapas o sitios oficiales, se aplican las políticas de esos servicios externos.",
      footerNote: "Proyecto independiente de orientación humanitaria. No es un organismo gubernamental.",
      footerHome: "Inicio",
      footerSteps: "6 pasos",
      footerSources: "Fuentes oficiales",
      categories: {
        todos: "Todas las necesidades",
        saude: "Salud",
        assistencia: "Asistencia social",
        acolhimento: "Acogida",
        trabalho: "Trabajo",
        alimentacao: "Alimentación",
        outros: "Otros",
      },
      steps: {
        regularizacao: { title: "Regularización migratoria", text: "Consulte a la Policía Federal o apoyo jurídico gratuito." },
        cpf: { title: "CPF", text: "Vea cómo solicitar o regularizar su CPF." },
        acolhimento: { title: "Emergencia y acogida", text: "Busque protección, refugio y alimentación segura." },
        saude: { title: "Salud y Tarjeta SUS", text: "Encuentre atención de salud. En urgencia, llame al 192." },
        assistencia: { title: "Asistencia social", text: "Localice CRAS, CREAS, Centro POP y orientación social." },
        integracao: { title: "Trabajo, escuela e integración", text: "Busque empleo, capacitación y caminos para estudiar." },
      },
      done: "Concluido",
      markDone: "Marcar como hecho",
      seeServices: "Ver servicios",
      stepDoneToast: "Paso concluido.",
      stepOpenToast: "Paso reabierto.",
      resetToast: "Lista reiniciada.",
      confirmBefore: "Confirme antes de ir.",
      basicData: "Datos básicos disponibles",
      additionalReview: "Se recomienda confirmación adicional",
      appointmentRequired: "Atención con cita previa",
      address: "Dirección",
      phone: "Teléfono",
      hours: "Horario",
      bring: "Qué llevar",
      notConfirmed: "No confirmado",
      call: "Llamar",
      route: "Abrir ruta",
      source: "Fuente oficial",
      saved: "Guardado",
      save: "Guardar",
      recordNote: "Registro de la base informativa",
      reviewPriority: "prioridad de revisión",
      checkedAt: "verificado el",
      confirmTravel: "confirme antes del desplazamiento",
      priorityLabels: {
        Urgente: "Urgente",
        Alta: "Alta",
        Media: "Media",
        "Média": "Media",
        Baixa: "Baja",
      },
      service: "servicio",
      foundOne: "encontrado",
      foundMany: "encontrados",
      noServiceTitle: "No se encontraron servicios.",
      noServiceText: "Intente quitar un filtro o consulte los canales oficiales abajo.",
      baseUnavailable: "Base no disponible.",
      baseUnavailableText: "Use los canales oficiales nacionales o intente nuevamente.",
      baseLoadError: "No fue posible cargar la base de servicios.",
      favoriteAdded: "Servicio guardado en este dispositivo.",
      favoriteRemoved: "Servicio eliminado de guardados.",
      prevPage: "Página anterior",
      nextPage: "Página siguiente",
      paginationAria: "Paginación de servicios",
      docs: {
        saude: "Si tiene: documento de identidad, CPF o Tarjeta SUS. La falta de documentos no debe impedir la atención inicial.",
        assistencia: "Si tiene: documento personal, CPF y comprobante de domicilio. Confirme requisitos con la unidad.",
        acolhimento: "Lleve los documentos que tenga. En riesgo inmediato, priorice su seguridad.",
        trabalho: "Si tiene: CPF, identificación y Tarjeta de Trabajo Digital.",
        alimentacao: "Confirme si hay registro, derivación o documento exigido.",
        outros: "Confirme en el canal oficial qué documentos son necesarios.",
      },
    },
  };

  var stepDefinitions = [
    { id: "regularizacao", icon: "1", category: "outros" },
    { id: "cpf", icon: "2", category: "outros" },
    { id: "acolhimento", icon: "3", category: "acolhimento" },
    { id: "saude", icon: "4", category: "saude" },
    { id: "assistencia", icon: "5", category: "assistencia" },
    { id: "integracao", icon: "6", category: "trabalho" },
  ];

  var $ = function (id) {
    return document.getElementById(id);
  };

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || i18n.pt[key] || key;
  }

  function categoryLabel(category) {
    return t("categories")[category] || category;
  }

  function priorityLabel(priority) {
    return t("priorityLabels")[priority] || priority;
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function translateKnownValue(value) {
    if (currentLang === "pt") return value;
    var raw = String(value || "").trim();
    var key = normalize(raw);
    var en = {
      "nao confirmado": "Not confirmed",
      "nao informado": "Not informed",
      "nao informado na fonte oficial": "Not published by the official source",
      "localizacao sigilosa": "Confidential location",
      "localizacoes diversas no municipio": "Multiple locations in the city",
      "rede municipal de atendimento consulte o servico desejado": "Municipal service network; check the specific service",
      "atendimento acionado por telefone ou pelo centro pop": "Service requested by phone or through Centro Pop",
      "confirmar no canal oficial": "Confirm with the official channel",
      "informacao de referencia confirme no canal oficial antes de se deslocar": "Reference information. Confirm with the official channel before traveling.",
    };
    var es = {
      "nao confirmado": "No confirmado",
      "nao informado": "No informado",
      "nao informado na fonte oficial": "No publicado por la fuente oficial",
      "localizacao sigilosa": "Ubicación confidencial",
      "localizacoes diversas no municipio": "Varias ubicaciones en el municipio",
      "rede municipal de atendimento consulte o servico desejado": "Red municipal de atención; consulte el servicio específico",
      "atendimento acionado por telefone ou pelo centro pop": "Atención solicitada por teléfono o por el Centro Pop",
      "confirmar no canal oficial": "Confirme con el canal oficial",
      "informacao de referencia confirme no canal oficial antes de se deslocar": "Información de referencia. Confirme con el canal oficial antes de desplazarse.",
    };
    return (currentLang === "en" ? en[key] : es[key]) || raw;
  }

  function translateDateVerb(text) {
    if (currentLang === "pt") return text;
    return text.replace(/Fonte oficial consultada em ([0-9/]+)\./gi, currentLang === "en" ? "Official source checked on $1." : "Fuente oficial consultada el $1.");
  }

  function translateDataText(value) {
    if (currentLang === "pt") return value;
    var textValue = translateKnownValue(value);
    if (!textValue) return textValue;

    var replacements = currentLang === "en"
      ? [
        [/Informa[cç][aã]o de refer[eê]ncia\./gi, "Reference information."],
        [/Confirme no canal oficial antes de se deslocar/gi, "Confirm with the official channel before traveling"],
        [/Confirme antes de se deslocar/gi, "Confirm before traveling"],
        [/Confirme hor[aá]rio antes de se deslocar/gi, "Confirm hours before traveling"],
        [/Confirme canal, hor[aá]rio e forma de atendimento antes de encaminhar/gi, "Confirm channel, hours and service flow before referring someone"],
        [/Confirme exig[eê]ncias e agendamento antes de se deslocar/gi, "Confirm requirements and appointment before traveling"],
        [/Confirme disponibilidade de vaga antes de se deslocar/gi, "Confirm slot availability before traveling"],
        [/Confirme documentos exigidos e hor[aá]rio antes de se deslocar/gi, "Confirm required documents and hours before traveling"],
        [/Confirme documentos e necessidade de agendamento antes de se deslocar/gi, "Confirm documents and appointment requirements before traveling"],
        [/Confirme cadastro, encaminhamento ou documento exigido antes de se deslocar/gi, "Confirm registration, referral or required document before traveling"],
        [/Atendimento por agendamento/gi, "Service by appointment"],
        [/Atendimento informado como mediante agendamento pr[eé]vio/gi, "Service reported as requiring prior appointment"],
        [/N[aã]o encaminhar diretamente sem confirma[cç][aã]o pela rede socioassistencial/gi, "Do not refer directly without confirmation from the social assistance network"],
        [/A unidade informa atendimento direto e possibilidade de acolhimento provis[oó]rio/gi, "The unit reports direct service and possible temporary shelter"],
        [/Solicite e confirme vaga com a Gest[aã]o de Acolhimento Institucional antes de se deslocar/gi, "Request and confirm a slot with Institutional Shelter Management before traveling"],
        [/Confirme hor[aá]rio e modalidade de atendimento diretamente com a organiza[cç][aã]o/gi, "Confirm hours and service mode directly with the organization"],
        [/Em emerg[eê]ncia, acione 192/gi, "In an emergency, call 192"],
        [/Em risco imediato, acione tamb[eé]m 190 ou 192/gi, "If there is immediate risk, also call 190 or 192"],
        [/Por seguran[cç]a, o endere[cç]o [eé] sigiloso/gi, "For safety, the address is confidential"],
        [/Busque orienta[cç][aã]o pela rede oficial antes de deslocamento/gi, "Seek guidance from the official network before traveling"],
        [/A unidade articula politicas e rede; confirme se realiza atendimento direto antes de se deslocar/gi, "This unit coordinates policies and the network; confirm whether it provides direct service before traveling"],
        [/Procure o Centro Pop para cadastro e encaminhamento; vagas e regras podem variar/gi, "Go to Centro Pop for registration and referral; slots and rules may vary"],
        [/vagas, inscri[cç][aã]o e calend[aá]rio/gi, "slots, registration and schedule"],
        [/Leve documento de identifica[cç][aã]o e Carteira de Trabalho/gi, "Bring an ID document and Work Card"],
        [/Confirme funcionamento antes de ir/gi, "Confirm opening before going"],
      ]
      : [
        [/Informa[cç][aã]o de refer[eê]ncia\./gi, "Información de referencia."],
        [/Confirme no canal oficial antes de se deslocar/gi, "Confirme con el canal oficial antes de desplazarse"],
        [/Confirme antes de se deslocar/gi, "Confirme antes de desplazarse"],
        [/Confirme hor[aá]rio antes de se deslocar/gi, "Confirme el horario antes de desplazarse"],
        [/Confirme canal, hor[aá]rio e forma de atendimento antes de encaminhar/gi, "Confirme canal, horario y forma de atención antes de derivar"],
        [/Confirme exig[eê]ncias e agendamento antes de se deslocar/gi, "Confirme requisitos y cita antes de desplazarse"],
        [/Confirme disponibilidade de vaga antes de se deslocar/gi, "Confirme disponibilidad de cupo antes de desplazarse"],
        [/Confirme documentos exigidos e hor[aá]rio antes de se deslocar/gi, "Confirme documentos exigidos y horario antes de desplazarse"],
        [/Confirme documentos e necessidade de agendamento antes de se deslocar/gi, "Confirme documentos y necesidad de cita antes de desplazarse"],
        [/Confirme cadastro, encaminhamento ou documento exigido antes de se deslocar/gi, "Confirme registro, derivación o documento exigido antes de desplazarse"],
        [/Atendimento por agendamento/gi, "Atención con cita"],
        [/Atendimento informado como mediante agendamento pr[eé]vio/gi, "Atención informada con cita previa"],
        [/N[aã]o encaminhar diretamente sem confirma[cç][aã]o pela rede socioassistencial/gi, "No derive directamente sin confirmación de la red socioasistencial"],
        [/A unidade informa atendimento direto e possibilidade de acolhimento provis[oó]rio/gi, "La unidad informa atención directa y posibilidad de acogida temporal"],
        [/Solicite e confirme vaga com a Gest[aã]o de Acolhimento Institucional antes de se deslocar/gi, "Solicite y confirme cupo con la Gestión de Acogida Institucional antes de desplazarse"],
        [/Confirme hor[aá]rio e modalidade de atendimento diretamente com a organiza[cç][aã]o/gi, "Confirme horario y modalidad de atención directamente con la organización"],
        [/Em emerg[eê]ncia, acione 192/gi, "En emergencia, llame al 192"],
        [/Em risco imediato, acione tamb[eé]m 190 ou 192/gi, "En riesgo inmediato, llame tambien al 190 o 192"],
        [/Por seguran[cç]a, o endere[cç]o [eé] sigiloso/gi, "Por seguridad, la dirección es confidencial"],
        [/Busque orienta[cç][aã]o pela rede oficial antes de deslocamento/gi, "Busque orientación en la red oficial antes de desplazarse"],
        [/A unidade articula politicas e rede; confirme se realiza atendimento direto antes de se deslocar/gi, "La unidad articula políticas y red; confirme si realiza atención directa antes de desplazarse"],
        [/Procure o Centro Pop para cadastro e encaminhamento; vagas e regras podem variar/gi, "Busque el Centro Pop para registro y derivación; cupos y reglas pueden variar"],
        [/vagas, inscri[cç][aã]o e calend[aá]rio/gi, "cupos, inscripción y calendario"],
        [/Leve documento de identifica[cç][aã]o e Carteira de Trabalho/gi, "Lleve documento de identidad y Tarjeta de Trabajo"],
        [/Confirme funcionamento antes de ir/gi, "Confirme funcionamiento antes de ir"],
      ];

    var result = translateDateVerb(textValue);
    replacements.forEach(function (item) {
      result = result.replace(item[0], item[1]);
    });
    if (/\b(n[aã]o|fonte|telefone|endere[cç]o|hor[aá]rio|atendimento|agendamento|funcionamento|servi[cç]o|antes de se deslocar)\b/i.test(result)) {
      return currentLang === "en"
        ? "Reference information. Confirm details with the official source before traveling."
        : "Información de referencia. Confirme los detalles con la fuente oficial antes de desplazarse.";
    }
    return result;
  }

  function translateAddress(value) {
    if (currentLang === "pt") return value;
    var raw = translateKnownValue(value);
    if (!raw) return raw;
    if (currentLang === "en") {
      return raw
        .replace(/^Solicitacao pelo Centro Pop/i, "Request through Centro Pop")
        .replace(/^Solicitação pelo Centro Pop/i, "Request through Centro Pop")
        .replace(/^Localizacoes diversas no municipio/i, "Multiple locations in the city")
        .replace(/^Localizações diversas no município/i, "Multiple locations in the city")
        .replace(/^Rede municipal de atendimento; consulte o servico desejado/i, "Municipal service network; check the specific service")
        .replace(/^Rede municipal de atendimento; consulte o serviço desejado/i, "Municipal service network; check the specific service")
        .replace(/^Atendimento acionado por telefone ou pelo Centro Pop/i, "Service requested by phone or through Centro Pop");
    }
    return raw
      .replace(/^Solicitacao pelo Centro Pop/i, "Solicitud por el Centro Pop")
      .replace(/^Solicitação pelo Centro Pop/i, "Solicitud por el Centro Pop")
      .replace(/^Localizacoes diversas no municipio/i, "Varias ubicaciones en el municipio")
      .replace(/^Localizações diversas no município/i, "Varias ubicaciones en el municipio")
      .replace(/^Rede municipal de atendimento; consulte o servico desejado/i, "Red municipal de atención; consulte el servicio específico")
      .replace(/^Rede municipal de atendimento; consulte o serviço desejado/i, "Red municipal de atención; consulte el servicio específico")
      .replace(/^Atendimento acionado por telefone ou pelo Centro Pop/i, "Atención solicitada por teléfono o por el Centro Pop");
  }

  function translateHours(value) {
    if (currentLang === "pt") return value;
    var raw = translateKnownValue(value);
    if (!raw) return raw;
    var result = raw;
    if (currentLang === "en") {
      result = result
        .replace(/24 horas|24h por dia/gi, "24 hours")
        .replace(/24h/gi, "24 hours")
        .replace(/Todos os dias/gi, "Every day")
        .replace(/Segunda a sexta-feira|Segunda a sexta|Segunda à sexta|Segunda a Sexta/gi, "Monday to Friday")
        .replace(/Segunda a quinta/gi, "Monday to Thursday")
        .replace(/sexta-feira|sexta/gi, "Friday")
        .replace(/s[aá]bado/gi, "Saturday")
        .replace(/domingo/gi, "Sunday")
        .replace(/dias [uú]teis/gi, "business days")
        .replace(/Hor[aá]rio Comercial/gi, "business hours")
        .replace(/das /gi, "from ")
        .replace(/aos /gi, "to ")
        .replace(/\b[aà]s\b/gi, "to")
        .replace(/\bas\b/gi, "to")
        .replace(/ e das /gi, " and from ")
        .replace(/; confirmar/gi, "; confirm")
        .replace(/confirmar dias de atendimento/gi, "confirm service days")
        .replace(/confirmar hor[aá]rio/gi, "confirm hours")
        .replace(/exceto feriados e pontos facultativos/gi, "except holidays and optional government closure days")
        .replace(/exceto feriados/gi, "except holidays")
        .replace(/mediante agendamento pr[eé]vio/gi, "by prior appointment")
        .replace(/Atendimento regular a confirmar no canal oficial/gi, "Regular service to be confirmed with the official channel")
        .replace(/Funcionamento ininterrupto/gi, "Continuous operation")
        .replace(/Atendimento porta aberta, sem agendamento/gi, "Walk-in service, no appointment");
    } else {
      result = result
        .replace(/24 horas|24h por dia/gi, "24 horas")
        .replace(/24h/gi, "24 horas")
        .replace(/Todos os dias/gi, "Todos los dias")
        .replace(/Segunda a sexta-feira|Segunda a sexta|Segunda à sexta|Segunda a Sexta/gi, "Lunes a viernes")
        .replace(/Segunda a quinta/gi, "Lunes a jueves")
        .replace(/sexta-feira|sexta/gi, "viernes")
        .replace(/s[aá]bado/gi, "sabado")
        .replace(/domingo/gi, "domingo")
        .replace(/dias [uú]teis/gi, "días hábiles")
        .replace(/Hor[aá]rio Comercial/gi, "horario comercial")
        .replace(/das /gi, "de ")
        .replace(/\b[aà]s\b/gi, "a las")
        .replace(/\bas\b/gi, "a las")
        .replace(/ e das /gi, " y de ")
        .replace(/; confirmar/gi, "; confirmar")
        .replace(/confirmar dias de atendimento/gi, "confirmar días de atención")
        .replace(/confirmar hor[aá]rio/gi, "confirmar horario")
        .replace(/exceto feriados e pontos facultativos/gi, "excepto feriados y cierres administrativos")
        .replace(/exceto feriados/gi, "excepto feriados")
        .replace(/mediante agendamento pr[eé]vio/gi, "con cita previa")
        .replace(/Atendimento regular a confirmar no canal oficial/gi, "Atención regular a confirmar en el canal oficial")
        .replace(/Funcionamento ininterrupto/gi, "Funcionamiento continuo")
        .replace(/Atendimento porta aberta, sem agendamento/gi, "Atención sin cita");
    }
    var residualHours = currentLang === "en"
      ? /\b(segunda(?:-feira)?|ter[cç]a-feira|quarta-feira|quinta-feira|sexta-feira|atendimento|agendamento|funcionamento|dias [uú]teis|ponto facultativo|hor[aá]rio|confirm o)\b/i
      : /\b(segunda-feira|ter[cç]a-feira|quarta-feira|quinta-feira|sexta-feira|atendimento|agendamento|dias [uú]teis|ponto facultativo|horário|horario n[aã]o informado)\b/i;
    if (residualHours.test(result)) {
      return currentLang === "en"
        ? "Confirm hours with the official source"
        : "Confirme el horario con la fuente oficial";
    }
    return result;
  }

  function translateReason(reason) {
    if (currentLang === "pt") return reason;
    var exact = {
      en: {
        "Fonte não registrada": "Official source not registered",
        "Fonte nao registrada": "Official source not registered",
        "Telefone não confirmado": "Phone not confirmed",
        "Telefone nao confirmado": "Phone not confirmed",
        "Cidade não informada": "City not informed",
        "Cidade nao informada": "City not informed",
        "Horário a confirmar": "Hours to be confirmed",
        "Horario a confirmar": "Hours to be confirmed",
        "Endereço a confirmar": "Address to be confirmed",
        "Endereco a confirmar": "Address to be confirmed",
        "Telefone direto não informado na fonte": "Direct phone not published by the source",
        "Telefone direto nao informado na fonte": "Direct phone not published by the source",
        "Telefone direto não informado na fonte oficial": "Direct phone not published by the official source",
        "Telefone direto nao informado na fonte oficial": "Direct phone not published by the official source",
        "Horário não informado na fonte oficial": "Hours not published by the official source",
        "Horario nao informado na fonte oficial": "Hours not published by the official source",
        "Atendimento mediante agendamento prévio": "Service by prior appointment",
        "Atendimento juridico": "Legal assistance",
        "Regularizacao migratoria": "Migration regularization",
        "Cadastro de Pessoas Fisicas para imigrante": "CPF registration for immigrants",
        "Intermediacao de vagas e orientacao profissional": "Job placement and career guidance",
        "Curso de lingua portuguesa para estrangeiros": "Portuguese language course for foreigners",
        "Atendimento a pessoas em situacao de rua": "Service for people experiencing homelessness",
        "Encaminha para rede de acolhimento": "Refers to the shelter network",
        "Equipamento publico de seguranca alimentar": "Public food security service",
        "Endereco nao divulgado por seguranca": "Address not disclosed for safety",
        "Acesso por encaminhamento, nao por chegada direta": "Access by referral, not by direct arrival",
      },
      es: {
        "Fonte não registrada": "Fuente oficial no registrada",
        "Fonte nao registrada": "Fuente oficial no registrada",
        "Telefone não confirmado": "Teléfono no confirmado",
        "Telefone nao confirmado": "Teléfono no confirmado",
        "Cidade não informada": "Ciudad no informada",
        "Cidade nao informada": "Ciudad no informada",
        "Horário a confirmar": "Horario a confirmar",
        "Horario a confirmar": "Horario a confirmar",
        "Endereço a confirmar": "Dirección a confirmar",
        "Endereco a confirmar": "Dirección a confirmar",
        "Telefone direto não informado na fonte": "Teléfono directo no publicado por la fuente",
        "Telefone direto nao informado na fonte": "Teléfono directo no publicado por la fuente",
        "Telefone direto não informado na fonte oficial": "Teléfono directo no publicado por la fuente oficial",
        "Telefone direto nao informado na fonte oficial": "Teléfono directo no publicado por la fuente oficial",
        "Horário não informado na fonte oficial": "Horario no publicado por la fuente oficial",
        "Horario nao informado na fonte oficial": "Horario no publicado por la fuente oficial",
        "Atendimento mediante agendamento prévio": "Atención con cita previa",
        "Atendimento juridico": "Asistencia jurídica",
        "Regularizacao migratoria": "Regularización migratoria",
        "Cadastro de Pessoas Fisicas para imigrante": "Registro CPF para inmigrantes",
        "Intermediacao de vagas e orientacao profissional": "Intermediación de vacantes y orientación profesional",
        "Curso de lingua portuguesa para estrangeiros": "Curso de portugués para extranjeros",
        "Atendimento a pessoas em situacao de rua": "Atención a personas en situación de calle",
        "Encaminha para rede de acolhimento": "Deriva a la red de acogida",
        "Equipamento publico de seguranca alimentar": "Servicio publico de seguridad alimentaria",
        "Endereco nao divulgado por seguranca": "Dirección no divulgada por seguridad",
        "Acesso por encaminhamento, nao por chegada direta": "Acceso por derivación, no por llegada directa",
      },
    };
    if (exact[currentLang][reason]) return exact[currentLang][reason];
    return translateDataText(reason);
  }

  function translateReasons(service) {
    var reasons = service.reasons || [];
    if (currentLang === "pt") {
      return reasons.length ? reasons.join(" - ") : t("basicData");
    }

    var translated = [];
    if (!service.sourceRegistered || !service.sourceUrl) translated.push(translateReason("Fonte não registrada"));
    if (!service.contactConfirmed || !service.phone) translated.push(translateReason("Telefone não confirmado"));
    if (!service.addressSpecific || !service.address) translated.push(translateReason("Endereço a confirmar"));
    if (!service.hoursInformed || !service.hours) translated.push(translateReason("Horário a confirmar"));
    if (reasons.some(function (reason) { return /agendamento|cita|appointment/i.test(reason); })) {
      translated.push(t("appointmentRequired"));
    }
    if (!translated.length && reasons.length) translated.push(t("additionalReview"));
    return Array.from(new Set(translated)).join(" - ") || t("basicData");
  }

  function showToast(text) {
    var el = $("toast");
    el.textContent = text;
    el.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      el.classList.remove("show");
    }, 2200);
  }

  function text(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function attr(selector, name, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(name, value);
  }

  function translateStatic() {
    document.documentElement.lang = t("htmlLang");
    document.title = t("title");
    attr('meta[name="description"]', "content", t("metaDescription"));
    text(".skip-link", t("skip"));
    attr(".brand", "aria-label", "Portal do Imigrante - " + t("footerHome"));
    text(".brand small", t("brandSub"));
    attr(".header-actions", "aria-label", t("headerAria"));
    attr(".language", "aria-label", t("languageAria"));
    $("fontButton").textContent = t("font");
    $("fontButton").setAttribute("aria-label", t("fontAria"));
    $("contrastButton").textContent = t("contrast");
    $("contrastButton").setAttribute("aria-label", t("contrastAria"));
    attr(".emergency-bar", "aria-label", t("emergencyAria"));
    attr(".trust", "aria-label", t("trustAria"));
    attr(".base-stats", "aria-label", t("baseStatusAria"));
    attr("#pagination", "aria-label", t("paginationAria"));
    text(".emergency-row > strong", t("emergencyTitle"));
    text('.emergency-row a[href="tel:190"] span', t("police"));
    text('.emergency-row a[href="tel:192"] span', t("ambulance"));
    text('.emergency-row a[href="tel:193"] span', t("firefighters"));
    text('.emergency-row a[href="tel:180"] span', t("women"));
    text('.emergency-row a[href="tel:100"] span', t("humanRights"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.dataset.i18n;
      if (t(key)) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.dataset.i18nPlaceholder;
      if (t(key)) el.setAttribute("placeholder", t(key));
    });

    var statLabels = document.querySelectorAll(".base-badge span");
    if (statLabels[0]) statLabels[0].textContent = t("mappedServices");
    if (statLabels[1]) statLabels[1].textContent = t("officialSource");
    if (statLabels[2]) statLabels[2].textContent = t("reviewedUnits");
  }

  function setLanguage(lang) {
    currentLang = i18n[lang] ? lang : "pt";
    localStorage.setItem("pi_lang", currentLang);
    translateStatic();
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      var active = btn.dataset.lang === currentLang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    populateCategories();
    populateRegions();
    populateStates();
    populateCities();
    renderSteps();
    renderServices();
  }

  function renderSteps() {
    var grid = $("stepsGrid");
    grid.innerHTML = stepDefinitions
      .map(function (step, index) {
        var done = Boolean(checklist[step.id]);
        var content = t("steps")[step.id];
        return [
          '<article class="step ' + (done ? "done" : "") + '">',
          '<div class="step-top"><span class="step-number">' + (index + 1) + '</span><span class="step-icon" aria-hidden="true">' + step.icon + "</span></div>",
          "<h3>" + escapeHTML(content.title) + "</h3>",
          "<p>" + escapeHTML(content.text) + "</p>",
          '<label><input type="checkbox" data-step="' + step.id + '" ' + (done ? "checked" : "") + "> " + (done ? t("done") : t("markDone")) + "</label>",
          '<button class="text-button" type="button" data-step-category="' + step.category + '">' + t("seeServices") + "</button>",
          "</article>",
        ].join("");
      })
      .join("");

    grid.querySelectorAll("[data-step]").forEach(function (input) {
      input.addEventListener("change", function () {
        checklist[input.dataset.step] = input.checked;
        localStorage.setItem("pi_checklist", JSON.stringify(checklist));
        renderSteps();
        showToast(input.checked ? t("stepDoneToast") : t("stepOpenToast"));
      });
    });

    grid.querySelectorAll("[data-step-category]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.dataset.stepCategory === "outros") {
          $("oficiais").scrollIntoView({ behavior: "smooth" });
          return;
        }
        $("category").value = btn.dataset.stepCategory;
        page = 1;
        renderServices();
        $("busca").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function uniqueSorted(list) {
    return Array.from(new Set(list.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b, "pt-BR");
    });
  }

  function option(value, label) {
    return '<option value="' + escapeHTML(value) + '">' + escapeHTML(label) + "</option>";
  }

  function populateCategories() {
    var previous = $("category").value;
    var html = "";
    Object.keys(t("categories")).forEach(function (key) {
      html += option(key === "todos" ? "" : key, categoryLabel(key));
    });
    $("category").innerHTML = html;
    $("category").value = previous;
  }

  function populateRegions() {
    var previous = $("region").value;
    $("region").innerHTML = option("", t("all")) + uniqueSorted(data.map(function (service) { return service.region; })).map(function (value) {
      var labels = {
        en: { Norte: "North", Nordeste: "Northeast", "Centro-Oeste": "Central-West", Sudeste: "Southeast", Sul: "South", "Não informado": "Not informed" },
        es: { Norte: "Norte", Nordeste: "Nordeste", "Centro-Oeste": "Centro-Oeste", Sudeste: "Sudeste", Sul: "Sur", "Não informado": "No informado" },
      };
      return option(value, (labels[currentLang] && labels[currentLang][value]) || value);
    }).join("");
    $("region").value = previous;
  }

  function populateStates() {
    var region = $("region").value;
    var previous = $("state").value;
    var list = data.filter(function (service) { return !region || service.region === region; }).map(function (service) { return service.state; });
    $("state").innerHTML = option("", t("allMasc")) + uniqueSorted(list).map(function (value) {
      return option(value, translateKnownValue(value));
    }).join("");
    $("state").value = Array.from($("state").options).some(function (item) { return item.value === previous; }) ? previous : "";
  }

  function populateCities() {
    var region = $("region").value;
    var state = $("state").value;
    var previous = $("city").value;
    var list = data
      .filter(function (service) { return (!region || service.region === region) && (!state || service.state === state); })
      .map(function (service) { return service.city; });
    $("city").innerHTML = option("", t("all")) + uniqueSorted(list).map(function (value) {
      return option(value, translateKnownValue(value));
    }).join("");
    $("city").value = Array.from($("city").options).some(function (item) { return item.value === previous; }) ? previous : "";
  }

  function documentsFor(category) {
    return t("docs")[category] || t("docs").outros;
  }

  function filtered() {
    var q = normalize($("query").value);
    var region = $("region").value;
    var state = $("state").value;
    var city = $("city").value;
    var category = $("category").value;
    return data
      .filter(function (service) {
        var hay = normalize([service.name, service.category, service.region, service.state, service.city, service.address].join(" "));
        return (!q || hay.indexOf(q) >= 0) &&
          (!region || service.region === region) &&
          (!state || service.state === state) &&
          (!city || service.city === city) &&
          (!category || service.category === category);
      })
      .sort(function (a, b) {
        var official = Number(Boolean(b.sourceRegistered)) - Number(Boolean(a.sourceRegistered));
        var priority = { Urgente: 0, Alta: 1, "Media": 2, "Média": 2, Baixa: 3 };
        var aPriority = Object.prototype.hasOwnProperty.call(priority, a.priority) ? priority[a.priority] : 9;
        var bPriority = Object.prototype.hasOwnProperty.call(priority, b.priority) ? priority[b.priority] : 9;
        return official || (aPriority - bPriority) || a.name.localeCompare(b.name, "pt-BR");
      });
  }

  function card(service) {
    var canCall = service.sourceRegistered && service.contactConfirmed && service.phone;
    var canRoute = service.sourceRegistered && service.addressSpecific && service.map;
    var dial = canCall ? (service.phone.match(/\+?\d[\d\s().-]{2,}/) || [service.phone])[0].replace(/[^0-9+]/g, "") : "";
    var phone = canCall ? '<a href="tel:' + escapeHTML(dial) + '">' + t("call") + "</a>" : "";
    var route = canRoute ? '<a class="route" href="' + escapeHTML(service.map) + '" target="_blank" rel="noopener noreferrer">' + t("route") + "</a>" : "";
    var source = service.sourceRegistered && service.sourceUrl ? '<a href="' + escapeHTML(service.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + t("source") + "</a>" : "";
    var saved = favorites.has(service.id);
    var reasons = translateReasons(service);
    var verified = service.verified ? " - " + t("checkedAt") + " " + escapeHTML(service.verified) : "";
    var notice = service.notice ? translateDataText(service.notice) : "";

    return [
      '<article class="service-card">',
      "<header><div><h3>" + escapeHTML(service.name) + '</h3><div class="location">' + escapeHTML(service.city) + " - " + escapeHTML(service.state) + '</div></div><span class="tag">' + escapeHTML(categoryLabel(service.category)) + "</span></header>",
      '<div class="warning"><b>' + t("confirmBefore") + "</b> " + escapeHTML(reasons) + ".</div>",
      '<dl class="meta">',
      "<div><dt>" + t("address") + "</dt><dd>" + escapeHTML(translateAddress(service.address || t("notConfirmed"))) + "</dd></div>",
      "<div><dt>" + t("phone") + "</dt><dd>" + escapeHTML(translateKnownValue(service.phoneLabel || t("notConfirmed"))) + "</dd></div>",
      "<div><dt>" + t("hours") + "</dt><dd>" + escapeHTML(translateHours(service.hours || t("notConfirmed"))) + "</dd></div>",
      "<div><dt>" + t("bring") + "</dt><dd>" + escapeHTML(documentsFor(service.category)) + "</dd></div>",
      "</dl>",
      '<div class="service-actions">' + phone + route + source + '<button type="button" data-favorite="' + escapeHTML(service.id) + '" class="' + (saved ? "saved" : "") + '">' + (saved ? t("saved") : t("save")) + "</button></div>",
      '<div class="service-note">' + t("recordNote") + " - " + t("reviewPriority") + ": " + escapeHTML(priorityLabel(service.priority)) + verified + " - " + (notice ? escapeHTML(notice) : t("confirmTravel")) + "</div>",
      "</article>",
    ].join("");
  }

  function renderPagination(total) {
    var pages = Math.ceil(total / pageSize);
    if (pages <= 1) {
      $("pagination").innerHTML = "";
      return;
    }

    var start = Math.max(1, page - 2);
    var end = Math.min(pages, start + 4);
    start = Math.max(1, end - 4);
    var html = "";
    if (page > 1) html += '<button type="button" data-page="' + (page - 1) + '" aria-label="' + t("prevPage") + '">&lt;</button>';
    for (var p = start; p <= end; p += 1) {
      html += '<button type="button" data-page="' + p + '" class="' + (p === page ? "active" : "") + '" aria-current="' + (p === page ? "page" : "false") + '">' + p + "</button>";
    }
    if (page < pages) html += '<button type="button" data-page="' + (page + 1) + '" aria-label="' + t("nextPage") + '">&gt;</button>';
    $("pagination").innerHTML = html;
    $("pagination").querySelectorAll("[data-page]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        page = Number(btn.dataset.page);
        renderServices();
        $("busca").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function renderServices() {
    var list = filtered();
    var pages = Math.max(1, Math.ceil(list.length / pageSize));
    if (page > pages) page = 1;
    var shown = list.slice((page - 1) * pageSize, page * pageSize);
    $("resultCount").textContent = list.length + " " + t("service") + (list.length === 1 ? " " + t("foundOne") : "s " + t("foundMany"));
    $("serviceGrid").innerHTML = shown.length
      ? shown.map(card).join("")
      : '<div class="empty"><b>' + t("noServiceTitle") + "</b><p>" + t("noServiceText") + "</p></div>";
    renderPagination(list.length);
    $("serviceGrid").querySelectorAll("[data-favorite]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.dataset.favorite;
        if (favorites.has(id)) favorites.delete(id);
        else favorites.add(id);
        localStorage.setItem("pi_favorites", JSON.stringify(Array.from(favorites)));
        renderServices();
        showToast(favorites.has(id) ? t("favoriteAdded") : t("favoriteRemoved"));
      });
    });
  }

  function clearFilters() {
    $("query").value = "";
    $("region").value = "";
    $("state").value = "";
    $("city").value = "";
    populateStates();
    $("state").value = "";
    populateCities();
    $("city").value = "";
    $("category").value = "";
    page = 1;
    renderServices();
  }

  async function init() {
    try {
      var payload = window.PORTAL_DATA || null;
      if (!payload) {
        var response = await fetch("data/services.json");
        if (!response.ok) throw new Error("Failed to load database");
        payload = await response.json();
      }

      data = payload.services || [];
      meta = payload.meta || {};
      $("baseTotal").textContent = String(data.length);
      $("officialTotal").textContent = String((meta.stats && meta.stats.withSource) || data.filter(function (service) { return service.sourceRegistered; }).length);
      var coverage = meta.coverageSummary || {};
      $("coverageTotal").textContent = String(coverage.reviewedUnits || Object.keys(meta.coverage || {}).length) + "/" + String(coverage.totalUnits || 27);
      setLanguage(currentLang);
    } catch (error) {
      translateStatic();
      $("resultCount").textContent = t("baseLoadError");
      $("serviceGrid").innerHTML = '<div class="empty"><b>' + t("baseUnavailable") + "</b><p>" + t("baseUnavailableText") + "</p></div>";
    }
  }

  $("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    page = 1;
    renderServices();
  });
  $("query").addEventListener("input", function () { page = 1; renderServices(); });
  $("category").addEventListener("change", function () { page = 1; renderServices(); });
  $("region").addEventListener("change", function () { populateStates(); populateCities(); page = 1; renderServices(); });
  $("state").addEventListener("change", function () { populateCities(); page = 1; renderServices(); });
  $("city").addEventListener("change", function () { page = 1; renderServices(); });
  $("clearFilters").addEventListener("click", clearFilters);
  $("resetSteps").addEventListener("click", function () {
    checklist = {};
    localStorage.setItem("pi_checklist", "{}");
    renderSteps();
    showToast(t("resetToast"));
  });
  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.dataset.lang);
    });
  });
  $("contrastButton").addEventListener("click", function () {
    var active = document.body.classList.toggle("contrast");
    this.setAttribute("aria-pressed", String(active));
    localStorage.setItem("pi_contrast", active ? "1" : "0");
  });
  $("fontButton").addEventListener("click", function () {
    var current = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--font-size"), 10) || 16;
    var next = current >= 20 ? 16 : current + 2;
    document.documentElement.style.setProperty("--font-size", next + "px");
    localStorage.setItem("pi_font", String(next));
  });

  if (localStorage.getItem("pi_contrast") === "1") {
    document.body.classList.add("contrast");
    $("contrastButton").setAttribute("aria-pressed", "true");
  }
  document.documentElement.style.setProperty("--font-size", (localStorage.getItem("pi_font") || "16") + "px");
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
  init();
})();
