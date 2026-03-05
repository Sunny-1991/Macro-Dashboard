import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SCRIPT_PATH = path.join(ROOT, 'gdp-script.js');
const OUTPUT_PATH = path.join(ROOT, 'gdp-local-data.js');

function createElementStub(id = '') {
  return {
    id,
    style: {},
    textContent: '',
    innerHTML: '',
    disabled: false,
    checked: false,
    value: '',
    className: '',
    noUiSlider: null,
    appendChild() {},
    append() {},
    removeChild() {},
    addEventListener() {},
    removeEventListener() {},
    querySelectorAll() {
      return [];
    },
    closest() {
      return null;
    },
    click() {},
    setAttribute() {},
  };
}

function buildContext() {
  const elements = new Map();
  const metricInputs = [
    { checked: false, value: 'nominal', addEventListener() {} },
    { checked: false, value: 'ppp', addEventListener() {} },
    { checked: false, value: 'totalNominal', addEventListener() {} },
    { checked: false, value: 'totalPpp', addEventListener() {} },
    { checked: true, value: 'disposableIncome', addEventListener() {} },
    { checked: false, value: 'imports', addEventListener() {} },
    { checked: false, value: 'exports', addEventListener() {} },
    { checked: false, value: 'tradeTotal', addEventListener() {} },
    { checked: false, value: 'tradeBalance', addEventListener() {} },
    { checked: false, value: 'populationTotal', addEventListener() {} },
    { checked: false, value: 'populationIncrement', addEventListener() {} },
    { checked: false, value: 'populationGrowthRate', addEventListener() {} },
    { checked: false, value: 'agingRate', addEventListener() {} },
    { checked: false, value: 'fertilityRate', addEventListener() {} },
    { checked: false, value: 'fiscalRevenue', addEventListener() {} },
    { checked: false, value: 'fiscalExpenditure', addEventListener() {} },
    { checked: false, value: 'fiscalDeficit', addEventListener() {} },
    { checked: false, value: 'militaryExpenditure', addEventListener() {} },
  ];

  const documentStub = {
    getElementById(id) {
      if (!elements.has(id)) {
        elements.set(id, createElementStub(id));
      }
      return elements.get(id);
    },
    querySelectorAll(selector) {
      if (selector === 'input[name="gdpMetric"]') {
        return metricInputs;
      }
      return [];
    },
    createElement(tag) {
      return createElementStub(tag);
    },
    body: {
      appendChild() {},
      removeChild() {},
    },
  };

  class FakeChart {
    constructor(el, config = {}) {
      this.el = el;
      this.data = {
        labels: Array.isArray(config?.data?.labels) ? [...config.data.labels] : [],
        datasets: Array.isArray(config?.data?.datasets)
          ? config.data.datasets.map((item) => ({ ...item }))
          : [],
      };
      this.options = config?.options ? { ...config.options } : {};
      this.scales = {
        x: { left: 0, right: 100, top: 0, bottom: 20 },
      };
    }

    update() {}

    setDatasetVisibility(index, visible) {
      const dataset = this.data?.datasets?.[index];
      if (dataset) {
        dataset.hidden = !visible;
      }
    }
  }

  const context = {
    console,
    fetch,
    Intl,
    URL,
    Blob,
    setTimeout,
    clearTimeout,
    TextEncoder,
    TextDecoder,
    document: documentStub,
    Chart: FakeChart,
  };

  context.addEventListener = () => {};
  context.removeEventListener = () => {};
  context.requestAnimationFrame = (callback) => {
    if (typeof callback === 'function') {
      return setTimeout(() => callback(Date.now()), 0);
    }
    return 0;
  };
  context.cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };
  context.window = context;
  context.globalThis = context;
  return context;
}

function buildLocalPayload(exportsObj) {
  const { YEARS, COUNTRIES, METRICS, state } = exportsObj;
  const metricKeys = Object.keys(METRICS);

  const metrics = {};
  for (const metricKey of metricKeys) {
    const byCountry = {};
    for (const country of COUNTRIES) {
      const valueSeries = state.byMetric?.[metricKey]?.get(country.code) ?? new Map();
      const sourceSeries = state.sourceByMetric?.[metricKey]?.get(country.code) ?? new Map();

      const values = YEARS.map((year) => {
        const value = valueSeries.get(year);
        return Number.isFinite(value) ? value : null;
      });
      const sources = YEARS.map((year) => {
        const source = sourceSeries.get(year);
        return typeof source === 'string' ? source : '';
      });

      byCountry[country.code] = { values, sources };
    }
    metrics[metricKey] = byCountry;
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      years: `${exportsObj.START_YEAR}-${exportsObj.END_YEAR}`,
      countries: COUNTRIES.map((item) => item.code),
      metricKeys,
      note: 'Local snapshot generated from dashboard source pipeline (World Bank + IMF + OECD + local official overrides).',
    },
    years: YEARS,
    countries: COUNTRIES,
    metrics,
  };
}

function parseExistingPayload() {
  if (!fs.existsSync(OUTPUT_PATH)) return null;

  const raw = fs.readFileSync(OUTPUT_PATH, 'utf8');
  const match = raw.match(/^window\.GDP_DASHBOARD_LOCAL_DATA\s*=\s*([\s\S]*?)\s*;\s*$/);
  if (!match) {
    return null;
  }

  try {
    return {
      raw,
      payload: JSON.parse(match[1]),
    };
  } catch (error) {
    console.warn(`Failed to parse existing local payload: ${error?.message || error}`);
    return null;
  }
}

function comparablePayload(payload) {
  const clone = JSON.parse(JSON.stringify(payload));
  if (clone?.meta) {
    clone.meta.generatedAt = null;
  }
  return clone;
}

function hasDataChanges(previousPayload, nextPayload) {
  if (!previousPayload) return true;
  const prevComparable = comparablePayload(previousPayload);
  const nextComparable = comparablePayload(nextPayload);
  return JSON.stringify(prevComparable) !== JSON.stringify(nextComparable);
}

async function main() {
  let source = fs.readFileSync(SCRIPT_PATH, 'utf8');

  source = source.replace(/\ninit\(\);\s*$/m, '\n');
  source += '\n;globalThis.__GDP_EXPORTS__ = { START_YEAR, END_YEAR, YEARS, COUNTRIES, METRICS, state, init };\n';

  const context = buildContext();
  const vmContext = vm.createContext(context);
  const script = new vm.Script(source, { filename: 'gdp-script.js' });
  script.runInContext(vmContext);

  const exportsObj = vmContext.__GDP_EXPORTS__;
  if (!exportsObj || typeof exportsObj.init !== 'function') {
    throw new Error('Failed to bootstrap gdp-script exports');
  }

  await exportsObj.init();
  const payload = buildLocalPayload(exportsObj);
  const existing = parseExistingPayload();
  const dataChanged = hasDataChanges(existing?.payload, payload);

  if (!dataChanged && existing?.payload?.meta?.generatedAt) {
    payload.meta.generatedAt = existing.payload.meta.generatedAt;
  }

  const output = `window.GDP_DASHBOARD_LOCAL_DATA = ${JSON.stringify(payload)};\n`;
  const shouldWrite = dataChanged || !existing?.raw || existing.raw !== output;

  if (shouldWrite) {
    fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
    console.log(`Local data generated: ${OUTPUT_PATH}`);
  } else {
    console.log('No metric/source updates detected; local snapshot unchanged.');
  }
  console.log(`Countries: ${payload.countries.length}, metrics: ${Object.keys(payload.metrics).length}, years: ${payload.years.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
