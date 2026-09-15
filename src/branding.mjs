import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

export const brandLogo = Object.freeze({
  path: '/assets/fpmc-studio.svg', width: 2020, height: 300,
  icon: '/assets/fpmc-studio-icon.svg'
});
export const socialImage = Object.freeze({
  path: '/social/fpmc-studio.png', width: 1738, height: 905,
  type: 'image/png',
  alt: 'FPMC Studio – weiße Wortmarke auf schwarzem Hintergrund im Licht eines Filmscheinwerfers.'
});

// The original uploads are versioned as text. No binary build output belongs in Git.
export function buildBranding(output) {
  const source = name => Buffer.from(readFileSync(new URL(`./branding/${name}.png.base64`, import.meta.url), 'utf8').replace(/\s/g, ''), 'base64');
  const logo = source('logo');
  const social = source('social');
  for (const [name, bytes, width, height] of [['logo', logo, 2172, 724], ['social', social, 1738, 905]]) {
    if (bytes.length < 24 || bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a' || bytes.readUInt32BE(16) !== width || bytes.readUInt32BE(20) !== height) {
      throw new Error(`Invalid ${name} PNG source`);
    }
  }
  const image = `<image width="2172" height="724" href="data:image/png;base64,${logo.toString('base64')}"/>`;
  const write = (path, content) => writeFileSync(join(output, path), content);
  mkdirSync(join(output, 'assets'), {recursive: true});
  mkdirSync(join(output, 'social'), {recursive: true});
  // Trim only empty space via the viewBox; retain the supplied pixels and texture.
  write(brandLogo.path, `<svg xmlns="http://www.w3.org/2000/svg" width="2020" height="300" viewBox="68 214 2020 300"><title>FPMC Studio</title>${image}</svg>\n`);
  // The original F remains legible at favicon sizes where STUDIO would be too small.
  write(brandLogo.icon, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="75 215 250 292"><title>FPMC Studio</title><path fill="#080808" d="M75 215h250v292H75z"/>${image}</svg>\n`);
  write(socialImage.path, social);
}
