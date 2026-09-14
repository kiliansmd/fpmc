import {origin} from './config.mjs';

// One crop-safe brand image; each shared route keeps its own title and description.
export const socialImage = Object.freeze({
  path: '/og.png',
  width: 1738,
  height: 905,
  type: 'image/png',
  alt: 'FPMC – FILM. SOUND. Weiße Wortmarke vor schwarzem Hintergrund und einem filmischen Lichtkegel.'
});

const esc = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));

export function socialMeta(path, title, description) {
  const image = origin + socialImage.path;
  const properties = {
    'og:type':'website',
    'og:site_name':'FPMC',
    'og:title':title,
    'og:description':description,
    'og:url':origin + path,
    'og:locale':'de_DE',
    'og:image':image,
    'og:image:secure_url':image,
    'og:image:type':socialImage.type,
    'og:image:width':socialImage.width,
    'og:image:height':socialImage.height,
    'og:image:alt':socialImage.alt
  };
  const names = {
    'twitter:card':'summary_large_image',
    'twitter:title':title,
    'twitter:description':description,
    'twitter:image':image,
    'twitter:image:alt':socialImage.alt
  };
  return [
    ...Object.entries(properties).map(([key,value])=>`<meta property="${key}" content="${esc(value)}">`),
    ...Object.entries(names).map(([key,value])=>`<meta name="${key}" content="${esc(value)}">`)
  ].join('\n');
}

export function siteStructuredData(path, title, description, org, extra) {
  const canonical = origin + path;
  const breadcrumb = extra.find(node => node['@type'] === 'BreadcrumbList');
  const video = extra.find(node => node['@type'] === 'VideoObject');
  const pageTypes = {
    '/kontakt/':'ContactPage', '/studio/':'AboutPage',
    '/projekte/':'CollectionPage', '/leistungen/':'CollectionPage', '/label/':'CollectionPage'
  };
  const page = {
    '@context':'https://schema.org', '@type':pageTypes[path] || 'WebPage',
    '@id':canonical + '#webpage', url:canonical, name:title, description,
    inLanguage:'de-DE', isPartOf:{'@id':origin + '/#website'},
    about:{'@id':org['@id']},
    primaryImageOfPage:{
      '@type':'ImageObject', '@id':origin + '/#social-image',
      contentUrl:origin + socialImage.path, url:origin + socialImage.path,
      width:socialImage.width, height:socialImage.height, caption:socialImage.alt
    },
    ...(breadcrumb ? {breadcrumb:{'@id':canonical + '#breadcrumb'}} : {}),
    ...(video ? {video:{'@id':video['@id']}} : {})
  };
  const website = {
    '@context':'https://schema.org', '@type':'WebSite', '@id':origin + '/#website',
    url:origin + '/', name:'FPMC', alternateName:'Film Production Music Club',
    inLanguage:'de-DE', publisher:{'@id':org['@id']}
  };
  return [
    {...org,logo:origin + '/assets/logo.svg'},
    ...(path === '/' ? [website] : []),
    page,
    ...extra.map(node=>node === breadcrumb ? {...node,'@id':canonical + '#breadcrumb'} : node)
  ];
}
