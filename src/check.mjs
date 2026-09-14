import {readFileSync,existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const routes=JSON.parse(readFileSync(join(root,'route-manifest.json'),'utf8'));
import {origin,indexable} from './config.mjs';
const errors=[],titles=new Set(),descriptions=new Set();
let localLinks=0,assets=0,schemas=0;
function target(path){const file=join(root,path);return existsSync(file)&&statSync(file).isDirectory()?join(file,'index.html'):file;}
for(const route of routes){
 const file=target(route.path),html=readFileSync(file,'utf8');
 if(!indexable&&!html.includes('<meta name="robots" content="noindex, nofollow">'))errors.push(`${route.path}: noindex missing`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 if(!title||titles.has(title))errors.push(`${route.path}: missing or duplicate title`);titles.add(title);
 if(!description||descriptions.has(description))errors.push(`${route.path}: missing or duplicate description`);descriptions.add(description);
 if((html.match(/<h1\b/g)||[]).length!==1)errors.push(`${route.path}: expected one h1`);
 if(!html.includes('<html lang="de"'))errors.push(`${route.path}: language missing`);
 if(!html.includes(`rel="canonical" href="${origin}${route.path}"`))errors.push(`${route.path}: canonical mismatch`);
 for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{JSON.parse(match[1]);schemas++;}catch{errors.push(`${route.path}: invalid structured data`);}}
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const raw=match[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|tel:|data:)/.test(raw))continue;
   const url=new URL(raw,origin+route.path),dest=target(url.pathname);
   if(!existsSync(dest)){errors.push(`${route.path}: missing ${raw}`);continue;}
   if(url.pathname.startsWith('/assets/'))assets++;else localLinks++;
   if(url.hash&&dest.endsWith('.html')){const content=readFileSync(dest,'utf8'),id=decodeURIComponent(url.hash.slice(1));if(!content.includes(`id="${id}"`))errors.push(`${route.path}: missing anchor ${raw}`);}
 }
 for(const match of html.matchAll(/<img\b([^>]+)>/g)){if(!/\balt="/.test(match[1]))errors.push(`${route.path}: image without alt`);}
 for(const nav of ['Projekte','Leistungen','Studio','Label','Projekt anfragen'])if(!html.includes(nav))errors.push(`${route.path}: missing nav ${nav}`);
}
const css=readFileSync(join(root,'assets/styles.css'),'utf8');
for(const m of css.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g))if(!existsSync(target(m[1])))errors.push(`CSS: missing ${m[1]}`);
const sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');
for(const route of routes)if(!sitemap.includes(`${origin}${route.path}</loc>`))errors.push(`Sitemap missing ${route.path}`);
if(indexable&&!readFileSync(join(root,'robots.txt'),'utf8').includes(`Sitemap: ${origin}/sitemap.xml`))errors.push('Robots sitemap declaration missing');
if(!indexable){
 if(!readFileSync(join(root,'404.html'),'utf8').includes('<meta name="robots" content="noindex, nofollow">'))errors.push('404 noindex missing');
 const robots=readFileSync(join(root,'robots.txt'),'utf8');
 if(!robots.includes('Allow: /')||robots.includes('Disallow: /'))errors.push('Crawlers must be able to read noindex');
 const hosting=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
 if(!hosting.headers?.some(rule=>rule.source==='/(.*)'&&rule.headers.some(header=>header.key==='X-Robots-Tag'&&header.value.includes('noindex'))))errors.push('Vercel noindex header missing');
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(JSON.stringify({result:'PASS',pages:routes.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,localLinks,assetReferences:assets,validJsonLdBlocks:schemas},null,2));
