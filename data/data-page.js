"use strict";

(function () {
  var portal = window.PORTAL_DATA || { meta: {}, services: [] };
  var desk = window.RESEARCH_DESK_DATA || { totals: {}, states: [] };
  var stats = portal.meta.stats || {};
  var services = portal.services || [];
  var states = desk.states || [];
  var next = desk.recommendedNext || null;

  function $(id) {
    return document.getElementById(id);
  }

  function fmt(value) {
    return new Intl.NumberFormat("pt-BR").format(Number(value || 0));
  }

  function esc(value) {
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

  function statusLabel(status) {
    if (status === "reviewed") return "revisado";
    if (status === "in-progress") return "em revisao";
    return "pendente";
  }

  function renderMetrics() {
    var official = Number(stats.withSource || desk.totals.officialServices || 0);
    var total = Number(stats.total || services.length || 0);
    var reviewed = Number((portal.meta.coverageSummary && portal.meta.coverageSummary.reviewedUnits) || 0);
    var pending = Number((portal.meta.coverageSummary && portal.meta.coverageSummary.pendingUnits) || desk.totals.pendingStates || 0);
    var officialRate = total ? Math.round((official / total) * 100) : 0;

    $("updatedAt").textContent = portal.meta.updated || portal.meta.consolidated || "--";
    $("headline").textContent = fmt(total) + " registros publicados com trilha de validacao";
    $("officialRate").textContent = fmt(official) + " (" + officialRate + "%)";
    $("reviewedStates").textContent = fmt(reviewed) + " revisadas, " + fmt(pending) + " pendentes";
    $("nextTarget").textContent = next ? next.state : "Sem pendencias";
    $("totalServices").textContent = fmt(total);
    $("officialServices").textContent = fmt(official);
    $("statesCount").textContent = fmt(stats.states || desk.totals.states);
    $("citiesCount").textContent = fmt(stats.cities);
  }

  function renderStates() {
    $("stateRows").innerHTML = states
      .map(function (state) {
        return [
          "<tr>",
          "<td><strong>" + esc(state.uf) + "</strong></td>",
          "<td>" + esc(state.state) + "</td>",
          '<td><span class="status ' + esc(state.status) + '">' + esc(statusLabel(state.status)) + "</span></td>",
          "<td>" + fmt(state.cityCount) + "</td>",
          "<td>" + fmt(state.serviceCount) + "</td>",
          "<td>" + fmt(state.officialServiceCount) + " / " + fmt(state.targetOfficialServiceCount || 20) + "</td>",
          "</tr>",
        ].join("");
      })
      .join("");
  }

  function renderCategories() {
    var labels = {
      acolhimento: "Acolhimento",
      assistencia: "Assistencia social",
      saude: "Saude",
      trabalho: "Trabalho",
      educacao: "Educacao",
      documentos: "Documentos",
    };
    var counts = services.reduce(function (acc, service) {
      var key = service.category || "outros";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    $("categoryList").innerHTML = Object.keys(counts)
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .map(function (key) {
        return "<div><strong>" + esc(labels[key] || key) + "</strong><span>" + fmt(counts[key]) + "</span></div>";
      })
      .join("");
  }

  renderMetrics();
  renderStates();
  renderCategories();
})();
