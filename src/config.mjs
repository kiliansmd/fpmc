import {readFileSync} from 'node:fs';
const config=JSON.parse(readFileSync(new URL('../site.config.json',import.meta.url),'utf8'));
// Vercel supplies the stable production hostname, including during preview builds.
export const origin=process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL
  : config.origin;
export const indexable=config.indexable===true;
