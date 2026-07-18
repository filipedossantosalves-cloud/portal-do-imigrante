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
      stepsKicker: "Jornada essencial",
      stepsTitle: "Seus 6 primeiros passos",
      resetSteps: "Reiniciar checklist",
      supportKicker: "Rede de apoio",
      searchTitle: "Encontre servicos perto de voce",
      searchNote: "A base esta em validacao. Confirme telefone, endereco e horario antes de sair.",
      mappedServices: "servicos mapeados",
      officialSource: "com fonte oficial",
      reviewedUnits: "unidades revisadas",
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
      stepsKicker: "Essential journey",
      stepsTitle: "Your first 6 steps",
      resetSteps: "Reset checklist",
      supportKicker: "Support network",
      searchTitle: "Find services near you",
      searchNote: "The database is under validation. Confirm phone, address and hours before leaving.",
      mappedServices: "mapped services",
      officialSource: "with official source",
      reviewedUnits: "reviewed units",
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
      metaDescription: "Orientacion gratuita y segura para que migrantes y refugiados encuentren servicios esenciales en Brasil.",
      title: "Portal do Imigrante | Orientacion segura y gratuita",
      skip: "Saltar al contenido",
      brandSub: "Informacion para recomenzar con seguridad",
      headerAria: "Accesibilidad e idioma",
      languageAria: "Idioma de la interfaz",
      font: "A+",
      fontAria: "Aumentar tamano del texto",
      contrast: "Alto contraste",
      contrastAria: "Alternar alto contraste",
      emergencyAria: "Canales nacionales de emergencia",
      emergencyTitle: "Necesita ayuda ahora?",
      police: "Policia",
      women: "Violencia contra la mujer",
      humanRights: "Derechos Humanos",
      free: "Gratis - sin registro - sin intermediarios",
      heroTitle: "Encuentre orientacion para sus primeros pasos en Brasil",
      heroText: "Regularizacion, CPF, salud, asistencia, acogida, trabajo y educacion en un recorrido sencillo.",
      findService: "Encontrar un servicio",
      seeSteps: "Ver los 6 pasos",
      safetyTitle: "Su seguridad es lo primero",
      safetyText: "El portal no cobra, no solicita documentos y no sustituye a organismos publicos. Nunca pague a terceros por esta orientacion.",
      trustPrivacyTitle: "Privacidad por defecto",
      trustPrivacyText: "No se solicita nombre, CPF ni ubicacion.",
      trustDataTitle: "Transparencia de datos",
      trustDataText: "La informacion no validada aparece con una advertencia clara.",
      trustSourcesTitle: "Fuentes oficiales primero",
      trustSourcesText: "Los enlaces nacionales llevan directamente a paginas del gobierno.",
      stepsKicker: "Ruta esencial",
      stepsTitle: "Sus 6 primeros pasos",
      resetSteps: "Reiniciar checklist",
      supportKicker: "Red de apoyo",
      searchTitle: "Encuentre servicios cerca de usted",
      searchNote: "La base esta en validacion. Confirme telefono, direccion y horario antes de salir.",
      mappedServices: "servicios mapeados",
      officialSource: "con fuente oficial",
      reviewedUnits: "unidades revisadas",
      queryLabel: "Que busca?",
      queryPlaceholder: "Ej.: hospital, CRAS, empleo",
      regionLabel: "Region",
      stateLabel: "Estado",
      cityLabel: "Ciudad",
      categoryLabel: "Necesidad",
      all: "Todas",
      allMasc: "Todos",
      searchButton: "Buscar",
      loadingServices: "Cargando servicios...",
      clearFilters: "Limpiar filtros",
      officialKicker: "Empiece aqui",
      officialTitle: "Canales oficiales nacionales",
      officialNote: "Contenido verificado el 28 de junio de 2026.",
      migration: "Regularizacion migratoria",
      migrationText: "Servicios de inmigracion de la Policia Federal",
      cpf: "CPF",
      cpfText: "Orientaciones de la Receita Federal",
      sus: "Salud en el SUS",
      susText: "Acceso para migrantes, refugiados y apatridas",
      protection: "Proteccion y denuncias",
      protectionText: "Disque 100 y Ligue 180",
      openGov: "Abrir gov.br ->",
      privacyKicker: "Privacidad",
      privacyTitle: "No necesita identificarse",
      privacyText: "Favoritos y checklist quedan solo en este dispositivo. El portal no envia estos datos a un servidor. Al abrir mapas o sitios oficiales, se aplican las politicas de esos servicios externos.",
      footerNote: "Proyecto independiente de orientacion humanitaria. No es un organismo gubernamental.",
      footerHome: "Inicio",
      footerSteps: "6 pasos",
      footerSources: "Fuentes oficiales",
      categories: {
        todos: "Todas las necesidades",
        saude: "Salud",
        assistencia: "Asistencia social",
        acolhimento: "Acogida",
        trabalho: "Trabajo",
        alimentacao: "Alimentacion",
        outros: "Otros",
      },
      steps: {
        regularizacao: { title: "Regularizacion migratoria", text: "Consulte a la Policia Federal o apoyo juridico gratuito." },
        cpf: { title: "CPF", text: "Vea como solicitar o regularizar su CPF." },
        acolhimento: { title: "Emergencia y acogida", text: "Busque proteccion, refugio y alimentacion segura." },
        saude: { title: "Salud y Tarjeta SUS", text: "Encuentre atencion de salud. En urgencia, llame al 192." },
        assistencia: { title: "Asistencia social", text: "Localice CRAS, CREAS, Centro POP y orientacion social." },
        integracao: { title: "Trabajo, escuela e integracion", text: "Busque empleo, capacitacion y caminos para estudiar." },
      },
      done: "Concluido",
      markDone: "Marcar como hecho",
      seeServices: "Ver servicios",
      stepDoneToast: "Paso concluido.",
      stepOpenToast: "Paso reabierto.",
      resetToast: "Checklist reiniciado.",
      confirmBefore: "Confirme antes de ir.",
      basicData: "Datos basicos disponibles",
      address: "Direccion",
      phone: "Telefono",
      hours: "Horario",
      bring: "Que llevar",
      notConfirmed: "No confirmado",
      call: "Llamar",
      route: "Abrir ruta",
      source: "Fuente oficial",
      saved: "Guardado",
      save: "Guardar",
      recordNote: "Registro de la base informativa",
      reviewPriority: "prioridad de revision",
      checkedAt: "verificado el",
      confirmTravel: "confirme antes del desplazamiento",
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
      prevPage: "Pagina anterior",
      nextPage: "Pagina siguiente",
      docs: {
        saude: "Si tiene: documento de identidad, CPF o Tarjeta SUS. La falta de documentos no debe impedir la atencion inicial.",
        assistencia: "Si tiene: documento personal, CPF y comprobante de domicilio. Confirme requisitos con la unidad.",
        acolhimento: "Lleve los documentos que tenga. En riesgo inmediato, priorice su seguridad.",
        trabalho: "Si tiene: CPF, identificacion y Tarjeta de Trabajo Digital.",
        alimentacao: "Confirme si hay registro, derivacion o documento exigido.",
        outros: "Confirme en el canal oficial que documentos son necesarios.",
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
    text(".emergency-row > strong", t("emergencyTitle"));
    text('.emergency-row a[href="tel:190"] span', t("police"));
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
      return option(value, value);
    }).join("");
    $("region").value = previous;
  }

  function populateStates() {
    var region = $("region").value;
    var previous = $("state").value;
    var list = data.filter(function (service) { return !region || service.region === region; }).map(function (service) { return service.state; });
    $("state").innerHTML = option("", t("allMasc")) + uniqueSorted(list).map(function (value) {
      return option(value, value);
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
      return option(value, value);
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
        return official || ((priority[a.priority] || 9) - (priority[b.priority] || 9)) || a.name.localeCompare(b.name, "pt-BR");
      });
  }

  function card(service) {
    var canRoute = service.addressSpecific && service.map;
    var dial = service.contactConfirmed ? (service.phone.match(/\+?\d[\d\s().-]{2,}/) || [service.phone])[0].replace(/[^0-9+]/g, "") : "";
    var phone = service.contactConfirmed ? '<a href="tel:' + escapeHTML(dial) + '">' + t("call") + "</a>" : "";
    var route = canRoute ? '<a class="route" href="' + escapeHTML(service.map) + '" target="_blank" rel="noopener noreferrer">' + t("route") + "</a>" : "";
    var source = service.sourceUrl ? '<a href="' + escapeHTML(service.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + t("source") + "</a>" : "";
    var saved = favorites.has(service.id);
    var reasons = service.reasons && service.reasons.length ? service.reasons.join(" - ") : t("basicData");
    var verified = service.verified ? " - " + t("checkedAt") + " " + escapeHTML(service.verified) : "";

    return [
      '<article class="service-card">',
      "<header><div><h3>" + escapeHTML(service.name) + '</h3><div class="location">' + escapeHTML(service.city) + " - " + escapeHTML(service.state) + '</div></div><span class="tag">' + escapeHTML(categoryLabel(service.category)) + "</span></header>",
      '<div class="warning"><b>' + t("confirmBefore") + "</b> " + escapeHTML(reasons) + ".</div>",
      '<dl class="meta">',
      "<div><dt>" + t("address") + "</dt><dd>" + escapeHTML(service.address || t("notConfirmed")) + "</dd></div>",
      "<div><dt>" + t("phone") + "</dt><dd>" + escapeHTML(service.phoneLabel || t("notConfirmed")) + "</dd></div>",
      "<div><dt>" + t("hours") + "</dt><dd>" + escapeHTML(service.hours || t("notConfirmed")) + "</dd></div>",
      "<div><dt>" + t("bring") + "</dt><dd>" + escapeHTML(documentsFor(service.category)) + "</dd></div>",
      "</dl>",
      '<div class="service-actions">' + phone + route + source + '<button type="button" data-favorite="' + escapeHTML(service.id) + '" class="' + (saved ? "saved" : "") + '">' + (saved ? t("saved") : t("save")) + "</button></div>",
      '<div class="service-note">' + t("recordNote") + " - " + t("reviewPriority") + ": " + escapeHTML(service.priority) + verified + " - " + t("confirmTravel") + "</div>",
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
    populateStates();
    populateCities();
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
