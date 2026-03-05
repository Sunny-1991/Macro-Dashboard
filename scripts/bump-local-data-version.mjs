import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

function buildDefaultVersion() {
  const iso = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 12);
  return `auto-${iso}`;
}

function main() {
  const version = (process.env.LOCAL_DATA_VERSION || '').trim() || buildDefaultVersion();
  const source = fs.readFileSync(INDEX_PATH, 'utf8');
  const pattern = /gdp-local-data\.js\?v=[^"]+/;

  if (!pattern.test(source)) {
    throw new Error('Cannot find gdp-local-data.js version string in index.html');
  }

  const replaced = source.replace(pattern, `gdp-local-data.js?v=${version}`);
  if (replaced === source) {
    console.log('Local data version unchanged.');
    return;
  }

  fs.writeFileSync(INDEX_PATH, replaced, 'utf8');
  console.log(`Updated gdp-local-data.js asset version: ${version}`);
}

main();
