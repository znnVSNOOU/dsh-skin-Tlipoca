// 生成器：把 .dsh-plugin/assets 下的素材以 data URL 内嵌，拼装出
// .dsh-plugin/client.js（官方 __ModuleLoader__.load 契约，纯 JS 无构建依赖）。
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ASSET_DIR = join(ROOT, '.dsh-plugin', 'assets')
const OUTPUT = join(ROOT, '.dsh-plugin', 'client.js')

// 读取素材目录，生成 { key: dataUrl }
const assets = {}
for (const file of readdirSync(ASSET_DIR)) {
  const mime = file.endsWith('.jpg') ? 'image/jpeg' : file.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
  const key = file.replace(/\.(png|jpg|svg)$/, '')
  const data = readFileSync(join(ASSET_DIR, file))
  assets[key] = 'data:' + mime + ';base64,' + data.toString('base64')
}
console.log('Embedded assets:', Object.keys(assets).join(', '))
const totalKB = Object.values(assets).reduce((s, v) => s + v.length / 1024, 0)
console.log('Total embedded (KB):', Math.round(totalKB))

// ============ client 模板（纯 JS，React.createElement） ============
const clientSource = `window.__ModuleLoader__.load({
  id: "dsh-gal-skin",
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;

    const React = require("react");

    const ASSETS = ${JSON.stringify(assets)};

    const CSS = \`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500;600;700;900&family=ZCOOL+XiaoWei&display=swap');

      [data-gal-view] {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 520px;
        display: flex;
        flex-direction: column;
        background: #070913;
        color: #e6e9f4;
        font-family: "ZCOOL XiaoWei", "Noto Serif SC", "Source Han Serif SC", "STKaiti", "KaiTi", "Songti SC", serif;
        overflow: hidden;
        user-select: none;
      }
      [data-gal-view] * { box-sizing: border-box; }
      [data-gal-view] input, [data-gal-view] textarea { user-select: text; font-family: "Noto Serif SC", "ZCOOL XiaoWei", serif; }

      .gal-stage {
        position: absolute;
        inset: 0;
        background-color: #0d0f1a;
        background-size: cover;
        background-position: center 30%;
      }

      /* 角色立绘：高度 86%，向上垫高避开底部 */
      .gal-char-container {
        position: absolute;
        bottom: 48px;
        left: 50%;
        transform: translateX(-50%);
        height: 86%;
        z-index: 1;
        pointer-events: none;
        transition: filter 0.3s ease;
      }
      .gal-char-container.is-speaking {
        filter: drop-shadow(0 0 24px rgba(192, 132, 252, 0.55));
        animation: gal-char-breathe 4s ease-in-out infinite;
      }
      @keyframes gal-char-breathe {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-6px); }
      }
      .gal-char-img {
        height: 100%;
        width: auto;
        max-width: 48vw;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
      }

      /* ===== 生图对话框：哥特金边琉璃素材铺底 ===== */
      .gal-dialogue-wrap {
        position: absolute;
        bottom: 38px;
        left: 50%;
        transform: translateX(-50%);
        width: min(1160px, 94%);
        height: 236px;
        z-index: 2;
        cursor: pointer;
        overflow: visible;
      }
      .gal-dialogue-bg {
        position: absolute;
        inset: 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.85));
      }
      /* 安全文本区域：大幅上提底部（bottom: 50px），确保文字绝不接触或超出底边金框 */
      .gal-dialogue-content {
        position: absolute;
        inset: 34px 125px 50px 125px;
        display: flex;
        flex-direction: column;
        z-index: 2;
        overflow: hidden;
      }
      /* 名牌：与生图素材的金饰风格呼应 */
      .gal-speaker-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 14px;
        background: linear-gradient(135deg, rgba(88, 28, 135, 0.95), rgba(49, 10, 82, 0.98));
        border: 1px solid rgba(251, 191, 36, 0.6);
        border-radius: 14px;
        font-family: "Cinzel", "ZCOOL XiaoWei", "Noto Serif SC", serif;
        font-size: 14px;
        font-weight: 700;
        color: #fef08a;
        letter-spacing: 0.06em;
        text-shadow: 0 0 10px rgba(250, 204, 21, 0.75), 0 2px 4px rgba(0,0,0,0.9);
        margin-bottom: 6px;
        align-self: flex-start;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), inset 0 0 6px rgba(234, 179, 8, 0.3);
        flex-shrink: 0;
      }
      /* 名牌两侧菱形小饰 */
      .gal-speaker-badge::before,
      .gal-speaker-badge::after {
        content: "";
        width: 5px;
        height: 5px;
        transform: rotate(45deg);
        background: linear-gradient(135deg, rgba(251, 191, 36, 0.95), rgba(168, 85, 247, 0.8));
        box-shadow: 0 0 5px rgba(250, 204, 21, 0.6);
        margin: 0 6px;
        flex: none;
      }
      .gal-text-area {
        flex: 1;
        font-family: "ZCOOL XiaoWei", "Noto Serif SC", "STKaiti", "KaiTi", serif;
        font-size: 16.5px;
        font-weight: 500;
        letter-spacing: 0.02em;
        line-height: 1.5;
        color: #fff7ed;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.95), 0 0 2px #000, 0 0 8px rgba(168, 85, 247, 0.25);
        overflow-y: auto;
        word-break: break-word;
        white-space: pre-wrap;
        padding-right: 8px;
        margin-top: 0;
      }
      .gal-text-area::-webkit-scrollbar { width: 4px; }
      .gal-text-area::-webkit-scrollbar-thumb { background: rgba(234, 179, 8, 0.4); border-radius: 2px; }
      .gal-cursor-blink {
        display: inline-block;
        width: 2.5px;
        height: 1em;
        background: #facc15;
        vertical-align: -0.12em;
        margin-left: 3px;
        box-shadow: 0 0 6px #eab308;
        animation: gal-blink 0.8s infinite;
      }
      @keyframes gal-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      /* 动态状态与动作提示（纯文本金色微光流光效果，无气泡框，与对话框浑然一体） */
      .gal-status-indicator {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        font-size: 14.5px;
        color: #fde047;
        font-style: italic;
        margin-top: 4px;
        text-shadow: 0 0 8px rgba(234, 179, 8, 0.65), 0 0 2px #000;
        animation: gal-pulse-glow 1.8s ease-in-out infinite;
      }
      .gal-status-indicator .gal-pulse-icon {
        display: inline-block;
        font-style: normal;
        font-size: 15px;
        animation: gal-spin-subtle 2.4s ease-in-out infinite alternate;
      }
      .gal-status-indicator .act-detail {
        font-size: 13px;
        color: #e9d5ff;
        font-style: normal;
        opacity: 0.88;
        font-family: "Noto Serif SC", monospace;
        margin-left: 2px;
      }
      .gal-status-indicator .gal-thinking-dots span {
        display: inline-block;
        animation: gal-wave-dot 1.4s infinite;
        opacity: 0;
        font-weight: bold;
      }
      .gal-status-indicator .gal-thinking-dots span:nth-child(1) { animation-delay: 0s; }
      .gal-status-indicator .gal-thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
      .gal-status-indicator .gal-thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes gal-pulse-glow {
        0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.4)); }
        50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(216, 180, 254, 0.8)); }
      }
      @keyframes gal-spin-subtle {
        0% { transform: rotate(-10deg) scale(0.95); }
        100% { transform: rotate(15deg) scale(1.1); }
      }
      @keyframes gal-wave-dot {
        0%, 100% { opacity: 0; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-2px); }
      }

      /* 左上角活动横条堆叠容器 (支持上下滑动，取消景深模糊，保留优雅透明度渐浅，5秒无操作自动吸顶回弹) */
      .gal-activity-stack-wrap {
        position: absolute;
        top: 50px;
        left: 18px;
        z-index: 25;
        max-width: min(440px, 52vw);
        max-height: 220px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 4px 6px 6px 2px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        pointer-events: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(234, 179, 8, 0.4) transparent;
      }
      .gal-activity-stack-wrap::-webkit-scrollbar { width: 4px; }
      .gal-activity-stack-wrap::-webkit-scrollbar-thumb { background: rgba(234, 179, 8, 0.4); border-radius: 2px; }

      .gal-activity-card {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        background: linear-gradient(135deg, rgba(24, 14, 48, 0.94), rgba(60, 24, 120, 0.88));
        border: 1px solid rgba(216, 180, 254, 0.45);
        border-left: 3.5px solid #facc15;
        border-radius: 6px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.65), inset 0 0 10px rgba(147, 51, 234, 0.25);
        backdrop-filter: blur(10px);
        overflow: hidden;
        white-space: nowrap;
        transform-origin: left center;
        cursor: pointer;
        user-select: none;
        transition: transform 0.25s ease, opacity 0.3s ease, border-color 0.2s ease, background 0.2s ease;
      }
      .gal-activity-card:hover {
        transform: scale(1.02);
        border-color: rgba(250, 204, 21, 0.8);
        background: linear-gradient(135deg, rgba(40, 20, 75, 0.96), rgba(88, 28, 135, 0.92));
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.5), inset 0 0 14px rgba(250, 204, 21, 0.35);
      }
      .gal-activity-card.is-new {
        animation: gal-card-unfold 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
      }
      .gal-activity-card.is-active {
        border-left-color: #fde047;
        box-shadow: 0 4px 18px rgba(168, 85, 247, 0.45), inset 0 0 12px rgba(250, 204, 21, 0.3);
      }
      .gal-activity-card .act-card-icon {
        font-size: 14px;
        flex-shrink: 0;
        animation: gal-spin-subtle 2s ease-in-out infinite alternate;
      }
      .gal-activity-card .act-card-label {
        font-size: 13px;
        font-weight: 700;
        color: #fef08a;
        letter-spacing: 0.03em;
        text-shadow: 0 0 8px rgba(250, 204, 21, 0.6);
        flex-shrink: 0;
      }
      .gal-activity-card .act-card-detail {
        font-size: 12px;
        color: #e9d5ff;
        font-family: "Noto Serif SC", monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        opacity: 0.92;
      }

      /* 任务详情弹窗模态框 */
      .gal-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        animation: gal-modal-fade 0.2s ease-out;
      }
      .gal-modal-card {
        background: linear-gradient(135deg, rgba(28, 16, 52, 0.98), rgba(49, 10, 82, 0.98));
        border: 1.5px solid rgba(251, 191, 36, 0.65);
        border-radius: 12px;
        padding: 20px 24px;
        max-width: min(560px, 88vw);
        width: 100%;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(168, 85, 247, 0.25);
        color: #fff;
        animation: gal-modal-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .gal-modal-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(234, 179, 8, 0.3);
        padding-bottom: 10px;
        margin-bottom: 14px;
      }
      .gal-modal-title {
        font-size: 16px;
        font-weight: 700;
        color: #fef08a;
        display: flex;
        align-items: center;
        gap: 8px;
        text-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
      }
      .gal-modal-body {
        font-size: 13.5px;
        line-height: 1.6;
        color: #f3e8ff;
        background: rgba(0, 0, 0, 0.35);
        padding: 12px 14px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        word-break: break-all;
        white-space: pre-wrap;
        max-height: 260px;
        overflow-y: auto;
      }
      .gal-modal-foot {
        display: flex;
        justify-content: flex-end;
        margin-top: 14px;
      }
      @keyframes gal-modal-fade { from { opacity: 0; } to { opacity: 1; } }
      @keyframes gal-modal-pop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }

      /* 从左向右由短到长（宽度从0展开，X轴缩放从0.2展开到1）的顺滑展开动效 */
      @keyframes gal-card-unfold {
        0% {
          opacity: 0;
          max-width: 0;
          padding-left: 0;
          padding-right: 0;
          transform: scaleX(0.1);
        }
        40% {
          opacity: 0.8;
          max-width: 200px;
          padding-left: 8px;
          padding-right: 8px;
          transform: scaleX(0.7);
        }
        100% {
          opacity: 1;
          max-width: 440px;
          padding-left: 14px;
          padding-right: 14px;
          transform: scaleX(1);
        }
      }

      .gal-hud-top {
        position: absolute;
        top: 12px;
        right: 18px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }
      .gal-hud-btn-group {
        display: flex;
        gap: 8px;
      }
      .gal-bg-selector-panel {
        background: rgba(15, 11, 28, 0.94);
        border: 1px solid rgba(234, 179, 8, 0.45);
        border-radius: 8px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
        animation: gal-modal-fade 0.2s ease-out;
      }
      .gal-bg-btn {
        background: rgba(49, 10, 82, 0.6);
        border: 1px solid rgba(216, 180, 254, 0.3);
        color: #fef08a;
        font-size: 12px;
        padding: 3px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .gal-bg-btn:hover {
        background: rgba(147, 51, 234, 0.5);
        border-color: #facc15;
        color: #fff;
      }
      .gal-bg-btn.active {
        background: linear-gradient(135deg, #9333ea, #6b21a8);
        border-color: #facc15;
        color: #fff;
        font-weight: 700;
      }
      .gal-btn {
        background: rgba(24, 18, 43, 0.85);
        border: 1px solid rgba(234, 179, 8, 0.35);
        color: #fef08a;
        padding: 5px 14px;
        font-size: 13px;
        border-radius: 6px;
        cursor: pointer;
        backdrop-filter: blur(8px);
        transition: all 0.2s ease;
      }
      .gal-btn:hover {
        background: rgba(168, 85, 247, 0.35);
        border-color: rgba(250, 204, 21, 0.7);
        color: #fff;
        box-shadow: 0 0 12px rgba(234, 179, 8, 0.4);
      }
      .gal-btn.active {
        background: linear-gradient(135deg, rgba(147, 51, 234, 0.85), rgba(88, 28, 135, 0.95));
        border-color: #facc15;
        color: #fff;
      }

      /* 底部输入框：紧贴最底 */
      .gal-input-bar {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: min(840px, 92%);
        z-index: 3;
        display: flex;
        gap: 8px;
        background: rgba(15, 11, 28, 0.92);
        border: 1px solid rgba(234, 179, 8, 0.4);
        border-radius: 24px;
        padding: 4px 8px 4px 16px;
        backdrop-filter: blur(12px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
      }
      .gal-input-field {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #fdf4ff;
        font-size: 14.5px;
      }
      .gal-input-field::placeholder { color: rgba(216, 180, 254, 0.4); }
      .gal-send-btn {
        background: linear-gradient(135deg, #9333ea, #6b21a8);
        border: 1px solid rgba(250, 204, 21, 0.4);
        color: #fef08a;
        padding: 5px 16px;
        border-radius: 18px;
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .gal-send-btn:hover {
        background: linear-gradient(135deg, #a855f7, #7e22ce);
        box-shadow: 0 0 12px rgba(234, 179, 8, 0.5);
      }

      .gal-emotion-bar {
        position: absolute;
        top: 12px;
        left: 18px;
        z-index: 10;
        display: flex;
        gap: 6px;
        background: rgba(15, 11, 28, 0.8);
        border: 1px solid rgba(234, 179, 8, 0.3);
        border-radius: 18px;
        padding: 3px 8px;
        backdrop-filter: blur(8px);
      }
      .gal-emo-btn {
        background: transparent;
        border: none;
        color: #fef08a;
        font-size: 12px;
        padding: 2px 7px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .gal-emo-btn:hover { background: rgba(168, 85, 247, 0.3); color: #fff; }
      .gal-emo-btn.active { background: rgba(168, 85, 247, 0.5); color: #fff; font-weight: bold; }

      .gal-history-panel {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 380px;
        background: rgba(15, 12, 28, 0.97);
        border-left: 1px solid rgba(234, 179, 8, 0.3);
        z-index: 50;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(16px);
        animation: gal-slide-in 0.25s ease-out;
      }
      @keyframes gal-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
      .gal-history-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 18px;
        border-bottom: 1px solid rgba(234, 179, 8, 0.2);
        font-size: 16px;
        font-weight: 600;
        color: #fef08a;
      }
      .gal-history-list { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
      .gal-history-item { display: flex; flex-direction: column; gap: 4px; }
      .gal-history-name { font-size: 13px; font-weight: 600; }
      .gal-history-name.assistant { color: #fde047; }
      .gal-history-name.player { color: #60a5fa; }
      .gal-history-name.system { color: #94a3b8; }
      .gal-history-text {
        font-size: 14px;
        line-height: 1.5;
        color: #e2e8f0;
        background: rgba(255, 255, 255, 0.04);
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        white-space: pre-wrap;
      }
    \`;

    function injectStyles() {
      let el = document.getElementById("dsh-gal-skin-css");
      if (!el) {
        el = document.createElement("style");
        el.id = "dsh-gal-skin-css";
        document.head.appendChild(el);
      }
      el.textContent = CSS;
    }
    function removeStyles() {
      const el = document.getElementById("dsh-gal-skin-css");
      if (el) el.remove();
    }

    // ---- 情绪分析（优先提取 AI 显式输出的 [emotion:xxx] 标签，其次智能回退到关键词与语义分析） ----
    function analyzeEmotion(text) {
      if (!text || typeof text !== "string") return "daliy";

      // 1. 优先提取 AI 显式输出的表情标签，如 [emotion:happy] 或 [表情:开心] / [happy]
      const explicitMatch = text.match(/\\[(?:emotion|表情|emo):?\\s*([a-zA-Z\u4e00-\u9fa5]+)\\]/i) || text.match(/\\[(happy|cute|surprised|confused|sad|angry|daliy|日常|开心|可爱|惊讶|疑惑|委屈|生气)\\]/i);
      if (explicitMatch) {
        const tag = explicitMatch[1].toLowerCase().trim();
        if (tag === "happy" || tag === "开心" || tag === "高兴") return "happy";
        if (tag === "cute" || tag === "可爱" || tag === "害羞") return "cute";
        if (tag === "surprised" || tag === "惊讶" || tag === "震惊") return "surprised";
        if (tag === "confused" || tag === "疑惑" || tag === "思考") return "confused";
        if (tag === "sad" || tag === "委屈" || tag === "难过" || tag === "悲伤") return "sad";
        if (tag === "angry" || tag === "生气" || tag === "愤怒" || tag === "冷酷") return "angry";
        if (tag === "daliy" || tag === "日常" || tag === "默认") return "daliy";
      }

      // 2. 自然语言情感语义分析（兜底匹配）
      const t = text.toLowerCase();
      if (/(生气|愤怒|讨厌|混蛋|可恶|找死|去死|烦人|别烦我|闭嘴|哼|怒|滚|斩|杀|angry|hate|annoying)/i.test(t)) return "angry";
      if (/(难过|悲伤|伤心|呜呜|哭|委屈|抱歉|对不起|遗憾|痛苦|失落|孤单|寂寞|sad|sorry|crying)/i.test(t)) return "sad";
      if (/(惊|惊讶|哇|真的吗|怎么可能|不会吧|诶|咦|啊？|震惊|天哪|surprised|what|shocked)/i.test(t)) return "surprised";
      if (/(疑惑|为什么|什么意思|思考|纳闷|不懂|奇怪|不明白|迷茫|confused|why|think)/i.test(t)) return "confused";
      if (/(可爱|害羞|脸红|摸头|夸奖|最喜欢|乖|抱抱|比心|嘿嘿|喵|死神大人|主公|cute|shy|love)/i.test(t)) return "cute";
      if (/(开心|高兴|哈哈|嘻嘻|太好了|棒|庆祝|欢迎|有趣|笑|赞|耶|happy|great|nice|glad)/i.test(t)) return "happy";
      return "daliy";
    }

    function cleanDialogueText(raw) {
      if (!raw || typeof raw !== "string") return "";
      let t = raw;
      // 0. 剥离表情标签 (如 [emotion:happy], [表情:开心], [cute] 等)，防止表情标记出现在台词中
      t = t.replace(/\\[(?:emotion|表情|emo):?\\s*[a-zA-Z\u4e00-\u9fa5]+\\]/gi, "");
      t = t.replace(/\\[(happy|cute|surprised|confused|sad|angry|daliy|日常|开心|可爱|惊讶|疑惑|委屈|生气)\\]/gi, "");
      // 1. 代码块与行内代码
      t = t.replace(new RegExp("\`\`\`[\\s\\S]*?\`\`\`", "g"), " [代码块] ");
      t = t.replace(new RegExp("\`([^\`]+)\`", "g"), "$1");
      // 2. 图片与超链接
      t = t.replace(/!\\[.*?\\]\\(.*?\\)/g, "");
      t = t.replace(/\\[(.*?)\\]\\(.*?\\)/g, "$1");
      // 3. 剥离 Markdown 标题、加粗、斜体、删除线、引用、列表编号
      t = t.replace(/^#{1,6}\\s+/gm, "");
      t = t.replace(/(\\*\\*|__)(.*?)\\1/g, "$2");
      t = t.replace(/(\\*|_)(.*?)\\1/g, "$2");
      t = t.replace(/~~(.*?)~~/g, "$1");
      t = t.replace(/^>\\s*/gm, "");
      t = t.replace(/^[-*+]\\s+/gm, "");
      t = t.replace(/^\\d+[.、)）]\\s*/gm, "");
      // 4. 清理残余无意义符号
      t = t.replace(/[*_~#>|]/g, "");
      // 5. 核心中文排版优化：消除中文字符/中文标点之间的所有多余空格
      const cjk = "[\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef]";
      t = t.replace(new RegExp("(" + cjk + ")[ \\t]+(?=" + cjk + ")", "g"), "$1");
      // 6. 消除中文标点前后的多余空格
      t = t.replace(/[ \\t]+([，。！？、：；”’）】》」』])/g, "$1");
      t = t.replace(/([“‘（【《「『])[ \\t]+/g, "$1");
      // 7. 连续水平空白压缩为单个空格
      t = t.replace(/[ \\t]{2,}/g, " ");
      // 8. 连续换行压缩为至多一个空行
      t = t.replace(/\\n{3,}/g, "\\n\\n");
      return t.trim();
    }

    function extractTextFromBlocks(blocks) {
      if (!Array.isArray(blocks)) return "";
      const raw = blocks
        .filter(b => b && (b.kind === "text" || b.type === "text") && typeof b.text === "string")
        .map(b => b.text)
        .join("\\n");
      return cleanDialogueText(raw);
    }

    function extractTextFromNode(node) {
      if (!node) return "";
      let raw = "";
      // 1. 直属于 assistant 的 blocks
      if (Array.isArray(node.blocks)) {
        raw = node.blocks.filter(b => b && (b.kind === "text" || b.type === "text") && typeof b.text === "string").map(b => b.text).join("\\n");
      }
      // 2. 直属于 user/message 的 content
      else if (Array.isArray(node.content)) {
        raw = node.content.map(c => (c && typeof c.text === "string") ? c.text : "").join("\\n");
      }
      // 3. message 对象的 content
      else if (node.message && Array.isArray(node.message.content)) {
        raw = node.message.content.map(c => (c && typeof c.text === "string") ? c.text : "").join("\\n");
      }
      // 4. step 内部 finalNode / blocks
      else if (node.finalNode && Array.isArray(node.finalNode.blocks)) {
        raw = node.finalNode.blocks.filter(b => b && (b.kind === "text" || b.type === "text") && typeof b.text === "string").map(b => b.text).join("\\n");
      }
      // 5. text 字段直接存在
      else if (typeof node.text === "string") {
        raw = node.text;
      }
      return cleanDialogueText(raw);
    }

    // 解析当前活动的工具调用信息（全面覆盖 DSH 系统工具生态，统一加上「小死神正在...」前缀）
    function formatToolActivity(tool) {
      if (!tool) return null;
      const name = tool.name || tool.toolName || (tool.call && tool.call.name) || "";
      let args = tool.args || tool.input || (tool.call && tool.call.args) || {};

      // 如果 argsRaw 是 JSON 字符串，尝试安全反序列化
      if (typeof tool.argsRaw === "string") {
        try {
          args = JSON.parse(tool.argsRaw);
        } catch (e) {
          args = tool.argsRaw;
        }
      } else if (tool.call && typeof tool.call.argsRaw === "string") {
        try {
          args = JSON.parse(tool.call.argsRaw);
        } catch (e) {
          args = tool.call.argsRaw;
        }
      }

      // fullDetail: 弹窗模态框中展示的完整参数/命令 (绝不截断，原汁原味)
      let fullDetail = "";
      // detail: 横条中展示的紧凑单行简述 (超过 36 字优雅截断)
      let detail = "";

      if (typeof args === "string") {
        fullDetail = args;
        detail = args;
      } else if (args && typeof args === "object") {
        const rawPath = args.file_path || args.path || args.filePath || "";
        if (rawPath) {
          fullDetail = rawPath;
          const parts = rawPath.replace(/\\\\/g, "/").split("/");
          detail = parts.length > 2 ? parts.slice(-2).join("/") : rawPath;
        } else if (args.command) {
          fullDetail = args.command;
          detail = args.command;
        } else if (args.query) {
          fullDetail = args.query;
          detail = args.query;
        } else if (args.pattern) {
          fullDetail = args.pattern;
          detail = args.pattern;
        } else if (args.objective) {
          fullDetail = args.objective;
          detail = args.objective;
        } else if (args.description) {
          fullDetail = args.description;
          detail = args.description;
        } else if (args.prompt) {
          fullDetail = args.prompt;
          detail = args.prompt;
        } else if (args.message) {
          fullDetail = args.message;
          detail = args.message;
        } else if (args.name) {
          fullDetail = args.name;
          detail = args.name;
        } else if (args.job_id) {
          fullDetail = "Job #" + args.job_id;
          detail = "Job #" + args.job_id;
        } else if (args.plan) {
          fullDetail = typeof args.plan === "string" ? args.plan : JSON.stringify(args.plan, null, 2);
          detail = "制定方案";
        } else {
          try {
            fullDetail = JSON.stringify(args, null, 2);
          } catch (e) {
            fullDetail = String(args);
          }
          const firstVal = Object.values(args).find(v => typeof v === "string" && v.trim().length > 0);
          detail = firstVal || fullDetail;
        }
      }

      if (!fullDetail) fullDetail = detail;
      if (detail && detail.length > 36) detail = detail.slice(0, 34) + "...";

      // 1. 读取文本文件 / 图片
      if (name.includes("read_image")) {
        return { icon: "🖼️", label: "小死神正在解析图片", detail, fullDetail, emotion: "confused" };
      }
      if (name.includes("read") || name.includes("view")) {
        return { icon: "📖", label: "小死神正在读文件", detail, fullDetail, emotion: "confused" };
      }

      // 2. 编辑 / 写入文件
      if (name.includes("edit")) {
        return { icon: "✍️", label: "小死神正在修改文件", detail, fullDetail, emotion: "angry" };
      }
      if (name.includes("write")) {
        return { icon: "📝", label: "小死神正在写入文件", detail, fullDetail, emotion: "angry" };
      }

      // 3. 执行系统/终端指令 (PowerShell, Bash, Terminal)
      if (name.includes("pwsh") || name.includes("bash") || name.includes("cmd") || name.includes("terminal")) {
        return { icon: "⚡", label: "小死神正在执行指令", detail, fullDetail, emotion: "angry" };
      }

      // 4. 后台任务管理 (job_list, job_output, job_kill)
      if (name.includes("job_output") || name.includes("job_list") || name.includes("job_kill") || name.includes("job")) {
        return { icon: "⏱️", label: "小死神正在调度后台任务", detail, fullDetail, emotion: "daliy" };
      }

      // 5. 搜索文件 / 内容检索 (grep, glob, find)
      if (name.includes("grep")) {
        return { icon: "🔍", label: "小死神正在检索代码内容", detail, fullDetail, emotion: "confused" };
      }
      if (name.includes("glob") || name.includes("find")) {
        return { icon: "📂", label: "小死神正在查找文件列表", detail, fullDetail, emotion: "confused" };
      }

      // 6. 网络搜索与网页浏览
      if (name.includes("web_search") || name.includes("search")) {
        return { icon: "🌐", label: "小死神正在联网检索", detail, fullDetail, emotion: "surprised" };
      }

      // 7. AI 图像生成
      if (name.includes("generate_image") || name.includes("image")) {
        return { icon: "🎨", label: "小死神正在绘制图像", detail, fullDetail, emotion: "happy" };
      }

      // 8. 子代理与多智能体协同 (subagent, subagent_fork, send_message, interrupt_agent, list_agents)
      if (name.includes("subagent_fork")) {
        return { icon: "🌿", label: "小死神正在派生上下文分支", detail, fullDetail, emotion: "happy" };
      }
      if (name.includes("subagent")) {
        return { icon: "👥", label: "小死神正在派遣子代理", detail, fullDetail, emotion: "happy" };
      }
      if (name.includes("send_message")) {
        return { icon: "📨", label: "小死神正在向子代理传讯", detail, fullDetail, emotion: "happy" };
      }
      if (name.includes("interrupt_agent") || name.includes("list_agents")) {
        return { icon: "👥", label: "小死神正在协调多代理", detail, fullDetail, emotion: "daliy" };
      }

      // 9. 工作流编排 (workflow)
      if (name.includes("workflow")) {
        return { icon: "🔀", label: "小死神正在编排工作流", detail, fullDetail, emotion: "happy" };
      }

      // 10. 目标与自主迭代 (goal, ralph)
      if (name.includes("create_goal") || name.includes("update_goal") || name.includes("get_goal")) {
        return { icon: "🎯", label: "小死神正在规划目标", detail, fullDetail, emotion: "surprised" };
      }
      if (name.includes("ralph")) {
        return { icon: "🔄", label: "小死神正在迭代执行", detail, fullDetail, emotion: "happy" };
      }

      // 11. 任务规划模式 (todo_write, exit_plan_mode, ask_user_question)
      if (name.includes("todo_write") || name.includes("todo")) {
        return { icon: "📋", label: "小死神正在更新任务清单", detail, fullDetail, emotion: "cute" };
      }
      if (name.includes("plan")) {
        return { icon: "🗺️", label: "小死神正在拟定完整方案", detail, fullDetail, emotion: "confused" };
      }
      if (name.includes("ask_user_question")) {
        return { icon: "❓", label: "小死神正在向阁下请示", detail, fullDetail, emotion: "cute" };
      }

      // 12. 技能系统 (skill)
      if (name.includes("skill")) {
        return { icon: "✨", label: "小死神正在加载专家技能", detail, fullDetail, emotion: "happy" };
      }

      // 13. Cordis 动态插件系统 (cordis_define, cordis_run, cordis_stop, cordis_undefine, cordis_inspect)
      if (name.includes("cordis_define")) {
        return { icon: "🧩", label: "小死神正在定义插件包", detail, fullDetail, emotion: "happy" };
      }
      if (name.includes("cordis_run")) {
        return { icon: "🚀", label: "小死神正在激活插件", detail, fullDetail, emotion: "happy" };
      }
      if (name.includes("cordis_inspect") || name.includes("inspect")) {
        return { icon: "🔎", label: "小死神正在巡检系统架构", detail, fullDetail, emotion: "confused" };
      }
      if (name.includes("cordis")) {
        return { icon: "🧩", label: "小死神正在操作插件系统", detail, fullDetail, emotion: "happy" };
      }

      // 14. 通用工具调用
      return { icon: "⚙️", label: "小死神正在调用工具", detail: detail || name, fullDetail: fullDetail || name, emotion: "daliy" };
    }

    // 全局单例持久化状态（跨视图切换、离开/返回小死神视窗绝不重置！）
    const GLOBAL_GAL_STATE = {
      activityStack: [],
      lastRecordedKey: "",
      displayText: "",
      fullTargetText: "",
      isTyping: false,
      displayedLength: 0,
      targetText: "",
      lastSolidLine: null,
      latestKnownAssistantText: "",
      dialogueScrollTop: null,
      activityScrollTop: null,
      lastRenderedText: ""
    };

    // ---- GAL 视窗组件 ----
    function GalViewComponent(props) {
      const { useSession, inputActions } = props;
      const nodes = useSession(s => s.nodes);
      const partial = useSession(s => s.partial);
      const running = useSession(s => s.running);
      const runningCalls = useSession(s => s.runningCalls);
      const queue = useSession(s => s.queue);

      const [draft, setDraft] = React.useState("");
      const [manualEmotion, setManualEmotion] = React.useState(null);
      const [historyOpen, setHistoryOpen] = React.useState(false);
      const [bgMenuOpen, setBgMenuOpen] = React.useState(false);
      const [currentBgKey, setCurrentBgKey] = React.useState("bg_hall");
      const [customBgUrl, setCustomBgUrl] = React.useState(null);
      const fileInputRef = React.useRef(null);

      // 从 localStorage 读取持久化背景配置
      React.useEffect(() => {
        try {
          const savedKey = localStorage.getItem("dsh_gal_bg_key");
          if (savedKey) setCurrentBgKey(savedKey);
          const savedCustom = localStorage.getItem("dsh_gal_custom_bg");
          if (savedCustom) setCustomBgUrl(savedCustom);
        } catch (e) {}
      }, []);

      const handleSelectBg = (key) => {
        setCurrentBgKey(key);
        try {
          localStorage.setItem("dsh_gal_bg_key", key);
        } catch (e) {}
      };

      const handleUploadCustomBg = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const url = evt.target.result;
          setCustomBgUrl(url);
          setCurrentBgKey("custom");
          try {
            localStorage.setItem("dsh_gal_bg_key", "custom");
            localStorage.setItem("dsh_gal_custom_bg", url);
          } catch (err) {}
        };
        reader.readAsDataURL(file);
      };

      const lastSolidLineRef = React.useRef(GLOBAL_GAL_STATE.lastSolidLine);

      // 状态初始化自持久化单例
      const [displayText, setDisplayText] = React.useState(GLOBAL_GAL_STATE.displayText);
      const [fullTargetText, setFullTargetText] = React.useState(GLOBAL_GAL_STATE.fullTargetText);
      const [isTyping, setIsTyping] = React.useState(GLOBAL_GAL_STATE.isTyping);
      const displayedLengthRef = React.useRef(GLOBAL_GAL_STATE.displayedLength);
      const targetTextRef = React.useRef(GLOBAL_GAL_STATE.targetText);
      const textAreaRef = React.useRef(null);
      const isAutoScrollRef = React.useRef(true);

      // 维护左上角历史活动横条堆栈（支持上下滚动浏览，点击弹窗查看完整详情，5秒无滚动自动回到顶部）
      const [activityStack, setActivityStack] = React.useState(GLOBAL_GAL_STATE.activityStack);
      const [selectedActivity, setSelectedActivity] = React.useState(null);
      const lastRecordedKeyRef = React.useRef(GLOBAL_GAL_STATE.lastRecordedKey);
      const activityContainerRef = React.useRef(null);
      const autoScrollTimerRef = React.useRef(null);

      // 同步到全局单例
      React.useEffect(() => {
        GLOBAL_GAL_STATE.activityStack = activityStack;
      }, [activityStack]);
      React.useEffect(() => {
        GLOBAL_GAL_STATE.displayText = displayText;
        GLOBAL_GAL_STATE.displayedLength = displayedLengthRef.current;
      }, [displayText]);
      React.useEffect(() => {
        GLOBAL_GAL_STATE.fullTargetText = fullTargetText;
      }, [fullTargetText]);
      React.useEffect(() => {
        GLOBAL_GAL_STATE.isTyping = isTyping;
      }, [isTyping]);

      // 监听活动横条容器的滚动：用户手动滑动后，5秒无操作平滑滚回最新任务（顶部）
      const handleActivityScroll = (e) => {
        if (e && e.target) {
          GLOBAL_GAL_STATE.activityScrollTop = e.target.scrollTop;
        }
        if (autoScrollTimerRef.current) {
          clearTimeout(autoScrollTimerRef.current);
        }
        autoScrollTimerRef.current = setTimeout(() => {
          if (activityContainerRef.current) {
            activityContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 5000);
      };

      // 视窗挂载时，恢复滚动条位置并将历史横条的 isInitialUnfold 强制置为 false
      React.useLayoutEffect(() => {
        if (activityContainerRef.current && typeof GLOBAL_GAL_STATE.activityScrollTop === "number") {
          activityContainerRef.current.scrollTop = GLOBAL_GAL_STATE.activityScrollTop;
        }
        if (textAreaRef.current && typeof GLOBAL_GAL_STATE.dialogueScrollTop === "number") {
          textAreaRef.current.scrollTop = GLOBAL_GAL_STATE.dialogueScrollTop;
        }
        setActivityStack(prev => prev.map(p => ({ ...p, isInitialUnfold: false })));
      }, []);

      React.useEffect(() => {
        return () => {
          if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
        };
      }, []);

      // 从 partial.blocks 或 runningCalls 解析当前正在执行的活动（思考、工具执行等）
      const currentActivity = React.useMemo(() => {
        if (!running) return null;

        // 1. 优先捕获正在运行的工具调用 (runningCalls)
        if (Array.isArray(runningCalls) && runningCalls.length > 0) {
          const activeTool = runningCalls[runningCalls.length - 1];
          const act = formatToolActivity(activeTool);
          if (act) return act;
        }

        // 2. 检查 partial.blocks 中的工具调用与思考链 (reasoning / tool-call)
        if (partial && Array.isArray(partial.blocks) && partial.blocks.length > 0) {
          for (let i = partial.blocks.length - 1; i >= 0; i--) {
            const b = partial.blocks[i];
            if (!b) continue;
            if (b.kind === "tool-call") {
              const act = formatToolActivity(b);
              if (act) return act;
            }
            if (b.kind === "reasoning") {
              let snippet = "";
              if (typeof b.text === "string" && b.text.trim()) {
                const lines = b.text.trim().split("\\n");
                snippet = lines[lines.length - 1].slice(0, 36);
              }
              return {
                icon: "✨",
                label: "小死神正在深度思考",
                detail: snippet ? snippet + "..." : ""
              };
            }
          }
        }

        // 3. 默认思考中
        return {
          icon: "✨",
          label: "小死神正在思考",
          detail: ""
        };
      }, [running, runningCalls, partial]);

      // 当出现新的工具调用/任务动作时，压入活动堆栈顶部（最多保留 5 条）
      React.useEffect(() => {
        if (!currentActivity) return;
        const key = currentActivity.label + ":" + (currentActivity.detail || "");
        if (key && key !== lastRecordedKeyRef.current) {
          lastRecordedKeyRef.current = key;
          GLOBAL_GAL_STATE.lastRecordedKey = key;
          const item = {
            id: Date.now() + Math.random(),
            icon: currentActivity.icon,
            label: currentActivity.label,
            detail: currentActivity.detail || "",
            fullDetail: currentActivity.fullDetail || currentActivity.detail || "",
            isInitialUnfold: true,
            timestamp: Date.now()
          };
          setActivityStack(prev => {
            // 将历史项的 isInitialUnfold 全部置为 false
            const clearedPrev = prev.map(p => ({ ...p, isInitialUnfold: false }));
            return [item, ...clearedPrev.slice(0, 4)];
          });
        }
      }, [currentActivity]);

      const lines = React.useMemo(() => {
        if (!nodes || !Array.isArray(nodes)) return [];
        const result = [];
        for (const n of nodes) {
          if (!n) continue;
          const k = n.kind || (n.node && n.node.kind);
          // 1. 用户提问
          if (k === "user") {
            const txt = extractTextFromNode(n.node || n);
            if (txt) result.push({ kind: "player", speaker: "你", text: txt, id: (n.node && n.node.id) || n.id || Math.random() });
          }
          // 2. 助理输出（包含 assistant-step, assistant, message 等）
          else if (k === "assistant-step" || k === "assistant" || k === "message") {
            const txt = extractTextFromNode(n.node || n);
            if (txt) result.push({ kind: "assistant", speaker: "特莉波卡", text: txt, id: (n.node && n.node.id) || n.id || Math.random() });
          }
          // 3. 通用兜底提取
          else if (n.node) {
            const txt = extractTextFromNode(n.node);
            if (txt) {
              const isUser = (n.node.source && n.node.source.kind === "user");
              result.push({ kind: isUser ? "player" : "assistant", speaker: isUser ? "你" : "特莉波卡", text: txt, id: n.node.id || Math.random() });
            }
          }
        }
        return result;
      }, [nodes]);

      // 提取最后一条 AI 回答
      const lastAssistantLine = React.useMemo(() => {
        for (let i = lines.length - 1; i >= 0; i--) {
          if (lines[i].kind === "assistant") return lines[i];
        }
        return null;
      }, [lines]);

      // 跟踪与缓存最新的有效文字，绝不在 turn 结束时清空回退
      const latestKnownAssistantTextRef = React.useRef(GLOBAL_GAL_STATE.latestKnownAssistantText);

      // 确定当前应该显示的台词行
      const currentLine = React.useMemo(() => {
        // A. 正在流式生成
        if (running) {
          const partialText = partial ? (extractTextFromNode(partial) || (Array.isArray(partial.blocks) ? extractTextFromBlocks(partial.blocks) : "")) : "";
          if (partialText) {
            latestKnownAssistantTextRef.current = partialText;
            GLOBAL_GAL_STATE.latestKnownAssistantText = partialText;
            const lineObj = {
              kind: "assistant",
              speaker: "特莉波卡",
              text: partialText,
              running: true
            };
            lastSolidLineRef.current = lineObj;
            GLOBAL_GAL_STATE.lastSolidLine = lineObj;
            return lineObj;
          }
          // 新回合刚开始，AI 正在思考/调用工具，尚未输出任何正文：清空上一轮残留文本，绝不在旧台词后面贴思考！
          return {
            kind: "assistant",
            speaker: "特莉波卡",
            text: "",
            running: true
          };
        }

        // B. 非运行状态：优先从 nodes 列表提取最后一条助理回答
        if (lastAssistantLine && lastAssistantLine.text) {
          latestKnownAssistantTextRef.current = lastAssistantLine.text;
          GLOBAL_GAL_STATE.latestKnownAssistantText = lastAssistantLine.text;
          lastSolidLineRef.current = lastAssistantLine;
          GLOBAL_GAL_STATE.lastSolidLine = lastAssistantLine;
          return lastAssistantLine;
        }

        // C. 如果 nodes 里暂时没有解析出，但之前流式已收集到了完整文本，保留该文本！
        if (latestKnownAssistantTextRef.current) {
          const preservedLine = {
            kind: "assistant",
            speaker: "特莉波卡",
            text: latestKnownAssistantTextRef.current,
            running: false
          };
          lastSolidLineRef.current = preservedLine;
          GLOBAL_GAL_STATE.lastSolidLine = preservedLine;
          return preservedLine;
        }

        // D. 之前任意固化的响应
        if (lastSolidLineRef.current && lastSolidLineRef.current.text) {
          return lastSolidLineRef.current;
        }

        // E. 仅当完全没有任何历史消息时，展示初始欢迎语
        return {
          kind: "assistant",
          speaker: "特莉波卡",
          text: "欢迎来到犹格索托斯的庭院……我是特莉波卡。今天想和我聊些什么呢，阁下？",
          running: false
        };
      }, [lines, running, partial, lastAssistantLine]);

      const currentEmotion = React.useMemo(() => {
        // 1. 用户手动点击锁定表情最高优先级
        if (manualEmotion) return manualEmotion;

        // 2. 正在执行工具调用时，根据当前动作实时联动专属动作立绘表情
        if (running && currentActivity && currentActivity.emotion) {
          return currentActivity.emotion;
        }

        // 3. 正在思考中时，展示思考/疑惑表情
        if (running && currentActivity && currentActivity.label && currentActivity.label.includes("思考")) {
          return "confused";
        }

        // 4. 回退到台词的情感分析与 [emotion:xxx] 标签识别
        return analyzeEmotion(currentLine.text);
      }, [manualEmotion, currentLine.text, running, currentActivity]);

      // 流式打字机调度器：增量平滑打字（标准视觉小说 36ms/字，舒适人眼阅读节奏）
      React.useEffect(() => {
        const target = currentLine.text || "";
        setFullTargetText(target);
        targetTextRef.current = target;

        // 如果全新回合开始（target 变短或目标为空），重置已展示计数器
        if (target.length < displayedLengthRef.current) {
          displayedLengthRef.current = 0;
          setDisplayText("");
        } else if (!currentLine.running && target && displayedLengthRef.current >= target.length) {
          // 如果非运行态且之前已经展示完毕（例如从 DSH 其它视图切换回来），直接保持完整展示，绝不从头重新打字！
          setDisplayText(target);
          setIsTyping(false);
          return;
        }

        // 启动增量打字定时器
        let active = true;
        const interval = setInterval(() => {
          if (!active) return;
          const currentTarget = targetTextRef.current;
          if (displayedLengthRef.current < currentTarget.length) {
            // 舒适阅读步长：一般情况下 1 字/拍；严重滞后时才温和提速到 2 字/拍
            const lag = currentTarget.length - displayedLengthRef.current;
            const step = lag > 80 ? 3 : lag > 30 ? 2 : 1;
            displayedLengthRef.current = Math.min(currentTarget.length, displayedLengthRef.current + step);
            setDisplayText(currentTarget.slice(0, displayedLengthRef.current));
            setIsTyping(true);
          } else {
            if (!currentLine.running) {
              setIsTyping(false);
            }
          }
        }, 36);

        return () => {
          active = false;
          clearInterval(interval);
        };
      }, [currentLine.text, currentLine.running]);

      // 文本自动滚动到底部（打字期间始终跟随最新行）
      React.useLayoutEffect(() => {
        if (textAreaRef.current && isAutoScrollRef.current) {
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }
      }, [displayText]);

      // 监听用户手动滚动：如果用户往上翻阅，暂停强制自动吸底；到底部时恢复
      const handleScroll = (e) => {
        const el = e.target;
        GLOBAL_GAL_STATE.dialogueScrollTop = el.scrollTop;
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
        isAutoScrollRef.current = isNearBottom;
      };

      const handleSkipTypewriter = () => {
        if (isTyping) {
          const target = targetTextRef.current;
          displayedLengthRef.current = target.length;
          setDisplayText(target);
          setIsTyping(false);
        }
      };

      const handleSend = () => {
        const txt = draft.trim();
        if (!txt || !inputActions) return;
        setManualEmotion(null);
        inputActions.setDraft(txt);
        inputActions.submit();
        setDraft("");
      };

      const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };

      // 计算当前应当渲染的背景
      let bgUrl = ASSETS.bg_hall || ASSETS.bg;
      if (currentBgKey === "bg_yard") {
        bgUrl = ASSETS.bg_yard || ASSETS.bg;
      } else if (currentBgKey === "bg_room") {
        bgUrl = ASSETS.bg_room || ASSETS.bg;
      } else if (currentBgKey === "custom" && customBgUrl) {
        bgUrl = customBgUrl;
      }

      const spriteUrl = ASSETS[currentEmotion] || ASSETS.daliy;
      const dialogueBoxUrl = ASSETS.dialogue_box;

      const emotionLabels = [
        { id: "daliy", label: "日常" },
        { id: "happy", label: "开心" },
        { id: "cute", label: "可爱" },
        { id: "surprised", label: "惊讶" },
        { id: "confused", label: "疑惑" },
        { id: "sad", label: "委屈" },
        { id: "angry", label: "生气" },
      ];

      return React.createElement("div", { "data-gal-view": true },
        React.createElement("div", { className: "gal-hud-top" },
          React.createElement("div", { className: "gal-hud-btn-group" },
            React.createElement("button", {
              className: "gal-btn" + (bgMenuOpen ? " active" : ""),
              onClick: () => setBgMenuOpen(!bgMenuOpen)
            }, "🖼️ 场景切换"),
            React.createElement("button", {
              className: "gal-btn" + (historyOpen ? " active" : ""),
              onClick: () => setHistoryOpen(!historyOpen)
            }, "📜 历史记录")
          ),
          bgMenuOpen && React.createElement("div", { className: "gal-bg-selector-panel" },
            React.createElement("button", {
              className: "gal-bg-btn" + (currentBgKey === "bg_hall" ? " active" : ""),
              onClick: () => handleSelectBg("bg_hall")
            }, "🏰 庭院大厅"),
            React.createElement("button", {
              className: "gal-bg-btn" + (currentBgKey === "bg_yard" ? " active" : ""),
              onClick: () => handleSelectBg("bg_yard")
            }, "🌕 庭院外侧"),
            React.createElement("button", {
              className: "gal-bg-btn" + (currentBgKey === "bg_room" ? " active" : ""),
              onClick: () => handleSelectBg("bg_room")
            }, "🕯️ 死神卧室"),
            React.createElement("button", {
              className: "gal-bg-btn" + (currentBgKey === "custom" ? " active" : ""),
              onClick: () => fileInputRef.current && fileInputRef.current.click()
            }, "📁 自定义上传"),
            React.createElement("input", {
              type: "file",
              ref: fileInputRef,
              accept: "image/*",
              style: { display: "none" },
              onChange: handleUploadCustomBg
            })
          )
        ),
        React.createElement("div", { className: "gal-emotion-bar" },
          React.createElement("span", { style: { fontSize: "12px", color: "#fef08a", alignSelf: "center", marginRight: "4px" } }, "表情:"),
          emotionLabels.map(item =>
            React.createElement("button", {
              key: item.id,
              className: "gal-emo-btn" + (currentEmotion === item.id ? " active" : ""),
              onClick: () => setManualEmotion(item.id)
            }, item.label)
          )
        ),
        activityStack.length > 0 && React.createElement("div", {
          className: "gal-activity-stack-wrap",
          ref: activityContainerRef,
          onScroll: handleActivityScroll
        },
          activityStack.map((act, index) => {
            // 保留优雅的透明度渐浅 (1.0 -> 0.82 -> 0.65 -> 0.48 -> 0.35)
            const depthOpacity = Math.max(0.35, 1 - index * 0.16);
            // 恢复长条向下的渐短微缩效果 (1.0 -> 0.95 -> 0.90 -> 0.85 -> 0.80)
            const lengthScale = Math.max(0.78, 1 - index * 0.05);
            const isBrandNew = act.isInitialUnfold && index === 0;
            return React.createElement("div", {
              key: act.id,
              className: "gal-activity-card" + (isBrandNew ? " is-new" : "") + (index === 0 && running ? " is-active" : ""),
              style: {
                opacity: depthOpacity,
                transform: "scale(" + lengthScale + ")",
                transformOrigin: "left center"
              },
              onClick: () => setSelectedActivity(act),
              title: "点击查看完整详情"
            },
              React.createElement("span", { className: "act-card-icon" }, act.icon),
              React.createElement("span", { className: "act-card-label" }, act.label),
              act.detail && React.createElement("span", { className: "act-card-detail" }, "(" + act.detail + ")")
            );
          })
        ),
        React.createElement("div", { className: "gal-stage", style: { backgroundImage: 'url("' + bgUrl + '")' } }),
        spriteUrl && React.createElement("div", { className: "gal-char-container" + (currentLine.kind === "assistant" ? " is-speaking" : "") },
          React.createElement("img", { className: "gal-char-img", src: spriteUrl, alt: "特莉波卡" })
        ),
        React.createElement("div", { className: "gal-dialogue-wrap", onClick: handleSkipTypewriter },
          React.createElement("div", { className: "gal-dialogue-bg", style: { backgroundImage: 'url("' + dialogueBoxUrl + '")' } }),
          React.createElement("div", { className: "gal-dialogue-content" },
            React.createElement("div", { className: "gal-speaker-badge" }, currentLine.speaker || "特莉波卡"),
            React.createElement("div", {
              className: "gal-text-area",
              ref: textAreaRef,
              onScroll: handleScroll
            },
              displayText,
              isTyping && React.createElement("span", { className: "gal-cursor-blink" }),
              currentLine.running && (
                React.createElement("div", { className: "gal-status-indicator" },
                  React.createElement("span", { className: "gal-pulse-icon" }, currentActivity ? currentActivity.icon : "✨"),
                  React.createElement("span", null, currentActivity ? currentActivity.label : "小死神思考中"),
                  currentActivity && currentActivity.detail && React.createElement("span", { className: "act-detail" }, "(" + currentActivity.detail + ")"),
                  React.createElement("span", { className: "gal-thinking-dots" },
                    React.createElement("span", null, "."),
                    React.createElement("span", null, "."),
                    React.createElement("span", null, ".")
                  )
                )
              )
            )
          )
        ),
        React.createElement("div", { className: "gal-input-bar" },
          React.createElement("input", {
            className: "gal-input-field",
            type: "text",
            placeholder: "对特莉波卡说些什么…… (按回车发送)",
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: handleKeyDown
          }),
          React.createElement("button", { className: "gal-send-btn", onClick: handleSend }, "发送")
        ),
        historyOpen && React.createElement("div", { className: "gal-history-panel" },
          React.createElement("div", { className: "gal-history-head" },
            React.createElement("span", null, "对话历史"),
            React.createElement("button", { className: "gal-btn", onClick: () => setHistoryOpen(false) }, "✕")
          ),
          React.createElement("div", { className: "gal-history-list" },
            lines.length === 0 && React.createElement("div", { style: { color: "#94a3b8", textAlign: "center", marginTop: "30px" } }, "暂无对话历史"),
            lines.map((l, idx) =>
              React.createElement("div", { key: idx, className: 'gal-history-item' },
                React.createElement("span", { className: "gal-history-name " + l.kind }, l.speaker),
                React.createElement("div", { className: "gal-history-text" }, l.text)
              )
            )
          )
        ),
        selectedActivity && React.createElement("div", { className: "gal-modal-overlay", onClick: () => setSelectedActivity(null) },
          React.createElement("div", { className: "gal-modal-card", onClick: (e) => e.stopPropagation() },
            React.createElement("div", { className: "gal-modal-head" },
              React.createElement("div", { className: "gal-modal-title" },
                React.createElement("span", null, selectedActivity.icon),
                React.createElement("span", null, selectedActivity.label)
              ),
              React.createElement("button", { className: "gal-btn", onClick: () => setSelectedActivity(null) }, "✕")
            ),
            React.createElement("div", { className: "gal-modal-body" },
              selectedActivity.fullDetail ? selectedActivity.fullDetail : (selectedActivity.detail || "无额外参数或细节记录。")
            ),
            React.createElement("div", { className: "gal-modal-foot" },
              React.createElement("button", { className: "gal-btn active", onClick: () => setSelectedActivity(null) }, "确认")
            )
          )
        )
      );
    }

    // ---- 注册 ----
    const inject = ["slots"];

    function apply(ctx) {
      injectStyles();
      ctx.effect(() => {
        return () => { removeStyles(); };
      }, "dsh-gal-skin: styles cleanup");

      const slots = ctx.get("slots");
      if (slots !== undefined) {
        slots.inject("conversation.view", () => {
          slots.register({
            name: "conversation.view",
            id: "gal",
            order: 5,
            label: () => "小死神"
          }, GalViewComponent);
        });
      }
    }

    exports.inject = inject;
    exports.apply = apply;
    return module.exports;
  },
});
`;

writeFileSync(OUTPUT, clientSource, 'utf8')
console.log('Wrote', OUTPUT, (statSync(OUTPUT).size / 1024).toFixed(1), 'KB')
