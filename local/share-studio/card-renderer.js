// TokScale Share Studio - Swiss Editorial & Precision Telemetry Card Renderer
// Zero AI-purple, zero fake HUD brackets, zero nested-box clutter, zero em-dashes.

export const THEMES = {
  carbonGold: {
    id: "carbonGold",
    name: "曜石香槟",
    sub: "Carbon & Champagne",
    isDark: true,
    matStart: "#181512",
    matEnd: "#0C0A09",
    matAccent: "rgba(231, 166, 82, 0.11)",
    cardBg: "#121110",
    cardBgElevated: "#1B1917",
    borderOuter: "rgba(255, 255, 255, 0.12)",
    borderInner: "rgba(255, 255, 255, 0.06)",
    divider: "#292522",
    dividerStrong: "#413A32",
    textPrimary: "#F7F4EF",
    textSecondary: "#BDB5AA",
    textMuted: "#948B80",
    accent: "#E7A652",
    accentStrong: "#F0B768",
    accentTint: "rgba(231, 166, 82, 0.1)",
    accentStroke: "rgba(231, 166, 82, 0.32)",
    positive: "#34D399",
    spectrum: {
      input: "#F59E0B",
      output: "#F97316",
      cacheRead: "#10B981",
      cacheWrite: "#EAB308",
      reasoning: "#FB7185",
    },
  },
  nordicEmerald: {
    id: "nordicEmerald",
    name: "极地森绿",
    sub: "Nordic Pine & Mint",
    isDark: true,
    matStart: "#0B1914",
    matEnd: "#050B09",
    matAccent: "rgba(16, 185, 129, 0.16)",
    cardBg: "#0A120F",
    cardBgElevated: "#101C17",
    borderOuter: "rgba(167, 243, 208, 0.13)",
    borderInner: "rgba(255, 255, 255, 0.05)",
    divider: "#192B24",
    dividerStrong: "#264237",
    textPrimary: "#F0FDF4",
    textSecondary: "#9EBEB0",
    textMuted: "#59786B",
    accent: "#10B981",
    accentStrong: "#34D399",
    accentTint: "rgba(16, 185, 129, 0.13)",
    accentStroke: "rgba(52, 211, 153, 0.32)",
    positive: "#34D399",
    spectrum: {
      input: "#34D399",
      output: "#FBBF24",
      cacheRead: "#10B981",
      cacheWrite: "#A3E635",
      reasoning: "#FB923C",
    },
  },
  teVermilion: {
    id: "teVermilion",
    name: "钛灰朱砂",
    sub: "Field Vermilion",
    isDark: true,
    matStart: "#1C1918",
    matEnd: "#0E0D0D",
    matAccent: "rgba(255, 79, 40, 0.15)",
    cardBg: "#131211",
    cardBgElevated: "#1B1918",
    borderOuter: "rgba(255, 255, 255, 0.11)",
    borderInner: "rgba(255, 255, 255, 0.06)",
    divider: "#262422",
    dividerStrong: "#3D3936",
    textPrimary: "#FAF8F6",
    textSecondary: "#B8B2AD",
    textMuted: "#706B66",
    accent: "#FF4F28",
    accentStrong: "#FF6B4A",
    accentTint: "rgba(255, 79, 40, 0.13)",
    accentStroke: "rgba(255, 107, 74, 0.35)",
    positive: "#2DD4BF",
    spectrum: {
      input: "#FF6B4A",
      output: "#FBBF24",
      cacheRead: "#2DD4BF",
      cacheWrite: "#A3E635",
      reasoning: "#F43F5E",
    },
  },
  galleryLight: {
    id: "galleryLight",
    name: "画廊纯白",
    sub: "Gallery Paper & Ink",
    isDark: false,
    matStart: "#E6E4E0",
    matEnd: "#D6D3CD",
    matAccent: "rgba(225, 68, 36, 0.08)",
    cardBg: "#FAF9F6",
    cardBgElevated: "#F1EFEA",
    borderOuter: "rgba(20, 20, 19, 0.12)",
    borderInner: "rgba(20, 20, 19, 0.06)",
    divider: "#E4E1DA",
    dividerStrong: "#18181B",
    textPrimary: "#111110",
    textSecondary: "#52504C",
    textMuted: "#8C8881",
    accent: "#D9381E",
    accentStrong: "#B82912",
    accentTint: "rgba(217, 56, 30, 0.08)",
    accentStroke: "rgba(217, 56, 30, 0.25)",
    positive: "#0D9488",
    spectrum: {
      input: "#D9381E",
      output: "#D97706",
      cacheRead: "#0D9488",
      cacheWrite: "#65A30D",
      reasoning: "#E11D48",
    },
  },
  acidGraphite: {
    id: "acidGraphite",
    name: "暗夜青柠",
    sub: "Graphite & Chartreuse",
    isDark: true,
    matStart: "#141612",
    matEnd: "#090A08",
    matAccent: "rgba(190, 242, 100, 0.13)",
    cardBg: "#0F100E",
    cardBgElevated: "#161814",
    borderOuter: "rgba(255, 255, 255, 0.10)",
    borderInner: "rgba(255, 255, 255, 0.05)",
    divider: "#22251E",
    dividerStrong: "#353B2E",
    textPrimary: "#F7FEE7",
    textSecondary: "#B3BCAE",
    textMuted: "#687063",
    accent: "#A3E635",
    accentStrong: "#BEF264",
    accentTint: "rgba(163, 230, 53, 0.12)",
    accentStroke: "rgba(190, 242, 100, 0.32)",
    positive: "#4ADE80",
    spectrum: {
      input: "#BEF264",
      output: "#FBBF24",
      cacheRead: "#34D399",
      cacheWrite: "#38BDF8",
      reasoning: "#FB923C",
    },
  },
};

export const I18N = {
  zh: {
    dailyTitle: "每日模型算力账单",
    monthlyTitle: "月度模型算力账单",
    allTimeTitle: "全量模型算力总榜",
    spotlightTitle: "单模型算力特写",
    totalTokens: "总吞吐量",
    totalCost: "账单费用",
    cacheReuse: "缓存复用率",
    messages: "交互消息",
    sessions: "累计会话",
    colRank: "NO.",
    colModel: "模型与来源",
    colMessages: "消息",
    colSessions: "会话",
    colInput: "输入",
    colOutput: "输出",
    colCacheRead: "缓存读",
    colCacheWrite: "缓存写",
    colReasoning: "推理",
    colCacheHit: "缓存×",
    colTotal: "总计",
    colCost: "费用",
    colCostPer1M: "单价/1M",
    spectrumLabel: "算力结构分布",
    avgPerMsg: "单条消息均值",
    shareOfTotal: "占周期总吞吐",
    peakCache: "峰值缓存复用",
    activeModels: "个活跃模型",
    verifiedBy: "TokScale 本地遥测生成",
  },
  bi: {
    dailyTitle: "Daily Compute Ledger · 每日算力账单",
    monthlyTitle: "Monthly Compute Ledger · 月度账单",
    allTimeTitle: "All-Time Model Index · 全量总榜",
    spotlightTitle: "Model Compute Spotlight · 算力特写",
    totalTokens: "TOTAL TOKENS · 总吞吐",
    totalCost: "EST. COST · 账单费用",
    cacheReuse: "CACHE REUSE · 缓存复用",
    messages: "MESSAGES · 消息数",
    sessions: "SESSIONS · 会话数",
    colRank: "NO.",
    colModel: "MODEL / SOURCE",
    colMessages: "MSGS",
    colSessions: "SESS",
    colInput: "INPUT",
    colOutput: "OUTPUT",
    colCacheRead: "CACHE R",
    colCacheWrite: "CACHE W",
    colReasoning: "REASON",
    colCacheHit: "CACHE×",
    colTotal: "TOTAL",
    colCost: "COST",
    colCostPer1M: "$/1M",
    spectrumLabel: "TOKEN SPECTRUM · 算力构成",
    avgPerMsg: "AVG / MSG",
    shareOfTotal: "SHARE OF TOTAL",
    peakCache: "PEAK CACHE",
    activeModels: "MODELS",
    verifiedBy: "Verified by TokScale Local Telemetry",
  },
  en: {
    dailyTitle: "Daily Compute Ledger",
    monthlyTitle: "Monthly Compute Ledger",
    allTimeTitle: "All-Time Model Index",
    spotlightTitle: "Model Compute Spotlight",
    totalTokens: "TOTAL TOKENS",
    totalCost: "ESTIMATED COST",
    cacheReuse: "CACHE REUSE",
    messages: "MESSAGES",
    sessions: "SESSIONS",
    colRank: "NO.",
    colModel: "MODEL & SOURCE",
    colMessages: "MSGS",
    colSessions: "SESS",
    colInput: "INPUT",
    colOutput: "OUTPUT",
    colCacheRead: "CACHE R",
    colCacheWrite: "CACHE W",
    colReasoning: "REASON",
    colCacheHit: "CACHE×",
    colTotal: "TOTAL",
    colCost: "COST",
    colCostPer1M: "$/1M",
    spectrumLabel: "TOKEN SPECTRUM",
    avgPerMsg: "AVG / MESSAGE",
    shareOfTotal: "SHARE OF TOTAL",
    peakCache: "PEAK CACHE",
    activeModels: "MODELS",
    verifiedBy: "Verified by TokScale Local Telemetry",
  },
};

export function escapeXml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function formatTokensCompact(n) {
  const num = Number(n || 0);
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
  return num.toLocaleString("en-US");
}

export function formatTokensExact(n) {
  return Number(n || 0).toLocaleString("en-US");
}

export function formatTokens(n, exact = false) {
  return exact ? formatTokensExact(n) : formatTokensCompact(n);
}

export function formatCost(cost, hideCost = false) {
  if (hideCost) return "$***.**";
  const c = Number(cost || 0);
  if (!Number.isFinite(c) || c < 0) return "$0.00";
  if (c >= 1000) return `$${(c / 1000).toFixed(2)}K`;
  return `$${c.toFixed(2)}`;
}

export function formatCacheMultiplier(cacheRead, input, cacheWrite) {
  const cr = Number(cacheRead || 0);
  const paid = Number(input || 0) + Number(cacheWrite || 0);
  if (paid <= 0) {
    return cr > 0 ? "INF" : "0.0x";
  }
  return `${(cr / paid).toFixed(1)}x`;
}

export function formatCostPer1M(cost, totalTokens, hideCost = false) {
  if (hideCost) return "$*.**";
  const tot = Number(totalTokens || 0);
  const c = Number(cost || 0);
  if (tot <= 0 || !Number.isFinite(c) || c <= 0) return "$0.00";
  const perM = (c / tot) * 1_000_000;
  if (perM < 0.01) return "<$0.01";
  return `$${perM.toFixed(2)}`;
}

function getBrandSwatch(providerDisplay, modelName, theme) {
  const p = `${providerDisplay} ${modelName}`.toLowerCase();
  if (!theme.isDark) {
    if (p.includes("anthropic") || p.includes("claude")) return "#C2410C";
    if (p.includes("google") || p.includes("gemini")) return "#0D9488";
    if (p.includes("openai") || p.includes("gpt") || p.includes("o1") || p.includes("o3")) return "#18181B";
    if (p.includes("xai") || p.includes("grok")) return "#DC2626";
    if (p.includes("kimi") || p.includes("moonshot")) return "#B45309";
    return theme.accent;
  }
  if (p.includes("anthropic") || p.includes("claude")) return "#FB923C";
  if (p.includes("google") || p.includes("gemini")) return "#34D399";
  if (p.includes("openai") || p.includes("gpt") || p.includes("o1") || p.includes("o3")) return "#FBBF24";
  if (p.includes("xai") || p.includes("grok")) return "#FB7185";
  if (p.includes("kimi") || p.includes("moonshot")) return "#A3E635";
  if (p.includes("deepseek")) return "#2DD4BF";
  return theme.accentStrong;
}

export function renderShareCardSvg(state) {
  const theme = THEMES[state.theme] || THEMES.carbonGold;
  const t = I18N[state.lang] || I18N.zh;
  const rows = state.selectedRows || [];
  if (state.cardMode === "spotlight") {
    return renderSpotlightCard(state, theme, t, rows[0] || null);
  }
  return renderEditorialLedgerCard(state, theme, t, rows);
}

function renderCardShell(outerW, outerH, cardX, cardY, cardW, cardH, theme, hasMat) {
  const radius = 16;
  return `
    <defs>
      <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.matStart}" />
        <stop offset="100%" stop-color="${theme.matEnd}" />
      </linearGradient>
      <radialGradient id="ambientGlow" cx="82%" cy="12%" r="60%">
        <stop offset="0%" stop-color="${theme.matAccent}" />
        <stop offset="100%" stop-color="rgba(0,0,0,0)" />
      </radialGradient>
      <filter id="cardShadow" x="-8%" y="-6%" width="116%" height="116%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="${theme.isDark ? 0.34 : 0.12}" />
      </filter>
    </defs>
    ${hasMat ? `<rect width="${outerW}" height="${outerH}" fill="url(#matGrad)" /><rect width="${outerW}" height="${outerH}" fill="url(#ambientGlow)" />` : ""}
    <g transform="translate(${cardX}, ${cardY})">
      <rect width="${cardW}" height="${cardH}" rx="${radius}" fill="${theme.cardBg}" ${hasMat ? 'filter="url(#cardShadow)"' : ""} />
      <rect width="${cardW}" height="${cardH}" rx="${radius}" fill="url(#ambientGlow)" opacity="0.4" />
      <rect x="0.75" y="0.75" width="${cardW - 1.5}" height="${cardH - 1.5}" rx="${radius - 0.75}" fill="none" stroke="${theme.borderOuter}" stroke-width="1.5" />
    </g>
  `;
}

function renderEditorialLedgerCard(state, theme, t, rows) {
  const fontSans = `'Segoe UI Variable', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei UI', system-ui, sans-serif`;
  const fontMono = `'Cascadia Code', 'Cascadia Mono', Consolas, 'Microsoft YaHei UI', 'PingFang SC', monospace`;

  const ratio = state.aspectRatio || "auto";
  const isPortrait = ratio === "3:4";
  const isSquare = ratio === "1:1";
  const hasMat = state.showStudioMat !== false;

  const cardW = isPortrait ? 960 : isSquare ? 1100 : 1280;
  const padX = isPortrait ? 48 : 56;
  const padY = isPortrait ? 48 : 52;
  const innerW = cardW - padX * 2;

  // Totals calculation
  const totals = rows.reduce(
    (acc, r) => {
      acc.input += r.tokens.input;
      acc.output += r.tokens.output;
      acc.cacheRead += r.tokens.cacheRead;
      acc.cacheWrite += r.tokens.cacheWrite;
      acc.reasoning += r.tokens.reasoning || 0;
      acc.total += r.tokens.total;
      acc.cost += r.cost;
      acc.messages += r.messages;
      if (r.tokens.cacheMultiplier > acc.maxCache && Number.isFinite(r.tokens.cacheMultiplier)) {
        acc.maxCache = r.tokens.cacheMultiplier;
      }
      return acc;
    },
    { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reasoning: 0, total: 0, cost: 0, messages: 0, maxCache: 0 }
  );

  // Active columns
  const m = state.metrics || {};
  const colScale = isPortrait ? 0.84 : 1;
  const activeCols = [];
  if (m.messages) activeCols.push({ key: "messages", label: state.scope === "alltime" ? t.colSessions : t.colMessages, width: Math.round(68 * colScale) });
  if (m.input) activeCols.push({ key: "input", label: t.colInput, width: Math.round(82 * colScale) });
  if (m.output) activeCols.push({ key: "output", label: t.colOutput, width: Math.round(76 * colScale) });
  if (m.cacheRead) activeCols.push({ key: "cacheRead", label: t.colCacheRead, width: Math.round(84 * colScale) });
  if (m.cacheWrite) activeCols.push({ key: "cacheWrite", label: t.colCacheWrite, width: Math.round(78 * colScale) });
  if (m.reasoning) activeCols.push({ key: "reasoning", label: t.colReasoning, width: Math.round(74 * colScale) });
  if (m.cacheHit) activeCols.push({ key: "cacheHit", label: t.colCacheHit, width: Math.round(78 * colScale) });
  if (m.total) activeCols.push({ key: "total", label: t.colTotal, width: Math.round(88 * colScale), isBold: true });
  if (m.costPer1M && !state.hideCost) activeCols.push({ key: "costPer1M", label: t.colCostPer1M, width: Math.round(80 * colScale) });
  if (m.cost && !state.hideCost) activeCols.push({ key: "cost", label: t.colCost, width: Math.round(94 * colScale), isAccent: true });

  // Vertical layout calculation (pure Swiss hairline rhythm, zero nested boxes)
  let curY = padY;
  const headerH = 82;
  curY += headerH;

  const summaryH = state.showSummaryStrip ? 106 : 0;
  const summaryY = curY;
  if (state.showSummaryStrip) {
    curY += summaryH + 24;
  }

  const tableHeaderH = 34;
  const rowH = state.showTokenBar ? 70 : 58;
  const rowsCount = Math.max(rows.length, 1);
  const tableStartY = curY;
  curY += tableHeaderH + rowsCount * rowH + 22;

  const compH = state.showCompositionBar ? 58 : 0;
  const compY = curY;
  if (state.showCompositionBar) {
    curY += compH + 18;
  }

  const footerH = 38;
  const naturalCardH = curY + footerH + padY - 12;

  const matPad = hasMat ? 44 : 0;
  let outerW = cardW + matPad * 2;
  let outerH = naturalCardH + matPad * 2;

  if (ratio === "16:9") outerH = Math.round((outerW * 9) / 16);
  else if (ratio === "1:1") outerH = outerW;
  else if (ratio === "3:4") outerH = Math.round((outerW * 4) / 3);

  const cardH = naturalCardH;
  const cardScale = Math.min(1, (outerH - matPad * 2) / naturalCardH);
  const renderedCardW = cardW * cardScale;
  const renderedCardH = cardH * cardScale;
  const cardX = Math.round((outerW - renderedCardW) / 2);
  const cardY = Math.round((outerH - renderedCardH) / 2);
  const footerY = cardH - padY + 12;

  const defaultTitle =
    state.scope === "daily"
      ? t.dailyTitle
      : state.scope === "monthly"
      ? t.monthlyTitle
      : t.allTimeTitle;
  const titleText = (state.customTitle || "").trim() || defaultTitle;
  const periodLabel = state.periodLabel || "2026-11-11";
  const badgeText =
    (state.customBadge || "").trim() ||
    (totals.maxCache >= 2
      ? `${t.peakCache} ${totals.maxCache.toFixed(1)}x`
      : `${rows.length} ${t.activeModels}`);

  // 1. Editorial Header
  const badgeW = Math.max(136, badgeText.length * 10.5 + 32);
  const headerSvg = `
    <g transform="translate(${padX}, ${padY})">
      <!-- Period Monospace Label -->
      <text x="0" y="14" font-family="${fontMono}" font-size="12.5" font-weight="700" fill="${theme.accent}" letter-spacing="1.4">${escapeXml(periodLabel)}</text>
      ${
        state.customSubtitle
          ? `<text x="${periodLabel.length * 8.6 + 18}" y="14" font-family="${fontSans}" font-size="12.5" font-weight="600" fill="${theme.textMuted}">${escapeXml(state.customSubtitle)}</text>`
          : ""
      }

      <!-- Headline -->
      <text x="0" y="54" font-family="${fontSans}" font-size="${isPortrait ? 30 : 34}" font-weight="800" fill="${theme.textPrimary}" letter-spacing="-0.8">${escapeXml(titleText)}</text>

      <!-- Top-Right Pill Stamp -->
      <g transform="translate(${innerW - badgeW}, 22)">
        <rect width="${badgeW}" height="32" rx="16" fill="${theme.accentTint}" stroke="${theme.accentStroke}" stroke-width="1" />
        <text x="${badgeW / 2}" y="20.5" text-anchor="middle" font-family="${fontSans}" font-size="12" font-weight="700" fill="${theme.accentStrong}" letter-spacing="0.3">${escapeXml(badgeText)}</text>
      </g>

      <!-- Full-width architectural rule -->
      <line x1="0" y1="74" x2="${innerW}" y2="74" stroke="${theme.dividerStrong}" stroke-width="1.5" />
    </g>
  `;

  // 2. Editorial Typographic KPI Strip (separated by vertical hairlines, NOT 4 clunky boxes)
  let summarySvg = "";
  if (state.showSummaryStrip) {
    const kpis = [
      {
        label: t.totalTokens,
        value: formatTokens(totals.total, state.exactNumbers),
        sub: `IN ${formatTokensCompact(totals.input)}  /  OUT ${formatTokensCompact(totals.output)}`,
        color: theme.textPrimary,
      },
    ];
    if (!state.hideCost) {
      kpis.push({
        label: t.totalCost,
        value: formatCost(totals.cost, false),
        sub: `${formatCostPer1M(totals.cost, totals.total, false)} PER 1M TOKENS`,
        color: theme.accentStrong,
      });
    }
    kpis.push({
      label: t.cacheReuse,
      value: formatCacheMultiplier(totals.cacheRead, totals.input, totals.cacheWrite),
      sub: `READ ${formatTokensCompact(totals.cacheRead)}`,
      color: theme.positive,
    });
    kpis.push({
      label: state.scope === "alltime" ? t.sessions : t.messages,
      value: totals.messages.toLocaleString("en-US"),
      sub: `${rows.length} ${t.activeModels}`,
      color: theme.textPrimary,
    });

    const colW = innerW / kpis.length;
    summarySvg = `<g transform="translate(${padX}, ${summaryY})">`;
    kpis.forEach((k, i) => {
      const kx = i * colW;
      const offsetLeft = i === 0 ? 0 : 24;
      summarySvg += `
        <g transform="translate(${kx}, 0)">
          ${i > 0 ? `<line x1="0" y1="6" x2="0" y2="${summaryH - 10}" stroke="${theme.divider}" stroke-width="1" />` : ""}
          <text x="${offsetLeft}" y="18" font-family="${fontSans}" font-size="11.5" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(k.label)}</text>
          <text x="${offsetLeft}" y="66" font-family="${fontMono}" font-size="${isPortrait ? 34 : 40}" font-weight="800" fill="${k.color}" letter-spacing="-1.4">${escapeXml(k.value)}</text>
          <text x="${offsetLeft}" y="90" font-family="${fontMono}" font-size="11" font-weight="600" fill="${theme.textSecondary}" opacity="0.8">${escapeXml(k.sub)}</text>
        </g>
      `;
    });
    summarySvg += `
      <line x1="0" y1="${summaryH + 8}" x2="${innerW}" y2="${summaryH + 8}" stroke="${theme.divider}" stroke-width="1" />
    </g>`;
  }

  // 3. Precision Ledger Table (hairline dividers, crisp typography, zero boxy clutter)
  let rightCursor = innerW - 4;
  const colPositions = [];
  for (let i = activeCols.length - 1; i >= 0; i--) {
    const col = activeCols[i];
    colPositions.unshift({
      ...col,
      xRight: rightCursor,
    });
    rightCursor -= col.width;
  }

  const modelZoneW = Math.max(200, rightCursor - 46);
  const maxRowTokens = Math.max(...rows.map((r) => r.tokens.total), 1);

  let tableSvg = `
    <g transform="translate(${padX}, ${tableStartY})">
      <!-- Table Column Headers -->
      <text x="0" y="18" font-family="${fontMono}" font-size="11" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.8">${escapeXml(t.colRank)}</text>
      <text x="42" y="18" font-family="${fontSans}" font-size="11.5" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(t.colModel)}</text>
      ${colPositions
        .map(
          (col) => `
        <text x="${col.xRight}" y="18" text-anchor="end" font-family="${fontSans}" font-size="11.5" font-weight="700" fill="${col.isAccent ? theme.accentStrong : theme.textMuted}" letter-spacing="0.4">${escapeXml(col.label)}</text>
      `
        )
        .join("")}
      <line x1="0" y1="28" x2="${innerW}" y2="28" stroke="${theme.dividerStrong}" stroke-width="1" />
  `;

  rows.forEach((row, idx) => {
    const ry = tableHeaderH + idx * rowH;
    const swatch = getBrandSwatch(row.providerDisplay, row.model, theme);
    const rankStr = String(idx + 1).padStart(2, "0");

    const metaParts = [];
    if (m.provider && row.providerDisplay) metaParts.push(row.providerDisplay);
    if (m.source && !state.hideSource && row.sourceDisplay) metaParts.push(row.sourceDisplay);
    const metaLabel = metaParts.join(" / ");

    const displayModel = row.customModelName ?? row.model;
    const maxModelChars = Math.max(10, Math.floor(modelZoneW / 8.8));
    const clippedModel = displayModel.length > maxModelChars ? displayModel.slice(0, maxModelChars - 1) + "…" : displayModel;
    const maxMetaChars = Math.max(12, Math.floor(modelZoneW / 6.4));
    const clippedMeta = metaLabel.length > maxMetaChars ? metaLabel.slice(0, maxMetaChars - 1) + "…" : metaLabel;

    const getCell = (col) => {
      switch (col.key) {
        case "messages":
          return { text: Number(row.messages || 0).toLocaleString("en-US"), fill: theme.textSecondary, weight: "600" };
        case "input":
          return { text: formatTokens(row.tokens.input, state.exactNumbers), fill: theme.textSecondary, weight: "600" };
        case "output":
          return { text: formatTokens(row.tokens.output, state.exactNumbers), fill: theme.textSecondary, weight: "600" };
        case "cacheRead":
          return { text: formatTokens(row.tokens.cacheRead, state.exactNumbers), fill: theme.textSecondary, weight: "600" };
        case "cacheWrite":
          return { text: formatTokens(row.tokens.cacheWrite, state.exactNumbers), fill: theme.textSecondary, weight: "600" };
        case "reasoning":
          return { text: formatTokens(row.tokens.reasoning || 0, state.exactNumbers), fill: theme.textSecondary, weight: "600" };
        case "cacheHit":
          return { text: formatCacheMultiplier(row.tokens.cacheRead, row.tokens.input, row.tokens.cacheWrite), fill: theme.textSecondary, weight: "700" };
        case "total":
          return { text: formatTokens(row.tokens.total, state.exactNumbers), fill: theme.textPrimary, weight: "800" };
        case "costPer1M":
          return { text: formatCostPer1M(row.cost, row.tokens.total, state.hideCost), fill: theme.textSecondary, weight: "600" };
        case "cost":
          return { text: formatCost(row.cost, state.hideCost), fill: theme.accentStrong, weight: "800" };
        default:
          return { text: "-", fill: theme.textMuted, weight: "500" };
      }
    };

    const textY = state.showTokenBar ? 24 : 28;
    const valueY = state.showTokenBar ? 29 : 32;
    const metaY = state.showTokenBar ? 41 : 47;

    let barSvg = "";
    if (state.showTokenBar) {
      const maxBarW = Math.min(modelZoneW, 320);
      const barW = Math.max(12, (row.tokens.total / maxRowTokens) * maxBarW);
      const tot = Math.max(row.tokens.total, 1);
      const wIn = (row.tokens.input / tot) * barW;
      const wOut = (row.tokens.output / tot) * barW;
      const wCr = (row.tokens.cacheRead / tot) * barW;
      const wCw = ((row.tokens.cacheWrite + (row.tokens.reasoning || 0)) / tot) * barW;

      barSvg = `
        <g transform="translate(42, 54)">
          <rect x="0" y="0" width="${wIn}" height="3" rx="1.5" fill="${theme.spectrum.input}" />
          <rect x="${wIn}" y="0" width="${wOut}" height="3" fill="${theme.spectrum.output}" />
          <rect x="${wIn + wOut}" y="0" width="${wCr}" height="3" fill="${theme.spectrum.cacheRead}" />
          <rect x="${wIn + wOut + wCr}" y="0" width="${wCw}" height="3" rx="1.5" fill="${theme.spectrum.cacheWrite}" />
        </g>
      `;
    }

    tableSvg += `
      <g transform="translate(0, ${ry})">
        <rect x="0" y="${textY - 12}" width="3" height="14" rx="1.5" fill="${swatch}" />
        <text x="10" y="${textY}" font-family="${fontMono}" font-size="12" font-weight="700" fill="${theme.textMuted}">${rankStr}</text>
        <text x="42" y="${textY}" font-family="${fontMono}" font-size="15" font-weight="750" fill="${theme.textPrimary}" letter-spacing="-0.3">${escapeXml(clippedModel)}</text>
        ${clippedMeta ? `<text x="42" y="${metaY}" font-family="${fontSans}" font-size="10.5" font-weight="500" fill="${theme.textMuted}">${escapeXml(clippedMeta)}</text>` : ""}
        ${colPositions
          .map((col) => {
            const cell = getCell(col);
            return `<text x="${col.xRight}" y="${valueY}" text-anchor="end" font-family="${fontMono}" font-size="${col.isAccent || col.isBold ? 14.5 : 13.5}" font-weight="${cell.weight}" fill="${cell.fill}">${escapeXml(cell.text)}</text>`;
          })
          .join("")}
        ${barSvg}
        <line x1="0" y1="${rowH - 1}" x2="${innerW}" y2="${rowH - 1}" stroke="${theme.divider}" stroke-width="1" />
      </g>
    `;
  });

  tableSvg += `</g>`;

  // 4. Token Composition Spectrum Strip
  let compSvg = "";
  if (state.showCompositionBar && totals.total > 0) {
    const tot = Math.max(totals.total, 1);
    const pIn = (totals.input / tot) * 100;
    const pOut = (totals.output / tot) * 100;
    const pCr = (totals.cacheRead / tot) * 100;
    const pCw = ((totals.cacheWrite + totals.reasoning) / tot) * 100;

    compSvg = `
      <g transform="translate(${padX}, ${compY})">
        <text x="0" y="14" font-family="${fontSans}" font-size="11" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(t.spectrumLabel)}</text>
        <text x="${innerW}" y="14" text-anchor="end" font-family="${fontSans}" font-size="11" font-weight="600" fill="${theme.textSecondary}">
          <tspan fill="${theme.spectrum.input}">■</tspan> ${escapeXml(t.colInput)} ${pIn.toFixed(1)}%    
          <tspan fill="${theme.spectrum.output}">■</tspan> ${escapeXml(t.colOutput)} ${pOut.toFixed(1)}%    
          <tspan fill="${theme.spectrum.cacheRead}">■</tspan> ${escapeXml(t.colCacheRead)} ${pCr.toFixed(1)}%    
          <tspan fill="${theme.spectrum.cacheWrite}">■</tspan> ${escapeXml(t.colCacheWrite)} ${pCw.toFixed(1)}%
        </text>
        <g transform="translate(0, 24)">
          <rect x="0" y="0" width="${(pIn / 100) * innerW}" height="8" rx="2" fill="${theme.spectrum.input}" />
          <rect x="${(pIn / 100) * innerW}" y="0" width="${(pOut / 100) * innerW}" height="8" fill="${theme.spectrum.output}" />
          <rect x="${((pIn + pOut) / 100) * innerW}" y="0" width="${(pCr / 100) * innerW}" height="8" fill="${theme.spectrum.cacheRead}" />
          <rect x="${((pIn + pOut + pCr) / 100) * innerW}" y="0" width="${(pCw / 100) * innerW}" height="8" rx="2" fill="${theme.spectrum.cacheWrite}" />
        </g>
      </g>
    `;
  }

  // 5. Editorial Footer
  const authorText = (state.customAuthor || "").trim();
  const noteText = (state.customFooterNote || "").trim() || t.verifiedBy;
  const footerSvg = `
    <g transform="translate(${padX}, ${footerY})">
      <text x="0" y="0" font-family="${fontSans}" font-size="12" font-weight="700" fill="${theme.textSecondary}">
        ${authorText ? `${escapeXml(authorText)}   /   ` : ""}<tspan fill="${theme.textMuted}" font-weight="500">${escapeXml(noteText)}</tspan>
      </text>
      <text x="${innerW}" y="0" text-anchor="end" font-family="${fontMono}" font-size="12" font-weight="700" fill="${theme.textSecondary}" letter-spacing="0.8">tokscale.ai</text>
    </g>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${outerW} ${outerH}" width="${outerW}" height="${outerH}">
    ${renderCardShell(outerW, outerH, cardX, cardY, renderedCardW, renderedCardH, theme, hasMat)}
    <g transform="translate(${cardX}, ${cardY}) scale(${cardScale})">
      ${headerSvg}
      ${summarySvg}
      ${tableSvg}
      ${compSvg}
      ${footerSvg}
    </g>
  </svg>`;
}

function renderSpotlightCard(state, theme, t, row) {
  const fontSans = `'Segoe UI Variable', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei UI', system-ui, sans-serif`;
  const fontMono = `'Cascadia Code', 'Cascadia Mono', Consolas, 'Microsoft YaHei UI', 'PingFang SC', monospace`;

  const ratio = state.aspectRatio || "auto";
  const isPortrait = ratio === "3:4";
  const isSquare = ratio === "1:1";
  const hasMat = state.showStudioMat !== false;

  const cardW = isPortrait ? 860 : isSquare ? 960 : 1120;
  const padX = 56;
  const padY = 52;
  const innerW = cardW - padX * 2;

  const safeRow = row || {
    model: "Select a Model",
    providerDisplay: "Provider",
    sourceDisplay: "Client",
    messages: 0,
    cost: 0,
    tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reasoning: 0, total: 0, cacheMultiplier: 0 },
  };

  const swatch = getBrandSwatch(safeRow.providerDisplay, safeRow.model, theme);
  const displayModel = safeRow.customModelName ?? safeRow.model;
  const periodLabel = state.periodLabel || safeRow.date || "2026-11-11";

  const m = state.metrics || {};
  const bentoItems = [];
  if (m.messages) {
    bentoItems.push({
      label: state.scope === "alltime" ? t.colSessions : t.colMessages,
      value: Number(safeRow.messages || 0).toLocaleString("en-US"),
      sub: safeRow.messages > 0 ? `${t.avgPerMsg} ${formatTokensCompact(Math.round(safeRow.tokens.total / safeRow.messages))}` : "ACTIVE",
      color: theme.textPrimary,
    });
  }
  if (m.input) {
    bentoItems.push({
      label: t.colInput,
      value: formatTokens(safeRow.tokens.input, state.exactNumbers),
      sub: `${safeRow.tokens.total > 0 ? ((safeRow.tokens.input / safeRow.tokens.total) * 100).toFixed(1) : "0.0"}%`,
      color: theme.spectrum.input,
    });
  }
  if (m.output) {
    bentoItems.push({
      label: t.colOutput,
      value: formatTokens(safeRow.tokens.output, state.exactNumbers),
      sub: `${safeRow.tokens.total > 0 ? ((safeRow.tokens.output / safeRow.tokens.total) * 100).toFixed(1) : "0.0"}%`,
      color: theme.spectrum.output,
    });
  }
  if (m.cacheRead) {
    bentoItems.push({
      label: t.colCacheRead,
      value: formatTokens(safeRow.tokens.cacheRead, state.exactNumbers),
      sub: `${safeRow.tokens.total > 0 ? ((safeRow.tokens.cacheRead / safeRow.tokens.total) * 100).toFixed(1) : "0.0"}%`,
      color: theme.spectrum.cacheRead,
    });
  }
  if (m.cacheWrite) {
    bentoItems.push({
      label: t.colCacheWrite,
      value: formatTokens(safeRow.tokens.cacheWrite, state.exactNumbers),
      sub: `${safeRow.tokens.total > 0 ? ((safeRow.tokens.cacheWrite / safeRow.tokens.total) * 100).toFixed(1) : "0.0"}%`,
      color: theme.spectrum.cacheWrite,
    });
  }
  if (m.cacheHit) {
    bentoItems.push({
      label: t.colCacheHit,
      value: formatCacheMultiplier(safeRow.tokens.cacheRead, safeRow.tokens.input, safeRow.tokens.cacheWrite),
      sub: "REUSE RATIO",
      color: theme.positive,
    });
  }
  if (m.costPer1M && !state.hideCost) {
    bentoItems.push({
      label: t.colCostPer1M,
      value: formatCostPer1M(safeRow.cost, safeRow.tokens.total, state.hideCost),
      sub: "BLENDED RATE",
      color: theme.accentStrong,
    });
  }
  if (m.reasoning && safeRow.tokens.reasoning > 0) {
    bentoItems.push({
      label: t.colReasoning,
      value: formatTokens(safeRow.tokens.reasoning, state.exactNumbers),
      sub: "REASONING",
      color: theme.spectrum.reasoning,
    });
  }

  const colsPerRow = isPortrait ? 2 : bentoItems.length >= 7 ? 4 : Math.min(3, Math.max(2, bentoItems.length));
  const bentoRows = Math.ceil(bentoItems.length / colsPerRow);
  const bentoCardH = 104;
  const bentoTotalH = bentoRows > 0 ? bentoRows * bentoCardH : 0;

  const naturalCardH = padY + 96 + 132 + (state.showCompositionBar ? 68 : 0) + bentoTotalH + 56 + padY;
  const matPad = hasMat ? 44 : 0;
  let outerW = cardW + matPad * 2;
  let outerH = naturalCardH + matPad * 2;

  if (ratio === "16:9") outerH = Math.round((outerW * 9) / 16);
  else if (ratio === "1:1") outerH = outerW;
  else if (ratio === "3:4") outerH = Math.round((outerW * 4) / 3);

  const cardH = naturalCardH;
  const cardScale = Math.min(1, (outerH - matPad * 2) / naturalCardH);
  const renderedCardW = cardW * cardScale;
  const renderedCardH = cardH * cardScale;
  const cardX = Math.round((outerW - renderedCardW) / 2);
  const cardY = Math.round((outerH - renderedCardH) / 2);

  const heroY = padY + 96;
  const compY = heroY + 132;
  const bentoStartY = compY + (state.showCompositionBar ? 68 : 0);
  const footerY = cardH - padY + 10;

  const metaTags = [];
  if (m.provider && safeRow.providerDisplay) metaTags.push(safeRow.providerDisplay);
  if (m.source && !state.hideSource && safeRow.sourceDisplay) metaTags.push(safeRow.sourceDisplay);
  metaTags.push(periodLabel);

  const headerSvg = `
    <g transform="translate(${padX}, ${padY})">
      <text x="0" y="14" font-family="${fontMono}" font-size="12" font-weight="700" fill="${swatch}" letter-spacing="1.2">${escapeXml(metaTags.join("   /   "))}</text>
      <text x="0" y="62" font-family="${fontMono}" font-size="${isPortrait ? 38 : 44}" font-weight="800" fill="${theme.textPrimary}" letter-spacing="-1.2">${escapeXml(displayModel)}</text>
      <line x1="0" y1="82" x2="${innerW}" y2="82" stroke="${theme.dividerStrong}" stroke-width="1.5" />
    </g>
  `;

  const halfW = innerW / 2;
  const rightLabel = state.hideCost ? t.cacheReuse : t.totalCost;
  const rightVal = state.hideCost
    ? formatCacheMultiplier(safeRow.tokens.cacheRead, safeRow.tokens.input, safeRow.tokens.cacheWrite)
    : formatCost(safeRow.cost, false);
  const rightSub = state.hideCost
    ? `CACHE READ ${formatTokensCompact(safeRow.tokens.cacheRead)}`
    : `${formatCostPer1M(safeRow.cost, safeRow.tokens.total, false)} / 1M   ·   CACHE ${formatCacheMultiplier(safeRow.tokens.cacheRead, safeRow.tokens.input, safeRow.tokens.cacheWrite)}`;

  const heroSvg = `
    <g transform="translate(${padX}, ${heroY})">
      <text x="0" y="18" font-family="${fontSans}" font-size="12" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(t.totalTokens)}</text>
      <text x="0" y="74" font-family="${fontMono}" font-size="52" font-weight="800" fill="${theme.textPrimary}" letter-spacing="-1.8">${escapeXml(formatTokens(safeRow.tokens.total, state.exactNumbers))}</text>
      <text x="0" y="100" font-family="${fontMono}" font-size="11.5" font-weight="600" fill="${theme.textSecondary}">${escapeXml(formatTokensExact(safeRow.tokens.total))} TOKENS</text>

      <line x1="${halfW}" y1="6" x2="${halfW}" y2="104" stroke="${theme.divider}" stroke-width="1" />

      <g transform="translate(${halfW + 32}, 0)">
        <text x="0" y="18" font-family="${fontSans}" font-size="12" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(rightLabel)}</text>
        <text x="0" y="74" font-family="${fontMono}" font-size="52" font-weight="800" fill="${theme.accentStrong}" letter-spacing="-1.8">${escapeXml(rightVal)}</text>
        <text x="0" y="100" font-family="${fontMono}" font-size="11.5" font-weight="600" fill="${theme.textSecondary}">${escapeXml(rightSub)}</text>
      </g>
      <line x1="0" y1="118" x2="${innerW}" y2="118" stroke="${theme.divider}" stroke-width="1" />
    </g>
  `;

  let compSvg = "";
  if (state.showCompositionBar) {
    const tot = Math.max(safeRow.tokens.total, 1);
    const pIn = (safeRow.tokens.input / tot) * 100;
    const pOut = (safeRow.tokens.output / tot) * 100;
    const pCr = (safeRow.tokens.cacheRead / tot) * 100;
    const pCw = ((safeRow.tokens.cacheWrite + (safeRow.tokens.reasoning || 0)) / tot) * 100;

    compSvg = `
      <g transform="translate(${padX}, ${compY})">
        <text x="0" y="14" font-family="${fontSans}" font-size="11" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.6">${escapeXml(t.spectrumLabel)}</text>
        <text x="${innerW}" y="14" text-anchor="end" font-family="${fontSans}" font-size="11" font-weight="600" fill="${theme.textSecondary}">
          <tspan fill="${theme.spectrum.input}">■</tspan> ${escapeXml(t.colInput)} ${pIn.toFixed(1)}%    
          <tspan fill="${theme.spectrum.output}">■</tspan> ${escapeXml(t.colOutput)} ${pOut.toFixed(1)}%    
          <tspan fill="${theme.spectrum.cacheRead}">■</tspan> ${escapeXml(t.colCacheRead)} ${pCr.toFixed(1)}%    
          <tspan fill="${theme.spectrum.cacheWrite}">■</tspan> ${escapeXml(t.colCacheWrite)} ${pCw.toFixed(1)}%
        </text>
        <g transform="translate(0, 24)">
          <rect x="0" y="0" width="${(pIn / 100) * innerW}" height="10" rx="3" fill="${theme.spectrum.input}" />
          <rect x="${(pIn / 100) * innerW}" y="0" width="${(pOut / 100) * innerW}" height="10" fill="${theme.spectrum.output}" />
          <rect x="${((pIn + pOut) / 100) * innerW}" y="0" width="${(pCr / 100) * innerW}" height="10" fill="${theme.spectrum.cacheRead}" />
          <rect x="${((pIn + pOut + pCr) / 100) * innerW}" y="0" width="${(pCw / 100) * innerW}" height="10" rx="3" fill="${theme.spectrum.cacheWrite}" />
        </g>
      </g>
    `;
  }

  let bentoSvg = `<g transform="translate(${padX}, ${bentoStartY})">`;
  if (bentoRows > 0) {
    bentoSvg += `<line x1="0" y1="0" x2="${innerW}" y2="0" stroke="${theme.divider}" stroke-width="1" />`;
  }
  for (let r = 0; r < bentoRows; r++) {
    const startIdx = r * colsPerRow;
    const rowSlice = bentoItems.slice(startIdx, startIdx + colsPerRow);
    const rowCols = rowSlice.length;
    const cellW = innerW / rowCols;
    const y = r * bentoCardH;
    rowSlice.forEach((item, c) => {
      const x = c * cellW;
      const padLeft = c === 0 ? 0 : 24;
      bentoSvg += `
        <g transform="translate(${x}, ${y})">
          ${c > 0 ? `<line x1="0" y1="14" x2="0" y2="${bentoCardH - 14}" stroke="${theme.divider}" stroke-width="1" />` : ""}
          <text x="${padLeft}" y="28" font-family="${fontSans}" font-size="11.5" font-weight="700" fill="${theme.textMuted}" letter-spacing="0.5">${escapeXml(item.label)}</text>
          <text x="${padLeft}" y="66" font-family="${fontMono}" font-size="30" font-weight="800" fill="${item.color}" letter-spacing="-0.8">${escapeXml(item.value)}</text>
          <text x="${padLeft}" y="86" font-family="${fontMono}" font-size="10.5" font-weight="600" fill="${theme.textSecondary}" opacity="0.8">${escapeXml(item.sub)}</text>
        </g>
      `;
    });
    if (r < bentoRows - 1) {
      bentoSvg += `<line x1="0" y1="${(r + 1) * bentoCardH}" x2="${innerW}" y2="${(r + 1) * bentoCardH}" stroke="${theme.divider}" stroke-width="1" />`;
    }
  }
  bentoSvg += `</g>`;

  const authorText = (state.customAuthor || "").trim();
  const noteText = (state.customFooterNote || "").trim() || t.verifiedBy;
  const footerSvg = `
    <g transform="translate(${padX}, ${footerY})">
      <line x1="0" y1="-18" x2="${innerW}" y2="-18" stroke="${theme.divider}" stroke-width="1" />
      <text x="0" y="4" font-family="${fontSans}" font-size="12" font-weight="700" fill="${theme.textSecondary}">
        ${authorText ? `${escapeXml(authorText)}   /   ` : ""}<tspan fill="${theme.textMuted}" font-weight="500">${escapeXml(noteText)}</tspan>
      </text>
      <text x="${innerW}" y="4" text-anchor="end" font-family="${fontMono}" font-size="12" font-weight="700" fill="${theme.textSecondary}" letter-spacing="0.8">tokscale.ai</text>
    </g>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${outerW} ${outerH}" width="${outerW}" height="${outerH}">
    ${renderCardShell(outerW, outerH, cardX, cardY, renderedCardW, renderedCardH, theme, hasMat)}
    <g transform="translate(${cardX}, ${cardY}) scale(${cardScale})">
      ${headerSvg}
      ${heroSvg}
      ${compSvg}
      ${bentoSvg}
      ${footerSvg}
    </g>
  </svg>`;
}

export async function svgToPng(svgString, scale = 3) {
  return new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgEl = doc.documentElement;
    const width = Number(svgEl.getAttribute("width") || 1280);
    const height = Number(svgEl.getAttribute("height") || 720);

    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const dataUrl = canvas.toDataURL("image/png");
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Canvas toBlob failed"));
        resolve({ blob, dataUrl, width: canvas.width, height: canvas.height });
      }, "image/png");
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}
