"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const errors = [];
const warnings = [];

function walk(dirPath, result = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) walk(entryPath, result);
    else result.push(entryPath);
  }
  return result;
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function entityKey(service) {
  return [service.uf, service.city, service.name].map(normalize).join("|");
}

function validDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(value || ""));
  if (!match) return false;
  const date = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  return date.getUTCFullYear() === Number(match[3]) &&
    date.getUTCMonth() === Number(match[2]) - 1 &&
    date.getUTCDate() === Number(match[1]);
}

function validHttpsUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" && !url.username && !url.password;
  } catch (error) {
    return false;
  }
}

const files = walk(root);
const jsonFiles = files.filter((filePath) => path.extname(filePath).toLowerCase() === ".json");
for (const filePath of jsonFiles) {
  try {
    readJson(filePath);
  } catch (error) {
    errors.push(`${path.relative(root, filePath)}: invalid JSON (${error.message})`);
  }
}

const publicData = readJson(path.join(root, "data", "services.json"));
const appSource = read(path.join(root, "app.js"));
const publicContext = { window: {} };
vm.runInNewContext(read(path.join(root, "data", "services.js")), publicContext);
if (JSON.stringify(publicData) !== JSON.stringify(publicContext.window.PORTAL_DATA)) {
  errors.push("data/services.js differs from data/services.json");
}

const i18nMatch = appSource.match(/var i18n = ({[\s\S]*?});\s+var stepDefinitions/);
if (!i18nMatch) {
  errors.push("app.js: unable to inspect translation dictionary");
} else {
  const translationContext = {};
  vm.runInNewContext(`dictionary = ${i18nMatch[1]}`, translationContext);
  function translationKeys(value, prefix = "") {
    return Object.entries(value).flatMap(([key, child]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      return child && typeof child === "object" ? translationKeys(child, fullKey) : [fullKey];
    });
  }
  const referenceKeys = translationKeys(translationContext.dictionary.pt).sort();
  for (const language of ["en", "es"]) {
    const keys = translationKeys(translationContext.dictionary[language]).sort();
    if (JSON.stringify(keys) !== JSON.stringify(referenceKeys)) {
      errors.push(`app.js: ${language} translation keys differ from Portuguese`);
    }
  }

  const helperStart = appSource.indexOf("  function translateKnownValue");
  const helperEnd = appSource.indexOf("  function showToast", helperStart);
  if (helperStart < 0 || helperEnd < 0) {
    errors.push("app.js: unable to inspect dynamic translation helpers");
  } else {
    const runtime = { dictionary: translationContext.dictionary };
    vm.runInNewContext(
      `
      var i18n = dictionary;
      var currentLang = "en";
      function normalize(value) {
        return String(value || "").normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();
      }
      function t(key) {
        return (i18n[currentLang] && i18n[currentLang][key]) || i18n.pt[key] || key;
      }
      ${appSource.slice(helperStart, helperEnd)}
      `,
      runtime,
    );

    const residualPatterns = {
      en: /\b(n[aã]o|fonte|telefone|endere[cç]o|hor[aá]rio|atendimento|agendamento|funcionamento|servi[cç]o|antes de se deslocar|segunda-feira|ter[cç]a-feira|quarta-feira|quinta-feira|sexta-feira)\b/i,
      es: /\b(n[aã]o|fonte|telefone|endere[cç]o|atendimento|agendamento|servi[cç]o|antes de se deslocar|segunda-feira|ter[cç]a-feira|quarta-feira|quinta-feira|sexta-feira)\b/i,
    };

    for (const language of ["en", "es"]) {
      runtime.currentLang = language;
      for (const service of publicData.services) {
        const translatedFields = [
          runtime.translateReasons(service),
          runtime.translateHours(service.hours || ""),
          runtime.translateDataText(service.notice || ""),
        ];
        if (translatedFields.some((value) => residualPatterns[language].test(String(value || "")))) {
          const offending = translatedFields.find((value) => residualPatterns[language].test(String(value || "")));
          errors.push(`${service.id}: Portuguese operational text remains in ${language} mode (${offending})`);
          break;
        }
      }
    }
  }
}

const ids = new Set();
const entityKeys = new Set();
for (const service of publicData.services) {
  if (!service.id || ids.has(service.id)) errors.push(`invalid or duplicate public ID: ${service.id || "missing"}`);
  ids.add(service.id);

  const key = entityKey(service);
  if (entityKeys.has(key)) errors.push(`duplicate public entity: ${key}`);
  entityKeys.add(key);

  if (service.sourceRegistered) {
    if (!service.source) errors.push(`${service.id}: official record without source name`);
    if (!validHttpsUrl(service.sourceUrl)) errors.push(`${service.id}: official record without a safe HTTPS source URL`);
    if (!validDate(service.verified)) errors.push(`${service.id}: official record without valid verification date`);
    if (/google\.[^/]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(service.sourceUrl || "")) {
      errors.push(`${service.id}: Google Maps marked as official evidence`);
    }
  } else {
    const leaked = [
      service.phone,
      service.address,
      service.map,
      service.sourceUrl,
      service.verified,
      service.contactConfirmed,
      service.addressSpecific,
      service.hoursInformed,
    ].some(Boolean);
    if (leaked) errors.push(`${service.id}: unverified public record exposes operational data`);
  }

  if (service.map && !validHttpsUrl(service.map)) {
    errors.push(`${service.id}: map URL is not safe HTTPS`);
  }
}

const deskContext = { window: {} };
vm.runInNewContext(read(path.join(root, "research-desk", "data.js")), deskContext);
const desk = deskContext.window.RESEARCH_DESK_DATA;
const ufLinkedPublic = publicData.services.filter((service) => service.uf).length;
if (desk.totals.services !== ufLinkedPublic) {
  errors.push(`Research Desk has ${desk.totals.services} UF-linked records; public export has ${ufLinkedPublic}`);
}
if (desk.totals.publicServices !== publicData.services.length) {
  errors.push("Research Desk public total differs from public export");
}

for (const draftPath of files.filter((filePath) => path.basename(filePath) === "servicos.rascunho.json")) {
  const publishedPath = path.join(path.dirname(draftPath), "servicos.json");
  if (!fs.existsSync(publishedPath)) continue;
  const drafts = readJson(draftPath).services || [];
  const published = readJson(publishedPath).services || [];
  const publishedIds = new Set(published.map((service) => service.id).filter(Boolean));
  const publishedKeys = new Set(published.map(entityKey));
  for (const draft of drafts) {
    if (publishedIds.has(draft.id) || publishedKeys.has(entityKey(draft))) {
      errors.push(`${path.relative(root, draftPath)}: promoted record remains in drafts (${draft.id || draft.name})`);
    }
  }
}

for (const relativePath of ["index.html", "guia/index.html", "research-desk/index.html", "data/index.html"]) {
  const html = read(path.join(root, relativePath));
  if (!/Content-Security-Policy/i.test(html)) errors.push(`${relativePath}: missing Content Security Policy`);
  for (const directive of ["default-src 'none'", "object-src 'none'", "base-uri 'self'", "frame-src 'none'"]) {
    if (!html.includes(directive)) errors.push(`${relativePath}: CSP missing ${directive}`);
  }
  if (!/<meta\s+name=["']referrer["']\s+content=["']no-referrer["']/i.test(html)) {
    errors.push(`${relativePath}: missing no-referrer policy`);
  }
  if (!/class=["']skip-link["']/i.test(html)) errors.push(`${relativePath}: missing skip link`);
  if (/<(?:a|form)\b[^>]*(?:href|action)=["']\s*(?:javascript|data|vbscript):/i.test(html)) {
    errors.push(`${relativePath}: unsafe navigation protocol in markup`);
  }
  const blankLinks = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || [];
  for (const link of blankLinks) {
    if (!/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/i.test(link)) {
      errors.push(`${relativePath}: target=_blank link without noopener noreferrer`);
    }
  }
}

const textExtensions = new Set([".html", ".css", ".js", ".json", ".md", ".webmanifest"]);
for (const filePath of files.filter((item) => textExtensions.has(path.extname(item).toLowerCase()))) {
  const content = read(filePath);
  const relativePath = path.relative(root, filePath);
  if (/C:\\Users\\/i.test(content)) errors.push(`${relativePath}: local Windows path exposed`);
  if (/sk-[A-Za-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AIza[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/i.test(content)) {
    errors.push(`${relativePath}: possible credential or private key exposed`);
  }
  if (/Ã[\u0080-\u00BF]|Â[\u0080-\u00BF\s]|\uFFFD|â[€-™]/u.test(content)) {
    errors.push(`${relativePath}: possible broken UTF-8 text`);
  }
}

const mainHtml = read(path.join(root, "index.html"));
const sensitiveInputs = mainHtml.match(/<input\b[^>]*(?:name|id)=["'][^"']*(?:cpf|document|location|localizacao|nome|name)[^"']*["'][^>]*>/gi) || [];
if (sensitiveInputs.length) warnings.push("Public portal contains a potentially sensitive input field");

const gitignore = read(path.join(root, ".gitignore"));
for (const privatePattern of ["**/fontes-encontradas.json", "**/servicos.rascunho.json", "**/relatorio-validacao.md"]) {
  if (!gitignore.includes(privatePattern)) errors.push(`.gitignore: missing private research rule ${privatePattern}`);
}

if (!fs.existsSync(path.join(root, "SECURITY.md"))) errors.push("SECURITY.md is missing");

const license = read(path.join(root, "LICENSE"));
if (!/Filipe dos Santos Alves/.test(license) || !/All rights reserved/i.test(license)) {
  errors.push("LICENSE: reserved copyright and author attribution are missing");
}
if (/Permission is hereby granted, free of charge/i.test(license)) {
  errors.push("LICENSE: permissive MIT grant is still present");
}

const notice = read(path.join(root, "NOTICE.md"));
if (!/Filipe dos Santos Alves/.test(notice) || !/original\s+sources/i.test(notice)) {
  errors.push("NOTICE.md: authorship or third-party source boundary is missing");
}

const serviceWorker = read(path.join(root, "sw.js"));
if (!/CACHE_PREFIX/.test(serviceWorker) || !/key\.startsWith\(CACHE_PREFIX\)/.test(serviceWorker)) {
  errors.push("sw.js: cache cleanup is not isolated to this project");
}
if (!/CORE_URLS\.has\(key\)/.test(serviceWorker)) {
  errors.push("sw.js: runtime cache is not restricted to the public asset allowlist");
}

if (!/function safeHttpsUrl/.test(appSource)) errors.push("app.js: external URL validator is missing");

const stats = {
  jsonFiles: jsonFiles.length,
  publicServices: publicData.services.length,
  rawWorkspaceRecords: publicData.meta.stats.rawWorkspaceRecords,
  officialServices: publicData.services.filter((service) => service.sourceRegistered).length,
  unverifiedPublicServices: publicData.services.filter((service) => !service.sourceRegistered).length,
  ufLinkedServices: ufLinkedPublic,
  noUfServices: publicData.services.filter((service) => !service.uf).length,
  researchDeskStates: desk.totals.states,
  researchDeskCities: desk.totals.cities,
  pendingDrafts: desk.states.reduce(
    (total, state) => total + state.cities.reduce((cityTotal, city) => cityTotal + city.draftServiceCount, 0),
    0,
  ),
};

console.log(JSON.stringify({ status: errors.length ? "failed" : "passed", stats, errors, warnings }, null, 2));
if (errors.length) process.exit(1);
