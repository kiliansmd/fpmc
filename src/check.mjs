import {readFileSync,existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const routes=JSON.parse(readFileSync(join(root,'route-manifest.json'),'utf8'));
import {origin,indexable} from './config.mjs';
const errors=[],titles=new Set(),descriptions=new Set();
let localLinks=0,assets=0,schemas=0,socialCards=0;
function meta(html,key){return html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"\\n]*)"`))?.[1];}
function target(path){const file=join(root,path);return existsSync(file)&&statSync(file).isDirectory()?join(file,'index.html'):file;}
for(const route of routes){
 const file=target(route.path),html=readFileSync(file,'utf8');
 if(!indexable&&!html.includes('<meta name="robots" content="noindex, nofollow">'))errors.push(`${route.path}: noindex missing`);
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1],description=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
 if(!title||titles.has(title))errors.push(`${route.path}: missing or duplicate title`);titles.add(title);
 if(!description||descriptions.has(description))errors.push(`${route.path}: missing or duplicate description`);descriptions.add(description);
 const social = ['og:type','og:site_name','og:title','og:description','og:url','og:locale','og:image','og:image:secure_url','og:image:type','og:image:width','og:image:height','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'];
 for(const key of social){
   if(!meta(html,key))errors.push(`${route.path}: missing ${key}`);
   if([...html.matchAll(new RegExp(`<meta (?:name|property)="${key}"`, 'g'))].length!==1)errors.push(`${route.path}: duplicate ${key}`);
 }
 if(meta(html,'og:title')!==title||meta(html,'twitter:title')!==title)errors.push(`${route.path}: social title mismatch`);
 if(meta(html,'og:description')!==description||meta(html,'twitter:description')!==description)errors.push(`${route.path}: social description mismatch`);
 if(meta(html,'og:url')!==origin+route.path)errors.push(`${route.path}: social URL must match canonical`);
 const imageUrl=meta(html,'og:image');
 if(imageUrl!==origin+'/og.png'||meta(html,'twitter:image')!==imageUrl||meta(html,'og:image:secure_url')!==imageUrl)errors.push(`${route.path}: social image URL mismatch`);
 if(meta(html,'og:image:type')!=='image/png'||meta(html,'twitter:card')!=='summary_large_image')errors.push(`${route.path}: unsupported preview format`);
 if(meta(html,'og:image:alt')!==meta(html,'twitter:image:alt'))errors.push(`${route.path}: social alt mismatch`);
 const imageFile=target('/og.png');
 if(!existsSync(imageFile))errors.push('Social image missing');
 else{
   const png=readFileSync(imageFile);
   if(png.length<24||png.toString('hex',0,8)!=='89504e470d0a1a0a')errors.push('Social image is not PNG');
   else if(png.readUInt32BE(16)!==Number(meta(html,'og:image:width'))||png.readUInt32BE(20)!==Number(meta(html,'og:image:height')))errors.push(`${route.path}: declared social image dimensions do not match file`);
   if(png.length>5*1024*1024)errors.push('Social image exceeds 5 MB delivery budget');
 }
 socialCards++;
 if(/\p{Extended_Pictographic}|\p{Regional_Indicator}|\uFE0F/u.test(html.slice(html.indexOf('<body')).replaceAll('©','')))errors.push(`${route.path}: emoji-capable UI glyph; use a vector icon`);
 for(const icon of html.matchAll(/<span class="arrow"[^>]*>(.*?)<\/span>/gs))if(!icon[1].includes('<svg'))errors.push(`${route.path}: non-vector arrow`);
 if((html.match(/<h1\b/g)||[]).length!==1)errors.push(`${route.path}: expected one h1`);
 if(!html.includes('<html lang="de"'))errors.push(`${route.path}: language missing`);
 if(!html.includes(`rel="canonical" href="${origin}${route.path}"`))errors.push(`${route.path}: canonical mismatch`);
 for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){try{
   const nodes=JSON.parse(match[1]);schemas++;
   const webpage=nodes.find(node=>['WebPage','ContactPage','AboutPage','CollectionPage'].includes(node['@type']));
   if(!webpage||webpage.url!==origin+route.path||webpage.primaryImageOfPage?.contentUrl!==imageUrl)errors.push(`${route.path}: WebPage structured data mismatch`);
   const organization=nodes.find(node=>node['@type']==='Organization');
   if(organization?.logo!==origin+'/assets/logo.svg')errors.push(`${route.path}: organization logo missing`);
   if(route.path==='/'&&!nodes.some(node=>node['@type']==='WebSite'&&node.name==='FPMC'&&node.url===origin+'/'))errors.push('Homepage WebSite schema missing');
   if(html.includes('data-video=')&&!nodes.some(node=>node['@type']==='VideoObject'&&node['@id']&&node.embedUrl))errors.push(`${route.path}: video schema missing`);
 }catch{errors.push(`${route.path}: invalid structured data`);}}
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
console.log(JSON.stringify({result:'PASS',pages:routes.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,localLinks,assetReferences:assets,validJsonLdBlocks:schemas,completeSocialCards:socialCards},null,2));
