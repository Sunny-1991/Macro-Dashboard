const START_YEAR = 1980;
const END_YEAR = 2025;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

const COUNTRIES = [
  { code: "CHN", name: "中国", color: "#d7263d" },
  { code: "USA", name: "美国", color: "#1f77b4" },
  { code: "IND", name: "印度", color: "#f59e0b" },
  { code: "JPN", name: "日本", color: "#2ca02c" },
  { code: "KOR", name: "韩国", color: "#0f766e" },
  { code: "TWN", name: "台湾地区", color: "#ff7f0e" },
  { code: "GBR", name: "英国", color: "#8e44ad" },
  { code: "DEU", name: "德国", color: "#16a085" },
  { code: "RUS", name: "俄罗斯", color: "#a16207" },
  { code: "AUS", name: "澳大利亚", color: "#0ea5e9" },
  { code: "NZL", name: "新西兰", color: "#ef4444" },
];
const COUNTRY_CODES_TILDE = COUNTRIES.map((country) => country.code).join("~");

const WORLD_BANK_CODES = COUNTRIES.filter((country) => country.code !== "TWN").map(
  (country) => country.code,
);

const SOURCE_LABELS = {
  worldBank: "World Bank",
  imf: "IMF WEO",
  imfDataMapper: "IMF DataMapper",
  maddison: "Maddison (OWID)",
  wbNominal: "World Bank NY.GDP.PCAP.CD",
  wbPpp: "World Bank NY.GDP.PCAP.PP.CD",
  wbTotalNominal: "World Bank NY.GDP.MKTP.CD",
  wbTotalPpp: "World Bank NY.GDP.MKTP.PP.CD",
  wbAdjDisposable: "World Bank NY.ADJ.NNTY.PC.CD",
  wbGniFallback: "World Bank NY.GNP.PCAP.CD（桥接校准）",
  wbFxChn: "World Bank PA.NUS.FCRF",
  imfNgdpdpc: "IMF WEO NGDPDPC",
  imfPpppc: "IMF WEO PPPPC",
  imfNgdpd: "IMF WEO NGDPD（十亿美元折算为美元）",
  imfPppgdp: "IMF WEO PPPGDP（十亿美元折算为美元）",
  chnNbsNationalIncome: "NBS 全国居民人均可支配收入（人民币）",
  chnDisposableInterpolated: "中国官方锚点插值补齐",
  chnFxFallback: "FRED AEXCHUS（USD/CNY 年均汇率）",
  oecdDisposableNetUsdExch: "OECD NAAG B6NS1M_POP（人均可支配收入，美元）",
  oecdDisposableGrossUsdExch: "OECD NAAG B6GS1M_POP（人均可支配收入，美元）",
  oecdDisposableGrossUsdPppOfficialTable:
    "OECD NAAG B6GS1M_POP（人均可支配收入，PPP）（官方表格）",
  oecdDisposablePppImfScaledPost2022:
    "OECD 官方PPP口径2022锚点 + IMF WEO PPPPC同比折算",
  nzlDisposableWbBridgedPre1998: "World Bank NY.ADJ.NNTY.PC.CD（按1998 OECD B6锚点校准）",
  oecdDisposableGrossUsdExchOfficialTable:
    "OECD NAAG B6GS1M_POP（人均可支配收入，美元）（官方表格）",
  oecdDisposableNetUsdPpp: "OECD NAAG B6NS1M_POP（人均可支配收入，PPP）",
  oecdDisposableGrossUsdPpp: "OECD NAAG B6GS1M_POP（人均可支配收入，PPP）",
  oecdDisposablePppToUsd: "OECD 可支配收入（PPP）按人均GDP名义/PPP折算美元",
  oecdDisposableUsdExchImfScaled2025:
    "OECD 官方美元口径2024锚点 + IMF WEO NGDPDPC同比折算（2025）",
  oecdDisposableBridge: "OECD 官方序列缺口补值",
  disposableRatioGuard: "可支配收入异常高值保护（相对人均GDP）",
  disposableAnchorInterpolated: "同口径锚点插值补齐",
  twnNominalDataMapper: "IMF DataMapper NGDPDPC（台湾）",
  twnPppDataMapper: "IMF DataMapper PPPPC（台湾）",
  twnNominalImfVerified: "IMF DataMapper NGDPDPC（台湾，2022-2025核验值）",
  rusDisposableCalibrated: "俄罗斯可支配收入历史比率校准",
  twnDgbasPerCapitaOfficial:
    "台湾主计总处《家庭收支重要指标》平均每人可支配所得（新台币）",
  twnFxCbc: "台湾央行年平均汇率（NTD/USD）",
  usaBeaDisposableAnnual: "BEA/FRED A229RC0A052NBEA（美国人均可支配收入，美元）",
  usaBeaDisposable2025Provisional:
    "BEA/FRED A229RC0Q052SBEA（美国人均可支配收入，2025年Q1-Q3平均，美元）",
};

const CHINA_NBS_NATIONAL_DISPOSABLE_INCOME_CNY = new Map([
  [1980, 246.8],
  [1985, 478.6],
  [1990, 903.9],
  [1995, 2363.3],
  [2000, 3721.3],
  [2001, 4070.4],
  [2002, 4531.6],
  [2003, 5006.7],
  [2004, 5660.9],
  [2005, 6384.7],
  [2006, 7228.8],
  [2007, 8583.5],
  [2008, 9956.5],
  [2009, 10977.5],
  [2010, 12519.5],
  [2011, 14550.7],
  [2012, 16509.5],
  [2013, 18311.0],
  [2014, 20167.0],
  [2015, 21966.0],
  [2016, 23821.0],
  [2017, 25974.0],
  [2018, 28228.0],
  [2019, 30733.0],
  [2020, 32189.0],
  [2021, 35128.0],
  [2022, 36883.0],
  [2023, 39218.0],
  [2024, 41314.0],
  [2025, 43377.0],
]);

const CHINA_FX_RATE_FALLBACK = new Map([[2025, 7.1875]]);
const TAIWAN_DGBAS_PER_CAPITA_DISPOSABLE_INCOME_NTD = new Map([
  [1980, 48064],
  [1981, 55624],
  [1982, 58070],
  [1983, 62821],
  [1984, 67146],
  [1985, 69824],
  [1986, 75437],
  [1987, 83104],
  [1988, 95907],
  [1989, 109410],
  [1990, 124140],
  [1991, 141164],
  [1992, 156023],
  [1993, 177531],
  [1994, 191481],
  [1995, 205923],
  [1996, 210811],
  [1997, 224851],
  [1998, 231611],
  [1999, 244918],
  [2000, 246256],
  [2001, 242640],
  [2002, 239978],
  [2003, 249763],
  [2004, 254643],
  [2005, 261571],
  [2006, 267769],
  [2007, 273336],
  [2008, 272742],
  [2009, 265750],
  [2010, 273647],
  [2011, 275984],
  [2012, 285939],
  [2013, 293523],
  [2014, 303762],
  [2015, 311256],
  [2016, 323490],
  [2017, 331903],
  [2018, 339772],
  [2019, 350904],
  [2020, 369742],
  [2021, 377354],
  [2022, 391720],
  [2023, 407422],
  [2024, 419139],
  [2025, 440000],
]);
const TAIWAN_IMF_PER_CAPITA_GDP_USD_RECENT = new Map([
  [2022, 32909.994],
  [2023, 32336.728],
  [2024, 34059.922],
  [2025, 37826.665],
]);
const TAIWAN_CBC_USD_TWD_ANNUAL_RATE = new Map([
  [1980, 36.0],
  [1981, 36.84],
  [1982, 39.11],
  [1983, 40.06],
  [1984, 39.6],
  [1985, 39.85],
  [1986, 37.82],
  [1987, 31.77],
  [1988, 28.59],
  [1989, 26.4],
  [1990, 26.89],
  [1991, 26.809],
  [1992, 25.163],
  [1993, 26.382],
  [1994, 26.455],
  [1995, 26.476],
  [1996, 27.458],
  [1997, 28.662],
  [1998, 33.445],
  [1999, 32.266],
  [2000, 31.225],
  [2001, 33.8],
  [2002, 34.575],
  [2003, 34.418],
  [2004, 33.422],
  [2005, 32.167],
  [2006, 32.531],
  [2007, 32.842],
  [2008, 31.517],
  [2009, 33.049],
  [2010, 31.642],
  [2011, 29.464],
  [2012, 29.614],
  [2013, 29.77],
  [2014, 30.368],
  [2015, 31.898],
  [2016, 32.318],
  [2017, 30.439],
  [2018, 30.156],
  [2019, 30.925],
  [2020, 29.578],
  [2021, 28.022],
  [2022, 29.777],
  [2023, 31.15],
  [2024, 32.108],
  [2025, 31.166],
]);
const USA_BEA_DISPOSABLE_INCOME_PER_CAPITA_USD = new Map([
  [1980, 8892],
  [1981, 9815],
  [1982, 10485],
  [1983, 11218],
  [1984, 12313],
  [1985, 13019],
  [1986, 13684],
  [1987, 14236],
  [1988, 15401],
  [1989, 16384],
  [1990, 17262],
  [1991, 17753],
  [1992, 18701],
  [1993, 19226],
  [1994, 19919],
  [1995, 20762],
  [1996, 21612],
  [1997, 22502],
  [1998, 23740],
  [1999, 24583],
  [2000, 26151],
  [2001, 27186],
  [2002, 28122],
  [2003, 29172],
  [2004, 30577],
  [2005, 31533],
  [2006, 33281],
  [2007, 34603],
  [2008, 35851],
  [2009, 35520],
  [2010, 36532],
  [2011, 37964],
  [2012, 39426],
  [2013, 39077],
  [2014, 40671],
  [2015, 42013],
  [2016, 42910],
  [2017, 44710],
  [2018, 47002],
  [2019, 48907],
  [2020, 52385],
  [2021, 56543],
  [2022, 56555],
  [2023, 61545],
  [2024, 64423],
  [2025, 66550.667],
]);
const OECD_DISPOSABLE_USD_EXCH_OFFICIAL_OVERRIDES = {
  JPN: new Map([
    [1994, 33158.2483970305],
    [1995, 36417.7775731353],
    [1996, 32722.7013662812],
    [1997, 30295.7978914862],
    [1998, 27393.6409879588],
    [1999, 30646.1665425509],
    [2000, 32338.4257391884],
    [2001, 28706.8938472668],
    [2002, 27442.5754099546],
    [2003, 29696.973970813],
    [2004, 32167.3866686376],
    [2005, 31972.6338405875],
    [2006, 30372.0541699319],
    [2007, 30046.0469079565],
    [2008, 33743.8239737307],
    [2009, 34973.0113383898],
    [2010, 38257.8684391819],
    [2011, 41535.3407785052],
    [2012, 42054.6636654701],
    [2013, 35052.7505284669],
    [2014, 33186.9352417775],
    [2015, 30240.3197871575],
    [2016, 34509.9980901583],
    [2017, 33967.5413025669],
    [2018, 37448.8504399013],
    [2019, 36657.9775758179],
    [2020, 36666.6942297789],
    [2021, 33555.2289971769],
    [2022, 33734.7575903076],
    [2023, 32410.7211486624],
    [2024, 32424.1125586453],
  ]),
};
const NZL_OECD_B6GS1M_POP_USD_PPP_OFFICIAL = new Map([
  [1998, 11109.4329136893],
  [1999, 12000.7615752805],
  [2000, 11472.8595024074],
  [2001, 12093.1664842667],
  [2002, 11782.390976878],
  [2003, 12508.7019048198],
  [2004, 13345.0888604931],
  [2005, 13554.2910233216],
  [2006, 14529.7345338487],
  [2007, 15737.2472599173],
  [2008, 15795.5890925943],
  [2009, 16187.1877193782],
  [2010, 16882.5994828001],
  [2011, 17874.7788202352],
  [2012, 18189.6890811172],
  [2013, 18365.5496992976],
  [2014, 18448.7114465381],
  [2015, 18850.503239462],
  [2016, 20346.206549512],
  [2017, 21230.0909902902],
  [2018, 21603.6322711022],
  [2019, 23598.2325777018],
  [2020, 25419.5330013218],
  [2021, 26512.0889676193],
  [2022, 29444.4749499534],
]);
const NZL_WB_ADJ_NNTY_PC_CD_ANNUAL = new Map([
  [1980, 6063.77365795795],
  [1981, 6356.52018307552],
  [1982, 6182.75977054957],
  [1983, 6105.8633026106],
  [1984, 5295.79336308128],
  [1985, 5903.86566300407],
  [1986, 7462.55964098518],
  [1987, 9818.13104839561],
  [1988, 11164.038571084],
  [1989, 10759.4498974918],
  [1990, 10966.6204345572],
  [1991, 9441.38492183068],
  [1992, 9109.10333018892],
  [1993, 10110.2177338094],
  [1994, 11943.264448967],
  [1995, 13729.9050518201],
  [1996, 14579.0489002565],
  [1997, 13802.093918712],
  [1998, 11834.4188119406],
]);
const OECD_DISPOSABLE_COUNTRY_CODES = ["USA", "JPN", "KOR", "GBR", "DEU", "AUS", "NZL", "RUS"];
const OECD_DISPOSABLE_SERIES_CANDIDATES = [
  {
    transactionCode: "B6NS1M_POP",
    unitCode: "USD_EXC_PS",
    baseSourceLabel: SOURCE_LABELS.oecdDisposableNetUsdExch,
    pppUnit: false,
  },
  {
    transactionCode: "B6GS1M_POP",
    unitCode: "USD_EXC_PS",
    baseSourceLabel: SOURCE_LABELS.oecdDisposableGrossUsdExch,
    pppUnit: false,
  },
  {
    transactionCode: "B6NS1M_POP",
    unitCode: "USD_PPP_PS",
    baseSourceLabel: SOURCE_LABELS.oecdDisposableNetUsdPpp,
    pppUnit: true,
  },
  {
    transactionCode: "B6GS1M_POP",
    unitCode: "USD_PPP_PS",
    baseSourceLabel: SOURCE_LABELS.oecdDisposableGrossUsdPpp,
    pppUnit: true,
  },
];
const DISPOSABLE_RATIO_CAP_BY_COUNTRY = {
  IND: 0.78,
  USA: 0.82,
  KOR: 0.74,
  GBR: 0.75,
  DEU: 0.75,
  AUS: 0.76,
  RUS: 0.55,
};

const METRICS = {
  nominal: {
    label: "人均GDP（国际汇率，美元）",
    axisLabel: "人均 GDP（国际汇率，美元）",
    imfIndicator: "NGDPDPC",
    imfUnit: "us_dollars",
    imfSourceLabel: SOURCE_LABELS.imfNgdpdpc,
    wbIndicators: [{ indicator: "NY.GDP.PCAP.CD", sourceLabel: SOURCE_LABELS.wbNominal }],
  },
  ppp: {
    label: "人均GDP（PPP 美元）",
    axisLabel: "人均 GDP（PPP，美元）",
    imfIndicator: "PPPPC",
    imfUnit: "purchasing_power_parity_international_dollars",
    imfSourceLabel: SOURCE_LABELS.imfPpppc,
    wbIndicators: [{ indicator: "NY.GDP.PCAP.PP.CD", sourceLabel: SOURCE_LABELS.wbPpp }],
  },
  totalNominal: {
    label: "GDP总量（国际汇率，美元）",
    axisLabel: "GDP 总量（国际汇率，美元）",
    imfIndicator: "NGDPD",
    imfUnit: "us_dollars",
    imfScale: 1_000_000_000,
    imfSourceLabel: SOURCE_LABELS.imfNgdpd,
    wbIndicators: [{ indicator: "NY.GDP.MKTP.CD", sourceLabel: SOURCE_LABELS.wbTotalNominal }],
  },
  totalPpp: {
    label: "GDP总量（PPP，美元）",
    axisLabel: "GDP 总量（PPP，美元）",
    imfIndicator: "PPPGDP",
    imfUnit: "purchasing_power_parity_international_dollars",
    imfScale: 1_000_000_000,
    imfSourceLabel: SOURCE_LABELS.imfPppgdp,
    wbIndicators: [{ indicator: "NY.GDP.MKTP.PP.CD", sourceLabel: SOURCE_LABELS.wbTotalPpp }],
  },
  disposableIncome: {
    label: "人均可支配收入（美元）",
    axisLabel: "人均可支配收入（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbAdjDisposable,
    wbIndicators: [
      { indicator: "NY.ADJ.NNTY.PC.CD", sourceLabel: SOURCE_LABELS.wbAdjDisposable },
      { indicator: "NY.GNP.PCAP.CD", sourceLabel: SOURCE_LABELS.wbGniFallback },
    ],
  },
};

const chartEl = document.getElementById("gdpChart");
const statusEl = document.getElementById("gdpStatusText");
const togglesEl = document.getElementById("gdpCountryToggles");
const showAllBtn = document.getElementById("gdpShowAllBtn");
const hideAllBtn = document.getElementById("gdpHideAllBtn");
const downloadBtn = document.getElementById("gdpDownloadBtn");
const resetRangeBtn = document.getElementById("gdpResetRangeBtn");
const rangeHintEl = document.getElementById("gdpRangeHint");
const rangeSliderEl = document.getElementById("gdpRangeSlider");
const metricInputs = Array.from(document.querySelectorAll('input[name="gdpMetric"]'));
const chartModeInputs = Array.from(document.querySelectorAll('input[name="gdpChartMode"]'));
const chartModeHintEl = document.getElementById("gdpChartModeHint");

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const state = {
  chart: null,
  metric: "disposableIncome",
  chartMode: "line",
  loaded: false,
  rangeStart: START_YEAR,
  rangeEnd: END_YEAR,
  sliderSyncLock: false,
  visibleCountries: new Set(COUNTRIES.map((country) => country.code)),
  byMetric: {
    nominal: new Map(),
    ppp: new Map(),
    totalNominal: new Map(),
    totalPpp: new Map(),
    disposableIncome: new Map(),
  },
  sourceByMetric: {
    nominal: new Map(),
    ppp: new Map(),
    totalNominal: new Map(),
    totalPpp: new Map(),
    disposableIncome: new Map(),
  },
  missing2025ByMetric: {
    nominal: [],
    ppp: [],
    totalNominal: [],
    totalPpp: [],
    disposableIncome: [],
  },
};

const MADDISON_CSV_URLS = [
  `https://ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.csv?country=${COUNTRY_CODES_TILDE}`,
  `https://archive.ourworldindata.org/20250819-104157/grapher/gdp-per-capita-maddison-project-database.csv?country=${COUNTRY_CODES_TILDE}`,
];
const requestCache = new Map();
const imfMetricCache = new Map();
const LOCAL_DATA_CACHE_KEY = "gdpDashboardLocalDatasetV1";
const LOCAL_DATA_CACHE_VERSION = 1;
const LOCAL_STATIC_DATA =
  typeof window !== "undefined" && window.GDP_DASHBOARD_LOCAL_DATA
    ? window.GDP_DASHBOARD_LOCAL_DATA
    : null;

const sliderPositionPlugin = {
  id: "sliderPosition",
  afterLayout(chart) {
    positionRangeSliderToXAxis(chart);
  },
};

const lineEndLabelsPlugin = {
  id: "lineEndLabels",
  afterDatasetsDraw(chart) {
    if (state.chartMode === "bar") return;
    const { ctx, chartArea, data } = chart;
    if (!ctx || !chartArea || !Array.isArray(data?.datasets)) return;

    const labels = [];
    data.datasets.forEach((dataset, datasetIndex) => {
      if (!dataset || !chart.isDatasetVisible(datasetIndex)) return;
      const points = chart.getDatasetMeta(datasetIndex)?.data;
      if (!Array.isArray(points) || points.length === 0) return;

      for (let i = dataset.data.length - 1; i >= 0; i -= 1) {
        if (!isFiniteNumber(dataset.data[i])) continue;
        const point = points[i];
        if (!point || !isFiniteNumber(point.x) || !isFiniteNumber(point.y)) continue;
        labels.push({
          text: dataset.label || "",
          color: dataset.borderColor || "#0b4f8a",
          x: point.x,
          y: point.y,
        });
        break;
      }
    });

    if (labels.length === 0) return;

    labels.sort((a, b) => a.y - b.y);
    const minGap = 14;
    const topBound = chartArea.top + 8;
    const bottomBound = chartArea.bottom - 8;
    let prevY = topBound - minGap;

    labels.forEach((item) => {
      const clamped = Math.min(bottomBound, Math.max(topBound, item.y));
      item.drawY = Math.max(clamped, prevY + minGap);
      prevY = item.drawY;
    });

    if (labels.length > 1) {
      for (let i = labels.length - 2; i >= 0; i -= 1) {
        const nextY = labels[i + 1].drawY;
        labels[i].drawY = Math.min(labels[i].drawY, nextY - minGap);
      }
    }

    ctx.save();
    ctx.font = "12px 'Noto Sans SC', 'PingFang SC', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    const labelX = Math.min(chart.width - 4, chartArea.right + 10);

    labels.forEach((item) => {
      const drawY = Math.min(bottomBound, Math.max(topBound, item.drawY));
      const text = String(item.text || "");
      if (!text) return;
      ctx.strokeText(text, labelX, drawY);
      ctx.fillStyle = item.color;
      ctx.fillText(text, labelX, drawY);
    });
    ctx.restore();
  },
};

async function fetchJsonCached(url, label) {
  const cacheKey = `json:${url}`;
  if (!requestCache.has(cacheKey)) {
    const request = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${label} 请求失败（HTTP ${response.status}）`);
        }
        return response.json();
      })
      .catch((error) => {
        requestCache.delete(cacheKey);
        throw error;
      });
    requestCache.set(cacheKey, request);
  }
  return requestCache.get(cacheKey);
}

async function fetchTextCached(url, label) {
  const cacheKey = `text:${url}`;
  if (!requestCache.has(cacheKey)) {
    const request = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${label} 请求失败（HTTP ${response.status}）`);
        }
        return response.text();
      })
      .catch((error) => {
        requestCache.delete(cacheKey);
        throw error;
      });
    requestCache.set(cacheKey, request);
  }
  return requestCache.get(cacheKey);
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.style.color = isError ? "#b42318" : "";
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function formatValue(value) {
  if (!isFiniteNumber(value)) return "无数据";
  return `$${numberFormatter.format(value)}`;
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function emptyCountryMap() {
  return new Map(COUNTRIES.map((country) => [country.code, new Map()]));
}

function getRangeYears() {
  return YEARS.filter((year) => year >= state.rangeStart && year <= state.rangeEnd);
}

function getVisibleCountryCodes() {
  return COUNTRIES.filter((country) => state.visibleCountries.has(country.code)).map(
    (country) => country.code,
  );
}

function withAlpha(color, alpha) {
  const normalized = String(color || "").trim();
  const match = normalized.match(/^#([0-9a-f]{6})$/i);
  if (!match) return color;
  const hex = match[1];
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateChartModeControls() {
  if (!Array.isArray(chartModeInputs) || chartModeInputs.length === 0) return;

  const visibleCodes = getVisibleCountryCodes();
  const canUseBar = visibleCodes.length === 1;
  const barInput = chartModeInputs.find((input) => input.value === "bar");

  if (barInput) {
    barInput.disabled = !canUseBar;
  }

  if (state.chartMode === "bar" && !canUseBar) {
    state.chartMode = "line";
  }

  chartModeInputs.forEach((input) => {
    input.checked = input.value === state.chartMode;
  });

  if (chartModeHintEl) {
    if (canUseBar) {
      const countryCode = visibleCodes[0];
      const country = COUNTRIES.find((item) => item.code === countryCode);
      chartModeHintEl.textContent = `当前仅显示 ${country?.name || countryCode}，可切换柱状图。`;
    } else {
      chartModeHintEl.textContent = "柱状图仅在单一国家显示时可用。";
    }
  }
}

function positionRangeSliderToXAxis(chartInstance = state.chart) {
  if (!chartInstance || !rangeSliderEl) return;
  const sliderWrap = rangeSliderEl.closest(".range-slider-wrap.in-chart");
  if (!sliderWrap) return;

  const xScale = chartInstance.scales?.x;
  if (!xScale) return;

  const left = Math.round(xScale.left);
  const width = Math.max(24, Math.round(xScale.right - xScale.left));
  const axisBandHeight = Math.max(12, Math.round(xScale.bottom - xScale.top));
  const topOffset = Math.max(2, Math.min(7, Math.round(axisBandHeight * 0.22)));
  const top = Math.round(xScale.top + topOffset);

  sliderWrap.style.left = `${left}px`;
  sliderWrap.style.width = `${width}px`;
  sliderWrap.style.top = `${top}px`;
}

function updateRangeHint() {
  if (!rangeHintEl) return;
  rangeHintEl.textContent = `当前区间：${state.rangeStart}-${state.rangeEnd}（共 ${
    state.rangeEnd - state.rangeStart + 1
  } 年，可拖动图中横轴滑块）`;
}

function clampYear(value, fallback) {
  if (!Number.isInteger(value)) return fallback;
  return Math.max(START_YEAR, Math.min(END_YEAR, value));
}

function syncSliderFromRange() {
  if (!rangeSliderEl?.noUiSlider) return;
  const [leftRaw, rightRaw] = rangeSliderEl.noUiSlider.get();
  const left = Number(leftRaw);
  const right = Number(rightRaw);
  if (left === state.rangeStart && right === state.rangeEnd) return;

  state.sliderSyncLock = true;
  rangeSliderEl.noUiSlider.set([state.rangeStart, state.rangeEnd]);
  state.sliderSyncLock = false;
}

function setupRangeSlider() {
  if (!rangeSliderEl || typeof window.noUiSlider === "undefined") return;
  if (rangeSliderEl.noUiSlider) return;

  window.noUiSlider.create(rangeSliderEl, {
    start: [START_YEAR, END_YEAR],
    connect: true,
    step: 1,
    range: {
      min: START_YEAR,
      max: END_YEAR,
    },
    behaviour: "tap-drag",
    format: {
      to(value) {
        return String(Math.round(value));
      },
      from(value) {
        return Number(value);
      },
    },
  });

  rangeSliderEl.noUiSlider.on("set", (values) => {
    if (state.sliderSyncLock) return;
    const start = Number(values[0]);
    const end = Number(values[1]);
    applyYearRange(start, end, { fromSlider: true });
  });
}

function buildImfSeriesUrl(metricKey, countryCode) {
  const metric = METRICS[metricKey];
  return `https://api.db.nomics.world/v22/series/IMF/WEO:latest/${countryCode}.${metric.imfIndicator}.${metric.imfUnit}?observations=1`;
}

function buildOecdDisposableDbNomicsSeriesUrl(countryCode, transactionCode, unitCode) {
  return (
    "https://api.db.nomics.world/v22/series/OECD/DSD_NAAG@DF_NAAG_V/" +
    `A.${countryCode}.${transactionCode}.${unitCode}.NAAG_V?observations=1`
  );
}

function buildOecdDisposableSdmxSeriesUrl(countryCode, transactionCode, unitCode) {
  return (
    "https://sdmx.oecd.org/public/rest/data/OECD.SDD.NAD,DSD_NAAG@DF_NAAG_V/" +
    `A.${countryCode}.${transactionCode}.${unitCode}.NAAG_V` +
    `?startPeriod=${START_YEAR}&endPeriod=${END_YEAR}&dimensionAtObservation=AllDimensions&format=csvfile`
  );
}

function buildWorldBankUrl(indicatorCode) {
  return (
    `https://api.worldbank.org/v2/country/${WORLD_BANK_CODES.join(";")}/indicator/${indicatorCode}` +
    `?format=json&per_page=20000&date=${START_YEAR}:${END_YEAR}`
  );
}

function buildWorldBankCountryIndicatorUrl(countryCode, indicatorCode) {
  return (
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}` +
    `?format=json&per_page=500&date=${START_YEAR}:${END_YEAR}`
  );
}

function buildImfDataMapperUrl(metricKey) {
  const indicator = METRICS[metricKey].imfIndicator;
  const countryCodes = COUNTRIES.map((country) => country.code).join(",");
  return `https://www.imf.org/external/datamapper/api/v1/${indicator}/${countryCodes}`;
}

function parseDbNomicsSeries(payload) {
  const seriesDoc =
    payload?.series?.docs?.[0] ??
    payload?.dataset?.series?.[0] ??
    payload?.docs?.[0] ??
    null;

  if (!seriesDoc) {
    throw new Error("数据格式异常：IMF 返回中未找到 series 文档");
  }

  const periods = Array.isArray(seriesDoc.period) ? seriesDoc.period : [];
  const values = Array.isArray(seriesDoc.value) ? seriesDoc.value : [];
  const map = new Map();

  periods.forEach((periodValue, index) => {
    const year = Number(String(periodValue).slice(0, 4));
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;

    const numeric = toNumberSafe(values[index]);
    map.set(year, numeric);
  });

  return map;
}

function parseDataMapperSeries(series, payload) {
  const map = new Map();

  if (Array.isArray(series)) {
    const years = Array.isArray(payload?.years)
      ? payload.years
      : Array.isArray(payload?.time)
        ? payload.time
        : [];

    series.forEach((value, index) => {
      const year = Number(String(years[index] ?? "").slice(0, 4));
      if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
      map.set(year, toNumberSafe(value));
    });

    return map;
  }

  if (series && typeof series === "object") {
    Object.entries(series).forEach(([yearKey, value]) => {
      const year = Number(String(yearKey).slice(0, 4));
      if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
      map.set(year, toNumberSafe(value));
    });
  }

  return map;
}

function parseCsvRows(csvText) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.length > 1);
}

function toNumberSafe(value) {
  if (value == null) return null;
  const normalized = String(value).replace(/,/g, "").trim();
  if (!normalized) return null;
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function median(values) {
  if (!Array.isArray(values) || values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function computeBridgeFactor(targetSeries, sourceSeries) {
  const pairs = [];

  YEARS.forEach((year) => {
    const target = targetSeries.get(year);
    const source = sourceSeries.get(year);
    if (!isFiniteNumber(target) || !isFiniteNumber(source) || source === 0) return;
    pairs.push({ year, ratio: target / source });
  });

  if (pairs.length === 0) return null;

  const recentRatios = pairs
    .sort((a, b) => b.year - a.year)
    .slice(0, 8)
    .map((item) => item.ratio)
    .filter((value) => isFiniteNumber(value) && value > 0);

  return median(recentRatios);
}

function findAnchorBounds(sortedYears, year) {
  let prev = null;
  let next = null;
  for (let i = 0; i < sortedYears.length; i += 1) {
    const anchorYear = sortedYears[i];
    if (anchorYear < year) {
      prev = anchorYear;
      continue;
    }
    if (anchorYear > year) {
      next = anchorYear;
      break;
    }
  }
  return { prev, next };
}

function fillSeriesByAnchors(valueSeries, sourceSeries, anchorMap, sourceLabel) {
  const sortedYears = [...anchorMap.keys()].sort((a, b) => a - b);
  if (sortedYears.length === 0) return 0;
  if (sortedYears.length === 1) {
    const onlyYear = sortedYears[0];
    const onlyValue = anchorMap.get(onlyYear);
    if (!isFiniteNumber(onlyValue) || onlyValue <= 0) return 0;

    let filled = 0;
    YEARS.forEach((year) => {
      if (isFiniteNumber(valueSeries.get(year))) return;
      valueSeries.set(year, onlyValue);
      sourceSeries.set(year, sourceLabel);
      filled += 1;
    });
    return filled;
  }

  const firstYear = sortedYears[0];
  const secondYear = sortedYears[1];
  const lastYear = sortedYears[sortedYears.length - 1];
  const penultimateYear = sortedYears[sortedYears.length - 2];
  const firstValue = anchorMap.get(firstYear);
  const secondValue = anchorMap.get(secondYear);
  const lastValue = anchorMap.get(lastYear);
  const penultimateValue = anchorMap.get(penultimateYear);
  const rawBeforeFactor =
    isFiniteNumber(firstValue) &&
    isFiniteNumber(secondValue) &&
    firstValue > 0 &&
    secondValue > 0 &&
    secondYear > firstYear
      ? Math.pow(secondValue / firstValue, 1 / (secondYear - firstYear))
      : 1;
  const rawAfterFactor =
    isFiniteNumber(lastValue) &&
    isFiniteNumber(penultimateValue) &&
    lastValue > 0 &&
    penultimateValue > 0 &&
    lastYear > penultimateYear
      ? Math.pow(lastValue / penultimateValue, 1 / (lastYear - penultimateYear))
      : 1;
  const beforeFactor = Math.min(1.08, Math.max(0.94, rawBeforeFactor));
  const afterFactor = Math.min(1.12, Math.max(0.94, rawAfterFactor));

  let filled = 0;
  YEARS.forEach((year) => {
    if (isFiniteNumber(valueSeries.get(year))) return;

    const { prev, next } = findAnchorBounds(sortedYears, year);
    let candidate = null;

    if (Number.isInteger(prev) && Number.isInteger(next)) {
      const prevValue = anchorMap.get(prev);
      const nextValue = anchorMap.get(next);
      if (isFiniteNumber(prevValue) && isFiniteNumber(nextValue) && prevValue > 0 && nextValue > 0) {
        const span = next - prev;
        const pos = year - prev;
        candidate = prevValue * Math.pow(nextValue / prevValue, pos / span);
      }
    } else if (Number.isInteger(prev)) {
      const prevValue = anchorMap.get(prev);
      if (isFiniteNumber(prevValue) && prevValue > 0 && beforeFactor > 0 && afterFactor > 0) {
        candidate = prevValue * Math.pow(afterFactor, year - prev);
      }
    } else if (Number.isInteger(next)) {
      const nextValue = anchorMap.get(next);
      if (isFiniteNumber(nextValue) && nextValue > 0 && beforeFactor > 0) {
        candidate = nextValue / Math.pow(beforeFactor, next - year);
      }
    }

    if (!isFiniteNumber(candidate) || candidate <= 0) return;
    valueSeries.set(year, candidate);
    sourceSeries.set(year, sourceLabel);
    filled += 1;
  });

  return filled;
}

function fillSeriesByAnchorsWithinRange(
  valueSeries,
  sourceSeries,
  anchorMap,
  sourceLabel,
  rangeStart,
  rangeEnd,
) {
  const sortedYears = [...anchorMap.keys()].sort((a, b) => a - b);
  if (sortedYears.length < 2) return 0;

  const firstYear = sortedYears[0];
  const secondYear = sortedYears[1];
  const lastYear = sortedYears[sortedYears.length - 1];
  const penultimateYear = sortedYears[sortedYears.length - 2];
  const firstValue = anchorMap.get(firstYear);
  const secondValue = anchorMap.get(secondYear);
  const lastValue = anchorMap.get(lastYear);
  const penultimateValue = anchorMap.get(penultimateYear);

  const rawBeforeFactor =
    isFiniteNumber(firstValue) &&
    isFiniteNumber(secondValue) &&
    firstValue > 0 &&
    secondValue > 0 &&
    secondYear > firstYear
      ? Math.pow(secondValue / firstValue, 1 / (secondYear - firstYear))
      : 1;
  const rawAfterFactor =
    isFiniteNumber(lastValue) &&
    isFiniteNumber(penultimateValue) &&
    lastValue > 0 &&
    penultimateValue > 0 &&
    lastYear > penultimateYear
      ? Math.pow(lastValue / penultimateValue, 1 / (lastYear - penultimateYear))
      : 1;

  const beforeFactor = Math.min(1.08, Math.max(0.94, rawBeforeFactor));
  const afterFactor = Math.min(1.12, Math.max(0.94, rawAfterFactor));

  let filled = 0;
  YEARS.forEach((year) => {
    if (year < rangeStart || year > rangeEnd) return;
    if (isFiniteNumber(valueSeries.get(year))) return;

    const { prev, next } = findAnchorBounds(sortedYears, year);
    let candidate = null;

    if (Number.isInteger(prev) && Number.isInteger(next)) {
      const prevValue = anchorMap.get(prev);
      const nextValue = anchorMap.get(next);
      if (isFiniteNumber(prevValue) && isFiniteNumber(nextValue) && prevValue > 0 && nextValue > 0) {
        const span = next - prev;
        const pos = year - prev;
        candidate = prevValue * Math.pow(nextValue / prevValue, pos / span);
      }
    } else if (Number.isInteger(prev)) {
      const prevValue = anchorMap.get(prev);
      if (isFiniteNumber(prevValue) && prevValue > 0 && afterFactor > 0) {
        candidate = prevValue * Math.pow(afterFactor, year - prev);
      }
    } else if (Number.isInteger(next)) {
      const nextValue = anchorMap.get(next);
      if (isFiniteNumber(nextValue) && nextValue > 0 && beforeFactor > 0) {
        candidate = nextValue / Math.pow(beforeFactor, next - year);
      }
    }

    if (!isFiniteNumber(candidate) || candidate <= 0) return;
    valueSeries.set(year, candidate);
    sourceSeries.set(year, sourceLabel);
    filled += 1;
  });

  return filled;
}

function parseOecdSdmxCsvSeries(csvText) {
  const rows = parseCsvRows(csvText);
  if (!Array.isArray(rows) || rows.length < 2) {
    return new Map();
  }

  const headerRowIndex = rows.findIndex((row) => {
    const normalized = row.map((cell) => String(cell || "").trim().toUpperCase());
    return (
      normalized.includes("OBS_VALUE") &&
      (normalized.includes("TIME_PERIOD") || normalized.includes("TIME"))
    );
  });
  if (headerRowIndex < 0) {
    return new Map();
  }

  const header = rows[headerRowIndex].map((cell) => String(cell || "").trim().toUpperCase());
  const timeIndex = header.findIndex((column) => column === "TIME_PERIOD" || column === "TIME");
  const valueIndex = header.findIndex((column) => column === "OBS_VALUE" || column === "VALUE");
  if (timeIndex < 0 || valueIndex < 0) {
    return new Map();
  }

  const series = new Map();
  for (let i = headerRowIndex + 1; i < rows.length; i += 1) {
    const row = rows[i];
    const year = Number(String(row[timeIndex] || "").slice(0, 4));
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) continue;

    const value = toNumberSafe(row[valueIndex]);
    if (!isFiniteNumber(value)) continue;
    series.set(year, value);
  }

  return series;
}

function getClosestNominalToPppRatio(countryCode, targetYear) {
  const nominalSeries = state.byMetric.nominal.get(countryCode) ?? new Map();
  const pppSeries = state.byMetric.ppp.get(countryCode) ?? new Map();

  const ratioAtYear = (year) => {
    const nominal = nominalSeries.get(year);
    const ppp = pppSeries.get(year);
    if (!isFiniteNumber(nominal) || !isFiniteNumber(ppp) || ppp <= 0) return null;
    const ratio = nominal / ppp;
    return isFiniteNumber(ratio) && ratio > 0 ? ratio : null;
  };

  const direct = ratioAtYear(targetYear);
  if (isFiniteNumber(direct)) return direct;

  let bestRatio = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  YEARS.forEach((year) => {
    const ratio = ratioAtYear(year);
    if (!isFiniteNumber(ratio)) return;
    const distance = Math.abs(year - targetYear);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestRatio = ratio;
    }
  });

  return isFiniteNumber(bestRatio) ? bestRatio : null;
}

function convertPppDisposableToUsd(countryCode, year, pppValue) {
  if (!isFiniteNumber(pppValue) || pppValue <= 0) return null;
  const ratio = getClosestNominalToPppRatio(countryCode, year);
  if (!isFiniteNumber(ratio) || ratio <= 0) return null;
  return pppValue * ratio;
}

async function loadOecdDisposableCountrySeries(countryCode) {
  const attemptErrors = [];

  for (const candidate of OECD_DISPOSABLE_SERIES_CANDIDATES) {
    const { transactionCode, unitCode, baseSourceLabel, pppUnit } = candidate;
    const sdmxUrl = buildOecdDisposableSdmxSeriesUrl(countryCode, transactionCode, unitCode);
    try {
      const csvText = await fetchTextCached(
        sdmxUrl,
        `OECD SDMX ${countryCode} ${transactionCode}.${unitCode}`,
      );
      const sdmxSeries = parseOecdSdmxCsvSeries(csvText);
      if (sdmxSeries.size >= 2) {
        return {
          series: sdmxSeries,
          sourceLabel: baseSourceLabel,
          pppUnit,
          warnings: [],
        };
      }
      attemptErrors.push(`${countryCode} ${transactionCode}.${unitCode} SDMX 返回空序列`);
    } catch (error) {
      attemptErrors.push(
        error?.message || `${countryCode} ${transactionCode}.${unitCode} SDMX 加载失败`,
      );
    }

    const dbNomicsUrl = buildOecdDisposableDbNomicsSeriesUrl(countryCode, transactionCode, unitCode);
    try {
      const payload = await fetchJsonCached(
        dbNomicsUrl,
        `OECD DBnomics ${countryCode} ${transactionCode}.${unitCode}`,
      );
      const dbNomicsSeries = parseDbNomicsSeries(payload);
      if (dbNomicsSeries.size >= 2) {
        return {
          series: dbNomicsSeries,
          sourceLabel: `${baseSourceLabel}（DBnomics）`,
          pppUnit,
          warnings: [],
        };
      }
      attemptErrors.push(`${countryCode} ${transactionCode}.${unitCode} DBnomics 返回空序列`);
    } catch (error) {
      attemptErrors.push(
        error?.message || `${countryCode} ${transactionCode}.${unitCode} DBnomics 加载失败`,
      );
    }
  }

  const compactError = attemptErrors.slice(0, 3).join(" | ");
  return {
    series: new Map(),
    sourceLabel: "",
    pppUnit: false,
    warnings: compactError ? [`${countryCode} OECD 可支配收入加载失败：${compactError}`] : [],
  };
}

async function loadChinaUsdCnyFxSeries() {
  const valueMap = new Map();
  const sourceMap = new Map();
  const warnings = [];

  try {
    const payload = await fetchJsonCached(
      buildWorldBankCountryIndicatorUrl("CHN", "PA.NUS.FCRF"),
      "中国汇率 World Bank",
    );
    const rows = Array.isArray(payload) ? payload[1] : null;
    if (!Array.isArray(rows)) {
      throw new Error("中国汇率 World Bank 返回格式异常");
    }

    rows.forEach((row) => {
      const year = Number(row?.date);
      if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
      const numeric = toNumberSafe(row?.value);
      if (!isFiniteNumber(numeric) || numeric <= 0) return;
      valueMap.set(year, numeric);
      sourceMap.set(year, SOURCE_LABELS.wbFxChn);
    });
  } catch (error) {
    warnings.push(error?.message || "中国汇率加载失败");
  }

  CHINA_FX_RATE_FALLBACK.forEach((value, year) => {
    if (valueMap.has(year)) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    valueMap.set(year, value);
    sourceMap.set(year, SOURCE_LABELS.chnFxFallback);
  });

  return { valueMap, sourceMap, warnings };
}

function loadTaiwanDisposableIncomeNtdSeries() {
  const valueMap = new Map();
  const sourceMap = new Map();

  TAIWAN_DGBAS_PER_CAPITA_DISPOSABLE_INCOME_NTD.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    valueMap.set(year, value);
    sourceMap.set(year, SOURCE_LABELS.twnDgbasPerCapitaOfficial);
  });

  return { valueMap, sourceMap, warnings: [] };
}

function loadTaiwanUsdTwdAnnualFxSeries() {
  const valueMap = new Map();
  const sourceMap = new Map();

  TAIWAN_CBC_USD_TWD_ANNUAL_RATE.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    valueMap.set(year, value);
    sourceMap.set(year, SOURCE_LABELS.twnFxCbc);
  });

  return { valueMap, sourceMap, warnings: [] };
}

function calcMissingSummary(metricKey) {
  const missing2025 = [];
  let missingAfter2021Count = 0;

  COUNTRIES.forEach((country) => {
    const series = state.byMetric[metricKey].get(country.code) ?? new Map();
    if (!isFiniteNumber(series.get(END_YEAR))) {
      missing2025.push(country.name);
    }
    for (let year = 2022; year <= END_YEAR; year += 1) {
      if (!isFiniteNumber(series.get(year))) {
        missingAfter2021Count += 1;
      }
    }
  });

  state.missing2025ByMetric[metricKey] = missing2025;
  return { missing2025, missingAfter2021Count };
}

function loadLocalStaticDataIntoState() {
  if (!LOCAL_STATIC_DATA || typeof LOCAL_STATIC_DATA !== "object") {
    return null;
  }

  const localMetrics = LOCAL_STATIC_DATA.metrics;
  if (!localMetrics || typeof localMetrics !== "object") {
    return null;
  }

  const metricKeys = Object.keys(METRICS);

  for (const metricKey of metricKeys) {
    const localMetricBlock = localMetrics[metricKey];
    if (!localMetricBlock || typeof localMetricBlock !== "object") {
      return null;
    }

    const valueMap = new Map();
    const sourceMap = new Map();

    COUNTRIES.forEach((country) => {
      const localCountryBlock = localMetricBlock[country.code] || {};
      const localValues = Array.isArray(localCountryBlock.values) ? localCountryBlock.values : [];
      const localSources = Array.isArray(localCountryBlock.sources) ? localCountryBlock.sources : [];

      const valueSeries = new Map();
      const sourceSeries = new Map();

      YEARS.forEach((year, index) => {
        const rawValue = localValues[index];
        const numericValue = isFiniteNumber(rawValue) ? rawValue : null;
        const source = typeof localSources[index] === "string" ? localSources[index] : "";
        valueSeries.set(year, numericValue);
        sourceSeries.set(year, source);
      });

      valueMap.set(country.code, valueSeries);
      sourceMap.set(country.code, sourceSeries);
    });

    state.byMetric[metricKey] = valueMap;
    state.sourceByMetric[metricKey] = sourceMap;
    calcMissingSummary(metricKey);
  }

  return {
    generatedAt: LOCAL_STATIC_DATA?.meta?.generatedAt || "",
    years: LOCAL_STATIC_DATA?.meta?.years || `${START_YEAR}-${END_YEAR}`,
  };
}

async function applyChinaNbsDisposableOverride() {
  const warnings = [];
  const disposableValues = state.byMetric.disposableIncome.get("CHN");
  const disposableSources = state.sourceByMetric.disposableIncome.get("CHN");
  if (!disposableValues || !disposableSources) {
    return {
      warnings: ["中国可支配收入覆盖失败：CHN 序列未初始化"],
      overriddenYears: 0,
      ...calcMissingSummary("disposableIncome"),
    };
  }

  const fxResult = await loadChinaUsdCnyFxSeries();
  warnings.push(...fxResult.warnings);

  const officialUsdMap = new Map();
  let overriddenYears = 0;
  const fxMissingYears = [];

  CHINA_NBS_NATIONAL_DISPOSABLE_INCOME_CNY.forEach((incomeCny, year) => {
    if (year < START_YEAR || year > END_YEAR) return;
    const fx = fxResult.valueMap.get(year);
    if (!isFiniteNumber(fx) || fx <= 0) {
      fxMissingYears.push(year);
      return;
    }

    const incomeUsd = incomeCny / fx;
    const incomeSource = SOURCE_LABELS.chnNbsNationalIncome;
    const fxSource = fxResult.sourceMap.get(year) || SOURCE_LABELS.wbFxChn;

    disposableValues.set(year, incomeUsd);
    disposableSources.set(year, `${incomeSource} + ${fxSource}`);
    officialUsdMap.set(year, incomeUsd);
    overriddenYears += 1;
  });

  if (officialUsdMap.size > 0) {
    YEARS.forEach((year) => {
      if (officialUsdMap.has(year)) return;
      disposableValues.set(year, null);
      disposableSources.set(year, "");
    });
    fillSeriesByAnchors(
      disposableValues,
      disposableSources,
      officialUsdMap,
      SOURCE_LABELS.chnDisposableInterpolated,
    );
  }

  if (fxMissingYears.length > 0) {
    warnings.push(
      `中国汇率缺失年份：${fxMissingYears.join(", ")}，这些年份未能按国家统计局口径覆盖。`,
    );
  }

  return { warnings, overriddenYears, ...calcMissingSummary("disposableIncome") };
}

function applyUsaBeaDisposableOverride() {
  const warnings = [];
  const disposableValues = state.byMetric.disposableIncome.get("USA");
  const disposableSources = state.sourceByMetric.disposableIncome.get("USA");
  if (!disposableValues || !disposableSources) {
    return {
      warnings: ["美国可支配收入覆盖失败：USA 序列未初始化"],
      overriddenYears: 0,
      ...calcMissingSummary("disposableIncome"),
    };
  }

  let overriddenYears = 0;
  YEARS.forEach((year) => {
    const value = USA_BEA_DISPOSABLE_INCOME_PER_CAPITA_USD.get(year);
    if (!isFiniteNumber(value) || value <= 0) {
      disposableValues.set(year, null);
      disposableSources.set(year, "");
      return;
    }

    const source =
      year === END_YEAR
        ? SOURCE_LABELS.usaBeaDisposable2025Provisional
        : SOURCE_LABELS.usaBeaDisposableAnnual;
    disposableValues.set(year, value);
    disposableSources.set(year, source);
    overriddenYears += 1;
  });

  return { warnings, overriddenYears, ...calcMissingSummary("disposableIncome") };
}

async function loadOecdDisposableIncomeSeriesMap() {
  const valueMap = new Map();
  const sourceMetaMap = new Map();
  const warnings = [];

  const tasks = OECD_DISPOSABLE_COUNTRY_CODES.map(async (countryCode) => {
    const result = await loadOecdDisposableCountrySeries(countryCode);
    return {
      countryCode,
      series: result.series,
      sourceLabel: result.sourceLabel,
      pppUnit: result.pppUnit,
      warnings: result.warnings,
    };
  });

  const settled = await Promise.allSettled(tasks);
  settled.forEach((result, index) => {
    const countryCode = OECD_DISPOSABLE_COUNTRY_CODES[index];
    if (result.status === "fulfilled") {
      valueMap.set(countryCode, result.value.series);
      sourceMetaMap.set(countryCode, {
        sourceLabel: result.value.sourceLabel,
        pppUnit: result.value.pppUnit,
      });
      warnings.push(...(result.value.warnings || []));
      return;
    }
    valueMap.set(countryCode, new Map());
    sourceMetaMap.set(countryCode, {
      sourceLabel: "",
      pppUnit: false,
    });
    warnings.push(result.reason?.message || `OECD 可支配收入 ${countryCode} 加载失败`);
  });

  return { valueMap, sourceMetaMap, warnings };
}

async function applyOecdDisposableOverride() {
  const { valueMap, sourceMetaMap, warnings } = await loadOecdDisposableIncomeSeriesMap();
  let overriddenCountries = 0;
  let officialPoints = 0;
  let bridgePoints = 0;

  OECD_DISPOSABLE_COUNTRY_CODES.forEach((countryCode) => {
    const oecdSeries = valueMap.get(countryCode) ?? new Map();
    if (oecdSeries.size === 0) return;

    const disposableValues = state.byMetric.disposableIncome.get(countryCode);
    const disposableSources = state.sourceByMetric.disposableIncome.get(countryCode);
    if (!disposableValues || !disposableSources) return;
    const sourceMeta = sourceMetaMap.get(countryCode) || { sourceLabel: "", pppUnit: false };
    const sourceLabel = sourceMeta.sourceLabel || SOURCE_LABELS.oecdDisposableGrossUsdPpp;
    const baselineValues = new Map();
    const baselineSources = new Map();
    YEARS.forEach((year) => {
      baselineValues.set(year, disposableValues.get(year));
      baselineSources.set(year, disposableSources.get(year) || "");
    });

    const officialMap = new Map();
    let hasAnyData = false;

    YEARS.forEach((year) => {
      const oecdValue = oecdSeries.get(year);
      if (isFiniteNumber(oecdValue)) {
        let normalizedValue = oecdValue;
        let normalizedSourceLabel = sourceLabel;

        if (sourceMeta.pppUnit) {
          const converted = convertPppDisposableToUsd(countryCode, year, oecdValue);
          if (isFiniteNumber(converted)) {
            normalizedValue = converted;
            normalizedSourceLabel = `${sourceLabel} -> ${SOURCE_LABELS.oecdDisposablePppToUsd}`;
          }
        }

        disposableValues.set(year, normalizedValue);
        disposableSources.set(year, normalizedSourceLabel);
        officialMap.set(year, normalizedValue);
        officialPoints += 1;
        hasAnyData = true;
      }
    });

    if (officialMap.size >= 2) {
      const officialYears = [...officialMap.keys()].sort((a, b) => a - b);
      const firstOfficialYear = officialYears[0];
      const lastOfficialYear = officialYears[officialYears.length - 1];

      YEARS.forEach((year) => {
        if (officialMap.has(year)) return;

        if (year < firstOfficialYear || year > lastOfficialYear) {
          const baselineValue = baselineValues.get(year);
          const baselineSource = baselineSources.get(year) || "";
          if (isFiniteNumber(baselineValue)) {
            disposableValues.set(year, baselineValue);
            disposableSources.set(year, baselineSource);
          } else {
            disposableValues.set(year, null);
            disposableSources.set(year, "");
          }
          return;
        }

        disposableValues.set(year, null);
        disposableSources.set(year, "");
      });

      bridgePoints += fillSeriesByAnchorsWithinRange(
        disposableValues,
        disposableSources,
        officialMap,
        SOURCE_LABELS.oecdDisposableBridge,
        firstOfficialYear,
        lastOfficialYear,
      );
    } else if (officialMap.size === 1) {
      warnings.push(`${countryCode} OECD 可支配收入仅1个锚点，保留原序列未重建。`);
    }

    if (hasAnyData) {
      overriddenCountries += 1;
    }
  });

  return {
    warnings,
    overriddenCountries,
    officialPoints,
    bridgePoints,
    ...calcMissingSummary("disposableIncome"),
  };
}

function applyOecdDisposableUsdExchOfficialOverrides() {
  const warnings = [];
  let overriddenPoints = 0;
  let scaled2025Points = 0;

  Object.entries(OECD_DISPOSABLE_USD_EXCH_OFFICIAL_OVERRIDES).forEach(([countryCode, valueMap]) => {
    const disposableValues = state.byMetric.disposableIncome.get(countryCode);
    const disposableSources = state.sourceByMetric.disposableIncome.get(countryCode);
    if (!disposableValues || !disposableSources) return;

    valueMap.forEach((value, year) => {
      if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
      if (!isFiniteNumber(value) || value <= 0) return;
      disposableValues.set(year, value);
      disposableSources.set(year, SOURCE_LABELS.oecdDisposableGrossUsdExchOfficialTable);
      overriddenPoints += 1;
    });

    if (END_YEAR !== 2025) return;
    const anchor2024 = valueMap.get(2024);
    const nominalSeries = state.byMetric.nominal.get(countryCode) ?? new Map();
    const nominal2024 = nominalSeries.get(2024);
    const nominal2025 = nominalSeries.get(2025);
    if (
      !isFiniteNumber(anchor2024) ||
      !isFiniteNumber(nominal2024) ||
      !isFiniteNumber(nominal2025) ||
      nominal2024 <= 0 ||
      nominal2025 <= 0
    ) {
      warnings.push(`${countryCode} 2025 可支配收入同比折算失败：缺少2024锚点或名义人均GDP。`);
      return;
    }

    const scaled2025 = anchor2024 * (nominal2025 / nominal2024);
    if (!isFiniteNumber(scaled2025) || scaled2025 <= 0) {
      warnings.push(`${countryCode} 2025 可支配收入同比折算失败：结果无效。`);
      return;
    }
    disposableValues.set(2025, scaled2025);
    disposableSources.set(2025, SOURCE_LABELS.oecdDisposableUsdExchImfScaled2025);
    scaled2025Points += 1;
  });

  return { warnings, overriddenPoints, scaled2025Points, ...calcMissingSummary("disposableIncome") };
}

function applyNzlDisposableOfficialB6PppOverride() {
  const warnings = [];
  let overriddenPoints = 0;

  const countryCode = "NZL";
  const disposableValues = state.byMetric.disposableIncome.get(countryCode);
  const disposableSources = state.sourceByMetric.disposableIncome.get(countryCode);
  if (!disposableValues || !disposableSources) {
    return { warnings, overriddenPoints, ...calcMissingSummary("disposableIncome") };
  }

  const oecdAnchor1998 = NZL_OECD_B6GS1M_POP_USD_PPP_OFFICIAL.get(1998);
  const wbAnchor1998 = NZL_WB_ADJ_NNTY_PC_CD_ANNUAL.get(1998);
  if (
    isFiniteNumber(oecdAnchor1998) &&
    oecdAnchor1998 > 0 &&
    isFiniteNumber(wbAnchor1998) &&
    wbAnchor1998 > 0
  ) {
    const bridgeFactor = oecdAnchor1998 / wbAnchor1998;
    for (let year = START_YEAR; year < 1998; year += 1) {
      const wbValue = NZL_WB_ADJ_NNTY_PC_CD_ANNUAL.get(year);
      if (!isFiniteNumber(wbValue) || wbValue <= 0) continue;
      disposableValues.set(year, wbValue * bridgeFactor);
      disposableSources.set(year, SOURCE_LABELS.nzlDisposableWbBridgedPre1998);
      overriddenPoints += 1;
    }
  } else {
    warnings.push("NZL 1980-1997 可支配收入重建失败：缺少1998锚点。");
  }

  NZL_OECD_B6GS1M_POP_USD_PPP_OFFICIAL.forEach((pppValue, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(pppValue) || pppValue <= 0) return;
    disposableValues.set(year, pppValue);
    disposableSources.set(year, SOURCE_LABELS.oecdDisposableGrossUsdPppOfficialTable);
    overriddenPoints += 1;
  });

  if (END_YEAR >= 2023) {
    const anchorYear = 2022;
    const anchorValue = disposableValues.get(anchorYear);
    const pppSeries = state.byMetric.ppp.get(countryCode) ?? new Map();
    const pppAnchor = pppSeries.get(anchorYear);
    if (!isFiniteNumber(anchorValue) || !isFiniteNumber(pppAnchor) || pppAnchor <= 0) {
      warnings.push("NZL 2023-2025 可支配收入补值失败：缺少2022锚点或PPP人均GDP。");
    } else {
      for (let year = 2023; year <= END_YEAR; year += 1) {
        const pppCurrent = pppSeries.get(year);
        if (!isFiniteNumber(pppCurrent) || pppCurrent <= 0) {
          warnings.push(`NZL ${year} 可支配收入补值失败：缺少PPP人均GDP。`);
          continue;
        }
        const scaled = anchorValue * (pppCurrent / pppAnchor);
        if (!isFiniteNumber(scaled) || scaled <= 0) {
          warnings.push(`NZL ${year} 可支配收入补值失败：结果无效。`);
          continue;
        }
        disposableValues.set(year, scaled);
        disposableSources.set(year, `${SOURCE_LABELS.oecdDisposablePppImfScaledPost2022}（${year}）`);
      }
    }
  }

  return { warnings, overriddenPoints, ...calcMissingSummary("disposableIncome") };
}

async function applyTaiwanGdpOverrides() {
  const warnings = [];
  const metricConfigs = [
    {
      metricKey: "nominal",
      sourceLabel: SOURCE_LABELS.twnNominalDataMapper,
    },
    {
      metricKey: "ppp",
      sourceLabel: SOURCE_LABELS.twnPppDataMapper,
    },
  ];

  const overriddenCounts = {
    nominal: 0,
    ppp: 0,
  };

  for (const config of metricConfigs) {
    const { metricKey, sourceLabel } = config;
    try {
      const dataMapperMap = await loadImfDataMapperMetric(metricKey);
      const twnSeries = dataMapperMap.get("TWN") ?? new Map();
      const valueSeries = state.byMetric[metricKey].get("TWN");
      const sourceSeries = state.sourceByMetric[metricKey].get("TWN");
      if (!valueSeries || !sourceSeries) {
        warnings.push(`台湾 ${metricKey} 覆盖失败：序列未初始化`);
        continue;
      }

      YEARS.forEach((year) => {
        const value = twnSeries.get(year);
        if (!isFiniteNumber(value)) return;
        valueSeries.set(year, value);
        sourceSeries.set(year, sourceLabel);
        overriddenCounts[metricKey] += 1;
      });
    } catch (error) {
      warnings.push(error?.message || `台湾 ${metricKey} DataMapper 覆盖失败`);
    }
  }

  const nominalSeries = state.byMetric.nominal.get("TWN");
  const nominalSourceSeries = state.sourceByMetric.nominal.get("TWN");
  if (nominalSeries && nominalSourceSeries) {
    TAIWAN_IMF_PER_CAPITA_GDP_USD_RECENT.forEach((value, year) => {
      if (!isFiniteNumber(value) || year < START_YEAR || year > END_YEAR) return;
      nominalSeries.set(year, value);
      nominalSourceSeries.set(year, SOURCE_LABELS.twnNominalImfVerified);
    });
  } else {
    warnings.push("台湾 nominal 覆盖失败：TWN 序列未初始化");
  }

  const nominalSeriesSummary = state.byMetric.nominal.get("TWN") ?? new Map();
  const pppSeries = state.byMetric.ppp.get("TWN") ?? new Map();
  state.missing2025ByMetric.nominal = state.missing2025ByMetric.nominal.filter(
    (name) => name !== "台湾地区" || !isFiniteNumber(nominalSeriesSummary.get(END_YEAR)),
  );
  state.missing2025ByMetric.ppp = state.missing2025ByMetric.ppp.filter(
    (name) => name !== "台湾地区" || !isFiniteNumber(pppSeries.get(END_YEAR)),
  );

  return { warnings, overriddenCounts };
}

async function applyTaiwanDgbasDisposableOverride() {
  const warnings = [];
  const disposableValues = state.byMetric.disposableIncome.get("TWN");
  const disposableSources = state.sourceByMetric.disposableIncome.get("TWN");
  if (!disposableValues || !disposableSources) {
    return {
      warnings: ["台湾可支配收入覆盖失败：TWN 序列未初始化"],
      overriddenYears: 0,
      ...calcMissingSummary("disposableIncome"),
    };
  }

  const [incomeResult, fxResult] = await Promise.all([
    loadTaiwanDisposableIncomeNtdSeries(),
    loadTaiwanUsdTwdAnnualFxSeries(),
  ]);
  warnings.push(...incomeResult.warnings, ...fxResult.warnings);

  const officialYears = new Set();
  const fxMissingYears = [];
  const officialUsdMap = new Map();

  incomeResult.valueMap.forEach((incomeNtd, year) => {
    if (year < START_YEAR || year > END_YEAR) return;
    const fx = fxResult.valueMap.get(year);
    if (!isFiniteNumber(fx) || fx <= 0) {
      fxMissingYears.push(year);
      return;
    }

    const incomeUsd = incomeNtd / fx;
    const incomeSource = incomeResult.sourceMap.get(year) || SOURCE_LABELS.twnDgbasPerCapitaOfficial;
    const fxSource = fxResult.sourceMap.get(year) || SOURCE_LABELS.twnFxCbc;
    disposableValues.set(year, incomeUsd);
    disposableSources.set(year, `${incomeSource} + ${fxSource}`);
    officialUsdMap.set(year, incomeUsd);
    officialYears.add(year);
  });

  if (officialYears.size > 0) {
    YEARS.forEach((year) => {
      if (officialYears.has(year)) return;
      disposableValues.set(year, null);
      disposableSources.set(year, "");
    });
  } else {
    warnings.push("台湾可支配收入覆盖失败：未获取到主计总处年值。");
  }

  if (fxMissingYears.length > 0) {
    warnings.push(`台湾汇率缺失年份：${fxMissingYears.join(", ")}，这些年份未能换算为美元。`);
  }

  return {
    warnings,
    overriddenYears: officialYears.size,
    dataMapperFilledYears: 0,
    fallbackFilledYears: 0,
    ...calcMissingSummary("disposableIncome"),
  };
}

function applyDisposableAnchorInterpolation(
  countryCodes = COUNTRIES.map((country) => country.code).filter((code) => code !== "TWN"),
) {
  let filledPoints = 0;

  countryCodes.forEach((countryCode) => {
    const disposableValues = state.byMetric.disposableIncome.get(countryCode);
    const disposableSources = state.sourceByMetric.disposableIncome.get(countryCode);
    if (!disposableValues || !disposableSources) return;

    const anchorMap = new Map();
    YEARS.forEach((year) => {
      const value = disposableValues.get(year);
      if (isFiniteNumber(value) && value > 0) {
        anchorMap.set(year, value);
      }
    });

    if (anchorMap.size === 0) return;
    filledPoints += fillSeriesByAnchors(
      disposableValues,
      disposableSources,
      anchorMap,
      SOURCE_LABELS.disposableAnchorInterpolated,
    );
  });

  return { filledPoints, ...calcMissingSummary("disposableIncome") };
}

function applyRussiaDisposableCalibration() {
  const warnings = [];
  const code = "RUS";
  const valueSeries = state.byMetric.disposableIncome.get(code);
  const sourceSeries = state.sourceByMetric.disposableIncome.get(code);
  const nominalSeries = state.byMetric.nominal.get(code);
  if (!valueSeries || !sourceSeries || !nominalSeries) {
    return { warnings, adjustedPoints: 0, ...calcMissingSummary("disposableIncome") };
  }

  const wbAnchorYears = YEARS.filter((year) => {
    const value = valueSeries.get(year);
    const nominal = nominalSeries.get(year);
    const source = sourceSeries.get(year) ?? "";
    if (!isFiniteNumber(value) || !isFiniteNumber(nominal) || nominal <= 0) return false;
    return (
      source.includes(SOURCE_LABELS.wbAdjDisposable) ||
      source.includes(SOURCE_LABELS.wbGniFallback)
    );
  });

  if (wbAnchorYears.length === 0) {
    return { warnings, adjustedPoints: 0, ...calcMissingSummary("disposableIncome") };
  }

  const sortedAnchorYears = [...wbAnchorYears].sort((a, b) => a - b);
  const firstAnchorYear = sortedAnchorYears[0];
  const ratioSamples = sortedAnchorYears
    .slice(0, 12)
    .map((year) => {
      const value = valueSeries.get(year);
      const nominal = nominalSeries.get(year);
      return isFiniteNumber(value) && isFiniteNumber(nominal) && nominal > 0 ? value / nominal : null;
    })
    .filter((ratio) => isFiniteNumber(ratio) && ratio > 0 && ratio < 1.1);

  const referenceRatio = isFiniteNumber(median(ratioSamples))
    ? Math.max(0.2, Math.min(0.48, median(ratioSamples)))
    : 0.34;
  const capRatio = Math.max(0.3, Math.min(0.55, referenceRatio * 1.2));

  let adjustedPoints = 0;
  YEARS.forEach((year) => {
    const nominal = nominalSeries.get(year);
    if (!isFiniteNumber(nominal) || nominal <= 0) return;

    const current = valueSeries.get(year);
    if (!isFiniteNumber(current)) return;

    if (year < firstAnchorYear) {
      const calibrated = nominal * referenceRatio;
      valueSeries.set(year, calibrated);
      sourceSeries.set(year, SOURCE_LABELS.rusDisposableCalibrated);
      adjustedPoints += 1;
      return;
    }

    const maxAllowed = nominal * capRatio;
    if (current > maxAllowed) {
      valueSeries.set(year, maxAllowed);
      sourceSeries.set(year, SOURCE_LABELS.rusDisposableCalibrated);
      adjustedPoints += 1;
    }
  });

  if (adjustedPoints > 0) {
    warnings.push(`俄罗斯可支配收入已校准 ${adjustedPoints} 个年份，修正异常高值。`);
  }

  return { warnings, adjustedPoints, ...calcMissingSummary("disposableIncome") };
}

function applyDisposableRatioGuard() {
  const warnings = [];
  let adjustedPoints = 0;

  Object.entries(DISPOSABLE_RATIO_CAP_BY_COUNTRY).forEach(([countryCode, maxRatio]) => {
    const disposableSeries = state.byMetric.disposableIncome.get(countryCode);
    const disposableSourceSeries = state.sourceByMetric.disposableIncome.get(countryCode);
    const nominalSeries = state.byMetric.nominal.get(countryCode);
    if (!disposableSeries || !disposableSourceSeries || !nominalSeries) return;

    YEARS.forEach((year) => {
      const disposable = disposableSeries.get(year);
      const nominal = nominalSeries.get(year);
      const source = disposableSourceSeries.get(year) || "";
      if (!isFiniteNumber(disposable) || !isFiniteNumber(nominal) || nominal <= 0) return;
      if (source.includes("OECD")) return;

      const ceiling = nominal * maxRatio;
      if (disposable > ceiling) {
        disposableSeries.set(year, ceiling);
        disposableSourceSeries.set(year, SOURCE_LABELS.disposableRatioGuard);
        adjustedPoints += 1;
      }
    });
  });

  if (adjustedPoints > 0) {
    warnings.push(`可支配收入异常高值保护已修正 ${adjustedPoints} 个年份。`);
  }

  return { warnings, adjustedPoints, ...calcMissingSummary("disposableIncome") };
}

function applyJapanDisposableRecentYearCorrection() {
  const warnings = [];
  const valueSeries = state.byMetric.disposableIncome.get("JPN");
  const sourceSeries = state.sourceByMetric.disposableIncome.get("JPN");
  if (!valueSeries || !sourceSeries) {
    return { warnings, clearedYears: 0, ...calcMissingSummary("disposableIncome") };
  }

  const targetYears = [2024, 2025].filter((year) => year >= START_YEAR && year <= END_YEAR);
  let clearedYears = 0;

  targetYears.forEach((year) => {
    const source = sourceSeries.get(year) || "";
    const value = valueSeries.get(year);
    if (!isFiniteNumber(value)) return;
    if (source.includes("OECD")) return;

    valueSeries.set(year, null);
    sourceSeries.set(year, "");
    clearedYears += 1;
  });

  if (clearedYears > 0) {
    warnings.push(`日本可支配收入已移除 ${clearedYears} 个非 OECD 同口径补值点（2024-2025）。`);
  }

  return { warnings, clearedYears, ...calcMissingSummary("disposableIncome") };
}

async function loadMaddisonPppFallback() {
  let lastError = null;

  for (const url of MADDISON_CSV_URLS) {
    try {
      const text = await fetchTextCached(url, "Maddison 数据");
      const rows = parseCsvRows(text);
      if (rows.length < 2) {
        lastError = new Error("Maddison 数据为空");
        continue;
      }

      const header = rows[0];
      const codeIndex = header.findIndex((h) => h === "Code");
      const yearIndex = header.findIndex((h) => h === "Year");
      const valueIndex = header.findIndex((h) => h !== "Entity" && h !== "Code" && h !== "Year");
      if (codeIndex < 0 || yearIndex < 0 || valueIndex < 0) {
        lastError = new Error("Maddison 数据列格式异常");
        continue;
      }

      const map = emptyCountryMap();
      for (let i = 1; i < rows.length; i += 1) {
        const row = rows[i];
        const code = row[codeIndex];
        if (!map.has(code)) continue;

        const year = Number(row[yearIndex]);
        if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) continue;

        const value = toNumberSafe(row[valueIndex]);
        map.get(code).set(year, value);
      }

      return map;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Maddison 数据加载失败");
}

async function fetchImfCountrySeries(metricKey, country) {
  const payload = await fetchJsonCached(buildImfSeriesUrl(metricKey, country.code), `${country.name} IMF`);
  return parseDbNomicsSeries(payload);
}

async function loadImfMetric(metricKey) {
  const metric = METRICS[metricKey];
  if (!metric?.imfIndicator || !metric?.imfUnit) {
    return { valueMap: emptyCountryMap(), warnings: [] };
  }
  const cacheKey = `${metric.imfIndicator}.${metric.imfUnit}`;
  if (imfMetricCache.has(cacheKey)) {
    return imfMetricCache.get(cacheKey);
  }

  const loader = (async () => {
    const tasks = COUNTRIES.map((country) => fetchImfCountrySeries(metricKey, country));
    const settled = await Promise.allSettled(tasks);

    const valueMap = emptyCountryMap();
    const warnings = [];

    settled.forEach((result, index) => {
      const country = COUNTRIES[index];
      if (result.status === "fulfilled") {
        valueMap.set(country.code, result.value);
        return;
      }
      warnings.push(result.reason?.message || `${country.name} IMF 数据加载失败`);
      valueMap.set(country.code, new Map());
    });

    return { valueMap, warnings };
  })();

  imfMetricCache.set(cacheKey, loader);
  try {
    return await loader;
  } catch (error) {
    imfMetricCache.delete(cacheKey);
    throw error;
  }
}

async function loadImfDataMapperMetric(metricKey) {
  const payload = await fetchJsonCached(buildImfDataMapperUrl(metricKey), "IMF DataMapper");
  const indicator = METRICS[metricKey].imfIndicator;
  const indicatorBlock = payload?.values?.[indicator];
  if (!indicatorBlock || typeof indicatorBlock !== "object") {
    throw new Error("IMF DataMapper 返回格式异常");
  }

  const valueMap = emptyCountryMap();
  COUNTRIES.forEach((country) => {
    const series = indicatorBlock[country.code];
    valueMap.set(country.code, parseDataMapperSeries(series, payload));
  });

  return valueMap;
}

async function loadWorldBankMetric(metricKey) {
  const metric = METRICS[metricKey];
  const indicatorDefs = Array.isArray(metric.wbIndicators) ? metric.wbIndicators : [];
  const normalizedIndicatorDefs =
    indicatorDefs.length > 0
      ? indicatorDefs
      : [{ indicator: metric.wbIndicator, sourceLabel: SOURCE_LABELS.worldBank }];

  const valueMap = new Map(WORLD_BANK_CODES.map((code) => [code, new Map()]));
  const sourceMap = new Map(WORLD_BANK_CODES.map((code) => [code, new Map()]));
  const rawIndicatorMaps = new Map();
  const warnings = [];

  const tasks = normalizedIndicatorDefs
    .map((indicatorDef) => ({
      indicatorCode: indicatorDef?.indicator,
      sourceLabel: indicatorDef?.sourceLabel,
    }))
    .filter((item) => Boolean(item.indicatorCode))
    .map(async (item) => {
      const payload = await fetchJsonCached(
        buildWorldBankUrl(item.indicatorCode),
        `World Bank ${item.indicatorCode}`,
      );
      const rows = Array.isArray(payload) ? payload[1] : null;
      if (!Array.isArray(rows)) {
        throw new Error(`数据格式异常：World Bank ${item.indicatorCode} 返回缺少数据数组`);
      }

      const indicatorValueMap = new Map(WORLD_BANK_CODES.map((code) => [code, new Map()]));
      rows.forEach((row) => {
        const code = row?.countryiso3code;
        const year = Number(row?.date);
        if (!indicatorValueMap.has(code)) return;
        if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
        const numeric = toNumberSafe(row?.value);
        if (!isFiniteNumber(numeric)) return;
        indicatorValueMap.get(code).set(year, numeric);
      });

      return {
        indicatorCode: item.indicatorCode,
        sourceLabel: item.sourceLabel || `World Bank ${item.indicatorCode}`,
        indicatorValueMap,
      };
    });

  const settled = await Promise.allSettled(tasks);
  const indicatorDataByCode = new Map();
  settled.forEach((result) => {
    if (result.status === "fulfilled") {
      indicatorDataByCode.set(result.value.indicatorCode, result.value);
      return;
    }
    warnings.push(result.reason?.message || "World Bank 指标加载失败");
  });

  normalizedIndicatorDefs.forEach((indicatorDef) => {
    const indicatorCode = indicatorDef?.indicator;
    if (!indicatorCode) return;
    const indicatorData = indicatorDataByCode.get(indicatorCode);
    if (!indicatorData) return;

    const indicatorValueMap = indicatorData.indicatorValueMap;
    rawIndicatorMaps.set(indicatorCode, indicatorValueMap);

    WORLD_BANK_CODES.forEach((code) => {
      const yearSeries = indicatorValueMap.get(code);
      if (!yearSeries) return;

      yearSeries.forEach((numeric, year) => {
        const countryValueSeries = valueMap.get(code);
        const current = countryValueSeries.get(year);
        if (isFiniteNumber(current)) return;
        countryValueSeries.set(year, numeric);
        sourceMap.get(code).set(year, indicatorData.sourceLabel);
      });
    });
  });

  return { valueMap, sourceMap, rawIndicatorMaps, warnings };
}

function mergeMetricData(metricKey, worldBankData, imfMap) {
  const wbValueMap = worldBankData?.valueMap ?? new Map();
  const wbSourceMap = worldBankData?.sourceMap ?? new Map();
  const wbRawIndicatorMaps = worldBankData?.rawIndicatorMaps ?? new Map();
  const mergedValues = new Map();
  const mergedSources = new Map();
  const missing2025 = [];
  let imfFallbackCount = 0;
  let missingAfter2021Count = 0;
  const imfScale =
    Number.isFinite(METRICS[metricKey]?.imfScale) && METRICS[metricKey].imfScale > 0
      ? METRICS[metricKey].imfScale
      : 1;
  const imfSourceLabel = METRICS[metricKey]?.imfSourceLabel || SOURCE_LABELS.imf;
  const isDisposableMetric = metricKey === "disposableIncome";
  const disposablePrimaryMap = wbRawIndicatorMaps.get("NY.ADJ.NNTY.PC.CD");
  const disposableGniMap = wbRawIndicatorMaps.get("NY.GNP.PCAP.CD");

  COUNTRIES.forEach((country) => {
    const code = country.code;
    const wbSeries = wbValueMap.get(code) ?? new Map();
    const wbSourceSeries = wbSourceMap.get(code) ?? new Map();
    const imfSeries = imfMap.get(code) ?? new Map();
    const wbDisposableSeries =
      (disposablePrimaryMap && disposablePrimaryMap.get(code)) || new Map();
    const wbGniSeries = (disposableGniMap && disposableGniMap.get(code)) || new Map();
    const valueSeries = new Map();
    const sourceSeries = new Map();
    const gniBridgeFactor = isDisposableMetric
      ? computeBridgeFactor(wbDisposableSeries, wbGniSeries)
      : null;

    YEARS.forEach((year) => {
      if (isDisposableMetric) {
        const wbDisposableValue = wbDisposableSeries.get(year);
        if (isFiniteNumber(wbDisposableValue)) {
          valueSeries.set(year, wbDisposableValue);
          sourceSeries.set(year, SOURCE_LABELS.wbAdjDisposable);
          return;
        }

        const wbGniValue = wbGniSeries.get(year);
        if (isFiniteNumber(wbGniValue)) {
          const scaledGni =
            isFiniteNumber(gniBridgeFactor) && gniBridgeFactor > 0
              ? wbGniValue * gniBridgeFactor
              : wbGniValue;
          valueSeries.set(year, scaledGni);
          sourceSeries.set(year, SOURCE_LABELS.wbGniFallback);
          return;
        }

        valueSeries.set(year, null);
        sourceSeries.set(year, "");
        if (year >= 2022) {
          missingAfter2021Count += 1;
        }
        return;
      }

      const wbValue = wbSeries.get(year);
      const imfValue = imfSeries.get(year);

      if (isFiniteNumber(wbValue)) {
        valueSeries.set(year, wbValue);
        sourceSeries.set(year, wbSourceSeries.get(year) || SOURCE_LABELS.worldBank);
        return;
      }

      if (isFiniteNumber(imfValue)) {
        valueSeries.set(year, imfValue * imfScale);
        sourceSeries.set(year, imfSourceLabel);
        imfFallbackCount += 1;
        return;
      }

      valueSeries.set(year, null);
      sourceSeries.set(year, "");
      if (year >= 2022) {
        missingAfter2021Count += 1;
      }
    });

    if (!isFiniteNumber(valueSeries.get(END_YEAR))) {
      missing2025.push(country.name);
    }

    mergedValues.set(code, valueSeries);
    mergedSources.set(code, sourceSeries);
  });

  state.byMetric[metricKey] = mergedValues;
  state.sourceByMetric[metricKey] = mergedSources;
  state.missing2025ByMetric[metricKey] = missing2025;

  return { missing2025, imfFallbackCount, missingAfter2021Count };
}

function countPppMissingBefore1990() {
  let missingCount = 0;
  COUNTRIES.forEach((country) => {
    const valueSeries = state.byMetric.ppp.get(country.code) ?? new Map();
    for (let year = START_YEAR; year < 1990; year += 1) {
      if (!isFiniteNumber(valueSeries.get(year))) {
        missingCount += 1;
      }
    }
  });
  return missingCount;
}

function backfillPppBefore1990FromSource(sourceMap, sourceLabel) {
  let filledCount = 0;
  COUNTRIES.forEach((country) => {
    const valueSeries = state.byMetric.ppp.get(country.code);
    const sourceSeries = state.sourceByMetric.ppp.get(country.code);
    const fallbackSeries = sourceMap?.get(country.code) ?? new Map();
    if (!valueSeries || !sourceSeries) return;

    for (let year = START_YEAR; year < 1990; year += 1) {
      if (isFiniteNumber(valueSeries.get(year))) continue;
      const fallbackValue = fallbackSeries.get(year);
      if (!isFiniteNumber(fallbackValue)) continue;
      valueSeries.set(year, fallbackValue);
      sourceSeries.set(year, sourceLabel);
      filledCount += 1;
    }
  });
  return filledCount;
}

async function loadMetric(metricKey) {
  const warnings = [];

  const [imfResult, worldBankResult] = await Promise.allSettled([
    loadImfMetric(metricKey),
    loadWorldBankMetric(metricKey),
  ]);

  let imfValueMap = emptyCountryMap();
  if (imfResult.status === "fulfilled") {
    imfValueMap = imfResult.value.valueMap;
    warnings.push(...imfResult.value.warnings);
  } else {
    warnings.push(imfResult.reason?.message || `${METRICS[metricKey].label} 的 IMF 数据加载失败`);
  }

  let worldBankData = {
    valueMap: new Map(WORLD_BANK_CODES.map((code) => [code, new Map()])),
    sourceMap: new Map(WORLD_BANK_CODES.map((code) => [code, new Map()])),
    warnings: [],
  };
  if (worldBankResult.status === "fulfilled") {
    worldBankData = worldBankResult.value;
  } else {
    warnings.push(
      worldBankResult.reason?.message || `${METRICS[metricKey].label} 的 World Bank 数据加载失败`,
    );
  }
  warnings.push(...(worldBankData.warnings || []));

  const mergeSummary = mergeMetricData(metricKey, worldBankData, imfValueMap);
  let dataMapperBackfillCount = 0;
  let maddisonBackfillCount = 0;

  if (metricKey === "ppp") {
    let missingPre1990 = countPppMissingBefore1990();
    if (missingPre1990 > 0) {
      try {
        const dataMapperMap = await loadImfDataMapperMetric(metricKey);
        dataMapperBackfillCount = backfillPppBefore1990FromSource(
          dataMapperMap,
          SOURCE_LABELS.imfDataMapper,
        );
      } catch (error) {
        warnings.push(error?.message || "IMF DataMapper 补查失败");
      }
    }

    missingPre1990 = countPppMissingBefore1990();
    if (missingPre1990 > 0) {
      try {
        const maddisonMap = await loadMaddisonPppFallback();
        maddisonBackfillCount = backfillPppBefore1990FromSource(
          maddisonMap,
          SOURCE_LABELS.maddison,
        );
      } catch (error) {
        warnings.push(error?.message || "Maddison PPP 数据补查失败");
      }
    }
  }

  const currentMissingSummary = calcMissingSummary(metricKey);
  return {
    warnings,
    ...mergeSummary,
    ...currentMissingSummary,
    dataMapperBackfillCount,
    maddisonBackfillCount,
  };
}

function datasetsFor(metricKey, rangeYears = YEARS) {
  if (state.chartMode === "bar") {
    const visibleCodes = getVisibleCountryCodes();
    if (visibleCodes.length !== 1) {
      return [];
    }

    const countryCode = visibleCodes[0];
    const country = COUNTRIES.find((item) => item.code === countryCode);
    const valueSeries = state.byMetric[metricKey].get(countryCode) ?? new Map();
    const sourceSeries = state.sourceByMetric[metricKey].get(countryCode) ?? new Map();
    const color = country?.color || "#0b4f8a";

    return [
      {
        type: "bar",
        label: country?.name || countryCode,
        countryCode,
        data: rangeYears.map((year) => valueSeries.get(year) ?? null),
        sourceByYear: rangeYears.map((year) => sourceSeries.get(year) ?? ""),
        borderColor: color,
        backgroundColor: withAlpha(color, 0.64),
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.82,
        categoryPercentage: 0.88,
      },
    ];
  }

  return COUNTRIES.map((country) => {
    const valueSeries = state.byMetric[metricKey].get(country.code) ?? new Map();
    const sourceSeries = state.sourceByMetric[metricKey].get(country.code) ?? new Map();

    return {
      label: country.name,
      countryCode: country.code,
      data: rangeYears.map((year) => valueSeries.get(year) ?? null),
      sourceByYear: rangeYears.map((year) => sourceSeries.get(year) ?? ""),
      borderColor: country.color,
      backgroundColor: country.color,
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 5,
      pointHitRadius: 10,
      tension: 0.2,
      spanGaps: false,
      hidden: !state.visibleCountries.has(country.code),
    };
  });
}

function buildChart() {
  const rangeYears = getRangeYears();
  state.chart = new Chart(chartEl, {
    plugins: [sliderPositionPlugin, lineEndLabelsPlugin],
    type: "line",
    data: {
      labels: rangeYears,
      datasets: datasetsFor(state.metric, rangeYears),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: 72,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "年份",
          },
          ticks: {
            autoSkip: false,
            callback(value, index) {
              const label = this.getLabelForValue(value);
              return index % 5 === 0 ? label : "";
            },
          },
          grid: {
            color: "rgba(5, 30, 54, 0.08)",
          },
        },
        y: {
          title: {
            display: true,
            text: METRICS[state.metric].axisLabel,
          },
          ticks: {
            callback(value) {
              return `$${compactFormatter.format(Number(value))}`;
            },
          },
          grid: {
            color: "rgba(5, 30, 54, 0.08)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title(context) {
              return `年份：${context[0].label}`;
            },
            label(context) {
              const sourceByYear = context.dataset.sourceByYear;
              const source =
                Array.isArray(sourceByYear) && sourceByYear[context.dataIndex]
                  ? sourceByYear[context.dataIndex]
                  : "";
              const sourceText = source ? `（来源：${source}）` : "";
              return `${context.dataset.label}：${formatValue(context.parsed.y)}${sourceText}`;
            },
          },
        },
      },
    },
  });
}

function refreshChartData() {
  if (!state.chart) return;
  const rangeYears = getRangeYears();
  state.chart.data.labels = rangeYears;
  state.chart.data.datasets = datasetsFor(state.metric, rangeYears);
  state.chart.options.scales.x.offset = state.chartMode === "bar";
  state.chart.options.scales.x.bounds = state.chartMode === "bar" ? "ticks" : "data";
  state.chart.options.scales.x.grid.offset = state.chartMode === "bar";
  state.chart.options.interaction.mode = state.chartMode === "bar" ? "nearest" : "index";
  state.chart.options.interaction.intersect = state.chartMode === "bar";
  state.chart.update();
}

function applyYearRange(startYear, endYear, options = {}) {
  const { fromSlider = false } = options;
  const start = clampYear(startYear, state.rangeStart);
  const end = clampYear(endYear, state.rangeEnd);

  state.rangeStart = Math.min(start, end);
  state.rangeEnd = Math.max(start, end);

  updateRangeHint();
  refreshChartData();
  if (!fromSlider) {
    syncSliderFromRange();
  }
  updateDownloadButtonState();
}

function updateMetric(metricKey) {
  state.metric = metricKey;
  state.chart.options.scales.y.title.text = METRICS[metricKey].axisLabel;
  refreshChartData();
  updateDownloadButtonState();
}

function buildCsvForCurrentMetric() {
  const metricKey = state.metric;
  const rangeYears = getRangeYears();
  const header = ["Year"];

  COUNTRIES.forEach((country) => {
    header.push(`${country.name}_${metricKey}`);
    header.push(`${country.name}_source`);
  });

  const rows = [header];
  rangeYears.forEach((year) => {
    const row = [year];

    COUNTRIES.forEach((country) => {
      const valueSeries = state.byMetric[metricKey].get(country.code) ?? new Map();
      const sourceSeries = state.sourceByMetric[metricKey].get(country.code) ?? new Map();
      const value = valueSeries.get(year);
      const source = sourceSeries.get(year) ?? "";

      row.push(isFiniteNumber(value) ? value.toFixed(2) : "");
      row.push(source);
    });

    rows.push(row);
  });

  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

function downloadCurrentMetricCsv() {
  if (!state.loaded) return;

  const csv = buildCsvForCurrentMetric();
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const dateStamp = new Date().toISOString().slice(0, 10);
  const filename = `gdp-dashboard-${state.metric}-${dateStamp}.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function updateDownloadButtonState() {
  if (downloadBtn) {
    downloadBtn.disabled = !state.loaded;
    downloadBtn.textContent = state.loaded
      ? `下载 ${METRICS[state.metric].label} CSV`
      : "下载当前指标 CSV";
  }

  if (resetRangeBtn) {
    const isFullRange = state.rangeStart === START_YEAR && state.rangeEnd === END_YEAR;
    resetRangeBtn.disabled = !state.loaded || isFullRange;
  }
}

function createCountryToggle(country) {
  const label = document.createElement("label");
  label.className = "toggle-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = state.visibleCountries.has(country.code);

  const dot = document.createElement("span");
  dot.className = "color-dot";
  dot.style.backgroundColor = country.color;

  const text = document.createElement("span");
  text.textContent = country.name;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      state.visibleCountries.add(country.code);
    } else {
      state.visibleCountries.delete(country.code);
    }

    updateChartModeControls();
    refreshChartData();
  });

  label.append(checkbox, dot, text);
  return label;
}

function setupTogglePanel() {
  togglesEl.innerHTML = "";
  COUNTRIES.forEach((country) => {
    togglesEl.appendChild(createCountryToggle(country));
  });
}

function setAllVisibility(visible) {
  if (!state.chart) return;

  state.visibleCountries = visible
    ? new Set(COUNTRIES.map((country) => country.code))
    : new Set();

  const checkboxes = togglesEl.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = visible;
  });

  updateChartModeControls();
  refreshChartData();
}

function bindEvents() {
  showAllBtn.addEventListener("click", () => {
    setAllVisibility(true);
  });

  hideAllBtn.addEventListener("click", () => {
    setAllVisibility(false);
  });

  metricInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      updateMetric(input.value);
    });
  });

  chartModeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      state.chartMode = input.value === "bar" ? "bar" : "line";
      updateChartModeControls();
      refreshChartData();
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      downloadCurrentMetricCsv();
    });
  }

  if (resetRangeBtn) {
    resetRangeBtn.addEventListener("click", () => {
      applyYearRange(START_YEAR, END_YEAR);
    });
  }
}

function summarizeStatus(
  nominalSummary,
  pppSummary,
  totalNominalSummary,
  totalPppSummary,
  disposableSummary,
  warningCount,
) {
  const nMissing = nominalSummary.missing2025.length;
  const pMissing = pppSummary.missing2025.length;
  const tnMissing = totalNominalSummary.missing2025.length;
  const tpMissing = totalPppSummary.missing2025.length;
  const dMissing = disposableSummary.missing2025.length;
  const disposableMissingAfter2021 = Number(disposableSummary.missingAfter2021Count || 0);
  const oecdOverrideCountries = Number(disposableSummary.oecdOverrideCountries || 0);
  const chinaOverrideYears = Number(disposableSummary.chinaOverrideYears || 0);
  const usaOverrideYears = Number(disposableSummary.usaOverrideYears || 0);
  const taiwanOverrideYears = Number(disposableSummary.taiwanOverrideYears || 0);
  const pppBackfill = Number(pppSummary.dataMapperBackfillCount || 0);
  const pppMaddisonBackfill = Number(pppSummary.maddisonBackfillCount || 0);
  const pppBackfillText = `PPP 1990年前补齐 ${pppBackfill + pppMaddisonBackfill} 个点（DataMapper ${pppBackfill}，Maddison ${pppMaddisonBackfill}）`;
  const disposableText =
    disposableMissingAfter2021 === 0
      ? `可支配收入 2022-2025 已补齐（2025 缺失 ${dMissing} 个）`
      : `可支配收入 2022-2025 仍缺失 ${disposableMissingAfter2021} 个点（2025 缺失 ${dMissing} 个）`;
  const chinaOverrideText =
    chinaOverrideYears > 0
      ? `中国可支配收入按国家统计局口径覆盖 ${chinaOverrideYears} 年`
      : "中国可支配收入国家统计局覆盖未生效";
  const usaOverrideText =
    usaOverrideYears > 0
      ? `美国可支配收入按 BEA/FRED 口径覆盖 ${usaOverrideYears} 年`
      : "美国可支配收入 BEA/FRED 覆盖未生效";
  const taiwanOverrideText =
    taiwanOverrideYears > 0
      ? `台湾可支配收入按主计总处口径覆盖 ${taiwanOverrideYears} 年`
      : "台湾可支配收入主计总处覆盖未生效";
  const oecdOverrideText =
    oecdOverrideCountries > 0
      ? `OECD 可支配收入口径覆盖 ${oecdOverrideCountries} 个经济体`
      : "OECD 可支配收入口径覆盖未生效";

  if (warningCount > 0) {
    return `已加载（不使用趋势预测）：人均GDP Nominal 2025 缺失 ${nMissing} 个，人均GDP PPP 2025 缺失 ${pMissing} 个，GDP总量 Nominal 2025 缺失 ${tnMissing} 个，GDP总量 PPP 2025 缺失 ${tpMissing} 个，${disposableText}；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}；存在 ${warningCount} 条数据源警告。`;
  }

  if (
    nMissing === 0 &&
    pMissing === 0 &&
    tnMissing === 0 &&
    tpMissing === 0 &&
    dMissing === 0 &&
    disposableMissingAfter2021 === 0
  ) {
    return `加载完成：已按 世界银行优先 + IMF 补查，不使用趋势预测；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}。`;
  }

  return `已加载（不使用趋势预测）：人均GDP Nominal 2025 缺失 ${nMissing} 个，人均GDP PPP 2025 缺失 ${pMissing} 个，GDP总量 Nominal 2025 缺失 ${tnMissing} 个，GDP总量 PPP 2025 缺失 ${tpMissing} 个，${disposableText}；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}。`;
}

async function init() {
  updateRangeHint();
  updateDownloadButtonState();

  const localDataMeta = loadLocalStaticDataIntoState();
  if (localDataMeta) {
    buildChart();
    setupRangeSlider();
    syncSliderFromRange();
    setupTogglePanel();
    updateChartModeControls();
    bindEvents();

    state.loaded = true;
    updateDownloadButtonState();

    const generatedText = localDataMeta.generatedAt
      ? `（快照时间：${localDataMeta.generatedAt}）`
      : "";
    setStatus(`加载完成：已使用本地内置数据${generatedText}，无需在线载入。`);
    return;
  }

  try {
    const [nominalSummary, pppSummary, totalNominalSummary, totalPppSummary, disposableSummary] =
      await Promise.all([
        loadMetric("nominal"),
        loadMetric("ppp"),
        loadMetric("totalNominal"),
        loadMetric("totalPpp"),
        loadMetric("disposableIncome"),
      ]);
    const taiwanGdpSummary = await applyTaiwanGdpOverrides();
    const oecdOverrideSummary = await applyOecdDisposableOverride();
    const oecdOfficialUsdExchOverrideSummary = applyOecdDisposableUsdExchOfficialOverrides();
    const nzlOfficialB6PppOverrideSummary = applyNzlDisposableOfficialB6PppOverride();
    const chinaOverrideSummary = await applyChinaNbsDisposableOverride();
    const usaOverrideSummary = applyUsaBeaDisposableOverride();
    const taiwanOverrideSummary = await applyTaiwanDgbasDisposableOverride();
    applyDisposableAnchorInterpolation();
    const russiaCalibrationSummary = applyRussiaDisposableCalibration();
    const disposableGuardSummary = applyDisposableRatioGuard();
    const japanDisposableCorrectionSummary = applyJapanDisposableRecentYearCorrection();
    const nominalAfterTaiwanGdp = calcMissingSummary("nominal");
    const pppAfterTaiwanGdp = calcMissingSummary("ppp");
    const finalDisposableMissing = calcMissingSummary("disposableIncome");

    nominalSummary.missing2025 = nominalAfterTaiwanGdp.missing2025;
    nominalSummary.missingAfter2021Count = nominalAfterTaiwanGdp.missingAfter2021Count;
    pppSummary.missing2025 = pppAfterTaiwanGdp.missing2025;
    pppSummary.missingAfter2021Count = pppAfterTaiwanGdp.missingAfter2021Count;

    nominalSummary.warnings.push(...taiwanGdpSummary.warnings);
    pppSummary.warnings.push(...taiwanGdpSummary.warnings);

    disposableSummary.missing2025 = finalDisposableMissing.missing2025;
    disposableSummary.missingAfter2021Count = finalDisposableMissing.missingAfter2021Count;
    disposableSummary.oecdOverrideCountries = oecdOverrideSummary.overriddenCountries;
    disposableSummary.chinaOverrideYears = chinaOverrideSummary.overriddenYears;
    disposableSummary.usaOverrideYears = usaOverrideSummary.overriddenYears;
    disposableSummary.taiwanOverrideYears = taiwanOverrideSummary.overriddenYears;
    disposableSummary.warnings.push(...oecdOverrideSummary.warnings);
    disposableSummary.warnings.push(...oecdOfficialUsdExchOverrideSummary.warnings);
    disposableSummary.warnings.push(...nzlOfficialB6PppOverrideSummary.warnings);
    disposableSummary.warnings.push(...chinaOverrideSummary.warnings);
    disposableSummary.warnings.push(...usaOverrideSummary.warnings);
    disposableSummary.warnings.push(...taiwanOverrideSummary.warnings);
    disposableSummary.warnings.push(...russiaCalibrationSummary.warnings);
    disposableSummary.warnings.push(...disposableGuardSummary.warnings);
    disposableSummary.warnings.push(...japanDisposableCorrectionSummary.warnings);

    buildChart();
    setupRangeSlider();
    syncSliderFromRange();
    setupTogglePanel();
    updateChartModeControls();
    bindEvents();

    state.loaded = true;
    updateDownloadButtonState();

    const warnings = [
      ...nominalSummary.warnings,
      ...pppSummary.warnings,
      ...totalNominalSummary.warnings,
      ...totalPppSummary.warnings,
      ...disposableSummary.warnings,
    ];
    setStatus(
      summarizeStatus(
        nominalSummary,
        pppSummary,
        totalNominalSummary,
        totalPppSummary,
        disposableSummary,
        warnings.length,
      ),
      warnings.length > 0,
    );

    if (warnings.length > 0) {
      console.warn("GDP 数据加载警告", warnings);
    }
  } catch (error) {
    state.loaded = false;
    updateDownloadButtonState();
    console.error(error);
    setStatus(`加载失败：${error.message}`, true);
  }
}

init();
