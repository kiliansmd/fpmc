import http from 'node:http';
import {createReadStream,statSync,existsSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
const port=Number(process.env.PORT||4179);
const redirects={'/arbeit':'/projekte/','/connect':'/kontakt/','/v0':'/','/v1':'/'};
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2'};
http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  let path;try{path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const normalized=path==='/'?'/':path.replace(/\/$/,'');
  if(redirects[normalized]){res.writeHead(301,{Location:redirects[normalized]});res.end();return;}
  let file=resolve(root,'.'+path);
  if(file!==root.slice(0,-1)&&!file.startsWith(root)){res.writeHead(403);res.end();return;}
  let status=200;
  try{
    if(existsSync(file)&&statSync(file).isDirectory()){
      if(!path.endsWith('/')){res.writeHead(301,{Location:path+'/'});res.end();return;}
      file=resolve(file,'index.html');
    }
    if(!existsSync(file)||!statSync(file).isFile()){file=resolve(root,'404.html');status=404;}
    const stat=statSync(file),headers={'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-cache','X-Robots-Tag':'noindex, nofollow','Accept-Ranges':'bytes'};
    const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if(range&&status===200){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),stat.size-1):stat.size-1;if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);return;}
    res.writeHead(status,{...headers,'Content-Length':stat.size});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
  }catch{res.writeHead(500);res.end('Die Seite konnte nicht geladen werden.');}
}).listen(port,'127.0.0.1',()=>console.log(`FPMC lokal: http://localhost:${port}`));
