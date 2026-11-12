import { Resvg } from "@resvg/resvg-js";
import { renderShareCardSvg } from "./card-renderer.js";
import { writeFileSync, copyFileSync } from "node:fs";

const res = await fetch("http://127.0.0.1:4399/api/data");
const data = await res.json();
const today = data.daily[0];

const seen = new Set();
const selectedRows = today.rows.filter((r: any) => {
  if (seen.has(r.model)) return false;
  seen.add(r.model);
  return r.model !== "gemini-4-argon-trial";
});

const baseState = {
  scope: "daily",
  periodLabel: today.date,
  selectedRows,
  cardMode: "multi",
  theme: "carbonGold",
  aspectRatio: "auto",
  lang: "zh",
  showStudioMat: true,
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
  showSummaryStrip: true,
  showTokenBar: true,
  showCompositionBar: true,
  exactNumbers: false,
  hideCost: false,
  hideSource: false,
  customAuthor: "@凌苍",
};

const fontFiles = [
  "C:/Windows/Fonts/msyh.ttc",
  "C:/Windows/Fonts/msyhbd.ttc",
  "C:/Windows/Fonts/consola.ttf",
  "C:/Windows/Fonts/consolab.ttf",
];

const artifactDir = "C:/Users/15pro/.gemini/antigravity/brain/1de7ccc0-b884-4e1a-9579-97547f51c62d";
const desktopDir = "C:/Users/15pro/Desktop";

function normalizeSvgFontsForResvg(svg: string) {
  return svg
    .replaceAll("'Cascadia Code', 'Cascadia Mono', Consolas,", "")
    .replaceAll("'Segoe UI Variable', 'Segoe UI',", "");
}

const themeMap: Array<{ id: string; fileKey: string; cnName: string }> = [
  { id: "carbonGold", fileKey: "amber", cnName: "曜石香槟" },
  { id: "nordicEmerald", fileKey: "emerald", cnName: "极地森绿" },
  { id: "teVermilion", fileKey: "terracotta", cnName: "工程朱砂" },
  { id: "galleryLight", fileKey: "crimson", cnName: "画廊白昼" },
];

for (const item of themeMap) {
  const svg = normalizeSvgFontsForResvg(renderShareCardSvg({ ...baseState, theme: item.id }));
  const resvg = new Resvg(svg, {
    fitTo: { mode: "zoom", value: 2 },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Microsoft YaHei UI" },
  });
  const png = resvg.render().asPng();
  const p1 = `${artifactDir}/preview-${item.fileKey}.png`;
  const p2 = `${desktopDir}/TokScale-今日战报-${item.cnName}.png`;
  writeFileSync(p1, png);
  copyFileSync(p1, p2);
}

const spotlightSvg = normalizeSvgFontsForResvg(
  renderShareCardSvg({
    ...baseState,
    cardMode: "spotlight",
    theme: "carbonGold",
    selectedRows: [selectedRows[0]],
    metrics: { ...baseState.metrics, costPer1M: true },
  })
);
const resvgSpot = new Resvg(spotlightSvg, {
  fitTo: { mode: "zoom", value: 2 },
  font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Microsoft YaHei UI" },
});
const pngSpot = resvgSpot.render().asPng();
writeFileSync(`${artifactDir}/preview-spotlight.png`, pngSpot);
copyFileSync(`${artifactDir}/preview-spotlight.png`, `${desktopDir}/TokScale-单模型特写-曜石香槟.png`);
console.log("Rendered all redesigned preview cards!");
