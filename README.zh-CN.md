# Macro Dashboard（宏观对比平台）

[![每周自动更新](https://github.com/Sunny-1991/Macro-Dashboard/actions/workflows/weekly-data-refresh.yml/badge.svg)](https://github.com/Sunny-1991/Macro-Dashboard/actions/workflows/weekly-data-refresh.yml)
[![Readme English](https://img.shields.io/badge/README-English-blue)](./README.md)

一个面向多国家、长周期（1960–2025）的宏观数据对比平台，支持本地快照秒开与每周自动核查更新。

## 功能亮点

- **4 大指标模块**：经济、人口、外贸、财政
- **11 个经济体**：CHN、USA、IND、JPN、KOR、TWN、GBR、DEU、RUS、AUS、NZL
- **双图表模式**：多国折线 / 单国柱状
- **时间区间滑块**：可自定义起止年份
- **右侧交互优化**：
  - 点击右侧国家名称或终点可隐藏/显示该数据线
  - 鼠标移动到线条右端之外时自动隐藏数据框
- **高清图片导出**：`下载数据图`
- **加载快**：`gdp-local-data.js` 本地快照 + 在线数据回补

## 指标覆盖

### 经济
- 人均 GDP（名义美元）
- 人均 GDP（PPP 美元）
- GDP 总量（名义美元）
- GDP 总量（PPP 美元）
- 人均可支配收入（美元）

### 人口
- 人口总量
- 人口增量
- 人口增速
- 老龄化率（65+ 占比）
- 生育率

### 外贸
- 进口额
- 出口额
- 进出口总额
- 贸易差额

### 财政
- 财政收入
- 财政开支
- 财政赤字
- 军费

## 主要数据源

- World Bank API
- IMF WEO / DataMapper
- OECD NAAG
- OWID（含 SIPRI 军费序列）
- UN WPP
- FRED / BEA（美国序列）
- 必要时使用国家官方来源做覆盖（如台湾主计总处/央行、中国国家统计局）

> 说明：最新年份部分指标可能采用“预算值 / 临时值 / 推导值”方式补齐，图中每个数据点都保留来源信息。

## 本地运行

查看页面不需要构建工具。

```bash
# 在仓库根目录
python3 -m http.server 8000
```

打开：`http://127.0.0.1:8000/index.html`

## 每周自动更新机制

仓库已内置 GitHub Actions 工作流：

- 文件：`.github/workflows/weekly-data-refresh.yml`
- 调度：每周一 `02:00 UTC`
- 支持手动触发：`workflow_dispatch`

工作流流程：

1. 执行 `node scripts/build-local-data.mjs`
2. 检测 `gdp-local-data.js` 是否变化
3. 若有变化，自动更新 `index.html` 中 `gdp-local-data.js?v=...`
4. 自动提交并推送到 `main`
5. 若无变化，不提交

## 手动刷新数据

需要 Node.js 20+。

```bash
node scripts/build-local-data.mjs
LOCAL_DATA_VERSION=auto-$(date -u +%Y%m%d%H%M) node scripts/bump-local-data-version.mjs
```

## 项目结构

```text
.
├── index.html                         # 页面布局与交互控件
├── gdp-style.css                      # 样式
├── gdp-script.js                      # 数据加载、补值策略、图表交互
├── gdp-local-data.js                  # 本地快照（秒开）
├── scripts/
│   ├── build-local-data.mjs           # 生成本地快照
│   └── bump-local-data-version.mjs    # 更新 index.html 快照版本号
└── .github/workflows/
    └── weekly-data-refresh.yml        # 每周自动核查并更新
```

## 开发说明

- 项目采用无框架实现（Vanilla JS + Chart.js），便于部署与维护。
- 本地没有 Node 时，仍可直接使用已有快照运行页面。
- 若使用自动更新流程，建议将 `main` 作为发布分支。

