"use strict";

(function () {
  var data = window.RESEARCH_DESK_DATA || { states: [], totals: {}, validationRules: [], sourceChecklist: [] };
  var selectedState = data.recommendedNext || data.states[0] || null;
  var selectedCity = selectedState && selectedState.cities ? selectedState.cities[0] : null;
  var statusFilter = document.getElementById("statusFilter");
  var stateButtons = document.getElementById("stateButtons");
  var cityGrid = document.getElementById("cityGrid");
  var packetOutput = document.getElementById("packetOutput");
  var packetTitle = document.getElementById("packetTitle");
  var toast = document.getElementById("toast");

  function $(id) {
    return document.getElementById(id);
  }

  function fmt(value) {
    return new Intl.NumberFormat("en-US").format(Number(value || 0));
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

  function pct(official, total) {
    if (!total) return 0;
    return Math.min(100, Math.round((official / total) * 100));
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function isReviewed(state) {
    return state.status === "reviewed";
  }

  function filteredStates() {
    var filter = statusFilter.value;
    if (filter === "pending") return data.states.filter(function (state) { return state.status !== "reviewed"; });
    if (filter === "reviewed") return data.states.filter(isReviewed);
    return data.states;
  }

  function renderMetrics() {
    $("metricStates").textContent = fmt(data.totals.states);
    $("metricServices").textContent = fmt(data.totals.services);
    $("metricOfficial").textContent = fmt(data.totals.officialServices);
    $("metricPending").textContent = fmt(data.totals.pendingStates);
  }

  function renderOverview() {
    var reviewed = (data.totals.states || 0) - (data.totals.pendingStates || 0);
    var pilot = data.states.find(function (state) { return state.state === "Minas Gerais"; });
    var next = data.recommendedNext;
    var officialRate = data.totals.services
      ? Math.round((data.totals.officialServices / data.totals.services) * 100)
      : 0;

    $("pilotHeadline").textContent = pilot
      ? fmt(pilot.officialServiceCount) + " official records validated in Minas Gerais"
      : "Research pipeline ready";
    $("pilotState").textContent = pilot ? pilot.state + " (" + pilot.status + ")" : "--";
    $("nextState").textContent = next ? next.state : "No pending state";
    $("reviewedUnits").textContent = fmt(reviewed) + " / " + fmt(data.totals.states);
    $("exportStatus").textContent = fmt(data.totals.officialServices) + " official-source records ready";
    $("evidenceStatus").textContent = officialRate + "% official evidence across UF-linked services";
    $("nextTarget").textContent = next
      ? next.state + ": " + fmt(next.officialServiceCount) + "/" + fmt(next.targetOfficialServiceCount || 20)
      : "All reviewed";
  }

  function renderStateButtons() {
    stateButtons.innerHTML = filteredStates()
      .map(function (state) {
        var reviewed = isReviewed(state);
        var status = state.status || (reviewed ? "reviewed" : "pending");
        var active = selectedState && selectedState.uf === state.uf;
        return [
          '<button class="state-button ' + esc(status) + (active ? " active" : "") + '" type="button" data-uf="' + esc(state.uf) + '">',
          '<span class="uf">' + esc(state.uf) + "</span>",
          "<span><strong>" + esc(state.state) + "</strong><small>" + fmt(state.serviceCount) + " services, " + fmt(state.officialServiceCount) + "/" + fmt(state.targetOfficialServiceCount || 20) + " official</small></span>",
          '<span class="badge ' + (reviewed ? "good" : status === "in-progress" ? "work" : "") + '">' + esc(status) + "</span>",
          "</button>",
        ].join("");
      })
      .join("");

    stateButtons.querySelectorAll("[data-uf]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectedState = data.states.find(function (state) { return state.uf === button.dataset.uf; });
        selectedCity = selectedState && selectedState.cities ? selectedState.cities[0] : null;
        render();
      });
    });
  }

  function renderStateDetail() {
    if (!selectedState) return;
    var progress = pct(selectedState.officialServiceCount, selectedState.targetOfficialServiceCount || 20);
    var packetCount = selectedState.cities.filter(function (city) { return city.hasResearchPacket; }).length;
    $("selectedUf").textContent = selectedState.uf + " pipeline";
    $("selectedState").textContent = selectedState.state;
    $("stateProgress").textContent = progress + "%";
    $("progressBar").style.width = progress + "%";
    $("stateCityCount").textContent = fmt(selectedState.cityCount);
    $("stateOfficialCount").textContent =
      fmt(selectedState.officialServiceCount) + "/" + fmt(selectedState.targetOfficialServiceCount || 20);
    $("statePacketCount").textContent = fmt(packetCount);

    cityGrid.innerHTML = selectedState.cities
      .map(function (city) {
        var active = selectedCity && city.folder === selectedCity.folder;
        return [
          '<button class="city-card ' + (active ? "active" : "") + '" type="button" data-city="' + esc(city.folder) + '">',
          "<strong>" + esc(city.name) + "</strong>",
          "<small>" + fmt(city.serviceCount) + " services in folder</small>",
          "<span>" + fmt(city.officialServiceCount) + "</span>",
          "<small>official-source records</small>",
          "<small>" + (city.hasResearchPacket ? "packet ready" : "packet missing") + " - " + fmt(city.draftServiceCount) + " drafts</small>",
          "</button>",
        ].join("");
      })
      .join("");

    cityGrid.querySelectorAll("[data-city]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectedCity = selectedState.cities.find(function (city) { return city.folder === button.dataset.city; });
        renderStateDetail();
        renderPacket();
      });
    });
  }

  function serviceRisks(service) {
    var risks = [];
    if (!service.sourceRegistered || !service.sourceUrl) risks.push("missing official source");
    if (!service.verified) risks.push("missing verification date");
    if (!service.phone) risks.push("phone not published by source");
    if (!service.address) risks.push("address missing");
    if (!service.hours) risks.push("hours missing");
    return risks;
  }

  function buildPacketObject() {
    if (!selectedState || !selectedCity) return null;
    var existing = selectedCity.services || [];
    var riskRows = existing.map(function (service) {
      return {
        id: service.id,
        name: service.name,
        status: service.sourceRegistered ? "official-source" : "draft-or-legacy",
        risks: serviceRisks(service),
      };
    });

    var packet = {
      research_packet: {
        state: selectedState.state,
        uf: selectedState.uf,
        city: selectedCity.name,
        target_files: {
          sources_found: "data/estados/" + selectedState.folder + "/" + selectedCity.folder + "/fontes-encontradas.json",
          draft_services: "data/estados/" + selectedState.folder + "/" + selectedCity.folder + "/servicos.rascunho.json",
          validation_report: "data/estados/" + selectedState.folder + "/" + selectedCity.folder + "/relatorio-validacao.md",
          published_services: "data/estados/" + selectedState.folder + "/" + selectedCity.folder + "/servicos.json",
        },
        workflow: [
          "Collect official source URLs.",
          "Create draft services only from official pages.",
          "Run validation before promotion.",
          "Promote records only after human review.",
        ],
        existing_records: existing.length,
        official_records: selectedCity.officialServiceCount,
        research_packet_ready: Boolean(selectedCity.hasResearchPacket),
        draft_records: selectedCity.draftServiceCount || 0,
        official_draft_records: selectedCity.draftOfficialServiceCount || 0,
        validation_summary: {
          publish_ready: riskRows.filter(function (row) { return row.risks.length === 0; }).length,
          needs_review: riskRows.filter(function (row) { return row.risks.length > 0; }).length,
          rule: "No official source, no validation badge.",
        },
        existing_record_risks: riskRows,
        suggested_source_queries: [
          selectedCity.name + " prefeitura CRAS",
          selectedCity.name + " prefeitura CREAS",
          selectedCity.name + " UPA hospital municipal",
          selectedCity.name + " SINE atendimento trabalhador",
          selectedCity.name + " defensoria publica atendimento",
        ],
      },
    };

    return packet;
  }

  function buildPacket() {
    var packet = buildPacketObject();
    return packet ? JSON.stringify(packet, null, 2) : "";
  }

  function renderTargetFiles(files) {
    return Object.keys(files)
      .map(function (key) {
        return [
          '<div class="packet-file">',
          "<span>" + esc(key.replace(/_/g, " ")) + "</span>",
          "<code>" + esc(files[key]) + "</code>",
          "</div>",
        ].join("");
      })
      .join("");
  }

  function renderRiskList(rows) {
    var risky = rows.filter(function (row) { return row.risks.length > 0; }).slice(0, 8);
    if (!risky.length) {
      return '<p class="packet-ok">All published records have the required validation fields.</p>';
    }

    return risky
      .map(function (row) {
        return [
          '<div class="risk-row">',
          "<strong>" + esc(row.name) + "</strong>",
          "<span>" + esc(row.risks.join(", ")) + "</span>",
          "</div>",
        ].join("");
      })
      .join("");
  }

  function renderPacketReport(packet) {
    if (!packet) {
      packetOutput.innerHTML = "";
      return;
    }

    var info = packet.research_packet;
    var summary = info.validation_summary;
    packetOutput.innerHTML = [
      '<div class="packet-status-grid">',
      '<div><span>' + fmt(info.existing_records) + "</span><small>published records</small></div>",
      '<div><span>' + fmt(info.official_records) + "</span><small>official-source records</small></div>",
      '<div><span>' + fmt(info.draft_records) + "</span><small>draft records</small></div>",
      '<div><span>' + (info.research_packet_ready ? "Ready" : "Missing") + "</span><small>research packet</small></div>",
      "</div>",
      '<div class="packet-section">',
      "<h4>Validation summary</h4>",
      '<p><strong>' + fmt(summary.publish_ready) + "</strong> publish-ready records and <strong>" + fmt(summary.needs_review) + "</strong> records needing review.</p>",
      "<p>" + esc(summary.rule) + "</p>",
      "</div>",
      '<div class="packet-section">',
      "<h4>Target files</h4>",
      renderTargetFiles(info.target_files),
      "</div>",
      '<div class="packet-section">',
      "<h4>Workflow</h4>",
      "<ol>" + info.workflow.map(function (step) { return "<li>" + esc(step) + "</li>"; }).join("") + "</ol>",
      "</div>",
      '<div class="packet-section">',
      "<h4>Records needing attention</h4>",
      renderRiskList(info.existing_record_risks),
      "</div>",
      '<details class="json-details">',
      "<summary>View copyable JSON packet</summary>",
      "<pre>" + esc(JSON.stringify(packet, null, 2)) + "</pre>",
      "</details>",
    ].join("");
  }

  function renderPacket() {
    if (!selectedCity) {
      packetTitle.textContent = "Choose a city";
      packetOutput.innerHTML = "";
      $("cityReady").textContent = "--";
      $("cityReview").textContent = "--";
      $("cityDrafts").textContent = "--";
      return;
    }

    var riskRows = (selectedCity.services || []).map(function (service) {
      return serviceRisks(service);
    });
    $("cityReady").textContent = fmt(riskRows.filter(function (risks) { return risks.length === 0; }).length);
    $("cityReview").textContent = fmt(riskRows.filter(function (risks) { return risks.length > 0; }).length);
    $("cityDrafts").textContent = fmt(selectedCity.draftServiceCount || 0);
    packetTitle.textContent = selectedCity.name + " research packet";
    renderPacketReport(buildPacketObject());
  }

  function renderChecklist() {
    $("sourceChecklist").innerHTML = data.sourceChecklist
      .map(function (item) { return "<li>" + esc(item) + "</li>"; })
      .join("");
  }

  function renderRules() {
    $("ruleList").innerHTML = data.validationRules
      .map(function (rule) { return "<div>" + esc(rule) + "</div>"; })
      .join("");
  }

  function render() {
    renderOverview();
    renderMetrics();
    renderStateButtons();
    renderStateDetail();
    renderPacket();
    renderChecklist();
    renderRules();
  }

  statusFilter.addEventListener("change", function () {
    var list = filteredStates();
    if (!list.some(function (state) { return selectedState && state.uf === selectedState.uf; })) {
      selectedState = list[0] || data.states[0] || null;
      selectedCity = selectedState && selectedState.cities ? selectedState.cities[0] : null;
    }
    render();
  });

  $("copyPacket").addEventListener("click", function () {
    var text = buildPacket();
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Research packet copied.");
      });
      return;
    }
    showToast("Select the packet text and copy it manually.");
  });

  render();
})();
