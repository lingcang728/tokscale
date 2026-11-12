import {
  THEMES,
  escapeXml,
  formatCacheMultiplier,
  formatCost,
  formatTokensCompact,
  renderShareCardSvg,
  svgToPng,
} from "./card-renderer.js";

let previewFrame = 0;
let modalReturnFocus = null;

function schedulePreview() {
  if (previewFrame) return;
  previewFrame = requestAnimationFrame(() => {
    previewFrame = 0;
    renderPreview();
  });
}

async function runButtonAction(id, busyLabel, action) {
  const button = document.getElementById(id);
  if (!button || button.disabled) return;
  const label = button.querySelector("span");
  const originalLabel = label?.textContent || "";
  button.disabled = true;
  button.classList.add("is-loading");
  button.setAttribute("aria-busy", "true");
  if (label) label.textContent = busyLabel;
  try {
    await new Promise(requestAnimationFrame);
    await action();
  } finally {
    button.disabled = !state.currentSvg;
    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
    if (label) label.textContent = originalLabel;
  }
}

function getExportFilename(extension) {
  const period = state.scope === "daily" ? state.selectedDate : state.scope;
  return `TokScale-${period}-${state.theme}.${extension}`;
}

const state = {
  rawData: null,
  scope: "daily", // 'daily' | 'monthly' | 'alltime'
  selectedDate: "",
  selectedMonth: "",
  mergeSameModel: false,
  sortBy: "cost", // 'cost' | 'total' | 'messages' | 'cache'
  searchQuery: "",

  availableRows: [],
  selectedIds: new Set(),
  customRows: [],
  rowOverrides: {},

  cardMode: "multi", // 'multi' | 'spotlight'
  spotlightRowId: "",
  theme: "carbonGold",
  aspectRatio: "auto",
  lang: "zh",

  metrics: {
    provider: true,
    source: true,
    messages: true,
    input: true,
    output: true,
    cacheRead: true,
    cacheWrite: true,
    reasoning: false,
    cacheHit: true,
    total: true,
    cost: true,
    costPer1M: false,
  },

  showStudioMat: true,
  showSummaryStrip: true,
  showTokenBar: true,
  showCompositionBar: true,
  exactNumbers: false,
  hideCost: false,
  hideSource: false,

  customTitle: "",
  customSubtitle: "",
  customBadge: "",
  customAuthor: "@凌苍",
  customFooterNote: "",

  currentSvg: "",
};

function showToast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  while (container.children.length >= 3) container.firstElementChild?.remove();
  const el = document.createElement("div");
  el.className = `toast ${type === "error" ? "error" : ""}`;
  el.setAttribute("role", type === "error" ? "alert" : "status");
  el.textContent = msg;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add("visible"));
  setTimeout(() => {
    el.classList.remove("visible");
    setTimeout(() => el.remove(), 220);
  }, 3000);
}

function mergeRowsByModel(rows) {
  const map = new Map();
  for (const r of rows) {
    const key = r.model;
    if (!map.has(key)) {
      map.set(key, {
        ...r,
        id: `${r.date}::merged::${r.model}`,
        sourcesSet: new Set(r.sourceDisplay ? [r.sourceDisplay] : []),
        providersSet: new Set(r.providerDisplay ? [r.providerDisplay] : []),
        tokens: { ...r.tokens },
      });
    } else {
      const m = map.get(key);
      if (r.sourceDisplay) m.sourcesSet.add(r.sourceDisplay);
      if (r.providerDisplay) m.providersSet.add(r.providerDisplay);
      m.messages += r.messages;
      m.tokens.input += r.tokens.input;
      m.tokens.output += r.tokens.output;
      m.tokens.cacheRead += r.tokens.cacheRead;
      m.tokens.cacheWrite += r.tokens.cacheWrite;
      m.tokens.reasoning = (m.tokens.reasoning || 0) + (r.tokens.reasoning || 0);
      m.tokens.total += r.tokens.total;
      const paid = m.tokens.input + m.tokens.cacheWrite;
      m.tokens.cacheMultiplier = paid > 0 ? m.tokens.cacheRead / paid : m.tokens.cacheRead > 0 ? Infinity : 0;
      m.cost += r.cost;
      m.costPer1M = m.tokens.total > 0 ? (m.cost / m.tokens.total) * 1_000_000 : 0;
    }
  }
  return Array.from(map.values()).map((item) => ({
    ...item,
    sourceDisplay: Array.from(item.sourcesSet).join(", "),
    providerDisplay: Array.from(item.providersSet).join(", "),
  }));
}

function computeAvailableRows() {
  if (!state.rawData) return [];
  let baseRows = [];

  if (state.scope === "daily") {
    const dayObj = state.rawData.daily.find((d) => d.date === state.selectedDate) || state.rawData.daily[0];
    if (dayObj) {
      state.selectedDate = dayObj.date;
      baseRows = dayObj.rows || [];
    }
  } else if (state.scope === "monthly") {
    const mObj = state.rawData.monthly.find((m) => m.month === state.selectedMonth) || state.rawData.monthly[0];
    if (mObj) {
      state.selectedMonth = mObj.month;
      baseRows = mObj.rows || [];
    }
  } else {
    baseRows = state.rawData.models || [];
  }

  let processed = state.mergeSameModel && state.scope === "daily" ? mergeRowsByModel(baseRows) : [...baseRows];

  for (const cr of state.customRows) {
    processed.push(cr);
  }

  processed = processed.map((r) => {
    const ov = state.rowOverrides[r.id];
    if (!ov) return r;
    return {
      ...r,
      customModelName: ov.customModelName !== undefined ? ov.customModelName : r.customModelName,
      sourceDisplay: ov.sourceDisplay !== undefined ? ov.sourceDisplay : r.sourceDisplay,
      providerDisplay: ov.providerDisplay !== undefined ? ov.providerDisplay : r.providerDisplay,
    };
  });

  processed.sort((a, b) => {
    if (state.sortBy === "total") return b.tokens.total - a.tokens.total || b.cost - a.cost;
    if (state.sortBy === "messages") return b.messages - a.messages || b.tokens.total - a.tokens.total;
    if (state.sortBy === "cache") {
      const ca = Number.isFinite(a.tokens.cacheMultiplier) ? a.tokens.cacheMultiplier : -1;
      const cb = Number.isFinite(b.tokens.cacheMultiplier) ? b.tokens.cacheMultiplier : -1;
      return cb - ca || b.tokens.total - a.tokens.total;
    }
    return b.cost - a.cost || b.tokens.total - a.tokens.total;
  });

  state.availableRows = processed;
}

function resetDefaultSelection() {
  computeAvailableRows();
  state.selectedIds.clear();
  if (state.scope === "daily") {
    const seen = new Set();
    state.availableRows.forEach((r) => {
      if (!seen.has(r.model)) {
        seen.add(r.model);
        state.selectedIds.add(r.id);
      }
    });
  } else {
    state.availableRows.slice(0, 6).forEach((r) => state.selectedIds.add(r.id));
  }
  if (state.availableRows.length > 0) {
    state.spotlightRowId = state.availableRows[0].id;
  }
}

function getPeriodLabel() {
  if (state.scope === "daily") return state.selectedDate || "TODAY";
  if (state.scope === "monthly") return `${state.selectedMonth} MONTHLY`;
  return "ALL-TIME CUMULATIVE";
}

function updateUI() {
  computeAvailableRows();
  renderPeriodSelector();
  renderModelList();
  renderPreview();
}

function renderPeriodSelector() {
  const container = document.getElementById("period-selector-bar");
  if (!container || !state.rawData) return;

  document.querySelectorAll("[data-scope]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-scope") === state.scope);
  });

  if (state.scope === "daily") {
    const days = state.rawData.daily || [];
    const currentIdx = days.findIndex((d) => d.date === state.selectedDate);
    const hasPrev = currentIdx >= 0 && currentIdx < days.length - 1;
    const hasNext = currentIdx > 0;

    container.innerHTML = `
      <div class="period-stepper">
        <button class="step-btn" id="btn-prev-day" ${!hasPrev ? "disabled" : ""} title="前一天">
          <svg class="icon-svg" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <select id="select-date" class="select-control">
          ${days
            .map(
              (d) =>
                `<option value="${d.date}" ${d.date === state.selectedDate ? "selected" : ""}>
                  ${d.date} (${formatTokensCompact(d.tokens.total)} / ${formatCost(d.cost)})
                </option>`
            )
            .join("")}
        </select>
        <button class="step-btn" id="btn-next-day" ${!hasNext ? "disabled" : ""} title="后一天">
          <svg class="icon-svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div class="sub-toolbar">
        <button class="tag-btn ${state.mergeSameModel ? "active" : ""}" id="btn-merge-toggle">合并同名模型</button>
        <div class="pill-row">
          <button class="tag-btn ${state.sortBy === "cost" ? "active" : ""}" data-sort="cost">按费用</button>
          <button class="tag-btn ${state.sortBy === "total" ? "active" : ""}" data-sort="total">按总计</button>
          <button class="tag-btn ${state.sortBy === "cache" ? "active" : ""}" data-sort="cache">按缓存×</button>
        </div>
      </div>
    `;

    document.getElementById("select-date")?.addEventListener("change", (e) => {
      state.selectedDate = e.target.value;
      resetDefaultSelection();
      updateUI();
    });
    document.getElementById("btn-prev-day")?.addEventListener("click", () => {
      if (hasPrev) {
        state.selectedDate = days[currentIdx + 1].date;
        resetDefaultSelection();
        updateUI();
      }
    });
    document.getElementById("btn-next-day")?.addEventListener("click", () => {
      if (hasNext) {
        state.selectedDate = days[currentIdx - 1].date;
        resetDefaultSelection();
        updateUI();
      }
    });
    document.getElementById("btn-merge-toggle")?.addEventListener("click", () => {
      state.mergeSameModel = !state.mergeSameModel;
      resetDefaultSelection();
      updateUI();
    });
  } else if (state.scope === "monthly") {
    const months = state.rawData.monthly || [];
    container.innerHTML = `
      <div class="period-stepper">
        <select id="select-month" class="select-control">
          ${months
            .map(
              (m) =>
                `<option value="${m.month}" ${m.month === state.selectedMonth ? "selected" : ""}>
                  ${m.month} (${formatTokensCompact(m.tokens.total)} / ${formatCost(m.cost)})
                </option>`
            )
            .join("")}
        </select>
      </div>
      <div class="sub-toolbar">
        <span style="font-size:11px;color:var(--text-muted)">排序方式</span>
        <div class="pill-row">
          <button class="tag-btn ${state.sortBy === "cost" ? "active" : ""}" data-sort="cost">按费用</button>
          <button class="tag-btn ${state.sortBy === "total" ? "active" : ""}" data-sort="total">按总计</button>
          <button class="tag-btn ${state.sortBy === "cache" ? "active" : ""}" data-sort="cache">按缓存×</button>
        </div>
      </div>
    `;
    document.getElementById("select-month")?.addEventListener("change", (e) => {
      state.selectedMonth = e.target.value;
      resetDefaultSelection();
      updateUI();
    });
  } else {
    container.innerHTML = `
      <div class="sub-toolbar">
        <span style="font-size:11px;color:var(--text-muted)">共 ${state.availableRows.length} 个模型</span>
        <div class="pill-row">
          <button class="tag-btn ${state.sortBy === "cost" ? "active" : ""}" data-sort="cost">按费用</button>
          <button class="tag-btn ${state.sortBy === "total" ? "active" : ""}" data-sort="total">按总计</button>
          <button class="tag-btn ${state.sortBy === "cache" ? "active" : ""}" data-sort="cache">按缓存×</button>
        </div>
      </div>
    `;
  }

  container.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-sort") === state.sortBy));
    btn.addEventListener("click", () => {
      state.sortBy = btn.getAttribute("data-sort");
      updateUI();
    });
  });
}

function renderModelList() {
  const listEl = document.getElementById("model-list");
  const countEl = document.getElementById("selected-count-badge");
  if (!listEl) return;

  const q = state.searchQuery.trim().toLowerCase();
  const filtered = state.availableRows.filter((r) => {
    if (!q) return true;
    return (
      r.model.toLowerCase().includes(q) ||
      (r.providerDisplay || "").toLowerCase().includes(q) ||
      (r.sourceDisplay || "").toLowerCase().includes(q)
    );
  });

  if (countEl) countEl.textContent = `${state.selectedIds.size} / ${state.availableRows.length}`;

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="preview-empty" style="margin: 12px auto;"><strong>没有匹配的模型</strong><p>换一个关键词，或清空搜索后再试。</p></div>`;
    return;
  }

  listEl.innerHTML = filtered
    .map((r) => {
      const isChecked = state.selectedIds.has(r.id);
      const isSpotlight = state.cardMode === "spotlight" && state.spotlightRowId === r.id;
      const cacheStr = formatCacheMultiplier(r.tokens.cacheRead, r.tokens.input, r.tokens.cacheWrite);
      const displayModel = r.customModelName ?? r.model;
      const originText = [r.providerDisplay, r.sourceDisplay].filter(Boolean).join(" / ");
      const id = escapeXml(r.id);

      return `
        <div class="model-row ${isChecked ? "selected" : ""} ${isSpotlight ? "spotlight-active" : ""}" data-toggle-id="${id}" role="checkbox" tabindex="0" aria-checked="${isChecked}" aria-label="${escapeXml(displayModel)}">
          <div class="model-row-left">
            <div class="custom-check" aria-hidden="true">
              ${isChecked ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
            </div>
            <div class="model-row-body">
              <div class="model-row-top">
                <span class="model-id">${escapeXml(displayModel)}</span>
                <span class="model-price">${formatCost(r.cost)}</span>
              </div>
              <div class="model-row-sub">
                <span class="model-origin">${escapeXml(originText || "Local")}</span>
                <span>${formatTokensCompact(r.tokens.total)}</span>
                <span>${cacheStr}</span>
              </div>
            </div>
          </div>
          <div class="model-row-actions">
            <button class="mini-icon-btn ${isSpotlight ? "active" : ""}" data-spotlight-id="${id}" title="切换为单模型特写">特写</button>
            <button class="mini-icon-btn" data-edit-id="${id}" title="编辑名称与来源">编辑</button>
          </div>
        </div>
      `;
    })
    .join("");

  const toggleRow = (el) => {
    const id = el.getAttribute("data-toggle-id");
    if (!id) return;
    if (state.cardMode === "spotlight") {
      state.spotlightRowId = id;
      state.selectedIds.add(id);
    } else if (state.selectedIds.has(id)) {
      state.selectedIds.delete(id);
    } else {
      state.selectedIds.add(id);
    }
    updateUI();
  };

  listEl.querySelectorAll("[data-toggle-id]").forEach((el) => {
    el.addEventListener("click", () => toggleRow(el));
    el.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleRow(el);
    });
  });

  listEl.querySelectorAll("[data-spotlight-id]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = btn.getAttribute("data-spotlight-id");
      if (!id) return;
      state.cardMode = "spotlight";
      state.spotlightRowId = id;
      state.selectedIds.add(id);
      syncModeButtons();
      updateUI();
    });
  });

  listEl.querySelectorAll("[data-edit-id]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = btn.getAttribute("data-edit-id");
      if (id) openRowEditModal(id);
    });
  });
}

function openRowEditModal(rowId) {
  const row = state.availableRows.find((r) => r.id === rowId);
  const modal = document.getElementById("edit-modal");
  if (!row || !modal) return;
  modalReturnFocus = document.activeElement;
  document.getElementById("edit-model-name").value = row.customModelName ?? row.model;
  document.getElementById("edit-provider-name").value = row.providerDisplay || "";
  document.getElementById("edit-source-name").value = row.sourceDisplay || "";
  modal.setAttribute("data-editing-id", rowId);
  modal.classList.add("open");
  requestAnimationFrame(() => document.getElementById("edit-model-name")?.select());
}

function closeRowEditModal() {
  const modal = document.getElementById("edit-modal");
  const rowId = modal?.getAttribute("data-editing-id");
  modal?.classList.remove("open");
  if (modalReturnFocus instanceof HTMLElement && modalReturnFocus.isConnected) {
    modalReturnFocus.focus();
  } else if (rowId) {
    const editButton = Array.from(document.querySelectorAll("[data-edit-id]")).find((el) => el.getAttribute("data-edit-id") === rowId);
    if (editButton instanceof HTMLElement) editButton.focus();
  }
  modalReturnFocus = null;
}

function renderPreview() {
  const stage = document.getElementById("svg-stage");
  if (!stage) return;

  let selectedRows = [];
  if (state.cardMode === "spotlight") {
    const target =
      state.availableRows.find((r) => r.id === state.spotlightRowId) ||
      state.availableRows.find((r) => state.selectedIds.has(r.id)) ||
      state.availableRows[0];
    if (target) selectedRows = [target];
  } else {
    selectedRows = state.availableRows.filter((r) => state.selectedIds.has(r.id));
  }

  const meta = document.getElementById("preview-meta");
  const exportIds = ["btn-copy-png", "btn-save-desktop", "btn-download-png", "btn-download-svg"];
  exportIds.forEach((id) => {
    const button = document.getElementById(id);
    if (button) button.disabled = selectedRows.length === 0;
  });

  if (selectedRows.length === 0) {
    state.currentSvg = "";
    stage.innerHTML = `<div class="preview-empty"><strong>先选择要分享的模型</strong><p>从模型列表选择一条或多条记录，这里会立即生成卡片预览。</p></div>`;
    if (meta) meta.textContent = "等待选择";
    stage.setAttribute("aria-busy", "false");
    return;
  }

  const svg = renderShareCardSvg({
    ...state,
    selectedRows,
    periodLabel: getPeriodLabel(),
  });
  state.currentSvg = svg;
  stage.innerHTML = svg;
  stage.setAttribute("aria-busy", "false");

  const viewBox = stage.querySelector("svg")?.getAttribute("viewBox")?.split(/\s+/) || [];
  if (meta && viewBox.length === 4) {
    meta.textContent = `${selectedRows.length} 个模型 · ${viewBox[2]} × ${viewBox[3]}`;
  }
}

function syncModeButtons() {
  document.querySelectorAll("[data-card-mode]").forEach((btn) => {
    const active = btn.getAttribute("data-card-mode") === state.cardMode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

async function fetchInitialData(isRefresh = false) {
  const refreshBtn = document.getElementById("btn-refresh-data");
  if (refreshBtn?.disabled) return;
  const statusEl = document.getElementById("cache-status-text");
  const refreshLabel = refreshBtn?.querySelector(".btn-text");

  if (refreshBtn) {
    refreshBtn.disabled = true;
    refreshBtn.classList.add("is-loading");
    refreshBtn.setAttribute("aria-busy", "true");
  }
  if (refreshLabel) refreshLabel.textContent = isRefresh ? "同步中" : "读取中";
  if (statusEl) statusEl.textContent = isRefresh ? "正在同步本机 TokScale 数据" : "正在读取本地数据";

  try {
    const res = await fetch(isRefresh ? "/api/refresh" : "/api/data", {
      method: isRefresh ? "POST" : "GET",
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "加载数据失败");

    state.rawData = json;
    if (!state.selectedDate && json.daily?.length > 0) state.selectedDate = json.daily[0].date;
    if (!state.selectedMonth && json.monthly?.length > 0) state.selectedMonth = json.monthly[0].month;

    resetDefaultSelection();
    updateUI();
    if (statusEl) statusEl.textContent = `本地数据 · ${state.selectedDate || "全部记录"}`;
    if (isRefresh) showToast("已同步最新账单，卡片预览已更新");
  } catch (err) {
    const message = err.message || String(err);
    showToast(message, "error");
    if (statusEl) statusEl.textContent = "数据读取失败";
    if (!state.rawData) {
      const stage = document.getElementById("svg-stage");
      if (stage) {
        stage.innerHTML = `<div class="preview-empty"><strong>暂时无法读取本地数据</strong><p>${escapeXml(message)}</p><button class="btn" id="btn-retry-data" type="button"><span class="btn-text">重新读取</span></button></div>`;
        stage.setAttribute("aria-busy", "false");
        document.getElementById("btn-retry-data")?.addEventListener("click", () => fetchInitialData(false));
      }
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
      refreshBtn.classList.remove("is-loading");
      refreshBtn.removeAttribute("aria-busy");
    }
    if (refreshLabel) refreshLabel.textContent = "同步数据";
  }
}

function bindEvents() {
  document.querySelectorAll("[data-scope]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.scope = btn.getAttribute("data-scope");
      document.querySelectorAll("[data-scope]").forEach((item) => {
        const active = item === btn;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      resetDefaultSelection();
      updateUI();
    });
  });

  document.getElementById("input-search-model")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderModelList();
  });

  document.getElementById("btn-select-all")?.addEventListener("click", () => {
    state.cardMode = "multi";
    syncModeButtons();
    state.availableRows.forEach((r) => state.selectedIds.add(r.id));
    updateUI();
  });

  document.getElementById("btn-select-top3")?.addEventListener("click", () => {
    state.cardMode = "multi";
    syncModeButtons();
    state.selectedIds.clear();
    state.availableRows.slice(0, 3).forEach((r) => state.selectedIds.add(r.id));
    updateUI();
  });

  document.getElementById("btn-select-top5")?.addEventListener("click", () => {
    state.cardMode = "multi";
    syncModeButtons();
    state.selectedIds.clear();
    state.availableRows.slice(0, 5).forEach((r) => state.selectedIds.add(r.id));
    updateUI();
  });

  document.getElementById("btn-select-dedup")?.addEventListener("click", () => {
    state.cardMode = "multi";
    syncModeButtons();
    state.selectedIds.clear();
    const seen = new Set();
    state.availableRows.forEach((r) => {
      if (!seen.has(r.model)) {
        seen.add(r.model);
        state.selectedIds.add(r.id);
      }
    });
    updateUI();
    showToast("已过滤同名次要条目");
  });

  document.querySelectorAll("[data-card-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.cardMode = btn.getAttribute("data-card-mode");
      syncModeButtons();
      updateUI();
    });
  });

  const themeGrid = document.getElementById("theme-swatch-grid");
  if (themeGrid) {
    themeGrid.innerHTML = Object.values(THEMES)
      .map((theme) => `
        <button class="palette-item ${state.theme === theme.id ? "active" : ""}" data-theme-id="${theme.id}" aria-pressed="${state.theme === theme.id}" title="${escapeXml(theme.sub)}">
          <span class="swatch-pair" aria-hidden="true">
            <span class="swatch-half" style="background: ${theme.cardBg}"></span>
            <span class="swatch-half" style="background: ${theme.accent}"></span>
          </span>
          <span class="palette-copy">
            <span class="palette-name">${escapeXml(theme.name)}</span>
            <span class="palette-sub">${escapeXml(theme.sub)}</span>
          </span>
        </button>
      `)
      .join("");

    themeGrid.querySelectorAll("[data-theme-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.theme = btn.getAttribute("data-theme-id");
        themeGrid.querySelectorAll("[data-theme-id]").forEach((item) => {
          const active = item === btn;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        renderPreview();
      });
    });
  }

  const bindChoiceButtons = (attribute, prop) => {
    document.querySelectorAll(`[${attribute}]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        state[prop] = btn.getAttribute(attribute);
        document.querySelectorAll(`[${attribute}]`).forEach((item) => {
          const active = item === btn;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        renderPreview();
      });
    });
  };
  bindChoiceButtons("data-ratio", "aspectRatio");
  bindChoiceButtons("data-lang", "lang");

  document.querySelectorAll("[data-metric]").forEach((chip) => {
    const key = chip.getAttribute("data-metric");
    chip.classList.toggle("active", !!state.metrics[key]);
    chip.addEventListener("click", () => {
      state.metrics[key] = !state.metrics[key];
      chip.classList.toggle("active", !!state.metrics[key]);
      chip.setAttribute("aria-pressed", String(!!state.metrics[key]));
      renderPreview();
    });
  });

  const bindCheck = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = !!state[prop];
    el.addEventListener("change", () => {
      state[prop] = el.checked;
      renderPreview();
    });
  };
  bindCheck("chk-studio-mat", "showStudioMat");
  bindCheck("chk-summary-strip", "showSummaryStrip");
  bindCheck("chk-token-bar", "showTokenBar");
  bindCheck("chk-comp-bar", "showCompositionBar");
  bindCheck("chk-exact-numbers", "exactNumbers");
  bindCheck("chk-hide-cost", "hideCost");
  bindCheck("chk-hide-source", "hideSource");

  const bindInput = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = state[prop] || "";
    el.addEventListener("input", () => {
      state[prop] = el.value;
      schedulePreview();
    });
  };
  bindInput("input-custom-title", "customTitle");
  bindInput("input-custom-subtitle", "customSubtitle");
  bindInput("input-custom-badge", "customBadge");
  bindInput("input-custom-author", "customAuthor");
  bindInput("input-custom-footer", "customFooterNote");

  document.getElementById("btn-refresh-data")?.addEventListener("click", () => {
    fetchInitialData(true);
  });

  document.getElementById("btn-copy-png")?.addEventListener("click", () => {
    runButtonAction("btn-copy-png", "正在复制", async () => {
      try {
        const { blob, dataUrl } = await svgToPng(state.currentSvg, 3);
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        const res = await fetch("/api/save-desktop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dataUrl, filename: getExportFilename("png") }),
        });
        const json = await res.json();
        if (!json.ok) {
          showToast("卡片已复制，但桌面备份未完成", "error");
          return;
        }
        showToast("高清卡片已复制，桌面备份也已保存");
      } catch (err) {
        showToast(`复制失败：${err.message || String(err)}`, "error");
      }
    });
  });

  document.getElementById("btn-save-desktop")?.addEventListener("click", () => {
    runButtonAction("btn-save-desktop", "正在保存", async () => {
      try {
        const { dataUrl } = await svgToPng(state.currentSvg, 3);
        const filename = getExportFilename("png");
        const res = await fetch("/api/save-desktop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dataUrl, filename }),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "保存失败");
        showToast(`已保存至桌面：${filename}`);
      } catch (err) {
        showToast(`保存失败：${err.message || String(err)}`, "error");
      }
    });
  });

  document.getElementById("btn-download-png")?.addEventListener("click", () => {
    runButtonAction("btn-download-png", "生成中", async () => {
      try {
        const { dataUrl } = await svgToPng(state.currentSvg, 3);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = getExportFilename("png");
        a.click();
        showToast("高清 PNG 已开始下载");
      } catch (err) {
        showToast(`下载失败：${err.message || String(err)}`, "error");
      }
    });
  });

  document.getElementById("btn-download-svg")?.addEventListener("click", () => {
    if (!state.currentSvg) return;
    const blob = new Blob([state.currentSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getExportFilename("svg");
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("可编辑 SVG 已开始下载");
  });

  const modal = document.getElementById("edit-modal");
  document.getElementById("btn-close-modal")?.addEventListener("click", closeRowEditModal);
  document.getElementById("btn-clear-source")?.addEventListener("click", () => {
    document.getElementById("edit-source-name").value = "";
    document.getElementById("edit-source-name").focus();
  });
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeRowEditModal();
  });
  document.addEventListener("keydown", (event) => {
    if (!modal?.classList.contains("open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeRowEditModal();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(modal.querySelectorAll("button, input")).filter((el) => !el.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  document.getElementById("btn-save-modal")?.addEventListener("click", () => {
    const rowId = modal?.getAttribute("data-editing-id");
    if (!rowId) return;
    state.rowOverrides[rowId] = {
      customModelName: document.getElementById("edit-model-name").value.trim(),
      providerDisplay: document.getElementById("edit-provider-name").value.trim(),
      sourceDisplay: document.getElementById("edit-source-name").value.trim(),
    };
    updateUI();
    closeRowEditModal();
    showToast("模型信息已更新");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  fetchInitialData(false);
});
