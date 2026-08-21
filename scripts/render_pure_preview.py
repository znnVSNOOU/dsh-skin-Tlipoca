import asyncio
from playwright.async_api import async_playwright
import os
import base64

ROOT = 'D:/07_AIbot/dsh/dsh-gal-skin'
ASSETS = os.path.join(ROOT, '.dsh-plugin/assets')

def to_base64(filename):
    with open(os.path.join(ASSETS, filename), 'rb') as f:
        data = f.read()
    ext = 'png' if filename.endswith('.png') else 'jpg'
    return f'data:image/{ext};base64,{base64.b64encode(data).decode()}'

bg_room = to_base64('bg_room.png')
cute_char = to_base64('cute.png')
dialogue_box = to_base64('dialogue_box.png')

html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Noto+Serif+SC:wght@500;600;700;900&family=ZCOOL+XiaoWei&display=swap">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body, html {{
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: #070913;
      font-family: "ZCOOL XiaoWei", "Noto Serif SC", serif;
      color: #e6e9f4;
      user-select: none;
    }}
    
    /* 顶部应用栏模拟 (极简纯净) */
    .app-header {{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 48px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      padding-left: 28px;
      gap: 32px;
      z-index: 100;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }}
    .app-tab {{
      font-size: 15px;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
      padding: 12px 4px;
      position: relative;
    }}
    .app-tab.active {{
      color: #2563eb;
      font-weight: 600;
    }}
    .app-tab.active::after {{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2.5px;
      background: #2563eb;
      border-radius: 2px 2px 0 0;
    }}

    .gal-container {{
      position: absolute;
      top: 48px;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('{bg_room}') center center / cover no-repeat;
      overflow: hidden;
    }}

    /* 表情选择栏 */
    .gal-emotion-bar {{
      position: absolute;
      top: 14px;
      left: 20px;
      z-index: 20;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(15, 11, 28, 0.85);
      border: 1px solid rgba(234, 179, 8, 0.35);
      border-radius: 18px;
      padding: 4px 10px;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
    }}
    .gal-emo-label {{
      font-size: 13px;
      color: #fef08a;
      margin-right: 4px;
    }}
    .gal-emo-btn {{
      background: transparent;
      border: none;
      color: #fef08a;
      font-size: 13px;
      padding: 3px 9px;
      border-radius: 12px;
      cursor: pointer;
      font-family: inherit;
    }}
    .gal-emo-btn.active {{
      background: rgba(168, 85, 247, 0.55);
      color: #fff;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
    }}

    /* 右上角按钮组 */
    .gal-hud-top {{
      position: absolute;
      top: 14px;
      right: 24px;
      z-index: 20;
      display: flex;
      gap: 10px;
    }}
    .gal-btn {{
      background: rgba(24, 18, 43, 0.88);
      border: 1px solid rgba(234, 179, 8, 0.4);
      color: #fef08a;
      padding: 6px 16px;
      font-size: 13.5px;
      border-radius: 6px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
    }}

    /* 左上角任务堆栈 */
    .gal-activity-stack-wrap {{
      position: absolute;
      top: 58px;
      left: 20px;
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 480px;
    }}
    .gal-activity-card {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 16px;
      background: linear-gradient(135deg, rgba(24, 14, 48, 0.95), rgba(60, 24, 120, 0.9));
      border: 1px solid rgba(216, 180, 254, 0.45);
      border-left: 3.5px solid #facc15;
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.65), inset 0 0 10px rgba(147, 51, 234, 0.25);
      backdrop-filter: blur(10px);
      white-space: nowrap;
      transform-origin: left center;
    }}
    .act-card-icon {{ font-size: 15px; }}
    .act-card-label {{
      font-size: 13.5px;
      font-weight: 700;
      color: #fef08a;
      text-shadow: 0 0 8px rgba(250, 204, 21, 0.6);
    }}
    .act-card-detail {{
      font-size: 12.5px;
      color: #e9d5ff;
      font-family: "Noto Serif SC", monospace;
      filter: blur(3.5px);
      opacity: 0.85;
    }}

    /* 角色立绘 */
    .gal-char-container {{
      position: absolute;
      bottom: 56px;
      left: 50%;
      transform: translateX(-50%);
      height: 84%;
      z-index: 5;
      pointer-events: none;
      filter: drop-shadow(0 0 28px rgba(192, 132, 252, 0.6));
    }}
    .gal-char-img {{
      height: 100%;
      width: auto;
      object-fit: contain;
    }}

    /* 对话框 */
    .gal-dialogue-wrap {{
      position: absolute;
      bottom: 44px;
      left: 50%;
      transform: translateX(-50%);
      width: 1400px;
      height: 250px;
      z-index: 10;
    }}
    .gal-dialogue-bg {{
      position: absolute;
      inset: 0;
      background: url('{dialogue_box}') center center / 100% 100% no-repeat;
      filter: drop-shadow(0 14px 32px rgba(0, 0, 0, 0.9));
    }}
    .gal-dialogue-content {{
      position: absolute;
      inset: 38px 145px 56px 145px;
      display: flex;
      flex-direction: column;
      z-index: 2;
    }}
    .gal-speaker-badge {{
      display: inline-flex;
      align-items: center;
      padding: 3px 18px;
      background: linear-gradient(135deg, rgba(88, 28, 135, 0.95), rgba(49, 10, 82, 0.98));
      border: 1px solid rgba(251, 191, 36, 0.6);
      border-radius: 14px;
      font-family: "Cinzel", "ZCOOL XiaoWei", "Noto Serif SC", serif;
      font-size: 15px;
      font-weight: 700;
      color: #fef08a;
      letter-spacing: 0.08em;
      text-shadow: 0 0 10px rgba(250, 204, 21, 0.75);
      margin-bottom: 8px;
      align-self: flex-start;
    }}
    .gal-text-area {{
      font-size: 17px;
      line-height: 1.8;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 0 10px rgba(192, 132, 252, 0.35);
      white-space: pre-wrap;
      font-weight: 500;
      letter-spacing: 0.02em;
    }}

    /* 输入栏 */
    .gal-input-bar {{
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 960px;
      z-index: 30;
      display: flex;
      gap: 10px;
      background: rgba(15, 11, 28, 0.94);
      border: 1px solid rgba(234, 179, 8, 0.4);
      border-radius: 24px;
      padding: 5px 10px 5px 20px;
      backdrop-filter: blur(14px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.75);
    }}
    .gal-input-field {{
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #fdf4ff;
      font-size: 15px;
    }}
    .gal-input-field::placeholder {{ color: rgba(216, 180, 254, 0.45); }}
    .gal-send-btn {{
      background: linear-gradient(135deg, #9333ea, #6b21a8);
      border: 1px solid rgba(250, 204, 21, 0.4);
      color: #fef08a;
      padding: 6px 20px;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }}
  </style>
</head>
<body>
  <div class="app-header">
    <div class="app-tab">对话</div>
    <div class="app-tab active">小死神</div>
    <div class="app-tab">轨迹</div>
  </div>

  <div class="gal-container">
    <div class="gal-emotion-bar">
      <span class="gal-emo-label">表情:</span>
      <button class="gal-emo-btn">日常</button>
      <button class="gal-emo-btn">开心</button>
      <button class="gal-emo-btn active">可爱</button>
      <button class="gal-emo-btn">惊讶</button>
      <button class="gal-emo-btn">疑惑</button>
      <button class="gal-emo-btn">委屈</button>
      <button class="gal-emo-btn">生气</button>
    </div>

    <div class="gal-hud-top">
      <button class="gal-btn">🖼️ 场景切换</button>
      <button class="gal-btn">📜 历史记录</button>
    </div>

    <div class="gal-activity-stack-wrap">
      <div class="gal-activity-card" style="opacity: 1.0; transform: scale(1.0);">
        <span class="act-card-icon">✨</span>
        <span class="act-card-label">小死神正在思考</span>
      </div>
      <div class="gal-activity-card" style="opacity: 0.84; transform: scale(0.95);">
        <span class="act-card-icon">⚡</span>
        <span class="act-card-label">小死神正在执行指令</span>
        <span class="act-card-detail">(python "scripts/build-client.mjs"...)</span>
      </div>
      <div class="gal-activity-card" style="opacity: 0.68; transform: scale(0.90);">
        <span class="act-card-icon">✨</span>
        <span class="act-card-label">小死神正在思考</span>
      </div>
      <div class="gal-activity-card" style="opacity: 0.52; transform: scale(0.85);">
        <span class="act-card-icon">⚡</span>
        <span class="act-card-label">小死神正在执行指令</span>
        <span class="act-card-detail">(python "scripts/make-bgs.mjs"...)</span>
      </div>
      <div class="gal-activity-card" style="opacity: 0.36; transform: scale(0.80);">
        <span class="act-card-icon">✨</span>
        <span class="act-card-label">小死神正在思考</span>
      </div>
    </div>

    <div class="gal-char-container">
      <img class="gal-char-img" src="{cute_char}" alt="特莉波卡">
    </div>

    <div class="gal-dialogue-wrap">
      <div class="gal-dialogue-bg"></div>
      <div class="gal-dialogue-content">
        <div class="gal-speaker-badge">✦ 特莉波卡 ✦</div>
        <div class="gal-text-area">（紫色的眸子泛着开心的微光，头顶的小恶魔翅膀贝雷帽欢快地晃动，将新鲜出炉的界面预览图呈现在阁下面前）

……呼啊！阁下，超清实机界面展示截图已经成功捕获、嵌入并同步推送到您的 GitHub 仓库啦！✨

---</div>
      </div>
    </div>

    <div class="gal-input-bar">
      <input class="gal-input-field" type="text" placeholder="对特莉波卡说些什么…… (按回车发送)">
      <button class="gal-send-btn">发送</button>
    </div>
  </div>
</body>
</html>
"""

with open(os.path.join(ROOT, 'scripts/preview_template.html'), 'w', encoding='utf-8') as f:
    f.write(html_content)

async def render():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        html_path = 'file:///' + os.path.abspath(os.path.join(ROOT, 'scripts/preview_template.html')).replace('\\\\', '/')
        await page.goto(html_path)
        await page.wait_for_timeout(2000)
        await page.screenshot(path=os.path.join(ROOT, 'assets/preview.png'))
        print('Successfully generated 100% safe, high-res 1920x1080 preview.png without any private info!')
        await browser.close()

asyncio.run(render())
