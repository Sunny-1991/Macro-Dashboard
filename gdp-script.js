const START_YEAR = 1960;
const END_YEAR = 2025;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

const COUNTRIES = [
  { code: "CHN", name: "中国", color: "#c5281c" },
  { code: "USA", name: "美国", color: "#2b5f9e" },
  { code: "IND", name: "印度", color: "#b8860b" },
  { code: "JPN", name: "日本", color: "#1f7f78" },
  { code: "KOR", name: "韩国", color: "#7c5aa6" },
  { code: "TWN", name: "台湾地区", color: "#8b5a2b" },
  { code: "GBR", name: "英国", color: "#4b5663" },
  { code: "DEU", name: "德国", color: "#4e7d3a" },
  { code: "RUS", name: "俄罗斯", color: "#6f3b2c" },
  { code: "AUS", name: "澳大利亚", color: "#2a8db8" },
  { code: "NZL", name: "新西兰", color: "#a1436a" },
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
  maddisonAnchored: "Maddison (OWID) 按锚点折算",
  wbNominal: "World Bank NY.GDP.PCAP.CD",
  wbPpp: "World Bank NY.GDP.PCAP.PP.CD",
  wbTotalNominal: "World Bank NY.GDP.MKTP.CD",
  wbTotalPpp: "World Bank NY.GDP.MKTP.PP.CD",
  wbImports: "World Bank NE.IMP.GNFS.CD",
  wbExports: "World Bank NE.EXP.GNFS.CD",
  fredUsImportsGoodsServicesSaar: "FRED IMPGS（美国进口，季调年率，按年度均值折算）",
  fredUsExportsGoodsServicesSaar: "FRED EXPGS（美国出口，季调年率，按年度均值折算）",
  wbMilitaryExpenditure: "World Bank MS.MIL.XPND.CD",
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
  wbPopulationTotal: "World Bank SP.POP.TOTL",
  wbAgingRate: "World Bank SP.POP.65UP.TO.ZS",
  wbFertilityRate: "World Bank SP.DYN.TFRT.IN",
  unWppPopulationTwnPre1980: "UN WPP 2024 TotalPopulationBySex（台湾人口总量，1960-1979）",
  unWppAgingRateTwnSeries: "UN WPP 2024 PopulationByAge5Group（台湾65岁及以上占比）",
  unWppAgingRate2024: "UN WPP 2024 PopulationByAge5Group（65岁及以上占比，2024）",
  unWppAgingRate2025: "UN WPP 2024 PopulationByAge5Group（65岁及以上占比，2025）",
  unWppFertilityRate2024: "UN WPP 2024 Demographic Indicators (Medium) TFR（2024）",
  unWppFertilityRate2025: "UN WPP 2024 Demographic Indicators (Medium) TFR（2025）",
  imfPopulationLp: "IMF DataMapper LP（百万人）",
  imfFiscalRevenueRatio: "IMF DataMapper rev（财政收入占GDP）",
  imfFiscalExpenditureRatio: "IMF DataMapper exp（财政开支占GDP）",
  imfFiscalRevenueRatioGgr: "IMF DataMapper GGR_G01_GDP_PT（财政收入占GDP）",
  imfFiscalExpenditureRatioGx: "IMF DataMapper G_X_G01_GDP_PT（财政开支占GDP）",
  derivedTradeTotal: "由进口额与出口额求和（进口 + 出口）",
  derivedTradeBalance: "由出口额减进口额计算（出口 - 进口）",
  derivedTotalPppFromPerCapitaPopulation: "由人均GDP（PPP）与人口总量折算（人均PPP × 人口）",
  derivedFiscalRevenue: "由财政收入占GDP（rev）折算（占比 × GDP总量）",
  derivedFiscalExpenditure: "由财政开支占GDP（exp）折算（占比 × GDP总量）",
  derivedFiscalRevenueGgr: "由财政收入占GDP（GGR_G01_GDP_PT）折算（占比 × GDP总量）",
  derivedFiscalExpenditureGx: "由财政开支占GDP（G_X_G01_GDP_PT）折算（占比 × GDP总量）",
  derivedFiscalDeficit: "由财政开支减财政收入计算（开支 - 收入）",
  owidMilitaryExpenditureTwn: "OWID military-expenditure-total（SIPRI，台湾）",
  twnDefenseBudget2024Official: "台湾2024年度国防预算（新台币）",
  sipriMilitaryExpenditureRus2025: "SIPRI《Military expenditure in Russia in 2025》预算口径估算（约1600亿美元）",
  derivedMilitaryExpenditureGdpScaled: "由最近可得军费按名义GDP同比折算（估算）",
  twnDefenseBudget2025Official: "台湾2025年度中央政府国防预算（新台币）",
  owidFertilityRate: "OWID children-per-woman-un",
  derivedPopulationIncrement: "由人口总量差分计算（当年 - 上年）",
  derivedPopulationGrowth: "由人口总量同比计算（差分 / 上年）",
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
const USA_FRED_EXPORTS_PRE_1970_USD = new Map([
  [1960, 27_045_000_000],
  [1961, 27_602_000_000],
  [1962, 29_066_000_000],
  [1963, 31_075_000_000],
  [1964, 35_019_000_000],
  [1965, 37_146_000_000],
  [1966, 40_920_000_000],
  [1967, 43_466_000_000],
  [1968, 47_906_000_000],
  [1969, 51_922_000_000],
]);
const USA_FRED_IMPORTS_PRE_1970_USD = new Map([
  [1960, 22_841_000_000],
  [1961, 22_688_000_000],
  [1962, 24_965_000_000],
  [1963, 26_136_000_000],
  [1964, 28_104_000_000],
  [1965, 31_529_000_000],
  [1966, 37_058_000_000],
  [1967, 39_912_000_000],
  [1968, 46_556_000_000],
  [1969, 50_492_000_000],
]);
const IMF_FISCAL_RATIO_2025_REVENUE = new Map([
  ["CHN", 25.079156244593],
  ["USA", 30.420404325768],
  ["IND", 20.227560790373],
  ["JPN", 37.383547367656],
  ["KOR", 22.59034014024],
  ["TWN", 16.652028859306],
  ["GBR", 39.354494415673],
  ["DEU", 47.922863866187],
  ["RUS", 35.098006660476],
  ["AUS", 36.593295088048],
  ["NZL", 37.392269284605],
]);
const IMF_FISCAL_RATIO_2025_EXPENDITURE = new Map([
  ["CHN", 33.652264106183],
  ["USA", 37.785189543626],
  ["IND", 27.340569929761],
  ["JPN", 38.642251041669],
  ["KOR", 24.10770394698],
  ["TWN", 16.974613623329],
  ["GBR", 43.690979144144],
  ["DEU", 50.445414015321],
  ["RUS", 37.835446273659],
  ["AUS", 39.322803983201],
  ["NZL", 41.453788977478],
]);
const UN_WPP_AGEING_RATE_2024 = new Map([
  ["CHN", 14.6653],
  ["USA", 17.9287],
  ["IND", 7.1465],
  ["JPN", 29.7808],
  ["KOR", 19.2735],
  ["TWN", 19.1838],
  ["GBR", 19.4998],
  ["DEU", 23.1956],
  ["RUS", 17.1775],
  ["AUS", 17.73],
  ["NZL", 17.1958],
]);
const UN_WPP_AGEING_RATE_2025 = new Map([
  ["CHN", 14.9114],
  ["USA", 18.3872],
  ["IND", 7.3766],
  ["JPN", 29.9941],
  ["KOR", 20.3304],
  ["TWN", 20.0582],
  ["GBR", 19.7027],
  ["DEU", 23.7032],
  ["RUS", 17.7918],
  ["AUS", 18.093],
  ["NZL", 17.6093],
]);
const TAIWAN_WPP_POPULATION_PRE_1980 = new Map([
  [1960, 11046258],
  [1961, 11453500],
  [1962, 11866672],
  [1963, 12285722],
  [1964, 12706674],
  [1965, 13124802],
  [1966, 13537707],
  [1967, 13901470],
  [1968, 14215585],
  [1969, 14523594],
  [1970, 14815745],
  [1971, 15121137],
  [1972, 15450612],
  [1973, 15772697],
  [1974, 16082325],
  [1975, 16365267],
  [1976, 16671499],
  [1977, 17020097],
  [1978, 17373728],
  [1979, 17735781],
]);
const TAIWAN_IMF_FISCAL_REVENUE_RATIO = new Map([
  [1990, 24.415087316686],
  [1991, 20.923213204255],
  [1992, 22.419119731549],
  [1993, 22.843533128371],
  [1994, 22.16649397675],
  [1995, 21.098847797515],
  [1996, 19.97413893508],
  [1997, 19.583337780893],
  [1998, 21.923811443043],
  [1999, 20.443610063662],
  [2000, 26.962766299506],
  [2001, 18.744541554667],
  [2002, 16.818113527618],
  [2003, 17.840005468678],
  [2004, 16.620900962648],
  [2005, 18.42734325717],
  [2006, 17.315591429194],
  [2007, 16.797159567812],
  [2008, 17.015611986371],
  [2009, 16.360177453443],
  [2010, 15.046244455595],
  [2011, 16.169825674172],
  [2012, 15.814432217712],
  [2013, 16.093747881568],
  [2014, 15.43122070566],
  [2015, 15.610173420471],
  [2016, 15.328262188877],
  [2017, 15.285752704514],
  [2018, 15.464738831443],
  [2019, 15.451881256852],
  [2020, 15.162652239201],
  [2021, 15.253191228648],
  [2022, 16.172834854558],
  [2023, 16.480233925593],
  [2024, 16.352028859306],
  [2025, 16.652028859306],
]);
const TAIWAN_IMF_FISCAL_EXPENDITURE_RATIO = new Map([
  [1990, 28.406731976127],
  [1991, 30.165091044892],
  [1992, 29.207162246938],
  [1993, 28.89320168499],
  [1994, 28.364178755748],
  [1995, 27.855333915478],
  [1996, 27.109043922501],
  [1997, 27.056779843745],
  [1998, 27.159550206233],
  [1999, 22.791660628215],
  [2000, 32.293100818704],
  [2001, 24.332303700339],
  [2002, 22.059814973481],
  [2003, 22.173128811202],
  [2004, 21.242987686967],
  [2005, 20.924660614202],
  [2006, 19.494399619498],
  [2007, 19.019823826576],
  [2008, 19.752236721304],
  [2009, 22.556337826192],
  [2010, 20.13849325438],
  [2011, 20.203647906587],
  [2012, 20.12804181455],
  [2013, 19.336133371066],
  [2014, 18.156110546438],
  [2015, 17.392547429852],
  [2016, 17.520934400371],
  [2017, 17.307585697488],
  [2018, 17.33066757808],
  [2019, 17.228248567976],
  [2020, 18.07357913806],
  [2021, 17.315832746616],
  [2022, 17.887702920454],
  [2023, 18.976865234117],
  [2024, 17.802030246893],
  [2025, 16.974613623329],
]);
const TAIWAN_OWID_MILITARY_EXPENDITURE_USD = new Map([
  [1976, 4_795_342_000],
  [1977, 5_824_129_500],
  [1978, 6_683_232_000],
  [1979, 7_932_920_300],
  [1980, 7_999_193_600],
  [1981, 7_434_514_000],
  [1982, 8_154_006_500],
  [1983, 8_162_653_700],
  [1984, 8_224_516_600],
  [1985, 9_189_324_000],
  [1986, 9_539_243_000],
  [1987, 9_696_040_000],
  [1988, 10_791_144_000],
  [1989, 11_835_352_000],
  [1990, 12_486_812_000],
  [1991, 12_848_544_000],
  [1992, 12_989_436_000],
  [1993, 14_725_313_000],
  [1994, 14_547_353_000],
  [1995, 13_480_486_000],
  [1996, 13_907_156_000],
  [1997, 13_848_727_000],
  [1998, 12_953_994_000],
  [1999, 11_820_333_000],
  [2000, 11_367_204_000],
  [2001, 11_161_247_000],
  [2002, 10_794_015_000],
  [2003, 10_690_948_000],
  [2004, 10_709_626_000],
  [2005, 10_304_118_000],
  [2006, 9_885_213_000],
  [2007, 10_460_259_000],
  [2008, 10_650_902_000],
  [2009, 11_471_295_000],
  [2010, 10_841_880_000],
  [2011, 10_945_257_000],
  [2012, 11_330_782_000],
  [2013, 10_700_808_000],
  [2014, 10_638_746_000],
  [2015, 11_212_553_000],
  [2016, 11_019_817_000],
  [2017, 11_166_234_000],
  [2018, 10_925_289_000],
  [2019, 11_652_206_000],
  [2020, 12_165_809_000],
  [2021, 13_146_228_000],
  [2022, 14_901_377_000],
  [2023, 16_344_565_000],
  [2024, 16_634_733_000],
]);
const TAIWAN_UN_WPP_AGEING_RATE_SERIES = new Map([
  [1960, 2.3403],
  [1961, 2.3402],
  [1962, 2.3497],
  [1963, 2.3853],
  [1964, 2.4278],
  [1965, 2.4765],
  [1966, 2.5374],
  [1967, 2.5942],
  [1968, 2.6366],
  [1969, 2.6776],
  [1970, 2.7485],
  [1971, 2.829],
  [1972, 2.9011],
  [1973, 2.9669],
  [1974, 3.0329],
  [1975, 3.1149],
  [1976, 3.2068],
  [1977, 3.3496],
  [1978, 3.5419],
  [1979, 3.7453],
  [1980, 3.955],
  [1981, 4.1338],
  [1982, 4.2954],
  [1983, 4.4605],
  [1984, 4.6239],
  [1985, 4.8084],
  [1986, 5.0338],
  [1987, 5.2811],
  [1988, 5.5053],
  [1989, 5.7281],
  [1990, 5.9854],
  [1991, 6.2605],
  [1992, 6.5305],
  [1993, 6.8],
  [1994, 7.0745],
  [1995, 7.3434],
  [1996, 7.5936],
  [1997, 7.8136],
  [1998, 8.0137],
  [1999, 8.2302],
  [2000, 8.5118],
  [2001, 8.7749],
  [2002, 8.981],
  [2003, 9.1934],
  [2004, 9.4193],
  [2005, 9.6656],
  [2006, 9.9221],
  [2007, 10.1653],
  [2008, 10.3906],
  [2009, 10.6063],
  [2010, 10.768],
  [2011, 10.901],
  [2012, 11.1093],
  [2013, 11.4345],
  [2014, 11.861],
  [2015, 12.3634],
  [2016, 12.9781],
  [2017, 13.6636],
  [2018, 14.3553],
  [2019, 15.0815],
  [2020, 15.8821],
  [2021, 16.7358],
  [2022, 17.5366],
  [2023, 18.3277],
  [2024, 19.1838],
  [2025, 20.0582],
]);
const UN_WPP_FERTILITY_2024 = new Map([
  ["CHN", 1.013],
  ["USA", 1.6221],
  ["IND", 1.9622],
  ["JPN", 1.2168],
  ["KOR", 0.7338],
  ["TWN", 0.8626],
  ["GBR", 1.5511],
  ["DEU", 1.4481],
  ["RUS", 1.457],
  ["AUS", 1.6379],
  ["NZL", 1.6593],
]);
const UN_WPP_FERTILITY_2025 = new Map([
  ["CHN", 1.0209],
  ["USA", 1.6234],
  ["IND", 1.9435],
  ["JPN", 1.225],
  ["KOR", 0.7494],
  ["TWN", 0.8604],
  ["GBR", 1.5389],
  ["DEU", 1.4553],
  ["RUS", 1.4647],
  ["AUS", 1.6388],
  ["NZL", 1.6464],
]);
const TAIWAN_DEFENSE_BUDGET_2024_NTD = 606_800_000_000;
const TAIWAN_DEFENSE_BUDGET_2025_NTD = 647_000_000_000;
const RUSSIA_SIPRI_MILITARY_EXPENDITURE_2025_USD = 160_000_000_000;
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
  imports: {
    label: "进口额（美元）",
    axisLabel: "进口额（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbImports,
    wbIndicators: [{ indicator: "NE.IMP.GNFS.CD", sourceLabel: SOURCE_LABELS.wbImports }],
  },
  exports: {
    label: "出口额（美元）",
    axisLabel: "出口额（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbExports,
    wbIndicators: [{ indicator: "NE.EXP.GNFS.CD", sourceLabel: SOURCE_LABELS.wbExports }],
  },
  tradeTotal: {
    label: "进出口总额（美元）",
    axisLabel: "进出口总额（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedTradeTotal,
    wbIndicators: [],
  },
  tradeBalance: {
    label: "贸易帐（美元，顺差为正）",
    axisLabel: "贸易帐（美元，顺差为正）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedTradeBalance,
    wbIndicators: [],
  },
  populationTotal: {
    label: "人口总量（人）",
    axisLabel: "人口总量（人）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.imfPopulationLp,
    wbIndicators: [{ indicator: "SP.POP.TOTL", sourceLabel: SOURCE_LABELS.wbPopulationTotal }],
  },
  populationIncrement: {
    label: "人口增量（人）",
    axisLabel: "人口增量（人）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedPopulationIncrement,
    wbIndicators: [],
  },
  populationGrowthRate: {
    label: "人口增速（%）",
    axisLabel: "人口增速（%）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedPopulationGrowth,
    wbIndicators: [],
  },
  agingRate: {
    label: "老龄化率（65岁及以上占比，%）",
    axisLabel: "老龄化率（65岁及以上占比，%）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbAgingRate,
    wbIndicators: [{ indicator: "SP.POP.65UP.TO.ZS", sourceLabel: SOURCE_LABELS.wbAgingRate }],
  },
  fertilityRate: {
    label: "生育率（每名女性生育子女数）",
    axisLabel: "生育率（每名女性生育子女数）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbFertilityRate,
    wbIndicators: [{ indicator: "SP.DYN.TFRT.IN", sourceLabel: SOURCE_LABELS.wbFertilityRate }],
  },
  fiscalRevenue: {
    label: "财政收入（美元）",
    axisLabel: "财政收入（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedFiscalRevenue,
    wbIndicators: [],
  },
  fiscalExpenditure: {
    label: "财政开支（美元）",
    axisLabel: "财政开支（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedFiscalExpenditure,
    wbIndicators: [],
  },
  fiscalDeficit: {
    label: "财政赤字（美元，赤字为正）",
    axisLabel: "财政赤字（美元，赤字为正）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.derivedFiscalDeficit,
    wbIndicators: [],
  },
  militaryExpenditure: {
    label: "军费（美元）",
    axisLabel: "军费（美元）",
    imfIndicator: null,
    imfUnit: null,
    imfSourceLabel: SOURCE_LABELS.wbMilitaryExpenditure,
    wbIndicators: [{ indicator: "MS.MIL.XPND.CD", sourceLabel: SOURCE_LABELS.wbMilitaryExpenditure }],
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
const metricTitleEl = document.getElementById("gdpMetricTitle");
const chartWrapEl = chartEl?.closest(".chart-wrap") || null;
const metricInputs = Array.from(document.querySelectorAll('input[name="gdpMetric"]'));
const chartModeInputs = Array.from(document.querySelectorAll('input[name="gdpChartMode"]'));
const chartModeHintEl = document.getElementById("gdpChartModeHint");

const integerFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

if (
  typeof Chart !== "undefined" &&
  Chart.Tooltip &&
  Chart.Tooltip.positioners &&
  !Chart.Tooltip.positioners.cursor
) {
  Chart.Tooltip.positioners.cursor = function (_elements, eventPosition) {
    return {
      x: eventPosition.x,
      y: eventPosition.y,
    };
  };
}

const state = {
  chart: null,
  metric: "disposableIncome",
  chartMode: "line",
  loaded: false,
  rangeStart: START_YEAR,
  rangeEnd: END_YEAR,
  metricDisplayConfig: null,
  sliderUi: null,
  visibleCountries: new Set(COUNTRIES.map((country) => country.code)),
  byMetric: {
    nominal: new Map(),
    ppp: new Map(),
    totalNominal: new Map(),
    totalPpp: new Map(),
    disposableIncome: new Map(),
    imports: new Map(),
    exports: new Map(),
    tradeTotal: new Map(),
    tradeBalance: new Map(),
    populationTotal: new Map(),
    populationIncrement: new Map(),
    populationGrowthRate: new Map(),
    agingRate: new Map(),
    fertilityRate: new Map(),
    fiscalRevenue: new Map(),
    fiscalExpenditure: new Map(),
    fiscalDeficit: new Map(),
    militaryExpenditure: new Map(),
  },
  sourceByMetric: {
    nominal: new Map(),
    ppp: new Map(),
    totalNominal: new Map(),
    totalPpp: new Map(),
    disposableIncome: new Map(),
    imports: new Map(),
    exports: new Map(),
    tradeTotal: new Map(),
    tradeBalance: new Map(),
    populationTotal: new Map(),
    populationIncrement: new Map(),
    populationGrowthRate: new Map(),
    agingRate: new Map(),
    fertilityRate: new Map(),
    fiscalRevenue: new Map(),
    fiscalExpenditure: new Map(),
    fiscalDeficit: new Map(),
    militaryExpenditure: new Map(),
  },
  missing2025ByMetric: {
    nominal: [],
    ppp: [],
    totalNominal: [],
    totalPpp: [],
    disposableIncome: [],
    imports: [],
    exports: [],
    tradeTotal: [],
    tradeBalance: [],
    populationTotal: [],
    populationIncrement: [],
    populationGrowthRate: [],
    agingRate: [],
    fertilityRate: [],
    fiscalRevenue: [],
    fiscalExpenditure: [],
    fiscalDeficit: [],
    militaryExpenditure: [],
  },
};

const MADDISON_CSV_URLS = [
  `https://ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.csv?country=${COUNTRY_CODES_TILDE}`,
  `https://archive.ourworldindata.org/20250819-104157/grapher/gdp-per-capita-maddison-project-database.csv?country=${COUNTRY_CODES_TILDE}`,
];
const OWID_FERTILITY_CSV_URL = "https://ourworldindata.org/grapher/children-per-woman-un.csv";
const IMF_DATAMAPPER_POPULATION_INDICATOR = "LP";
const requestCache = new Map();
const imfMetricCache = new Map();
const LOCAL_DATA_CACHE_KEY = "gdpDashboardLocalDatasetV1";
const LOCAL_DATA_CACHE_VERSION = 1;
const LOCAL_STATIC_DATA =
  typeof window !== "undefined" && window.GDP_DASHBOARD_LOCAL_DATA
    ? window.GDP_DASHBOARD_LOCAL_DATA
    : null;

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

function getMetricBaseLabel(metricKey) {
  const rawLabel = METRICS[metricKey]?.label || METRICS[metricKey]?.axisLabel || metricKey;
  return String(rawLabel)
    .replace(/（[^）]*）/g, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

function getMetricScaleByMagnitude(maxAbs, unitDefs) {
  const normalizedDefs = Array.isArray(unitDefs) ? unitDefs : [];
  for (const def of normalizedDefs) {
    if (maxAbs >= def.threshold) {
      return def;
    }
  }
  return normalizedDefs[normalizedDefs.length - 1] || null;
}

function resolveMetricDisplayConfig(metricKey, maxAbs = 0) {
  const absValue = isFiniteNumber(maxAbs) ? Math.abs(maxAbs) : 0;

  if (
    metricKey === "totalNominal" ||
    metricKey === "totalPpp" ||
    metricKey === "imports" ||
    metricKey === "exports" ||
    metricKey === "tradeTotal" ||
    metricKey === "tradeBalance" ||
    metricKey === "fiscalRevenue" ||
    metricKey === "fiscalExpenditure" ||
    metricKey === "fiscalDeficit" ||
    metricKey === "militaryExpenditure"
  ) {
    return (
      getMetricScaleByMagnitude(absValue, [
        { threshold: 1_000_000_000_000, divisor: 1_000_000_000_000, unit: "万亿美元" },
        { threshold: 100_000_000, divisor: 100_000_000, unit: "亿美元" },
        { threshold: 0, divisor: 1, unit: "美元" },
      ]) || { divisor: 1, unit: "美元" }
    );
  }

  if (metricKey === "populationTotal" || metricKey === "populationIncrement") {
    return (
      getMetricScaleByMagnitude(absValue, [
        { threshold: 100_000_000, divisor: 100_000_000, unit: "亿人" },
        { threshold: 10_000, divisor: 10_000, unit: "万人" },
        { threshold: 0, divisor: 1, unit: "人" },
      ]) || { divisor: 1, unit: "人" }
    );
  }

  if (metricKey === "populationGrowthRate" || metricKey === "agingRate") {
    return { divisor: 1, unit: "%", fixedDigits: 2, appendUnitWithoutSpace: true };
  }

  if (metricKey === "fertilityRate") {
    return { divisor: 1, unit: "", fixedDigits: 2 };
  }

  return { divisor: 1, unit: "美元" };
}

function getMetricVisibleMaxAbs(metricKey, rangeYears = getRangeYears()) {
  let maxAbs = 0;
  const visibleCodes = getVisibleCountryCodes();
  const codes = visibleCodes.length > 0 ? visibleCodes : COUNTRIES.map((country) => country.code);

  codes.forEach((countryCode) => {
    const series = state.byMetric?.[metricKey]?.get(countryCode) ?? new Map();
    rangeYears.forEach((year) => {
      const value = series.get(year);
      if (!isFiniteNumber(value)) return;
      const absValue = Math.abs(value);
      if (absValue > maxAbs) {
        maxAbs = absValue;
      }
    });
  });

  return maxAbs;
}

function buildMetricDisplayConfig(metricKey = state.metric, rangeYears = getRangeYears()) {
  const maxAbs = getMetricVisibleMaxAbs(metricKey, rangeYears);
  const baseConfig = resolveMetricDisplayConfig(metricKey, maxAbs) || { divisor: 1, unit: "" };
  return {
    metricKey,
    maxAbs,
    divisor: baseConfig.divisor || 1,
    unit: baseConfig.unit || "",
    fixedDigits: Number.isInteger(baseConfig.fixedDigits) ? baseConfig.fixedDigits : null,
    appendUnitWithoutSpace: Boolean(baseConfig.appendUnitWithoutSpace),
  };
}

function getMetricAxisTitle(metricKey, displayConfig = state.metricDisplayConfig) {
  const baseLabel = getMetricBaseLabel(metricKey);
  const unit = displayConfig?.unit || "";
  if (!unit) return baseLabel || METRICS[metricKey]?.axisLabel || metricKey;
  return `${baseLabel}（${unit}）`;
}

function updateMetricTitle(metricKey = state.metric, displayConfig = state.metricDisplayConfig) {
  if (!metricTitleEl) return;
  metricTitleEl.textContent = getMetricAxisTitle(metricKey, displayConfig);
}

function resolveFractionDigits(value, displayConfig, forAxis = false) {
  if (Number.isInteger(displayConfig?.fixedDigits)) {
    return displayConfig.fixedDigits;
  }

  const unit = displayConfig?.unit || "";
  if (unit === "人") return 0;

  const absValue = Math.abs(value);
  if (forAxis) {
    if (absValue >= 100) return 0;
    if (absValue >= 10) return 1;
    return 2;
  }

  if (absValue >= 100) return 0;
  if (absValue >= 10) return 1;
  return 2;
}

function formatMetricValue(metricKey, value, options = {}) {
  if (!isFiniteNumber(value)) return "无数据";

  const displayConfig =
    options.displayConfig && typeof options.displayConfig === "object"
      ? options.displayConfig
      : state.metricDisplayConfig?.metricKey === metricKey
        ? state.metricDisplayConfig
        : buildMetricDisplayConfig(metricKey, getRangeYears());

  const divisor = displayConfig?.divisor || 1;
  const scaledValue = divisor !== 0 ? value / divisor : value;
  const digits = resolveFractionDigits(scaledValue, displayConfig, Boolean(options.forAxis));
  const numberText =
    digits === 0
      ? integerFormatter.format(Math.round(scaledValue))
      : scaledValue.toLocaleString("en-US", {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        });

  const withSign =
    metricKey === "populationIncrement" && scaledValue > 0 ? `+${numberText}` : numberText;

  if (options.forAxis) return withSign;

  const unit = displayConfig?.unit || "";
  if (!unit) return withSign;
  if (displayConfig?.appendUnitWithoutSpace) return `${withSign}${unit}`;
  return `${withSign} ${unit}`;
}

function formatCsvMetricValue(metricKey, value) {
  if (!isFiniteNumber(value)) return "";
  if (metricKey === "populationTotal" || metricKey === "populationIncrement") {
    return String(Math.round(value));
  }
  if (metricKey === "populationGrowthRate" || metricKey === "agingRate" || metricKey === "fertilityRate") {
    return value.toFixed(4);
  }
  return value.toFixed(2);
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

function parseCssPixels(value, fallback = 0) {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : fallback;
}

function traceRoundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function resolveExportScale(baseWidth, baseHeight) {
  const longEdge = Math.max(baseWidth, baseHeight);
  const deviceScale = Math.max(1, Math.min(3, (window.devicePixelRatio || 1) * 1.8));
  const qualityScale = Math.max(1, Math.min(3, 3200 / Math.max(1, longEdge)));
  return Math.max(1, Math.min(3, Math.max(deviceScale, qualityScale)));
}

function truncateTextToWidth(ctx, text, maxWidth) {
  const source = String(text || "");
  if (!source || !Number.isFinite(maxWidth) || maxWidth <= 0) return "";
  if (ctx.measureText(source).width <= maxWidth) return source;

  const ellipsis = "...";
  const ellipsisWidth = ctx.measureText(ellipsis).width;
  if (ellipsisWidth >= maxWidth) return ellipsis;

  let result = source;
  while (result.length > 0 && ctx.measureText(`${result}${ellipsis}`).width > maxWidth) {
    result = result.slice(0, -1);
  }
  return `${result}${ellipsis}`;
}

const lineEndLabelsPlugin = {
  id: "lineEndLabels",
  afterDatasetsDraw(chart) {
    chart.$lineEndLabelHitRegions = [];
    chart.$visibleLineMaxX = null;
    if (state.chartMode === "bar") return;
    const { ctx, chartArea, data } = chart;
    if (!ctx || !chartArea || !Array.isArray(data?.datasets)) return;

    const labels = [];
    let maxVisibleX = Number.NEGATIVE_INFINITY;
    data.datasets.forEach((dataset, datasetIndex) => {
      if (!dataset || !chart.isDatasetVisible(datasetIndex)) return;
      const points = chart.getDatasetMeta(datasetIndex)?.data;
      if (!Array.isArray(points) || points.length === 0) return;

      for (let i = dataset.data.length - 1; i >= 0; i -= 1) {
        if (!isFiniteNumber(dataset.data[i])) continue;
        const point = points[i];
        if (!point || !isFiniteNumber(point.x) || !isFiniteNumber(point.y)) continue;
        maxVisibleX = Math.max(maxVisibleX, point.x);
        labels.push({
          text: String(dataset.label || ""),
          countryCode: String(dataset.countryCode || ""),
          color: String(dataset.borderColor || "#2f5d8a"),
          x: point.x,
          y: point.y,
        });
        break;
      }
    });

    if (Number.isFinite(maxVisibleX)) {
      chart.$visibleLineMaxX = maxVisibleX;
    }
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
    ctx.font = "600 12px 'Noto Sans SC', 'PingFang SC', sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(246,242,236,0.98)";
    const labelX = Math.min(chart.width - 4, chartArea.right + 10);
    const hitRegions = [];

    labels.forEach((item) => {
      const drawY = Math.min(bottomBound, Math.max(topBound, item.drawY));
      if (!item.text) return;
      const measured = ctx.measureText(item.text);
      const textWidth = measured.width || 0;
      const textHeight =
        (measured.actualBoundingBoxAscent || 8) + (measured.actualBoundingBoxDescent || 4);
      ctx.strokeText(item.text, labelX, drawY);
      ctx.fillStyle = item.color;
      ctx.fillText(item.text, labelX, drawY);
      hitRegions.push({
        countryCode: item.countryCode,
        type: "label",
        left: labelX - 8,
        right: labelX + textWidth + 8,
        top: drawY - textHeight / 2 - 5,
        bottom: drawY + textHeight / 2 + 5,
      });
      hitRegions.push({
        countryCode: item.countryCode,
        type: "point",
        x: item.x,
        y: item.y,
        radius: 8,
      });
    });
    ctx.restore();
    chart.$lineEndLabelHitRegions = hitRegions;
  },
};

const lineEdgeInteractionPlugin = {
  id: "lineEdgeInteraction",
  afterEvent(chart, args) {
    const event = args?.event;
    if (!event) return;

    const pointerX = Number(event.x);
    const pointerY = Number(event.y);

    if (event.type === "mouseout") {
      const tooltipActive = chart.tooltip?.getActiveElements?.() || [];
      const chartActive = chart.getActiveElements?.() || [];
      if (tooltipActive.length > 0 || chartActive.length > 0) {
        chart.tooltip?.setActiveElements?.([], { x: 0, y: 0 });
        chart.setActiveElements?.([]);
        args.changed = true;
      }
      return;
    }

    if (event.type === "click" && state.chartMode !== "bar") {
      if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) return;
      const hitRegions = Array.isArray(chart.$lineEndLabelHitRegions) ? chart.$lineEndLabelHitRegions : [];
      const hit = hitRegions.find((region) => {
        if (region.type === "point") {
          const dx = pointerX - region.x;
          const dy = pointerY - region.y;
          return dx * dx + dy * dy <= region.radius * region.radius;
        }
        return (
          pointerX >= region.left &&
          pointerX <= region.right &&
          pointerY >= region.top &&
          pointerY <= region.bottom
        );
      });
      if (hit?.countryCode) {
        toggleCountryVisibility(hit.countryCode, { disableAnimation: true });
        return;
      }
    }

    if (state.chartMode === "bar") return;
    if (event.type !== "mousemove" && event.type !== "click" && event.type !== "touchmove") return;
    if (!Number.isFinite(pointerX)) return;
    const maxVisibleX = Number(chart.$visibleLineMaxX);
    if (!Number.isFinite(maxVisibleX) || pointerX <= maxVisibleX) return;

    const tooltipActive = chart.tooltip?.getActiveElements?.() || [];
    const chartActive = chart.getActiveElements?.() || [];
    if (tooltipActive.length === 0 && chartActive.length === 0) return;

    chart.tooltip?.setActiveElements?.([], {
      x: pointerX,
      y: Number.isFinite(pointerY) ? pointerY : chart.chartArea.top,
    });
    chart.setActiveElements?.([]);
    args.changed = true;
  },
};

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

function updateRangeHint() {
  if (!rangeHintEl) return;
  rangeHintEl.textContent = `${state.rangeStart} - ${state.rangeEnd}`;
}

function clampYear(value, fallback) {
  if (!Number.isInteger(value)) return fallback;
  return Math.max(START_YEAR, Math.min(END_YEAR, value));
}

function yearToSliderRatio(year) {
  const span = END_YEAR - START_YEAR;
  if (span <= 0) return 0;
  const normalized = (clampYear(year, START_YEAR) - START_YEAR) / span;
  return Math.max(0, Math.min(1, normalized));
}

function sliderRatioToYear(ratio) {
  const span = END_YEAR - START_YEAR;
  if (span <= 0) return START_YEAR;
  const normalized = Math.max(0, Math.min(1, ratio));
  return clampYear(Math.round(START_YEAR + normalized * span), START_YEAR);
}

function getYearTickStep() {
  const span = Math.max(1, state.rangeEnd - state.rangeStart);
  if (span <= 14) return 1;
  if (span <= 30) return 2;
  if (span <= 48) return 3;
  if (span <= 70) return 4;
  return 5;
}

function updateCustomRangeSliderUi() {
  const ui = state.sliderUi;
  if (!ui?.track || !ui?.bars || !ui?.inputs) return;

  const startRatio = yearToSliderRatio(state.rangeStart);
  const endRatio = yearToSliderRatio(state.rangeEnd);
  const startPercent = Math.max(0, Math.min(100, startRatio * 100));
  const endPercent = Math.max(0, Math.min(100, endRatio * 100));

  ui.inputs.start.value = String(state.rangeStart);
  ui.inputs.end.value = String(state.rangeEnd);

  ui.bars.left.style.left = "0%";
  ui.bars.left.style.width = `${Math.max(0, startPercent)}%`;

  ui.bars.middle.style.left = `${startPercent}%`;
  ui.bars.middle.style.width = `${Math.max(0, endPercent - startPercent)}%`;

  ui.bars.right.style.left = `${endPercent}%`;
  ui.bars.right.style.width = `${Math.max(0, 100 - endPercent)}%`;

  ui.inputs.start.setAttribute("aria-valuemin", String(START_YEAR));
  ui.inputs.start.setAttribute("aria-valuemax", String(state.rangeEnd));
  ui.inputs.start.setAttribute("aria-valuenow", String(state.rangeStart));
  ui.inputs.end.setAttribute("aria-valuemin", String(state.rangeStart));
  ui.inputs.end.setAttribute("aria-valuemax", String(END_YEAR));
  ui.inputs.end.setAttribute("aria-valuenow", String(state.rangeEnd));
}

function syncSliderFromRange() {
  updateCustomRangeSliderUi();
}

function setupRangeSlider() {
  if (!rangeSliderEl) return;
  if (state.sliderUi) return;

  rangeSliderEl.innerHTML = "";

  const sliderRoot = document.createElement("div");
  sliderRoot.className = "wb-slider";

  const track = document.createElement("div");
  track.className = "wb-slider-track";

  const barLeft = document.createElement("div");
  barLeft.className = "wb-slider-bar bar-0";
  const barMiddle = document.createElement("div");
  barMiddle.className = "wb-slider-bar bar-1";
  const barRight = document.createElement("div");
  barRight.className = "wb-slider-bar bar-2";

  const startInput = document.createElement("input");
  startInput.type = "range";
  startInput.className = "wb-slider-input input-start";
  startInput.min = String(START_YEAR);
  startInput.max = String(END_YEAR);
  startInput.step = "1";
  startInput.value = String(state.rangeStart);
  startInput.setAttribute("aria-label", "起始年份");

  const endInput = document.createElement("input");
  endInput.type = "range";
  endInput.className = "wb-slider-input input-end";
  endInput.min = String(START_YEAR);
  endInput.max = String(END_YEAR);
  endInput.step = "1";
  endInput.value = String(state.rangeEnd);
  endInput.setAttribute("aria-label", "结束年份");

  track.append(barLeft, barMiddle, barRight);
  sliderRoot.append(track, startInput, endInput);
  rangeSliderEl.appendChild(sliderRoot);

  state.sliderUi = {
    root: sliderRoot,
    track,
    bars: {
      left: barLeft,
      middle: barMiddle,
      right: barRight,
    },
    inputs: {
      start: startInput,
      end: endInput,
    },
  };

  const applySliderYear = (year, handleType) => {
    const nextYear = clampYear(year, handleType === "start" ? state.rangeStart : state.rangeEnd);

    if (handleType === "start") {
      const start = Math.min(nextYear, state.rangeEnd);
      applyYearRange(start, state.rangeEnd, { fromSlider: true });
      return;
    }

    const end = Math.max(nextYear, state.rangeStart);
    applyYearRange(state.rangeStart, end, { fromSlider: true });
  };

  const yearFromClientX = (clientX) => {
    const rect = track.getBoundingClientRect();
    if (!rect || rect.width <= 0) return state.rangeStart;
    const ratio = (clientX - rect.left) / rect.width;
    return sliderRatioToYear(ratio);
  };

  const updateFromInput = (handleType) => {
    const inputEl = handleType === "start" ? startInput : endInput;
    const rawYear = Number.parseInt(inputEl.value, 10);
    const fallbackYear = handleType === "start" ? state.rangeStart : state.rangeEnd;
    const parsedYear = clampYear(Number.isNaN(rawYear) ? fallbackYear : rawYear, fallbackYear);
    applySliderYear(parsedYear, handleType);
  };

  startInput.addEventListener("input", () => updateFromInput("start"));
  startInput.addEventListener("change", () => updateFromInput("start"));
  endInput.addEventListener("input", () => updateFromInput("end"));
  endInput.addEventListener("change", () => updateFromInput("end"));

  const handleTrackStart = (clientX) => {
    const targetYear = yearFromClientX(clientX);
    const distToStart = Math.abs(targetYear - state.rangeStart);
    const distToEnd = Math.abs(targetYear - state.rangeEnd);
    const handleType = distToStart <= distToEnd ? "start" : "end";
    applySliderYear(targetYear, handleType);
  };

  track.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    handleTrackStart(event.clientX);
  });

  track.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;
      event.preventDefault();
      handleTrackStart(touch.clientX);
    },
    { passive: false },
  );

  window.addEventListener("resize", () => {
    updateCustomRangeSliderUi();
  });

  updateCustomRangeSliderUi();
  requestAnimationFrame(updateCustomRangeSliderUi);
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

function buildImfDataMapperUrlForIndicator(indicator) {
  const countryCodes = COUNTRIES.map((country) => country.code).join(",");
  return `https://www.imf.org/external/datamapper/api/v1/${indicator}/${countryCodes}`;
}

function buildImfDataMapperUrl(metricKey) {
  const indicator = METRICS[metricKey].imfIndicator;
  return buildImfDataMapperUrlForIndicator(indicator);
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

  const localYears = Array.isArray(LOCAL_STATIC_DATA.years)
    ? LOCAL_STATIC_DATA.years
        .map((value) => Number(value))
        .filter((year) => Number.isInteger(year))
    : [];
  if (localYears.length === 0) {
    return null;
  }

  const localYearIndex = new Map(localYears.map((year, index) => [year, index]));
  if (!localYearIndex.has(START_YEAR) || !localYearIndex.has(END_YEAR)) {
    return null;
  }

  const metricKeys = Object.keys(METRICS);
  const optionalLocalMetricKeys = new Set(["agingRate"]);
  const missingMetricKeys = [];

  for (const metricKey of metricKeys) {
    const localMetricBlock = localMetrics[metricKey];
    const hasLocalMetricBlock = localMetricBlock && typeof localMetricBlock === "object";
    if (!hasLocalMetricBlock && !optionalLocalMetricKeys.has(metricKey)) {
      return null;
    }
    if (!hasLocalMetricBlock) {
      missingMetricKeys.push(metricKey);
    }

    const valueMap = new Map();
    const sourceMap = new Map();

    COUNTRIES.forEach((country) => {
      const localCountryBlock = hasLocalMetricBlock ? localMetricBlock[country.code] || {} : {};
      const localValues = Array.isArray(localCountryBlock.values) ? localCountryBlock.values : [];
      const localSources = Array.isArray(localCountryBlock.sources) ? localCountryBlock.sources : [];

      const valueSeries = new Map();
      const sourceSeries = new Map();

      YEARS.forEach((year) => {
        const localIndex = localYearIndex.get(year);
        const rawValue = Number.isInteger(localIndex) ? localValues[localIndex] : null;
        const numericValue = isFiniteNumber(rawValue) ? rawValue : null;
        const source =
          Number.isInteger(localIndex) && typeof localSources[localIndex] === "string"
            ? localSources[localIndex]
            : "";
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

  applyRussiaDisposableCalibration();

  return {
    generatedAt: LOCAL_STATIC_DATA?.meta?.generatedAt || "",
    years: LOCAL_STATIC_DATA?.meta?.years || `${START_YEAR}-${END_YEAR}`,
    missingMetricKeys,
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

  let clearedEarlyPoints = 0;
  let cappedPoints = 0;
  YEARS.forEach((year) => {
    const current = valueSeries.get(year);
    if (!isFiniteNumber(current)) return;

    if (year < firstAnchorYear) {
      valueSeries.set(year, null);
      sourceSeries.set(year, "");
      clearedEarlyPoints += 1;
      return;
    }

    const nominal = nominalSeries.get(year);
    if (!isFiniteNumber(nominal) || nominal <= 0) return;

    const maxAllowed = nominal * capRatio;
    if (current > maxAllowed) {
      valueSeries.set(year, maxAllowed);
      sourceSeries.set(year, SOURCE_LABELS.rusDisposableCalibrated);
      cappedPoints += 1;
    }
  });

  const adjustedPoints = clearedEarlyPoints + cappedPoints;
  if (clearedEarlyPoints > 0) {
    warnings.push(
      `俄罗斯可支配收入在 ${firstAnchorYear} 年前缺少同口径官方值，已隐藏 ${clearedEarlyPoints} 个年份。`,
    );
  }
  if (cappedPoints > 0) {
    warnings.push(`俄罗斯可支配收入已校准 ${cappedPoints} 个年份，修正异常高值。`);
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

async function loadOwidFertilitySeriesMap() {
  const text = await fetchTextCached(OWID_FERTILITY_CSV_URL, "OWID 生育率");
  const rows = parseCsvRows(text);
  if (!Array.isArray(rows) || rows.length < 2) {
    throw new Error("OWID 生育率数据为空");
  }

  const header = rows[0];
  const codeIndex = header.findIndex((h) => h === "Code");
  const yearIndex = header.findIndex((h) => h === "Year");
  const valueIndex = header.findIndex((h) => /fertility/i.test(String(h || "")));
  if (codeIndex < 0 || yearIndex < 0 || valueIndex < 0) {
    throw new Error("OWID 生育率列格式异常");
  }

  const valueMap = emptyCountryMap();
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const code = row[codeIndex];
    if (!valueMap.has(code)) continue;

    const year = Number(row[yearIndex]);
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) continue;

    const value = toNumberSafe(row[valueIndex]);
    if (!isFiniteNumber(value) || value <= 0) continue;
    valueMap.get(code).set(year, value);
  }

  return valueMap;
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

async function loadImfDataMapperIndicator(indicator) {
  const payload = await fetchJsonCached(
    buildImfDataMapperUrlForIndicator(indicator),
    `IMF DataMapper ${indicator}`,
  );
  const indicatorBlock = payload?.values?.[indicator];
  if (!indicatorBlock || typeof indicatorBlock !== "object") {
    throw new Error(`IMF DataMapper 返回格式异常：${indicator}`);
  }

  const valueMap = emptyCountryMap();
  COUNTRIES.forEach((country) => {
    const series = indicatorBlock[country.code];
    valueMap.set(country.code, parseDataMapperSeries(series, payload));
  });

  return valueMap;
}

async function loadImfDataMapperMetric(metricKey) {
  const indicator = METRICS[metricKey].imfIndicator;
  if (!indicator) {
    throw new Error(`IMF DataMapper 指标未配置：${metricKey}`);
  }
  return loadImfDataMapperIndicator(indicator);
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

function backfillPppBefore1990FromMaddisonAnchored(maddisonMap) {
  let filledCount = 0;

  COUNTRIES.forEach((country) => {
    const valueSeries = state.byMetric.ppp.get(country.code);
    const sourceSeries = state.sourceByMetric.ppp.get(country.code);
    const fallbackSeries = maddisonMap?.get(country.code) ?? new Map();
    if (!valueSeries || !sourceSeries || !fallbackSeries) return;

    let anchorYear = null;
    for (let year = START_YEAR; year <= END_YEAR; year += 1) {
      const currentValue = valueSeries.get(year);
      if (isFiniteNumber(currentValue)) {
        anchorYear = year;
        break;
      }
    }

    if (!Number.isInteger(anchorYear)) return;
    const anchorValue = valueSeries.get(anchorYear);
    const maddisonAnchorValue = fallbackSeries.get(anchorYear);
    if (
      !isFiniteNumber(anchorValue) ||
      !isFiniteNumber(maddisonAnchorValue) ||
      maddisonAnchorValue <= 0
    ) {
      return;
    }

    for (let year = START_YEAR; year < 1990; year += 1) {
      if (isFiniteNumber(valueSeries.get(year))) continue;
      const maddisonValue = fallbackSeries.get(year);
      if (!isFiniteNumber(maddisonValue) || maddisonValue <= 0) continue;

      const bridgedValue = (anchorValue * maddisonValue) / maddisonAnchorValue;
      if (!isFiniteNumber(bridgedValue) || bridgedValue <= 0) continue;

      valueSeries.set(year, bridgedValue);
      sourceSeries.set(year, `${SOURCE_LABELS.maddisonAnchored}（${anchorYear}锚点）`);
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
        maddisonBackfillCount = backfillPppBefore1990FromMaddisonAnchored(maddisonMap);
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

async function applyPopulationTotalImfDataMapperOverride() {
  const warnings = [];
  let filledPoints = 0;
  let taiwanPoints = 0;

  try {
    const imfPopulationMap = await loadImfDataMapperIndicator(IMF_DATAMAPPER_POPULATION_INDICATOR);
    COUNTRIES.forEach((country) => {
      const valueSeries = state.byMetric.populationTotal.get(country.code);
      const sourceSeries = state.sourceByMetric.populationTotal.get(country.code);
      const imfSeries = imfPopulationMap.get(country.code) ?? new Map();
      if (!valueSeries || !sourceSeries) return;

      YEARS.forEach((year) => {
        const millions = imfSeries.get(year);
        if (!isFiniteNumber(millions) || millions <= 0) return;
        const persons = millions * 1_000_000;
        const hasWorldBankValue = isFiniteNumber(valueSeries.get(year));
        const shouldApply = country.code === "TWN" || !hasWorldBankValue || year >= END_YEAR - 1;
        if (!shouldApply) return;

        valueSeries.set(year, persons);
        sourceSeries.set(year, SOURCE_LABELS.imfPopulationLp);
        if (country.code === "TWN") {
          taiwanPoints += 1;
        } else {
          filledPoints += 1;
        }
      });
    });
  } catch (error) {
    warnings.push(error?.message || "人口总量 IMF DataMapper 覆盖失败");
  }

  return {
    warnings,
    filledPoints,
    taiwanPoints,
    ...calcMissingSummary("populationTotal"),
  };
}

function applyTaiwanPopulationPre1980Fallback() {
  const valueSeries = state.byMetric.populationTotal.get("TWN");
  const sourceSeries = state.sourceByMetric.populationTotal.get("TWN");
  if (!valueSeries || !sourceSeries) {
    return {
      filledPoints: 0,
      warnings: ["台湾人口补值失败：TWN 序列未初始化"],
      ...calcMissingSummary("populationTotal"),
    };
  }

  let filledPoints = 0;
  TAIWAN_WPP_POPULATION_PRE_1980.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    if (isFiniteNumber(valueSeries.get(year))) return;
    valueSeries.set(year, value);
    sourceSeries.set(year, SOURCE_LABELS.unWppPopulationTwnPre1980);
    filledPoints += 1;
  });

  return {
    filledPoints,
    warnings: [],
    ...calcMissingSummary("populationTotal"),
  };
}

function derivePopulationMetricsFromTotal() {
  const incrementValueMap = emptyCountryMap();
  const incrementSourceMap = emptyCountryMap();
  const growthValueMap = emptyCountryMap();
  const growthSourceMap = emptyCountryMap();
  let incrementPoints = 0;
  let growthPoints = 0;

  COUNTRIES.forEach((country) => {
    const totalSeries = state.byMetric.populationTotal.get(country.code) ?? new Map();
    const incrementSeries = incrementValueMap.get(country.code) ?? new Map();
    const incrementSources = incrementSourceMap.get(country.code) ?? new Map();
    const growthSeries = growthValueMap.get(country.code) ?? new Map();
    const growthSources = growthSourceMap.get(country.code) ?? new Map();

    YEARS.forEach((year) => {
      if (year <= START_YEAR) {
        incrementSeries.set(year, null);
        incrementSources.set(year, "");
        growthSeries.set(year, null);
        growthSources.set(year, "");
        return;
      }

      const current = totalSeries.get(year);
      const previous = totalSeries.get(year - 1);
      if (!isFiniteNumber(current) || !isFiniteNumber(previous)) {
        incrementSeries.set(year, null);
        incrementSources.set(year, "");
        growthSeries.set(year, null);
        growthSources.set(year, "");
        return;
      }

      const increment = current - previous;
      incrementSeries.set(year, increment);
      incrementSources.set(year, SOURCE_LABELS.derivedPopulationIncrement);
      incrementPoints += 1;

      if (previous > 0) {
        const growth = (increment / previous) * 100;
        growthSeries.set(year, growth);
        growthSources.set(year, SOURCE_LABELS.derivedPopulationGrowth);
        growthPoints += 1;
      } else {
        growthSeries.set(year, null);
        growthSources.set(year, "");
      }
    });
  });

  state.byMetric.populationIncrement = incrementValueMap;
  state.sourceByMetric.populationIncrement = incrementSourceMap;
  state.byMetric.populationGrowthRate = growthValueMap;
  state.sourceByMetric.populationGrowthRate = growthSourceMap;

  const incrementMissing = calcMissingSummary("populationIncrement");
  const growthMissing = calcMissingSummary("populationGrowthRate");

  return {
    incrementPoints,
    growthPoints,
    incrementMissing2025: incrementMissing.missing2025,
    growthMissing2025: growthMissing.missing2025,
  };
}

function deriveTotalPppFromPerCapitaAndPopulation() {
  let filledPoints = 0;

  COUNTRIES.forEach((country) => {
    const totalPppSeries = state.byMetric.totalPpp.get(country.code) ?? new Map();
    const totalPppSources = state.sourceByMetric.totalPpp.get(country.code) ?? new Map();
    const pppPerCapitaSeries = state.byMetric.ppp.get(country.code) ?? new Map();
    const populationSeries = state.byMetric.populationTotal.get(country.code) ?? new Map();

    YEARS.forEach((year) => {
      if (isFiniteNumber(totalPppSeries.get(year))) return;
      const pppPerCapita = pppPerCapitaSeries.get(year);
      const population = populationSeries.get(year);
      if (
        !isFiniteNumber(pppPerCapita) ||
        pppPerCapita <= 0 ||
        !isFiniteNumber(population) ||
        population <= 0
      ) {
        return;
      }

      totalPppSeries.set(year, pppPerCapita * population);
      totalPppSources.set(year, SOURCE_LABELS.derivedTotalPppFromPerCapitaPopulation);
      filledPoints += 1;
    });
  });

  return {
    filledPoints,
    warnings: [],
    ...calcMissingSummary("totalPpp"),
  };
}

function applyAgingRateUnFallback() {
  const valueSeriesByCountry = state.byMetric.agingRate;
  const sourceSeriesByCountry = state.sourceByMetric.agingRate;
  let taiwanSeriesPoints = 0;
  let recentFallbackPoints = 0;

  const twValueSeries = valueSeriesByCountry.get("TWN");
  const twSourceSeries = sourceSeriesByCountry.get("TWN");
  if (twValueSeries && twSourceSeries) {
    TAIWAN_UN_WPP_AGEING_RATE_SERIES.forEach((value, year) => {
      if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
      if (!isFiniteNumber(value) || value < 0) return;
      if (isFiniteNumber(twValueSeries.get(year))) return;
      twValueSeries.set(year, value);
      twSourceSeries.set(year, SOURCE_LABELS.unWppAgingRateTwnSeries);
      taiwanSeriesPoints += 1;
    });
  }

  [END_YEAR - 1, END_YEAR].forEach((year) => {
    if (year < START_YEAR || year > END_YEAR) return;
    COUNTRIES.forEach((country) => {
      const valueSeries = valueSeriesByCountry.get(country.code);
      const sourceSeries = sourceSeriesByCountry.get(country.code);
      if (!valueSeries || !sourceSeries) return;
      if (isFiniteNumber(valueSeries.get(year))) return;

      const map = year === END_YEAR ? UN_WPP_AGEING_RATE_2025 : UN_WPP_AGEING_RATE_2024;
      const sourceLabel =
        year === END_YEAR ? SOURCE_LABELS.unWppAgingRate2025 : SOURCE_LABELS.unWppAgingRate2024;
      const value = map.get(country.code);
      if (!isFiniteNumber(value) || value < 0) return;

      valueSeries.set(year, value);
      sourceSeries.set(year, sourceLabel);
      recentFallbackPoints += 1;
    });
  });

  return {
    warnings: [],
    taiwanSeriesPoints,
    recentFallbackPoints,
    ...calcMissingSummary("agingRate"),
  };
}

function applyUsaTradePre1970Fallback() {
  const importSeries = state.byMetric.imports.get("USA");
  const importSources = state.sourceByMetric.imports.get("USA");
  const exportSeries = state.byMetric.exports.get("USA");
  const exportSources = state.sourceByMetric.exports.get("USA");

  if (!importSeries || !importSources || !exportSeries || !exportSources) {
    return {
      importFilled: 0,
      exportFilled: 0,
      importsMissing2025: calcMissingSummary("imports").missing2025,
      exportsMissing2025: calcMissingSummary("exports").missing2025,
    };
  }

  let importFilled = 0;
  let exportFilled = 0;

  USA_FRED_IMPORTS_PRE_1970_USD.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    if (isFiniteNumber(importSeries.get(year))) return;
    importSeries.set(year, value);
    importSources.set(year, SOURCE_LABELS.fredUsImportsGoodsServicesSaar);
    importFilled += 1;
  });

  USA_FRED_EXPORTS_PRE_1970_USD.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    if (isFiniteNumber(exportSeries.get(year))) return;
    exportSeries.set(year, value);
    exportSources.set(year, SOURCE_LABELS.fredUsExportsGoodsServicesSaar);
    exportFilled += 1;
  });

  const importsMissing = calcMissingSummary("imports");
  const exportsMissing = calcMissingSummary("exports");

  return {
    importFilled,
    exportFilled,
    importsMissing2025: importsMissing.missing2025,
    exportsMissing2025: exportsMissing.missing2025,
  };
}

function applyFiscal2025ImfRatioFallback() {
  const targetYear = END_YEAR;
  let revenueFilled = 0;
  let expenditureFilled = 0;

  COUNTRIES.forEach((country) => {
    const code = country.code;
    const gdpSeries = state.byMetric.totalNominal.get(code) ?? new Map();
    const revenueSeries = state.byMetric.fiscalRevenue.get(code) ?? new Map();
    const revenueSources = state.sourceByMetric.fiscalRevenue.get(code) ?? new Map();
    const expenditureSeries = state.byMetric.fiscalExpenditure.get(code) ?? new Map();
    const expenditureSources = state.sourceByMetric.fiscalExpenditure.get(code) ?? new Map();

    const gdp = gdpSeries.get(targetYear);
    if (!isFiniteNumber(gdp) || gdp <= 0) return;

    const revenueRatio = IMF_FISCAL_RATIO_2025_REVENUE.get(code);
    if (!isFiniteNumber(revenueSeries.get(targetYear)) && isFiniteNumber(revenueRatio)) {
      revenueSeries.set(targetYear, (gdp * revenueRatio) / 100);
      revenueSources.set(targetYear, SOURCE_LABELS.derivedFiscalRevenueGgr);
      revenueFilled += 1;
    }

    const expenditureRatio = IMF_FISCAL_RATIO_2025_EXPENDITURE.get(code);
    if (!isFiniteNumber(expenditureSeries.get(targetYear)) && isFiniteNumber(expenditureRatio)) {
      expenditureSeries.set(targetYear, (gdp * expenditureRatio) / 100);
      expenditureSources.set(targetYear, SOURCE_LABELS.derivedFiscalExpenditureGx);
      expenditureFilled += 1;
    }
  });

  const revenueMissing = calcMissingSummary("fiscalRevenue");
  const expenditureMissing = calcMissingSummary("fiscalExpenditure");
  return {
    revenueFilled,
    expenditureFilled,
    revenueMissing2025: revenueMissing.missing2025,
    expenditureMissing2025: expenditureMissing.missing2025,
  };
}

function applyTaiwanFiscalRatioFallback() {
  const gdpSeries = state.byMetric.totalNominal.get("TWN");
  const revenueSeries = state.byMetric.fiscalRevenue.get("TWN");
  const revenueSources = state.sourceByMetric.fiscalRevenue.get("TWN");
  const expenditureSeries = state.byMetric.fiscalExpenditure.get("TWN");
  const expenditureSources = state.sourceByMetric.fiscalExpenditure.get("TWN");

  if (!gdpSeries || !revenueSeries || !revenueSources || !expenditureSeries || !expenditureSources) {
    return {
      revenueFilled: 0,
      expenditureFilled: 0,
      warnings: ["台湾财政补值失败：TWN 序列未初始化"],
      revenueMissing2025: calcMissingSummary("fiscalRevenue").missing2025,
      expenditureMissing2025: calcMissingSummary("fiscalExpenditure").missing2025,
    };
  }

  let revenueFilled = 0;
  let expenditureFilled = 0;

  TAIWAN_IMF_FISCAL_REVENUE_RATIO.forEach((ratio, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(ratio)) return;
    if (isFiniteNumber(revenueSeries.get(year))) return;
    const gdp = gdpSeries.get(year);
    if (!isFiniteNumber(gdp) || gdp <= 0) return;
    revenueSeries.set(year, (gdp * ratio) / 100);
    revenueSources.set(year, SOURCE_LABELS.derivedFiscalRevenueGgr);
    revenueFilled += 1;
  });

  TAIWAN_IMF_FISCAL_EXPENDITURE_RATIO.forEach((ratio, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(ratio)) return;
    if (isFiniteNumber(expenditureSeries.get(year))) return;
    const gdp = gdpSeries.get(year);
    if (!isFiniteNumber(gdp) || gdp <= 0) return;
    expenditureSeries.set(year, (gdp * ratio) / 100);
    expenditureSources.set(year, SOURCE_LABELS.derivedFiscalExpenditureGx);
    expenditureFilled += 1;
  });

  const revenueMissing = calcMissingSummary("fiscalRevenue");
  const expenditureMissing = calcMissingSummary("fiscalExpenditure");
  return {
    revenueFilled,
    expenditureFilled,
    warnings: [],
    revenueMissing2025: revenueMissing.missing2025,
    expenditureMissing2025: expenditureMissing.missing2025,
  };
}

function applyFertilityRecentUnWppFallback() {
  const targetYears = [END_YEAR - 1, END_YEAR];
  let filledPoints = 0;

  COUNTRIES.forEach((country) => {
    const valueSeries = state.byMetric.fertilityRate.get(country.code);
    const sourceSeries = state.sourceByMetric.fertilityRate.get(country.code);
    if (!valueSeries || !sourceSeries) return;

    targetYears.forEach((year) => {
      if (year < START_YEAR || year > END_YEAR) return;
      if (isFiniteNumber(valueSeries.get(year))) return;

      let value = null;
      let sourceLabel = "";
      if (year === END_YEAR - 1) {
        value = UN_WPP_FERTILITY_2024.get(country.code);
        sourceLabel = SOURCE_LABELS.unWppFertilityRate2024;
      } else if (year === END_YEAR) {
        value = UN_WPP_FERTILITY_2025.get(country.code);
        sourceLabel = SOURCE_LABELS.unWppFertilityRate2025;
      }

      if (!isFiniteNumber(value) || value <= 0) return;
      valueSeries.set(year, value);
      sourceSeries.set(year, sourceLabel);
      filledPoints += 1;
    });
  });

  return {
    filledPoints,
    warnings: [],
    ...calcMissingSummary("fertilityRate"),
  };
}

function applyTaiwanMilitaryHistoricalFallback() {
  const valueSeries = state.byMetric.militaryExpenditure.get("TWN");
  const sourceSeries = state.sourceByMetric.militaryExpenditure.get("TWN");
  if (!valueSeries || !sourceSeries) {
    return {
      filledPoints: 0,
      warnings: ["台湾军费历史补值失败：TWN 序列未初始化"],
      ...calcMissingSummary("militaryExpenditure"),
    };
  }

  let filledPoints = 0;
  TAIWAN_OWID_MILITARY_EXPENDITURE_USD.forEach((value, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(value) || value <= 0) return;
    if (isFiniteNumber(valueSeries.get(year))) return;
    valueSeries.set(year, value);
    sourceSeries.set(year, SOURCE_LABELS.owidMilitaryExpenditureTwn);
    filledPoints += 1;
  });

  return {
    filledPoints,
    warnings: [],
    ...calcMissingSummary("militaryExpenditure"),
  };
}

function applyTaiwanMilitaryRecentBudgetOverride() {
  const valueSeries = state.byMetric.militaryExpenditure.get("TWN");
  const sourceSeries = state.sourceByMetric.militaryExpenditure.get("TWN");
  if (!valueSeries || !sourceSeries) {
    return {
      overriddenPoints: 0,
      warnings: ["台湾军费预算覆盖失败：TWN 序列未初始化"],
      ...calcMissingSummary("militaryExpenditure"),
    };
  }

  const warnings = [];
  let overriddenPoints = 0;
  const budgetMap = new Map([
    [2024, TAIWAN_DEFENSE_BUDGET_2024_NTD],
    [2025, TAIWAN_DEFENSE_BUDGET_2025_NTD],
  ]);
  const labelMap = new Map([
    [2024, SOURCE_LABELS.twnDefenseBudget2024Official],
    [2025, SOURCE_LABELS.twnDefenseBudget2025Official],
  ]);

  budgetMap.forEach((budgetNtd, year) => {
    if (!Number.isInteger(year) || year < START_YEAR || year > END_YEAR) return;
    if (!isFiniteNumber(budgetNtd) || budgetNtd <= 0) return;
    const fxRate = TAIWAN_CBC_USD_TWD_ANNUAL_RATE.get(year);
    if (!isFiniteNumber(fxRate) || fxRate <= 0) {
      warnings.push(`台湾${year}军费预算覆盖失败：缺少新台币兑美元年均汇率。`);
      return;
    }
    const usdValue = budgetNtd / fxRate;
    if (!isFiniteNumber(usdValue) || usdValue <= 0) return;
    valueSeries.set(year, usdValue);
    sourceSeries.set(year, `${labelMap.get(year)} + ${SOURCE_LABELS.twnFxCbc}`);
    overriddenPoints += 1;
  });

  return {
    overriddenPoints,
    warnings,
    ...calcMissingSummary("militaryExpenditure"),
  };
}

function applyMilitary2025Fallback() {
  const warnings = [];
  const targetYear = END_YEAR;
  let scaledPoints = 0;
  let taiwanOfficialPoints = 0;
  let russiaSipriPoints = 0;

  COUNTRIES.forEach((country) => {
    const valueSeries = state.byMetric.militaryExpenditure.get(country.code);
    const sourceSeries = state.sourceByMetric.militaryExpenditure.get(country.code);
    const gdpSeries = state.byMetric.totalNominal.get(country.code) ?? new Map();
    if (!valueSeries || !sourceSeries) return;

    if (isFiniteNumber(valueSeries.get(targetYear))) return;

    if (country.code === "RUS") {
      if (
        isFiniteNumber(RUSSIA_SIPRI_MILITARY_EXPENDITURE_2025_USD) &&
        RUSSIA_SIPRI_MILITARY_EXPENDITURE_2025_USD > 0
      ) {
        valueSeries.set(targetYear, RUSSIA_SIPRI_MILITARY_EXPENDITURE_2025_USD);
        sourceSeries.set(targetYear, SOURCE_LABELS.sipriMilitaryExpenditureRus2025);
        russiaSipriPoints += 1;
      }
      return;
    }

    if (country.code === "TWN") {
      const fxRate = TAIWAN_CBC_USD_TWD_ANNUAL_RATE.get(targetYear);
      if (!isFiniteNumber(fxRate) || fxRate <= 0) {
        warnings.push("台湾2025军费补值失败：缺少新台币兑美元年均汇率。");
        return;
      }

      const usdValue = TAIWAN_DEFENSE_BUDGET_2025_NTD / fxRate;
      if (!isFiniteNumber(usdValue) || usdValue <= 0) return;
      valueSeries.set(targetYear, usdValue);
      sourceSeries.set(
        targetYear,
        `${SOURCE_LABELS.twnDefenseBudget2025Official} + ${SOURCE_LABELS.twnFxCbc}`,
      );
      taiwanOfficialPoints += 1;
      return;
    }

    let anchorYear = null;
    for (let year = targetYear - 1; year >= START_YEAR; year -= 1) {
      const candidate = valueSeries.get(year);
      if (isFiniteNumber(candidate) && candidate > 0) {
        anchorYear = year;
        break;
      }
    }
    if (!Number.isInteger(anchorYear)) return;

    const anchorMilitary = valueSeries.get(anchorYear);
    const anchorGdp = gdpSeries.get(anchorYear);
    const targetGdp = gdpSeries.get(targetYear);
    if (
      !isFiniteNumber(anchorMilitary) ||
      anchorMilitary <= 0 ||
      !isFiniteNumber(anchorGdp) ||
      anchorGdp <= 0 ||
      !isFiniteNumber(targetGdp) ||
      targetGdp <= 0
    ) {
      return;
    }

    const estimated = anchorMilitary * (targetGdp / anchorGdp);
    if (!isFiniteNumber(estimated) || estimated <= 0) return;
    valueSeries.set(targetYear, estimated);
    sourceSeries.set(
      targetYear,
      `${SOURCE_LABELS.derivedMilitaryExpenditureGdpScaled}（${anchorYear}→${targetYear}）`,
    );
    scaledPoints += 1;
  });

  return {
    warnings,
    scaledPoints,
    taiwanOfficialPoints,
    russiaSipriPoints,
    ...calcMissingSummary("militaryExpenditure"),
  };
}

function deriveTradeMetricsFromImportExport() {
  const tradeTotalValueMap = emptyCountryMap();
  const tradeTotalSourceMap = emptyCountryMap();
  const tradeBalanceValueMap = emptyCountryMap();
  const tradeBalanceSourceMap = emptyCountryMap();
  let tradeTotalPoints = 0;
  let tradeBalancePoints = 0;

  COUNTRIES.forEach((country) => {
    const importSeries = state.byMetric.imports.get(country.code) ?? new Map();
    const exportSeries = state.byMetric.exports.get(country.code) ?? new Map();
    const totalSeries = tradeTotalValueMap.get(country.code) ?? new Map();
    const totalSources = tradeTotalSourceMap.get(country.code) ?? new Map();
    const balanceSeries = tradeBalanceValueMap.get(country.code) ?? new Map();
    const balanceSources = tradeBalanceSourceMap.get(country.code) ?? new Map();

    YEARS.forEach((year) => {
      const importValue = importSeries.get(year);
      const exportValue = exportSeries.get(year);
      if (!isFiniteNumber(importValue) || !isFiniteNumber(exportValue)) {
        totalSeries.set(year, null);
        totalSources.set(year, "");
        balanceSeries.set(year, null);
        balanceSources.set(year, "");
        return;
      }

      totalSeries.set(year, importValue + exportValue);
      totalSources.set(year, SOURCE_LABELS.derivedTradeTotal);
      tradeTotalPoints += 1;

      balanceSeries.set(year, exportValue - importValue);
      balanceSources.set(year, SOURCE_LABELS.derivedTradeBalance);
      tradeBalancePoints += 1;
    });
  });

  state.byMetric.tradeTotal = tradeTotalValueMap;
  state.sourceByMetric.tradeTotal = tradeTotalSourceMap;
  state.byMetric.tradeBalance = tradeBalanceValueMap;
  state.sourceByMetric.tradeBalance = tradeBalanceSourceMap;

  const tradeTotalMissing = calcMissingSummary("tradeTotal");
  const tradeBalanceMissing = calcMissingSummary("tradeBalance");

  return {
    tradeTotalPoints,
    tradeBalancePoints,
    tradeTotalMissing2025: tradeTotalMissing.missing2025,
    tradeBalanceMissing2025: tradeBalanceMissing.missing2025,
  };
}

async function applyFiscalRevenueExpenditureFromImfDataMapper() {
  const warnings = [];
  const revenueValueMap = emptyCountryMap();
  const revenueSourceMap = emptyCountryMap();
  const expenditureValueMap = emptyCountryMap();
  const expenditureSourceMap = emptyCountryMap();
  let revenuePoints = 0;
  let expenditurePoints = 0;

  let revenueRatioMap = emptyCountryMap();
  let expenditureRatioMap = emptyCountryMap();
  let revenueRatioFallbackMap = emptyCountryMap();
  let expenditureRatioFallbackMap = emptyCountryMap();

  try {
    [revenueRatioMap, expenditureRatioMap] = await Promise.all([
      loadImfDataMapperIndicator("rev"),
      loadImfDataMapperIndicator("exp"),
    ]);
  } catch (error) {
    warnings.push(error?.message || "财政收入/开支 IMF DataMapper 加载失败");
  }

  try {
    [revenueRatioFallbackMap, expenditureRatioFallbackMap] = await Promise.all([
      loadImfDataMapperIndicator("GGR_G01_GDP_PT"),
      loadImfDataMapperIndicator("G_X_G01_GDP_PT"),
    ]);
  } catch (error) {
    warnings.push(error?.message || "财政收入/开支 IMF GFS DataMapper 加载失败");
  }

  COUNTRIES.forEach((country) => {
    const gdpSeries = state.byMetric.totalNominal.get(country.code) ?? new Map();
    const revenueRatioSeries = revenueRatioMap.get(country.code) ?? new Map();
    const expenditureRatioSeries = expenditureRatioMap.get(country.code) ?? new Map();
    const revenueRatioFallbackSeries = revenueRatioFallbackMap.get(country.code) ?? new Map();
    const expenditureRatioFallbackSeries = expenditureRatioFallbackMap.get(country.code) ?? new Map();
    const revenueSeries = revenueValueMap.get(country.code) ?? new Map();
    const revenueSources = revenueSourceMap.get(country.code) ?? new Map();
    const expenditureSeries = expenditureValueMap.get(country.code) ?? new Map();
    const expenditureSources = expenditureSourceMap.get(country.code) ?? new Map();

    YEARS.forEach((year) => {
      const gdp = gdpSeries.get(year);
      const revenueRatioPrimary = revenueRatioSeries.get(year);
      const revenueRatioFallback = revenueRatioFallbackSeries.get(year);
      const useRevenuePrimary = isFiniteNumber(revenueRatioPrimary);
      const revenueRatio = useRevenuePrimary ? revenueRatioPrimary : revenueRatioFallback;

      if (isFiniteNumber(gdp) && gdp > 0 && isFiniteNumber(revenueRatio)) {
        revenueSeries.set(year, (gdp * revenueRatio) / 100);
        revenueSources.set(
          year,
          useRevenuePrimary ? SOURCE_LABELS.derivedFiscalRevenue : SOURCE_LABELS.derivedFiscalRevenueGgr,
        );
        revenuePoints += 1;
      } else {
        revenueSeries.set(year, null);
        revenueSources.set(year, "");
      }

      const expenditureRatioPrimary = expenditureRatioSeries.get(year);
      const expenditureRatioFallback = expenditureRatioFallbackSeries.get(year);
      const useExpenditurePrimary = isFiniteNumber(expenditureRatioPrimary);
      const expenditureRatio = useExpenditurePrimary ? expenditureRatioPrimary : expenditureRatioFallback;

      if (isFiniteNumber(gdp) && gdp > 0 && isFiniteNumber(expenditureRatio)) {
        expenditureSeries.set(year, (gdp * expenditureRatio) / 100);
        expenditureSources.set(
          year,
          useExpenditurePrimary
            ? SOURCE_LABELS.derivedFiscalExpenditure
            : SOURCE_LABELS.derivedFiscalExpenditureGx,
        );
        expenditurePoints += 1;
      } else {
        expenditureSeries.set(year, null);
        expenditureSources.set(year, "");
      }
    });
  });

  state.byMetric.fiscalRevenue = revenueValueMap;
  state.sourceByMetric.fiscalRevenue = revenueSourceMap;
  state.byMetric.fiscalExpenditure = expenditureValueMap;
  state.sourceByMetric.fiscalExpenditure = expenditureSourceMap;

  const revenueMissing = calcMissingSummary("fiscalRevenue");
  const expenditureMissing = calcMissingSummary("fiscalExpenditure");

  return {
    warnings,
    revenuePoints,
    expenditurePoints,
    revenueMissing2025: revenueMissing.missing2025,
    expenditureMissing2025: expenditureMissing.missing2025,
  };
}

function deriveFiscalDeficitFromRevenueExpenditure() {
  const deficitValueMap = emptyCountryMap();
  const deficitSourceMap = emptyCountryMap();
  let deficitPoints = 0;

  COUNTRIES.forEach((country) => {
    const revenueSeries = state.byMetric.fiscalRevenue.get(country.code) ?? new Map();
    const expenditureSeries = state.byMetric.fiscalExpenditure.get(country.code) ?? new Map();
    const deficitSeries = deficitValueMap.get(country.code) ?? new Map();
    const deficitSources = deficitSourceMap.get(country.code) ?? new Map();

    YEARS.forEach((year) => {
      const revenue = revenueSeries.get(year);
      const expenditure = expenditureSeries.get(year);
      if (!isFiniteNumber(revenue) || !isFiniteNumber(expenditure)) {
        deficitSeries.set(year, null);
        deficitSources.set(year, "");
        return;
      }

      deficitSeries.set(year, expenditure - revenue);
      deficitSources.set(year, SOURCE_LABELS.derivedFiscalDeficit);
      deficitPoints += 1;
    });
  });

  state.byMetric.fiscalDeficit = deficitValueMap;
  state.sourceByMetric.fiscalDeficit = deficitSourceMap;
  const deficitMissing = calcMissingSummary("fiscalDeficit");

  return {
    deficitPoints,
    deficitMissing2025: deficitMissing.missing2025,
  };
}

async function applyFertilityOwidFallback() {
  const warnings = [];
  let filledPoints = 0;
  let taiwanPoints = 0;

  try {
    const owidValueMap = await loadOwidFertilitySeriesMap();
    COUNTRIES.forEach((country) => {
      const valueSeries = state.byMetric.fertilityRate.get(country.code);
      const sourceSeries = state.sourceByMetric.fertilityRate.get(country.code);
      const fallbackSeries = owidValueMap.get(country.code) ?? new Map();
      if (!valueSeries || !sourceSeries) return;

      fallbackSeries.forEach((value, year) => {
        if (!isFiniteNumber(value) || value <= 0) return;
        const hasValue = isFiniteNumber(valueSeries.get(year));
        const shouldApply = country.code === "TWN" || !hasValue;
        if (!shouldApply) return;

        valueSeries.set(year, value);
        sourceSeries.set(year, SOURCE_LABELS.owidFertilityRate);
        if (country.code === "TWN") {
          taiwanPoints += 1;
        } else {
          filledPoints += 1;
        }
      });
    });
  } catch (error) {
    warnings.push(error?.message || "生育率 OWID 补充失败");
  }

  return {
    warnings,
    filledPoints,
    taiwanPoints,
    ...calcMissingSummary("fertilityRate"),
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
    const color = country?.color || "#2f5d8a";

    return [
      {
        type: "bar",
        label: country?.name || countryCode,
        countryCode,
        data: rangeYears.map((year) => valueSeries.get(year) ?? null),
        sourceByYear: rangeYears.map((year) => sourceSeries.get(year) ?? ""),
        borderColor: color,
        backgroundColor: withAlpha(color, 0.68),
        borderWidth: 1,
        borderRadius: 2,
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
      borderWidth: 2.6,
      pointRadius: 1.8,
      pointHoverRadius: 3.8,
      pointHitRadius: 7,
      pointHoverBorderWidth: 2,
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: country.color,
      pointBackgroundColor: country.color,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 1.2,
      tension: 0,
      spanGaps: false,
      hidden: !state.visibleCountries.has(country.code),
    };
  });
}

function buildChart() {
  const rangeYears = getRangeYears();
  state.metricDisplayConfig = buildMetricDisplayConfig(state.metric, rangeYears);
  state.chart = new Chart(chartEl, {
    plugins: [lineEndLabelsPlugin, lineEdgeInteractionPlugin],
    type: "line",
    data: {
      labels: rangeYears,
      datasets: datasetsFor(state.metric, rangeYears),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          capBezierPoints: false,
        },
        point: {
          radius: 1.8,
        },
      },
      layout: {
        padding: {
          top: 40,
          right: 78,
        },
      },
      interaction: {
        mode: "index",
        intersect: true,
      },
      scales: {
        x: {
          title: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 28,
            maxRotation: 0,
            color: "#5d666e",
            padding: 10,
            font: {
              size: 11.5,
              weight: "500",
            },
            callback(value) {
              const label = this.getLabelForValue(value);
              const year = Number(label);
              if (!Number.isInteger(year)) return "";
              if (year === state.rangeStart || year === state.rangeEnd) return String(year);
              const tickStep = getYearTickStep();
              return year % tickStep === 0 ? String(year) : "";
            },
          },
          border: {
            display: true,
            color: "#90897f",
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          title: {
            display: false,
            text: getMetricAxisTitle(state.metric, state.metricDisplayConfig),
            color: "#3f4851",
            font: {
              size: 12,
              weight: "600",
            },
          },
          ticks: {
            color: "#566069",
            font: {
              size: 11.5,
              weight: "500",
            },
            callback(value) {
              return formatMetricValue(state.metric, Number(value), {
                displayConfig: state.metricDisplayConfig,
                forAxis: true,
              });
            },
          },
          grid: {
            color: "rgba(83, 90, 98, 0.24)",
            borderDash: [2, 4],
            lineWidth: 1,
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          position: "cursor",
          mode: "index",
          intersect: true,
          backgroundColor: "rgba(150, 198, 224, 0.78)",
          borderColor: "rgba(99, 153, 186, 0.9)",
          borderWidth: 1,
          titleColor: "#163547",
          bodyColor: "#163547",
          titleFont: {
            size: 12,
            weight: "700",
          },
          bodyFont: {
            size: 12,
            weight: "600",
          },
          padding: 10,
          displayColors: true,
          boxWidth: 9,
          boxHeight: 9,
          boxPadding: 5,
          usePointStyle: false,
          callbacks: {
            title(context) {
              return `年份：${context[0].label}`;
            },
            label(context) {
              return `${context.dataset.label}：${formatMetricValue(
                state.metric,
                context.parsed.y,
                { displayConfig: state.metricDisplayConfig },
              )}`;
            },
            labelColor(context) {
              const color = String(context.dataset.borderColor || "#ffffff");
              return {
                borderColor: color,
                backgroundColor: color,
                borderWidth: 0,
                borderRadius: 0,
              };
            },
          },
        },
      },
    },
  });
  updateMetricTitle(state.metric, state.metricDisplayConfig);
}

function refreshChartData(options = {}) {
  if (!state.chart) return;
  const { disableAnimation = false } = options;
  const rangeYears = getRangeYears();
  state.metricDisplayConfig = buildMetricDisplayConfig(state.metric, rangeYears);
  updateMetricTitle(state.metric, state.metricDisplayConfig);
  state.chart.data.labels = rangeYears;
  state.chart.data.datasets = datasetsFor(state.metric, rangeYears);
  state.chart.options.scales.y.title.text = getMetricAxisTitle(state.metric, state.metricDisplayConfig);
  state.chart.options.scales.x.offset = state.chartMode === "bar";
  state.chart.options.scales.x.bounds = state.chartMode === "bar" ? "ticks" : "data";
  state.chart.options.scales.x.grid.offset = state.chartMode === "bar";
  state.chart.options.interaction.mode = state.chartMode === "bar" ? "nearest" : "index";
  state.chart.options.interaction.intersect = true;
  state.chart.options.plugins.tooltip.mode = state.chartMode === "bar" ? "nearest" : "index";
  state.chart.options.plugins.tooltip.intersect = true;
  state.chart.update(disableAnimation ? "none" : undefined);
}

function applyYearRange(startYear, endYear, options = {}) {
  const { fromSlider = false } = options;
  const start = clampYear(startYear, state.rangeStart);
  const end = clampYear(endYear, state.rangeEnd);

  state.rangeStart = Math.min(start, end);
  state.rangeEnd = Math.max(start, end);

  updateRangeHint();
  if (fromSlider) {
    updateCustomRangeSliderUi();
  }
  refreshChartData({ disableAnimation: fromSlider });
  if (!fromSlider) {
    syncSliderFromRange();
  }
  updateDownloadButtonState();
}

function updateMetric(metricKey) {
  state.metric = metricKey;
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

      row.push(formatCsvMetricValue(metricKey, value));
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

async function downloadCurrentChartImage() {
  if (!state.loaded || !state.chart) return;
  if (downloadBtn) {
    downloadBtn.disabled = true;
  }

  try {
    const sourceCanvas = state.chart.canvas;
    const width = Math.max(
      1,
      Math.round(
        Number(chartWrapEl?.clientWidth) || Number(sourceCanvas?.clientWidth) || Number(sourceCanvas?.width) || 1,
      ),
    );
    const height = Math.max(
      1,
      Math.round(
        Number(chartWrapEl?.clientHeight) ||
          Number(sourceCanvas?.clientHeight) ||
          Number(sourceCanvas?.height) ||
          1,
      ),
    );
    const exportScale = resolveExportScale(width, height);

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = Math.round(width * exportScale);
    exportCanvas.height = Math.round(height * exportScale);
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) {
      throw new Error("无法创建导出画布");
    }
    ctx.scale(exportScale, exportScale);
    ctx.imageSmoothingEnabled = true;

    const wrapStyle = chartWrapEl ? window.getComputedStyle(chartWrapEl) : null;
    const borderWidth = parseCssPixels(wrapStyle?.borderTopWidth, 0);
    const borderRadius = parseCssPixels(wrapStyle?.borderTopLeftRadius, 0);
    const backgroundColor = wrapStyle?.backgroundColor || "#f9f6f0";
    const borderColor = wrapStyle?.borderTopColor || "transparent";

    const strokeInset = borderWidth / 2;
    traceRoundedRectPath(
      ctx,
      strokeInset,
      strokeInset,
      width - borderWidth,
      height - borderWidth,
      Math.max(0, borderRadius - strokeInset),
    );
    ctx.fillStyle = backgroundColor;
    ctx.fill();

    ctx.save();
    traceRoundedRectPath(
      ctx,
      borderWidth,
      borderWidth,
      width - borderWidth * 2,
      height - borderWidth * 2,
      Math.max(0, borderRadius - borderWidth),
    );
    ctx.clip();
    ctx.drawImage(sourceCanvas, 0, 0, width, height);
    ctx.restore();

    if (borderWidth > 0) {
      traceRoundedRectPath(
        ctx,
        strokeInset,
        strokeInset,
        width - borderWidth,
        height - borderWidth,
        Math.max(0, borderRadius - strokeInset),
      );
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }

    if (chartWrapEl && metricTitleEl && chartWrapEl.contains(metricTitleEl)) {
      const titleStyle = window.getComputedStyle(metricTitleEl);
      const left = parseCssPixels(titleStyle.left, 16);
      const right = parseCssPixels(titleStyle.right, 16);
      const top = parseCssPixels(titleStyle.top, 12);
      const maxWidth = Math.max(0, width - left - right);
      const fontSize = parseCssPixels(titleStyle.fontSize, 16);
      const fontWeight = titleStyle.fontWeight || "700";
      const fontFamily = titleStyle.fontFamily || "Manrope, 'Noto Sans SC', sans-serif";
      const textColor = titleStyle.color || "#1f2832";

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textBaseline = "top";
      const titleText = truncateTextToWidth(ctx, metricTitleEl.textContent || "", maxWidth);
      ctx.fillText(titleText, left, top, maxWidth);
    }

    await new Promise((resolve) => requestAnimationFrame(resolve));
    const dateStamp = new Date().toISOString().slice(0, 10);
    const filename = `macro-dashboard-${state.metric}-${state.rangeStart}-${state.rangeEnd}-${dateStamp}-${Math.round(width * exportScale)}w.png`;
    const dataUrl = exportCanvas.toDataURL("image/png", 1);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    setStatus(`下载高清图片失败：${error?.message || "未知错误"}`, true);
  } finally {
    updateDownloadButtonState();
  }
}

function updateDownloadButtonState() {
  if (downloadBtn) {
    downloadBtn.disabled = !state.loaded;
    downloadBtn.textContent = "下载数据图";
  }

  if (resetRangeBtn) {
    const isFullRange = state.rangeStart === START_YEAR && state.rangeEnd === END_YEAR;
    resetRangeBtn.disabled = !state.loaded || isFullRange;
  }
}

function findCountryToggleCheckbox(countryCode) {
  if (!togglesEl) return null;
  return togglesEl.querySelector(`input[type="checkbox"][data-country-code="${countryCode}"]`);
}

function setCountryVisibility(countryCode, visible, options = {}) {
  const { refresh = true, disableAnimation = true } = options;
  const isVisible = Boolean(visible);
  const previous = state.visibleCountries.has(countryCode);

  if (isVisible) {
    state.visibleCountries.add(countryCode);
  } else {
    state.visibleCountries.delete(countryCode);
  }

  const checkbox = findCountryToggleCheckbox(countryCode);
  if (checkbox) {
    checkbox.checked = isVisible;
  }

  if (refresh && previous !== isVisible) {
    updateChartModeControls();
    refreshChartData({ disableAnimation });
  }

  return previous !== isVisible;
}

function toggleCountryVisibility(countryCode, options = {}) {
  const nextVisible = !state.visibleCountries.has(countryCode);
  return setCountryVisibility(countryCode, nextVisible, options);
}

function createCountryToggle(country) {
  const label = document.createElement("label");
  label.className = "toggle-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.countryCode = country.code;
  checkbox.checked = state.visibleCountries.has(country.code);

  const dot = document.createElement("span");
  dot.className = "color-dot";
  dot.style.backgroundColor = country.color;

  const text = document.createElement("span");
  text.textContent = country.name;

  checkbox.addEventListener("change", () => {
    setCountryVisibility(country.code, checkbox.checked);
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
  refreshChartData({ disableAnimation: true });
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
      downloadCurrentChartImage();
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
  importsSummary,
  exportsSummary,
  tradeTotalSummary,
  tradeBalanceSummary,
  populationTotalSummary,
  populationIncrementSummary,
  populationGrowthSummary,
  agingSummary,
  fertilitySummary,
  fiscalRevenueSummary,
  fiscalExpenditureSummary,
  fiscalDeficitSummary,
  militarySummary,
  warningCount,
) {
  const nMissing = nominalSummary.missing2025.length;
  const pMissing = pppSummary.missing2025.length;
  const tnMissing = totalNominalSummary.missing2025.length;
  const tpMissing = totalPppSummary.missing2025.length;
  const dMissing = disposableSummary.missing2025.length;
  const importMissing = importsSummary.missing2025.length;
  const exportMissing = exportsSummary.missing2025.length;
  const tradeTotalMissing = tradeTotalSummary.missing2025.length;
  const tradeBalanceMissing = tradeBalanceSummary.missing2025.length;
  const popMissing = populationTotalSummary.missing2025.length;
  const popIncMissing = populationIncrementSummary.missing2025.length;
  const popGrowthMissing = populationGrowthSummary.missing2025.length;
  const agingMissing = agingSummary.missing2025.length;
  const fertilityMissing = fertilitySummary.missing2025.length;
  const fiscalRevenueMissing = fiscalRevenueSummary.missing2025.length;
  const fiscalExpenditureMissing = fiscalExpenditureSummary.missing2025.length;
  const fiscalDeficitMissing = fiscalDeficitSummary.missing2025.length;
  const militaryMissing = militarySummary.missing2025.length;
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
  const tradeText = `进口额 2025 缺失 ${importMissing} 个，出口额缺失 ${exportMissing} 个，进出口总额缺失 ${tradeTotalMissing} 个，贸易帐缺失 ${tradeBalanceMissing} 个`;
  const demographicText = `人口总量 2025 缺失 ${popMissing} 个，人口增量缺失 ${popIncMissing} 个，人口增速缺失 ${popGrowthMissing} 个，老龄化率缺失 ${agingMissing} 个，生育率缺失 ${fertilityMissing} 个`;
  const fiscalText = `财政收入 2025 缺失 ${fiscalRevenueMissing} 个，财政开支缺失 ${fiscalExpenditureMissing} 个，财政赤字缺失 ${fiscalDeficitMissing} 个，军费缺失 ${militaryMissing} 个`;

  if (warningCount > 0) {
    return `已加载（不使用趋势预测）：人均GDP Nominal 2025 缺失 ${nMissing} 个，人均GDP PPP 2025 缺失 ${pMissing} 个，GDP总量 Nominal 2025 缺失 ${tnMissing} 个，GDP总量 PPP 2025 缺失 ${tpMissing} 个，${disposableText}；${tradeText}；${demographicText}；${fiscalText}；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}；存在 ${warningCount} 条数据源警告。`;
  }

  if (
    nMissing === 0 &&
    pMissing === 0 &&
    tnMissing === 0 &&
    tpMissing === 0 &&
    dMissing === 0 &&
    disposableMissingAfter2021 === 0 &&
    popMissing === 0 &&
    popIncMissing === 0 &&
    popGrowthMissing === 0 &&
    agingMissing === 0 &&
    fertilityMissing === 0 &&
    importMissing === 0 &&
    exportMissing === 0 &&
    tradeTotalMissing === 0 &&
    tradeBalanceMissing === 0 &&
    fiscalRevenueMissing === 0 &&
    fiscalExpenditureMissing === 0 &&
    fiscalDeficitMissing === 0 &&
    militaryMissing === 0
  ) {
    return `加载完成：已按 世界银行优先 + IMF 补查，不使用趋势预测；${tradeText}；${demographicText}；${fiscalText}；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}。`;
  }

  return `已加载（不使用趋势预测）：人均GDP Nominal 2025 缺失 ${nMissing} 个，人均GDP PPP 2025 缺失 ${pMissing} 个，GDP总量 Nominal 2025 缺失 ${tnMissing} 个，GDP总量 PPP 2025 缺失 ${tpMissing} 个，${disposableText}；${tradeText}；${demographicText}；${fiscalText}；${oecdOverrideText}；${chinaOverrideText}；${usaOverrideText}；${taiwanOverrideText}；${pppBackfillText}。`;
}

async function init() {
  updateRangeHint();
  updateDownloadButtonState();

  const localDataMeta = loadLocalStaticDataIntoState();
  if (localDataMeta) {
    const taiwanPopulationFallbackSummary = applyTaiwanPopulationPre1980Fallback();
    const totalPppFallbackSummary = deriveTotalPppFromPerCapitaAndPopulation();
    derivePopulationMetricsFromTotal();
    const usaTradeFallbackSummary = applyUsaTradePre1970Fallback();
    deriveTradeMetricsFromImportExport();
    const fiscal2025FallbackSummary = applyFiscal2025ImfRatioFallback();
    const taiwanFiscalFallbackSummary = applyTaiwanFiscalRatioFallback();
    deriveFiscalDeficitFromRevenueExpenditure();
    const agingRateFallbackSummary = applyAgingRateUnFallback();
    const fertilityRecentFallbackSummary = applyFertilityRecentUnWppFallback();
    const taiwanMilitaryHistoricalSummary = applyTaiwanMilitaryHistoricalFallback();
    const taiwanMilitaryBudgetSummary = applyTaiwanMilitaryRecentBudgetOverride();
    const military2025FallbackSummary = applyMilitary2025Fallback();

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
    setStatus(
      `加载完成：已使用本地内置数据${generatedText}；台湾人口1960-1979补齐 ${taiwanPopulationFallbackSummary.filledPoints} 条，PPP总量历史补齐 ${totalPppFallbackSummary.filledPoints} 条；美国1960-1969外贸补齐 ${usaTradeFallbackSummary.importFilled + usaTradeFallbackSummary.exportFilled} 条，2025财政补齐 ${fiscal2025FallbackSummary.revenueFilled + fiscal2025FallbackSummary.expenditureFilled} 条，台湾财政补齐 ${taiwanFiscalFallbackSummary.revenueFilled + taiwanFiscalFallbackSummary.expenditureFilled} 条，老龄化率补齐 ${agingRateFallbackSummary.recentFallbackPoints + agingRateFallbackSummary.taiwanSeriesPoints} 条，2024-2025生育率补齐 ${fertilityRecentFallbackSummary.filledPoints} 条，台湾军费历史补齐 ${taiwanMilitaryHistoricalSummary.filledPoints} 条，台湾军费预算覆盖 ${taiwanMilitaryBudgetSummary.overriddenPoints} 条，2025军费补齐 ${military2025FallbackSummary.scaledPoints + military2025FallbackSummary.taiwanOfficialPoints + military2025FallbackSummary.russiaSipriPoints} 条。`,
    );

    if (Array.isArray(localDataMeta.missingMetricKeys) && localDataMeta.missingMetricKeys.includes("agingRate")) {
      loadMetric("agingRate")
        .then(() => {
          applyAgingRateUnFallback();
          if (state.metric === "agingRate") {
            refreshChartData();
          }
        })
        .catch((error) => {
          console.warn("老龄化率在线补载失败", error);
        });
    }
    return;
  }

  try {
    const [
      nominalSummary,
      pppSummary,
      totalNominalSummary,
      totalPppSummary,
      disposableSummary,
      importsSummary,
      exportsSummary,
      populationTotalSummary,
      agingSummary,
      fertilitySummary,
      militarySummary,
    ] = await Promise.all([
      loadMetric("nominal"),
      loadMetric("ppp"),
      loadMetric("totalNominal"),
      loadMetric("totalPpp"),
      loadMetric("disposableIncome"),
      loadMetric("imports"),
      loadMetric("exports"),
      loadMetric("populationTotal"),
      loadMetric("agingRate"),
      loadMetric("fertilityRate"),
      loadMetric("militaryExpenditure"),
    ]);
    const taiwanGdpSummary = await applyTaiwanGdpOverrides();
    const populationImfSummary = await applyPopulationTotalImfDataMapperOverride();
    const taiwanPopulationFallbackSummary = applyTaiwanPopulationPre1980Fallback();
    const populationDerivedSummary = derivePopulationMetricsFromTotal();
    const totalPppDerivedSummary = deriveTotalPppFromPerCapitaAndPopulation();
    const agingRateFallbackSummary = applyAgingRateUnFallback();
    const fertilityOwidSummary = await applyFertilityOwidFallback();
    const fertilityRecentSummary = applyFertilityRecentUnWppFallback();
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
    applyUsaTradePre1970Fallback();
    const tradeDerivedSummary = deriveTradeMetricsFromImportExport();
    const fiscalRatioSummary = await applyFiscalRevenueExpenditureFromImfDataMapper();
    applyFiscal2025ImfRatioFallback();
    const taiwanFiscalFallbackSummary = applyTaiwanFiscalRatioFallback();
    const fiscalDeficitSummary = deriveFiscalDeficitFromRevenueExpenditure();
    const taiwanMilitaryHistoricalSummary = applyTaiwanMilitaryHistoricalFallback();
    const taiwanMilitaryBudgetSummary = applyTaiwanMilitaryRecentBudgetOverride();
    const military2025FallbackSummary = applyMilitary2025Fallback();
    const nominalAfterTaiwanGdp = calcMissingSummary("nominal");
    const pppAfterTaiwanGdp = calcMissingSummary("ppp");
    const finalDisposableMissing = calcMissingSummary("disposableIncome");

    nominalSummary.missing2025 = nominalAfterTaiwanGdp.missing2025;
    nominalSummary.missingAfter2021Count = nominalAfterTaiwanGdp.missingAfter2021Count;
    pppSummary.missing2025 = pppAfterTaiwanGdp.missing2025;
    pppSummary.missingAfter2021Count = pppAfterTaiwanGdp.missingAfter2021Count;
    totalPppSummary.missing2025 = totalPppDerivedSummary.missing2025;
    totalPppSummary.missingAfter2021Count = totalPppDerivedSummary.missingAfter2021Count;

    nominalSummary.warnings.push(...taiwanGdpSummary.warnings);
    pppSummary.warnings.push(...taiwanGdpSummary.warnings);

    populationTotalSummary.missing2025 = taiwanPopulationFallbackSummary.missing2025;
    populationTotalSummary.missingAfter2021Count = taiwanPopulationFallbackSummary.missingAfter2021Count;
    populationTotalSummary.warnings.push(...populationImfSummary.warnings);
    populationTotalSummary.warnings.push(...taiwanPopulationFallbackSummary.warnings);
    agingSummary.missing2025 = agingRateFallbackSummary.missing2025;
    agingSummary.missingAfter2021Count = agingRateFallbackSummary.missingAfter2021Count;
    agingSummary.warnings.push(...agingRateFallbackSummary.warnings);

    fertilitySummary.missing2025 = fertilityRecentSummary.missing2025;
    fertilitySummary.missingAfter2021Count = fertilityRecentSummary.missingAfter2021Count;
    fertilitySummary.warnings.push(...fertilityOwidSummary.warnings);
    fertilitySummary.warnings.push(...fertilityRecentSummary.warnings);
    militarySummary.missing2025 = military2025FallbackSummary.missing2025;
    militarySummary.missingAfter2021Count = military2025FallbackSummary.missingAfter2021Count;
    militarySummary.warnings.push(...taiwanMilitaryHistoricalSummary.warnings);
    militarySummary.warnings.push(...taiwanMilitaryBudgetSummary.warnings);
    militarySummary.warnings.push(...military2025FallbackSummary.warnings);

    const populationIncrementSummary = {
      missing2025: populationDerivedSummary.incrementMissing2025,
      warnings: [],
    };
    const populationGrowthSummary = {
      missing2025: populationDerivedSummary.growthMissing2025,
      warnings: [],
    };
    const tradeTotalSummary = {
      missing2025: tradeDerivedSummary.tradeTotalMissing2025,
      warnings: [],
    };
    const tradeBalanceSummary = {
      missing2025: tradeDerivedSummary.tradeBalanceMissing2025,
      warnings: [],
    };
    const fiscalRevenueSummary = {
      missing2025: taiwanFiscalFallbackSummary.revenueMissing2025,
      warnings: fiscalRatioSummary.warnings || [],
    };
    const fiscalExpenditureSummary = {
      missing2025: taiwanFiscalFallbackSummary.expenditureMissing2025,
      warnings: [],
    };
    const fiscalDeficitMetricSummary = {
      missing2025: fiscalDeficitSummary.deficitMissing2025,
      warnings: [],
    };

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
      ...importsSummary.warnings,
      ...exportsSummary.warnings,
      ...populationTotalSummary.warnings,
      ...agingSummary.warnings,
      ...fertilitySummary.warnings,
      ...militarySummary.warnings,
      ...fiscalRevenueSummary.warnings,
    ];
    setStatus(
      summarizeStatus(
        nominalSummary,
        pppSummary,
        totalNominalSummary,
        totalPppSummary,
        disposableSummary,
        importsSummary,
        exportsSummary,
        tradeTotalSummary,
        tradeBalanceSummary,
        populationTotalSummary,
        populationIncrementSummary,
        populationGrowthSummary,
        agingSummary,
        fertilitySummary,
        fiscalRevenueSummary,
        fiscalExpenditureSummary,
        fiscalDeficitMetricSummary,
        militarySummary,
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
