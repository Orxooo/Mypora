<p align="center"><img src="docs/assets/mypora-icon.png" width="128" alt="Mypora icon"></p>
<h1 align="center">Mypora</h1>
<p align="center">把注意力还给文字。</p>
<p align="center">基于 MarkText 的开源 Markdown 编辑器，为 macOS 带来毛玻璃界面与统一的大圆角设计。</p>

<p align="center">
<a href="https://github.com/Orxooo/Mypora/releases/tag/v0.23.0-mypora.2">下载 macOS 版本</a> ·
<a href="LICENSE">MIT 许可证</a> ·
<a href="https://github.com/marktext/marktext">上游 MarkText</a> ·
<a href="https://github.com/Orxooo/Mypora/issues">反馈问题</a>
</p>

## 这是什么

Mypora 是 [MarkText](https://github.com/marktext/marktext) 的独立定制版本，沿用它的 Markdown 编辑能力，重点调整 macOS 界面的材质、圆角、留白与视觉层级。原始编辑器由 **Luo Ran 和 MarkText Contributors** 开发；本项目保留原作者署名与 MIT 许可文本。

Mypora 与 MarkText、Typora 均无官方关联。它不是 Typora 的开源版本，也没有使用 Typora 的代码或原始图标。

## 本版改动

- **统一品牌**：应用、菜单、窗口与“关于”页使用 Mypora 名称；Dock 和“关于”页共用新的 M 图标。
- **玻璃质感**：macOS 原生 vibrancy 配合半透明背景、模糊、细边框和轻阴影，适配浅色与深色主题。
- **统一几何关系**：工具栏、侧栏、正文面板采用大圆角矩形；内部按钮按外层圆角和间距协调，避免胶囊式控件。
- **设置界面**：分组卡片、搜索框、下拉菜单、开关、滑块及主题选择统一风格；侧栏分类和主题卡片支持键盘操作。
- **常驻入口**：顶部提供“新建”、设置及文件侧栏按钮，隐藏侧栏或标签栏后仍可使用。
- **空白启动**：新配置默认打开空白文档，不再默认恢复上次打开的验证文件；已有用户可在“设置 → 通用 → 启动”选择“打开空白页”。
- **目录与提示**：目录浮层、目录条目及悬浮提示补齐分层大圆角。
- **编辑细节**：移除旧主题多余的黑色分隔线，调整代码块、表格和复制按钮的圆角与内边距。

这里的 Liquid Glass 指视觉风格；实现基于 Electron、CSS 和 macOS vibrancy，并非 Apple 原生 Liquid Glass 控件。

## 下载与安装

当前发布：**v0.23.0-mypora.2（界面与启动体验修复预览版）**。

| 平台                             | 本版情况                                                  |
| -------------------------------- | --------------------------------------------------------- |
| macOS 12+，Apple Silicon / arm64 | 提供 ZIP，已在本机实测                                    |
| Intel Mac                        | 本版未构建、未验证                                        |
| Windows / Linux                  | 保留上游源码，本版未构建、未验证；玻璃样式仅在 macOS 启用 |

1. 在 [Releases](https://github.com/Orxooo/Mypora/releases/tag/v0.23.0-mypora.2) 下载 `Mypora-0.23.0-mypora.2-mac-arm64.zip`。
2. 解压，将 `Mypora.app` 拖入“应用程序”。
3. 打开应用；如需作为默认编辑器，可在 Finder 中为 `.md` 文件选择“打开方式 → Mypora → 全部更改”。

本版采用 **ad-hoc 签名**，未使用 Apple Developer ID 签名，也未经过 Apple 公证。首次打开可能触发 macOS 提示；确认下载来自本仓库、校验文件一致后，使用系统提供的“仍要打开”流程即可，无需关闭系统安全保护。

发布页提供 `SHA256SUMS.txt`，可在下载目录运行：

```sh
shasum -a 256 -c SHA256SUMS.txt
```

## 设置与更新

点击顶部“新建”可创建空白文档；快捷键为 `⌘T`（新标签页）或 `⌘N`（新窗口）。点击顶部“设置”或使用 `⌘,` 打开偏好设置；左上角文件按钮可显示或隐藏侧栏。

为保留现有 MarkText 设置，Mypora 在 macOS 上继续使用 `~/Library/Application Support/marktext`。两者共用配置，请先退出 MarkText 再启动 Mypora；应用不会改写 Markdown 文件格式。

如需独立试用，可指定单独的配置目录：

```sh
open -n /Applications/Mypora.app --args --user-data-dir "$TMPDIR/mypora-profile"
```

本版不从上游 MarkText 更新源安装更新，避免覆盖 Mypora 的界面。后续版本请从本仓库 Releases 下载并替换应用；保留用户配置目录即可延续设置。

## 从源码构建

需要 Node.js 20.19+、pnpm 10.33.4，以及 macOS Xcode Command Line Tools。当前发布使用 Electron 42.1.0，依赖版本记录在锁文件中。

```sh
git clone https://github.com/Orxooo/Mypora.git
cd Mypora
npx --yes pnpm@10.33.4 install --frozen-lockfile --filter marktext...
npx --yes pnpm@10.33.4 run dev
```

构建应用并打包 Apple Silicon 版本：

```sh
npx --yes pnpm@10.33.4 gen-third-party
npx --yes pnpm@10.33.4 run build:unpack
npx --yes pnpm@10.33.4 -C packages/desktop exec electron-builder \
  --mac --arm64 --dir --publish never \
  -c.mac.identity=- \
  -c.directories.output=/tmp/mypora-build
```

产物为 `/tmp/mypora-build/mac-arm64/Mypora.app`。建议将打包输出放在非 iCloud 同步目录，避免 macOS 文件元数据影响签名。

内部工作区包名仍为 `marktext`，用于兼容上游构建脚本。旧的上游 GitHub 工作流保留在 `docs/upstream-github-config/` 供参考，不会自动运行。

## 验证范围

本版已完成类型检查、桌面构建、全仓库 lint（0 错误、166 条警告），以及窗口标题、标题栏显示、编辑器主题样式和背景色的 **26 项单元测试**。本机实测覆盖空白启动及重启、顶部新建和设置入口、侧栏显示切换、目录浮层、浅色与深色设置页。前一预览版另已实测文档打开/编辑/保存及“关于”页的新图标与署名。

完整上游回归套件、跨平台构建和 Apple 公证未执行。本版属于预览发布，欢迎通过本仓库 Issues 报告问题。

```sh
npx --yes pnpm@10.33.4 typecheck
npx --yes pnpm@10.33.4 -C packages/desktop exec vitest run \
  test/unit/specs/titlebar-window-title.spec.ts \
  test/unit/specs/titlebar-visibility.spec.ts \
  test/unit/specs/editor-theme-style.spec.ts \
  test/unit/specs/theme-background-color.spec.ts
```

## 致谢与许可证

- 原项目：[MarkText](https://github.com/marktext/marktext)。上游说明保留在 [README.upstream.md](README.upstream.md)。
- 原作者：**Copyright (c) 2017-present Luo Ran**。
- 原贡献者：**Copyright (c) 2018-present MarkText Contributors**。
- 本项目依据 [MIT License](LICENSE) 发布，完整保留上游版权声明、授权条款和免责条款。
- 第三方组件继续遵循各自许可证，详见 [THIRD-PARTY-LICENSES.txt](packages/desktop/build/THIRD-PARTY-LICENSES.txt) 及组件内的许可文件。应用包内同时附带 MIT 和第三方许可文本。

---

**English:** Mypora is an independent, MIT-licensed customization of MarkText, focused on a frosted-glass macOS interface and consistent large rounded rectangles. This preview supports Apple Silicon Macs. All original MarkText copyright notices are retained. The release is ad-hoc signed and not notarized; see the sections above for installation, build instructions, shared-profile behavior and validation scope.
