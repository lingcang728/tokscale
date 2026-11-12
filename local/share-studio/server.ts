import { spawn } from "bun";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PORT = Number(process.env.TOKSCALE_SHARE_PORT || 4399);

const CLIENT_DISPLAY_NAMES: Record<string, string> = {
  opencode: "OpenCode",
  claude: "Claude Code",
  codex: "Codex CLI",
  cursor: "Cursor IDE",
  gemini: "Gemini CLI",
  amp: "Amp",
  droid: "Droid",
  openclaw: "OpenClaw",
  pi: "Pi",
  kimi: "Kimi CLI",
  qwen: "Qwen Code",
  roocode: "Roo Code",
  kilocode: "Kilo CLI",
  mux: "Mux",
  kilo: "Kilo",
  crush: "Crush",
  hermes: "Hermes Agent",
  copilot: "GitHub Copilot",
  goose: "Goose",
  codebuff: "Codebuff",
  antigravity: "Antigravity",
  "antigravity-extension": "Antigravity Ext",
  "antigravity-cli": "Antigravity CLI",
  zed: "Zed",
  kiro: "Kiro",
  trae: "Trae",
  warp: "Warp",
  cline: "Cline",
  gjc: "GJC",
  grok: "Grok Build",
  jcode: "JCode",
  commandcode: "Command Code",
  micode: "MiMo Code",
  "micode-desktop": "MiMo Desktop",
  junie: "Junie",
  zcode: "ZCode",
  opencodereview: "OpenCodeReview",
  codebuddy: "CodeBuddy",
  workbuddy: "WorkBuddy",
  "devin-cli": "Devin CLI",
  "devin-desktop": "Devin Desktop",
  senpi: "Senpi",
  augment: "Augment",
  kimchi: "Kimchi",
  reasonix: "Reasonix",
  "prime-agent": "Prime Agent",
  freebuff: "Freebuff",
  cherrystudio: "Cherry Studio",
  dsh: "DeepSeek",
  mcode: "Mcode",
  fx: "Fx",
  omp: "Oh My Pi",
  lmstudio: "LM Studio",
  unsloth: "Unsloth",
  hindsight: "Hindsight",
  muse: "Muse",
  aside: "Aside",
  vibe: "Mistral Vibe",
  proma: "Proma",
  synthetic: "Synthetic",
};

function mapSingleProvider(raw: string): string {
  const lower = (raw || "").trim().toLowerCase();
  if (!lower) return "";
  const exact: Record<string, string> = {
    anthropic: "Anthropic",
    google: "Google",
    "google-vertex": "Google Vertex",
    google_vertex: "Google Vertex",
    cursor: "Cursor",
    deepseek: "DeepSeek",
    xai: "xAI",
    meta: "Meta",
    mistral: "Mistral",
    cohere: "Cohere",
    opencode: "OpenCode",
    openrouter: "OpenRouter",
    orcarouter: "OrcaRouter",
    moonshot: "Moonshot",
    moonshotai: "Moonshot",
    zai: "Z.ai",
    zhipu: "Zhipu",
    minimax: "MiniMax",
    alibaba: "Alibaba",
    qwen: "Qwen",
  };
  if (exact[lower]) return exact[lower];
  if (lower.startsWith("openai")) return "OpenAI";
  if (lower.startsWith("kimi")) return "Kimi";
  if (lower.startsWith("github-cop") || lower.includes("copilot")) return "GitHub Copilot";
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => (w.toLowerCase() === "ai" || w.toLowerCase() === "api" ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function getProviderDisplayName(provider: string): string {
  if (!provider) return "";
  if (provider.includes(",")) {
    return provider
      .split(",")
      .map((s) => mapSingleProvider(s.trim()))
      .filter(Boolean)
      .join(", ");
  }
  return mapSingleProvider(provider);
}

function getClientDisplayName(client: string): string {
  if (!client) return "";
  if (client.includes(",")) {
    return client
      .split(",")
      .map((s) => {
        const k = s.trim();
        return CLIENT_DISPLAY_NAMES[k.toLowerCase()] || k;
      })
      .filter(Boolean)
      .join(", ");
  }
  const key = client.trim().toLowerCase();
  return CLIENT_DISPLAY_NAMES[key] || client;
}

function getCachePaths(): string[] {
  const appData = process.env.APPDATA || join(homedir(), "AppData", "Roaming");
  return [
    join(appData, "tokscale", "cache", "tui-data-cache.json"),
    join(homedir(), ".config", "tokscale", "cache", "tui-data-cache.json"),
    join(homedir(), ".cache", "tokscale", "tui-data-cache.json"),
  ];
}

function findCacheFile(): string | null {
  for (const p of getCachePaths()) {
    if (existsSync(p)) return p;
  }
  return null;
}

function getActiveTokscaleExecutable(): string {
  const localAppData = process.env.LOCALAPPDATA || join(homedir(), "AppData", "Local");
  const activePathFile = join(localAppData, "tokscale", "recovery", "bin", "active-path.txt");
  if (existsSync(activePathFile)) {
    const target = readFileSync(activePathFile, "utf8").trim();
    if (target && existsSync(target)) return target;
  }
  const cmdFile = join(localAppData, "tokscale", "recovery", "bin", "tokscale.cmd");
  if (existsSync(cmdFile)) return cmdFile;
  return "tokscale";
}

interface RawTokens {
  input?: number;
  output?: number;
  cacheRead?: number;
  cacheWrite?: number;
  reasoning?: number;
}

function normalizeTokens(t: RawTokens = {}) {
  const input = Number(t.input || 0);
  const output = Number(t.output || 0);
  const cacheRead = Number(t.cacheRead || 0);
  const cacheWrite = Number(t.cacheWrite || 0);
  const reasoning = Number(t.reasoning || 0);
  const total = input + output + cacheRead + cacheWrite + reasoning;
  const paid = input + cacheWrite;
  const cacheMultiplier = paid > 0 ? cacheRead / paid : cacheRead > 0 ? Infinity : 0;
  const cacheHitPercent = total > 0 ? (cacheRead / total) * 100 : 0;
  return {
    input,
    output,
    cacheRead,
    cacheWrite,
    reasoning,
    total,
    cacheMultiplier,
    cacheHitPercent,
  };
}

function loadAndNormalizeData() {
  const cachePath = findCacheFile();
  if (!cachePath) {
    throw new Error("未找到本地 TokScale 缓存文件 (tui-data-cache.json)，请先运行一次 tokscale。");
  }

  const rawText = readFileSync(cachePath, "utf8");
  const parsed = JSON.parse(rawText);
  const data = parsed.data || {};

  // 1. Process daily entries (sorted newest first)
  const rawDaily = Array.isArray(data.daily) ? data.daily : [];
  const daily = rawDaily
    .map((day: any) => {
      const dayTokens = normalizeTokens(day.tokens);
      const rows: any[] = [];

      if (Array.isArray(day.sourceBreakdown)) {
        for (const [sourceKey, sourceInfo] of day.sourceBreakdown) {
          const modelsList = Array.isArray(sourceInfo?.models) ? sourceInfo.models : [];
          for (const [modelKey, modelInfo] of modelsList) {
            const tok = normalizeTokens(modelInfo?.tokens);
            const cost = Number(modelInfo?.cost || 0);
            const messages = Number(modelInfo?.messages || 0);
            const msPer1KTokens = modelInfo?.performance?.msPer1KTokens ?? null;
            const modelName = modelInfo?.displayName || modelKey;
            const providerRaw = modelInfo?.provider || "";
            rows.push({
              id: `${day.date}::${sourceKey}::${modelName}`,
              date: day.date,
              model: modelName,
              provider: providerRaw,
              providerDisplay: getProviderDisplayName(providerRaw),
              source: sourceKey,
              sourceDisplay: getClientDisplayName(sourceKey),
              messages,
              tokens: tok,
              cost,
              costPer1M: tok.total > 0 ? (cost / tok.total) * 1_000_000 : 0,
              msPer1KTokens,
            });
          }
        }
      }

      // Sort rows by total tokens or cost descending (default TUI daily detail order is by tokens/cost)
      rows.sort((a, b) => b.cost - a.cost || b.tokens.total - a.tokens.total);

      return {
        date: day.date,
        tokens: dayTokens,
        cost: Number(day.cost || 0),
        messageCount: Number(day.messageCount || 0),
        turnCount: Number(day.turnCount || 0),
        rows,
      };
    })
    .sort((a: any, b: any) => String(b.date).localeCompare(String(a.date)));

  // 2. Process monthly aggregation from daily
  const monthlyMap = new Map<string, {
    month: string;
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    reasoning: number;
    cost: number;
    messageCount: number;
    activeDays: number;
    modelMap: Map<string, any>;
  }>();

  for (const d of daily) {
    const month = String(d.date).slice(0, 7);
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        month,
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        reasoning: 0,
        cost: 0,
        messageCount: 0,
        activeDays: 0,
        modelMap: new Map(),
      });
    }
    const m = monthlyMap.get(month)!;
    m.input += d.tokens.input;
    m.output += d.tokens.output;
    m.cacheRead += d.tokens.cacheRead;
    m.cacheWrite += d.tokens.cacheWrite;
    m.reasoning += d.tokens.reasoning;
    m.cost += d.cost;
    m.messageCount += d.messageCount;
    if (d.tokens.total > 0 || d.cost > 0) m.activeDays += 1;

    for (const r of d.rows) {
      const key = `${r.model}::${r.providerDisplay}`;
      if (!m.modelMap.has(key)) {
        m.modelMap.set(key, {
          id: `${month}::${key}`,
          date: month,
          model: r.model,
          provider: r.provider,
          providerDisplay: r.providerDisplay,
          sourcesSet: new Set<string>(),
          messages: 0,
          rawTokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reasoning: 0 },
          cost: 0,
        });
      }
      const agg = m.modelMap.get(key)!;
      if (r.sourceDisplay) agg.sourcesSet.add(r.sourceDisplay);
      agg.messages += r.messages;
      agg.rawTokens.input += r.tokens.input;
      agg.rawTokens.output += r.tokens.output;
      agg.rawTokens.cacheRead += r.tokens.cacheRead;
      agg.rawTokens.cacheWrite += r.tokens.cacheWrite;
      agg.rawTokens.reasoning += r.tokens.reasoning;
      agg.cost += r.cost;
    }
  }

  const monthly = Array.from(monthlyMap.values())
    .map((m) => {
      const tokens = normalizeTokens(m.rawTokens || m);
      const rows = Array.from(m.modelMap.values())
        .map((item) => {
          const tok = normalizeTokens(item.rawTokens);
          const sourceDisplay = Array.from(item.sourcesSet).join(", ");
          return {
            id: item.id,
            date: m.month,
            model: item.model,
            provider: item.provider,
            providerDisplay: item.providerDisplay,
            source: sourceDisplay,
            sourceDisplay,
            messages: item.messages,
            tokens: tok,
            cost: item.cost,
            costPer1M: tok.total > 0 ? (item.cost / tok.total) * 1_000_000 : 0,
            msPer1KTokens: null,
          };
        })
        .sort((a, b) => b.cost - a.cost || b.tokens.total - a.tokens.total);

      return {
        month: m.month,
        tokens,
        cost: m.cost,
        messageCount: m.messageCount,
        activeDays: m.activeDays,
        rows,
      };
    })
    .sort((a, b) => b.month.localeCompare(a.month));

  // 3. Process all-time models
  const rawModels = Array.isArray(data.models) ? data.models : [];
  const models = rawModels
    .map((m: any, idx: number) => {
      const tok = normalizeTokens(m.tokens);
      const cost = Number(m.cost || 0);
      return {
        id: `alltime::${m.groupKey || m.model}::${idx}`,
        date: "ALL-TIME",
        model: m.model,
        provider: m.provider || "",
        providerDisplay: getProviderDisplayName(m.provider || ""),
        source: m.client || "",
        sourceDisplay: getClientDisplayName(m.client || ""),
        messages: Number(m.sessionCount || 0),
        isSessionCount: true,
        tokens: tok,
        cost,
        costPer1M: tok.total > 0 ? (cost / tok.total) * 1_000_000 : 0,
        msPer1KTokens: m.performance?.msPer1KTokens ?? null,
      };
    })
    .sort((a: any, b: any) => b.cost - a.cost || b.tokens.total - a.tokens.total);

  return {
    cachePath,
    timestamp: parsed.timestamp || Date.now(),
    overview: {
      totalTokens: Number(data.totalTokens || 0),
      totalCost: Number(data.totalCost || 0),
      currentStreak: Number(data.currentStreak || 0),
      longestStreak: Number(data.longestStreak || 0),
      activeDays: daily.filter((d: any) => d.tokens.total > 0 || d.cost > 0).length,
    },
    daily,
    monthly,
    models,
  };
}

const server = Bun.serve({
  port: PORT,
  hostname: "127.0.0.1",
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/data" && req.method === "GET") {
      try {
        const payload = loadAndNormalizeData();
        return Response.json({ ok: true, ...payload });
      } catch (err: any) {
        return Response.json(
          { ok: false, error: err?.message || String(err) },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/api/refresh" && req.method === "POST") {
      try {
        const exe = getActiveTokscaleExecutable();
        const proc = spawn([exe, "models", "--light", "--write-cache", "--no-spinner"], {
          stdout: "ignore",
          stderr: "pipe",
        });
        await proc.exited;
        const payload = loadAndNormalizeData();
        return Response.json({ ok: true, ...payload });
      } catch (err: any) {
        return Response.json(
          { ok: false, error: err?.message || String(err) },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/api/save-desktop" && req.method === "POST") {
      try {
        const body = await req.json();
        const { dataUrl, filename } = body;
        if (!dataUrl || typeof dataUrl !== "string") {
          throw new Error("无效的图片数据");
        }
        const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(base64, "base64");
        const desktopDir = join(homedir(), "Desktop");
        if (!existsSync(desktopDir)) {
          mkdirSync(desktopDir, { recursive: true });
        }
        const safeName = (filename || `TokScale-Share-${Date.now()}.png`).replace(/[<>:"/\\|?*]+/g, "-");
        const targetPath = join(desktopDir, safeName);
        writeFileSync(targetPath, buf);
        return Response.json({ ok: true, path: targetPath });
      } catch (err: any) {
        return Response.json(
          { ok: false, error: err?.message || String(err) },
          { status: 500 }
        );
      }
    }

    // Serve static files from current directory
    let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
    const fullPath = join(import.meta.dir, filePath);
    const file = Bun.file(fullPath);
    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`✨ TokScale Share Studio 已启动: http://127.0.0.1:${server.port}`);
