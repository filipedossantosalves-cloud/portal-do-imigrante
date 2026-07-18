"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const statesRoot = path.join(root, "data", "estados");
const shouldWrite = process.argv.includes("--write");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function listFiles(dirPath, name, result = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) listFiles(entryPath, name, result);
    else if (entry.name === name) result.push(entryPath);
  }
  return result;
}

const changes = [];

for (const draftPath of listFiles(statesRoot, "servicos.rascunho.json")) {
  const cityPath = path.dirname(draftPath);
  const publishedPath = path.join(cityPath, "servicos.json");
  if (!fs.existsSync(publishedPath)) continue;

  const draftPayload = readJson(draftPath);
  const publishedPayload = readJson(publishedPath);
  const drafts = Array.isArray(draftPayload.services) ? draftPayload.services : [];
  const published = Array.isArray(publishedPayload.services) ? publishedPayload.services : [];
  const publishedIds = new Set(published.map((service) => service.id).filter(Boolean));
  const publishedKeys = new Set(published.map(entityKey));
  const pending = drafts.filter(
    (draft) => !publishedIds.has(draft.id) && !publishedKeys.has(entityKey(draft)),
  );

  if (pending.length === drafts.length) continue;
  changes.push({
    file: path.relative(root, draftPath),
    before: drafts.length,
    after: pending.length,
    removed: drafts.length - pending.length,
  });

  if (shouldWrite) {
    fs.writeFileSync(
      draftPath,
      `${JSON.stringify({ ...draftPayload, services: pending }, null, 2)}\n`,
      "utf8",
    );
  }
}

console.log(JSON.stringify({ mode: shouldWrite ? "write" : "dry-run", changes }, null, 2));
