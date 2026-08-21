# dsh-skin-Tlipoca 🔮

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-8b5cf6?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-amber?style=flat-square)
![Platform](https://img.shields.io/badge/platform-DeepSeek%20Harness%20(DSH)-581c87?style=flat-square)
![Type](https://img.shields.io/badge/type-Client%20Skin%20Plugin-ec4899?style=flat-square)
![React](https://img.shields.io/badge/built%20with-React%2018-61dafb?style=flat-square&logo=react)

**《犹格索托斯的庭院》特莉波卡 (Tlipoca) GAL 视觉小说沉浸式皮肤插件**  
*将你的 DeepSeek Harness 工作台蜕变为与见习死神少女朝夕相处的哥特魔导工坊。*

[✨ 特性一览](#-核心特性) • [🖼️ 视觉预览](#️-视觉预览) • [🚀 快速开始](#-快速开始) • [🎮 交互与玩法](#-交互与玩法) • [📁 目录结构](#-目录结构) • [🛠️ 源码构建](#️-源码构建) • [📜 协议与鸣谢](#-开源协议与鸣谢)

</div>

---

## 🖼️ 视觉预览

![Tlipoca Skin Preview](./assets/preview.png)

> *“呼啊……阁下，今天也要收割代码吗？……想睡觉。”*

---

## ✨ 核心特性

### 🎭 1. 沉浸式视觉小说体验 (Visual Novel GUI)
- **哥特暗黑美学**：自适应 16:9 画幅、深紫与鎏金搭配的古典界面。
- **琉璃金饰对话框**：定制高精度金饰琉璃框底，辅以精致的名牌菱形浮雕。
- **流式平滑增量打字机**：逐字解析 AI 流式输出，平滑跟随金色呼吸光标，点击即刻快速跳过输出。
- **古典中文字体衬线韵味**：融合 *Cinzel*、*ZCOOL XiaoWei* 与 *Noto Serif SC*，带来纯正日式/哥特 AVG 阅读质感。

### 🔮 2. 7 大精美立绘差分与呼吸律动 (Character Expressions)
内置特莉波卡全套高清立绘差分，智能伴随对话与思考呈现生动的光影与呼吸浮动：
- 💤 **`daliy`（日常慵懒）**：日常状态下呆萌模样。
- ✨ **`happy`（开心满足）**：受到猊下夸奖或尝到甜点时的温柔笑颜。
- 🌸 **`cute`（可爱害羞）**：被摸头时的微微脸红与温顺依偎。
- ⚡ **`surprised`（惊讶动容）**：发现意料之外的事态时微微睁大的紫眸。
- 🤔 **`confused`（困惑思考）**：歪头思索底层逻辑或复杂指令。
- 🥺 **`sad`（委屈难过）**：遇到 Bug 或被冷落时的惹人怜爱模样。
- ⚔️ **`angry`（生气）**：手起刀落、冷酷高效斩断系统异常与代码冗余。

### 🧠 3. AI 情感推断与底层动作联动 (AI Emotion & Tool Reactive)
- **静默情感解析**：前端自动化无感提取 AI 上下文中的情感标签并平滑流转立绘，绝不在对话框中暴露格式痕迹。
- **工具链状态感知**：
  - 📂 读取/编辑文件 (`read`, `edit`, `write`) $\rightarrow$ 呈现专属专注思考立绘与微光动作条；
  - ⚡ 终端执行指令 (`pwsh`) $\rightarrow$ 挥舞巨镰斩除 Bug 状态联动；
  - 🌐 联网检索 (`web_search`) $\rightarrow$ 探寻暗影神域与异界信息流。

### 📋 4. 动态任务横条堆栈与全量详情 (Task Action Stack)
- **左上角动态展开横条**：AI 推理链（Reasoning）与系统工具调用以优雅的平滑展开动效堆叠排列。
- **轻量微缩与透视衰减**：历史任务自动渐隐缩略，支持鼠标滚轮上下滑动翻阅。
- **无损查看完整命令**：点击任意任务横条，即刻弹出精致毛玻璃模态框，完整查看未截断的长指令、文件绝对路径与输出详情。

### 🏰 5. 多场景自由切换与本地自定义上传 (Scenes & Customization)
- **内置 3 大高清原画场景**：
  - 🏰 **庭院大厅 (Hall)**：幽邃奢华的炼金旅社主会厅；
  - 🌕 **庭院外侧 (Yard)**：皎洁圆月与暗影交织的静谧古庭；
  - 🕯️ **死神卧室 (Room)**：暖黄烛火、适合蜷缩补觉的私人休憩所。
- **支持自定义壁纸**：一键上传本地背景图片，支持图片持久化保存至浏览器本地存储（LocalStorage）。

### 📜 6. 对话历史回溯抽屉 (History Backlog Drawer)
- 右上角一键唤出经典 GAL 样式的历史记录抽屉，随时向上翻阅与阁下的每一句珍贵交谈。

### ⚡ 7. 零额外依赖与极致轻量 (Zero-Config & Standalone)
- 基于纯原生 React 18 与 Cordis 动态插件规范构建。
- 所有高清场景与立绘素材均经 Data-URL 内联或本地缓存加载，不依赖外部静态资源服务器，开箱即用。

---

## 🚀 快速开始

### 前置要求
- [DeepSeek Harness (DSH)](https://github.com/deepseek-ai) 桌面端或 Web 端环境。

### 安装方法

#### 方式一：克隆至 DSH 插件目录（推荐）
```bash
# 进入你的 DSH 插件/自定义扩展目录
cd path/to/dsh/plugins

# 克隆本仓库
git clone https://github.com/znnVSNOOU/dsh-skin-Tlipoca.git
```

#### 方式二：通过 `cordis.patch.yml` 挂载
在你的 `cordis.yml` 或扩展配置中引入补丁条目：
```yaml
- insert:
    - id: dsh-skin-Tlipoca
      name: dsh-skin-Tlipoca
```

### 启用插件
1. 启动并打开 DSH Web 界面 (`http://127.0.0.1:10046`)。
2. 在主界面顶部的视图切换栏（View Tabs）中，点击新增的 **「小死神」** 图标/标签页。
3. 即可进入特莉波卡专属沉浸式 GAL 视窗！

---

## 🎮 交互与玩法

| 操作 | 对应交互行为 |
| :--- | :--- |
| **点击对话框** | 正在打字时：立即跳过流式动画显示全文本；打字结束时：聚焦输入框。 |
| **点击左上角任务条** | 弹出任务详情模态框，完整查看当前正在执行的命令参数或文件路径。 |
| **右上角 🏰 按钮** | 切换场景菜单（庭院大厅 / 庭院外侧 / 死神卧室 / 上传自定义背景）。 |
| **右上角 📜 按钮** | 打开 / 关闭全量对话历史回溯抽屉。 |
| **左上角表情切换** | 手动自选或锁定特莉波卡的当前立绘表情。 |

---

## 📁 目录结构

```text
dsh-skin-Tlipoca/
├── .dsh-plugin/               # DSH 插件分发核心产物
│   ├── assets/                # 7套立绘差分、高清场景、UI 对话框原画
│   ├── client.js              # 编译打包后的 Web Client Bundle (内嵌素材)
│   └── index.mjs              # Node Host-half 契约入口
├── assets/                    # 项目展示资源
│   └── preview.png            # README 预览大图
├── scripts/                   # 构建与辅助脚本
│   ├── build-client.mjs       # 自动化内嵌素材并生成 client.js
│   ├── make-bgs.mjs           # 场景资源处理
│   └── render_pure_preview.py # 自动化预览渲染脚本
├── cordis.patch.yml           # Cordis Bundle 挂载补丁配置
├── package.json               # NPM 与 DSH 插件元数据声明
├── LICENSE                    # MIT 开源许可证
└── README.md                  # 项目说明文档
```

---

## 🛠️ 源码构建

如果你修改了 `.dsh-plugin/assets/` 中的立绘、场景或重构了 UI 逻辑，可通过内置脚本重新构建客户端产物：

```bash
# 运行打包脚本，将素材与 React 逻辑编译整合至 .dsh-plugin/client.js
node scripts/build-client.mjs
```

---

## ❓ 常见问题 (FAQ)

<details>
<summary><b>Q1: 切换到「小死神」视图后黑屏或立绘未显示？</b></summary>
请检查是否已执行过 <code>node scripts/build-client.mjs</code> 生成最新的 <code>.dsh-plugin/client.js</code>，并刷新浏览器页面清除缓存。
</details>

<details>
<summary><b>Q2: 自定义上传的背景图片会丢失吗？</b></summary>
不会。自定义背景图以 Base64 编码保存在当前浏览器的 <code>localStorage</code> 中，只要不手动清理浏览器站点缓存即可长效保存。
</details>

<details>
<summary><b>Q3: 如何让 AI 更生动地配合立绘动作？</b></summary>
可以在 Agent 的 Prompt / 预设提示词中加入特莉波卡的人设指令，AI 会在作答中自然附带情感标签并触发专属立绘变化。
</details>

---

## 📜 开源协议与鸣谢

- 本插件代码部分遵循 [MIT License](LICENSE) 开源。
- 角色设定与灵感来源于游戏 **《犹格索托斯的庭院》 (Yog-Sothoth's Yard)** 中的角色 **特莉波卡 (Tlipoca)**。
- 感谢 DeepSeek Harness 团队提供的优秀 AI 扩展底座与 Cordis 架构。

---

<div align="center">
  <sub>Made with 💜 for <b>DeepSeek Harness</b> and <b>Tlipoca</b>. 阁下，特莉波卡随时准备为您效劳……呼啊。</sub>
</div>
