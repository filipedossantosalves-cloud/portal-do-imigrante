"use strict";

(function () {
  var i18n = {
    pt: {
      htmlLang: "pt-BR",
      metaDescription: "Guia de direitos, documentos e canais oficiais para migrantes, solicitantes de refúgio e pessoas refugiadas no Brasil.",
      pageTitle: "Guia de direitos e documentos | Portal do Imigrante",
      skip: "Pular para o conteúdo",
      guideLabel: "Guia de direitos e documentos",
      backPortal: "Voltar ao portal",
      backPortalAria: "Voltar ao Portal do Imigrante",
      languageAria: "Idioma da interface",
      kicker: "Orientação nacional",
      title: "Direitos e documentos no Brasil",
      lead: "Informações práticas para migrantes, solicitantes de refúgio e pessoas refugiadas acessarem direitos e canais oficiais com mais segurança.",
      verified: "Fontes verificadas em 18 de julho de 2026.",
      privacyTitle: "Proteja seus dados",
      privacyText: "Não envie documentos, CPF ou dados pessoais ao Portal do Imigrante. O portal não realiza solicitações nem agendamentos.",
      sectionNavAria: "Seções do guia",
      navStatus: "Situação migratória", navDocuments: "Documentos", navRights: "Direitos essenciais", navOther: "Outros procedimentos", navHelp: "Onde buscar ajuda",
      statusKicker: "Primeiro passo", statusTitle: "Se você está sem documentos migratórios",
      statusText: "Estar sem documentação migratória não elimina o acesso ao SUS, à educação pública ou à assistência social. Procure regularizar sua situação o quanto antes e busque orientação gratuita se receber uma notificação ou tiver dificuldade de atendimento.",
      openPf: "Abrir serviços de migração da Polícia Federal", openPartners: "Encontrar apoio gratuito do ACNUR e parceiros",
      legalNote: "Este guia oferece orientação geral e não substitui atendimento jurídico. Regras e procedimentos podem mudar; confirme sempre na fonte oficial.",
      documentsKicker: "Identificação e registro", documentsTitle: "Documentos importantes",
      cpfTitle: "Cadastro de Pessoa Física", cpfText: "Brasileiros e estrangeiros, residentes ou não, podem solicitar CPF. Use apenas os canais oficiais; o serviço é gratuito nos canais da Receita Federal, embora unidades conveniadas possam cobrar a tarifa informada pelo governo.", cpfAction: "Solicitar ou consultar CPF no gov.br",
      dprnmTitle: "Protocolo de Refúgio e DPRNM", dprnmText: "Quem solicita refúgio recebe protocolo e pode obter o DPRNM. Esses documentos comprovam a situação regular como solicitante e servem como identificação no Brasil. Observe a validade e renove antes do vencimento.", dprnmAction: "Obter o DPRNM", renewAction: "Como renovar",
      crnmTitle: "Carteira de Registro Nacional Migratório", crnmText: "Depois do reconhecimento da condição de refugiado, é possível solicitar a CRNM. Emissão e renovação exigem formulário, documentos e atendimento da Polícia Federal; custos e etapas podem variar conforme o caso.", crnmAction: "Ver emissão e renovação da CRNM",
      officialSource: "Fonte oficial", officialGuidance: "Orientação atualizada",
      rightsKicker: "Acesso sem discriminação", rightsTitle: "Direitos e serviços essenciais",
      healthTitle: "Saúde no SUS", healthText: "O SUS deve atender migrantes, refugiados e apátridas independentemente da nacionalidade ou situação migratória. A falta de documento específico não deve ser usada como barreira de acesso.", healthAction: "Orientação do Ministério da Saúde",
      educationTitle: "Educação pública", educationText: "Crianças e adolescentes migrantes, refugiados, apátridas e solicitantes de refúgio têm direito à matrícula na educação básica pública. A falta de documentos não pode impedir a matrícula.", educationAction: "Resolução CNE/CEB nº 1/2020",
      assistanceTitle: "Assistência social", assistanceText: "O Cadastro Único é feito gratuitamente em posto municipal, geralmente no CRAS. Estar cadastrado não garante benefício: cada programa tem regras próprias. Leve os CPFs e os documentos disponíveis da família.", assistanceAction: "Consultar o Cadastro Único",
      bankTitle: "Conta bancária", bankText: "DPRNM e CRNM são documentos válidos. Bancos costumam solicitar CPF e comprovante ou declaração de residência. Se houver recusa indevida, procure orientação gratuita antes de pagar intermediários.", bankAction: "Orientação sobre serviços bancários",
      otherKicker: "Antes de iniciar", otherTitle: "Outros procedimentos",
      addressTitle: "Mudança de endereço", addressText: "A alteração de endereço no Registro Nacional Migratório pode ser solicitada online e gratuitamente, com comprovante de endereço.", addressAction: "Atualizar endereço",
      licenseTitle: "Carteira de habilitação", licenseText: "As regras para usar habilitação estrangeira ou obter CNH dependem do documento de origem, do tempo no Brasil, de acordos internacionais e do DETRAN do estado. Confirme as exigências antes de dirigir.", licenseAction: "Consultar regras de trânsito",
      passportTitle: "Passaporte e viagem", passportText: "Pessoas reconhecidas como refugiadas podem solicitar Passaporte para Estrangeiro. Ser apenas solicitante de refúgio não dá automaticamente direito a esse documento. Consulte a triagem oficial antes de pagar taxas ou agendar.", passportAction: "Ver regras da Polícia Federal",
      helpKicker: "Atendimento gratuito", helpTitle: "Onde buscar ajuda confiável", helpText: "O ACNUR e organizações parceiras oferecem orientação gratuita. Consulte a página atualizada por estado e cidade antes de se deslocar, pois muitos escritórios não fazem atendimento presencial.",
      helpPlatformTitle: "Plataforma HELP ACNUR", helpPlatformText: "Direitos, documentos e procedimentos", partnersTitle: "Organizações parceiras", partnersText: "Apoio gratuito por estado e cidade", officesTitle: "Escritórios do ACNUR", officesText: "Endereços e formas de atendimento atuais", contactTitle: "Contato confidencial", contactText: "Formulário oficial de orientação",
      footerNote: "Projeto independente de orientação humanitária. Não é um órgão do governo."
    },
    en: {
      htmlLang: "en", metaDescription: "Guide to rights, documents and official channels for migrants, asylum seekers and refugees in Brazil.", pageTitle: "Rights and documents guide | Portal do Imigrante",
      skip: "Skip to content", guideLabel: "Rights and documents guide", backPortal: "Back to the portal", backPortalAria: "Back to Portal do Imigrante", languageAria: "Interface language",
      kicker: "National guidance", title: "Rights and documents in Brazil", lead: "Practical information to help migrants, asylum seekers and refugees access rights and official channels more safely.", verified: "Sources checked on July 18, 2026.",
      privacyTitle: "Protect your data", privacyText: "Do not send documents, CPF numbers or personal data to Portal do Imigrante. The portal does not submit applications or book appointments.",
      sectionNavAria: "Guide sections", navStatus: "Migration status", navDocuments: "Documents", navRights: "Essential rights", navOther: "Other procedures", navHelp: "Where to get help",
      statusKicker: "First step", statusTitle: "If you do not have migration documents", statusText: "Not having migration documents does not remove access to SUS healthcare, public education or social assistance. Seek to regularize your status as soon as possible and get free guidance if you receive a notice or face barriers to service.",
      openPf: "Open Federal Police migration services", openPartners: "Find free support from UNHCR and partners", legalNote: "This guide provides general information and does not replace legal assistance. Rules and procedures may change; always confirm with the official source.",
      documentsKicker: "Identification and registration", documentsTitle: "Important documents", cpfTitle: "Individual Taxpayer Registry", cpfText: "Brazilian and foreign nationals, whether resident or not, may apply for a CPF. Use official channels only. The service is free through Federal Revenue channels, although partner units may charge the fee stated by the government.", cpfAction: "Apply for or check a CPF on gov.br",
      dprnmTitle: "Asylum Protocol and DPRNM", dprnmText: "People who apply for asylum receive a protocol and may obtain a DPRNM. These documents prove regular status as an asylum seeker and serve as identification in Brazil. Check the expiry date and renew before it expires.", dprnmAction: "Obtain a DPRNM", renewAction: "How to renew",
      crnmTitle: "National Migration Registry Card", crnmText: "After refugee status is recognized, a person may apply for a CRNM. Issuance and renewal require a form, documents and Federal Police service; costs and steps may vary by case.", crnmAction: "See CRNM issuance and renewal", officialSource: "Official source", officialGuidance: "Updated guidance",
      rightsKicker: "Access without discrimination", rightsTitle: "Essential rights and services", healthTitle: "SUS healthcare", healthText: "SUS should serve migrants, refugees and stateless people regardless of nationality or migration status. Lack of a specific document should not be used as a barrier to access.", healthAction: "Ministry of Health guidance",
      educationTitle: "Public education", educationText: "Migrant, refugee, stateless and asylum-seeking children and adolescents have the right to enroll in public basic education. Missing documents cannot prevent enrollment.", educationAction: "CNE/CEB Resolution No. 1/2020",
      assistanceTitle: "Social assistance", assistanceText: "Cadastro Único registration is free at a municipal service point, usually a CRAS. Registration does not guarantee a benefit: each program has its own rules. Bring the available CPF numbers and family documents.", assistanceAction: "Check Cadastro Único",
      bankTitle: "Bank account", bankText: "DPRNM and CRNM are valid documents. Banks commonly request a CPF and proof or declaration of address. If you believe a refusal is improper, seek free guidance before paying an intermediary.", bankAction: "Banking services guidance",
      otherKicker: "Before you begin", otherTitle: "Other procedures", addressTitle: "Change of address", addressText: "A change of address in the National Migration Registry can be requested online and free of charge with proof of address.", addressAction: "Update address",
      licenseTitle: "Driver's license", licenseText: "Rules for using a foreign license or obtaining a Brazilian CNH depend on the original document, time in Brazil, international agreements and the state DETRAN. Confirm the requirements before driving.", licenseAction: "Check traffic rules",
      passportTitle: "Passport and travel", passportText: "Recognized refugees may apply for a Passport for Foreigners. Being an asylum seeker alone does not automatically qualify a person for this document. Check the official screening information before paying fees or booking.", passportAction: "See Federal Police rules",
      helpKicker: "Free assistance", helpTitle: "Where to find reliable help", helpText: "UNHCR and partner organizations provide free guidance. Check the current page for your state and city before traveling, as many offices do not provide in-person service.",
      helpPlatformTitle: "UNHCR HELP platform", helpPlatformText: "Rights, documents and procedures", partnersTitle: "Partner organizations", partnersText: "Free support by state and city", officesTitle: "UNHCR offices", officesText: "Current addresses and service methods", contactTitle: "Confidential contact", contactText: "Official guidance form", footerNote: "Independent humanitarian guidance project. It is not a government agency."
    },
    es: {
      htmlLang: "es", metaDescription: "Guía de derechos, documentos y canales oficiales para migrantes, solicitantes de asilo y personas refugiadas en Brasil.", pageTitle: "Guía de derechos y documentos | Portal do Imigrante",
      skip: "Saltar al contenido", guideLabel: "Guía de derechos y documentos", backPortal: "Volver al portal", backPortalAria: "Volver al Portal do Imigrante", languageAria: "Idioma de la interfaz",
      kicker: "Orientación nacional", title: "Derechos y documentos en Brasil", lead: "Información práctica para que migrantes, solicitantes de asilo y personas refugiadas accedan a derechos y canales oficiales con mayor seguridad.", verified: "Fuentes verificadas el 18 de julio de 2026.",
      privacyTitle: "Proteja sus datos", privacyText: "No envíe documentos, CPF ni datos personales al Portal do Imigrante. El portal no presenta solicitudes ni agenda citas.",
      sectionNavAria: "Secciones de la guía", navStatus: "Situación migratoria", navDocuments: "Documentos", navRights: "Derechos esenciales", navOther: "Otros trámites", navHelp: "Dónde buscar ayuda",
      statusKicker: "Primer paso", statusTitle: "Si no tiene documentos migratorios", statusText: "No tener documentación migratoria no elimina el acceso al SUS, a la educación pública ni a la asistencia social. Procure regularizar su situación cuanto antes y busque orientación gratuita si recibe una notificación o encuentra barreras de atención.",
      openPf: "Abrir servicios migratorios de la Policía Federal", openPartners: "Encontrar apoyo gratuito de ACNUR y sus socios", legalNote: "Esta guía ofrece información general y no sustituye la asistencia jurídica. Las reglas y los procedimientos pueden cambiar; confirme siempre en la fuente oficial.",
      documentsKicker: "Identificación y registro", documentsTitle: "Documentos importantes", cpfTitle: "Registro de Persona Física", cpfText: "Personas brasileñas y extranjeras, residentes o no, pueden solicitar un CPF. Use solo los canales oficiales. El servicio es gratuito en los canales de la Receita Federal, aunque las unidades asociadas pueden cobrar la tarifa indicada por el Gobierno.", cpfAction: "Solicitar o consultar el CPF en gov.br",
      dprnmTitle: "Protocolo de Refugio y DPRNM", dprnmText: "Quien solicita asilo recibe un protocolo y puede obtener el DPRNM. Estos documentos prueban su situación regular como solicitante y sirven como identificación en Brasil. Revise la vigencia y renueve antes del vencimiento.", dprnmAction: "Obtener el DPRNM", renewAction: "Cómo renovar",
      crnmTitle: "Tarjeta del Registro Nacional Migratorio", crnmText: "Después del reconocimiento de la condición de refugiado, se puede solicitar la CRNM. La emisión y renovación requieren formulario, documentos y atención de la Policía Federal; los costos y pasos pueden variar según el caso.", crnmAction: "Ver emisión y renovación de la CRNM", officialSource: "Fuente oficial", officialGuidance: "Orientación actualizada",
      rightsKicker: "Acceso sin discriminación", rightsTitle: "Derechos y servicios esenciales", healthTitle: "Salud en el SUS", healthText: "El SUS debe atender a migrantes, personas refugiadas y apátridas, sin importar su nacionalidad o situación migratoria. La falta de un documento específico no debe ser una barrera de acceso.", healthAction: "Orientación del Ministerio de Salud",
      educationTitle: "Educación pública", educationText: "Niñas, niños y adolescentes migrantes, refugiados, apátridas y solicitantes de asilo tienen derecho a matricularse en la educación básica pública. La falta de documentos no puede impedir la matrícula.", educationAction: "Resolución CNE/CEB n.º 1/2020",
      assistanceTitle: "Asistencia social", assistanceText: "La inscripción en el Cadastro Único es gratuita en un punto municipal, normalmente un CRAS. La inscripción no garantiza un beneficio: cada programa tiene sus propias reglas. Lleve los CPF y documentos familiares disponibles.", assistanceAction: "Consultar el Cadastro Único",
      bankTitle: "Cuenta bancaria", bankText: "DPRNM y CRNM son documentos válidos. Los bancos suelen pedir CPF y comprobante o declaración de domicilio. Si considera que una negativa es indebida, busque orientación gratuita antes de pagar a un intermediario.", bankAction: "Orientación sobre servicios bancarios",
      otherKicker: "Antes de comenzar", otherTitle: "Otros trámites", addressTitle: "Cambio de domicilio", addressText: "El cambio de domicilio en el Registro Nacional Migratorio puede solicitarse por internet y gratuitamente, con un comprobante de domicilio.", addressAction: "Actualizar domicilio",
      licenseTitle: "Licencia de conducir", licenseText: "Las reglas para usar una licencia extranjera u obtener la CNH dependen del documento de origen, del tiempo en Brasil, de acuerdos internacionales y del DETRAN estatal. Confirme los requisitos antes de conducir.", licenseAction: "Consultar reglas de tránsito",
      passportTitle: "Pasaporte y viaje", passportText: "Las personas reconocidas como refugiadas pueden solicitar el Pasaporte para Extranjeros. Ser solamente solicitante de asilo no da derecho automático a este documento. Consulte la evaluación oficial antes de pagar tasas o agendar.", passportAction: "Ver reglas de la Policía Federal",
      helpKicker: "Atención gratuita", helpTitle: "Dónde encontrar ayuda confiable", helpText: "ACNUR y las organizaciones asociadas ofrecen orientación gratuita. Consulte la página actualizada de su estado y ciudad antes de desplazarse, ya que muchas oficinas no atienden de forma presencial.",
      helpPlatformTitle: "Plataforma HELP de ACNUR", helpPlatformText: "Derechos, documentos y trámites", partnersTitle: "Organizaciones asociadas", partnersText: "Apoyo gratuito por estado y ciudad", officesTitle: "Oficinas de ACNUR", officesText: "Direcciones y modalidades de atención actuales", contactTitle: "Contacto confidencial", contactText: "Formulario oficial de orientación", footerNote: "Proyecto independiente de orientación humanitaria. No es un organismo gubernamental."
    }
  };

  var currentLang = localStorage.getItem("pi_lang") || "pt";
  if (!i18n[currentLang]) currentLang = "pt";

  function translate() {
    var copy = i18n[currentLang];
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", copy.metaDescription);
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.dataset.i18n;
      if (copy[key]) element.textContent = copy[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      var key = element.dataset.i18nAria;
      if (copy[key]) element.setAttribute("aria-label", copy[key]);
    });
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      var active = button.dataset.lang === currentLang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      currentLang = button.dataset.lang;
      localStorage.setItem("pi_lang", currentLang);
      translate();
    });
  });

  translate();
})();
