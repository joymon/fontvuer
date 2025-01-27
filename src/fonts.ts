import fontkit, { Font } from 'fontkit';
import Store from 'electron-store';
import { log } from 'console';
import getSystemFonts from 'get-system-fonts';
import { FontDescriptor, FontFamily, Postscript } from './types';

const estore = new Store();
// if (FontManager) {
//   const systemFontsManager = FontManager();
//   console.log('FontManager created');
//   systemFontsManager.getFontsExtended();
// } else {
//   console.log('FontManager not found');
// }
const getFontDescripters = async (): Promise<FontDescriptor[]> => {
  const fontDescripters: FontDescriptor[] = [] as FontDescriptor[];
  console.log('start getFontDescripters()');
  const systemFonts = await getSystemFonts();
  console.log('systemFonts length', systemFonts.length);

  systemFonts.forEach((fontPath) => {
    try {
      const font: Font = fontkit.openSync(fontPath);
      fontDescripters.push({
        family: font.familyName,
        path: fontPath,
        postscriptName: font.postscriptName,
        italic: font.italicAngle !== 0,
        style: font.italicAngle !== 0 ? 'italic' : 'normal',
      } as FontDescriptor);
    } catch (error) {
      console.error(`Error loading font from path ${fontPath}:`, error);
    }
  });
  //   .sort((a, b) => ((a.postscriptName < b.postscriptName) ? -1 : 1));
  return fontDescripters;
};

const errorBuf2Str = (buf: Buffer) => Array(buf.length)
  .fill(0)
  .map((_, i) => (((buf as Buffer)[i] !== 0) ? Buffer.from([buf[i]]).toString() : ''))
  .join('');
function getFamilyNameFromFontFile(fd: FontDescriptor) {
  let altFamilyName: string | Buffer | undefined;
  try {
    const font: Font = fontkit.openSync(fd.path);
    altFamilyName = font.familyName as string | Buffer;

    if (altFamilyName instanceof Buffer) altFamilyName = errorBuf2Str(altFamilyName);
  } catch (e) { altFamilyName = undefined; }
  return altFamilyName;
}

export const getFontListFromManager = async (): Promise<FontFamily[]> => {
  const result = await getFontDescripters();
  const filteredFonts = result.reduce((families, fd) => {
    const family = families.find((obj) => obj.family === fd.family);
    log('getFontListFromManager started');
    // already exists font family
    if (family) {
      family.postscripts.push({
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width,
      } as Postscript);
      family.postscripts.sort();
      return families;
    }
    // new family
    const altFamilyName: string | Buffer | undefined = getFamilyNameFromFontFile(fd);
    families.push({
      family: fd.family,
      altFamilyName,
      favorite: false,
      postscripts: [{
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width,
      } as Postscript],
    });
    return families;
  }, [] as FontFamily[]);
  return filteredFonts;
};

export const getFavFonts = (): string[] => estore.get('favFonts', []);

export const getFavFontIndex = (fontFamilyName: string): number => getFavFonts()
  .findIndex((favFontFamilyName) => favFontFamilyName === fontFamilyName);

export const isFavFont = (fontFamilyName: string): boolean => getFavFontIndex(fontFamilyName) >= 0;

export const saveFavFonts = (fontFamilyName: string, val: boolean): void => {
  const favFonts = getFavFonts();
  const favFontIndex = getFavFontIndex(fontFamilyName);
  const favFont = favFontIndex >= 0;

  if (val && !favFont) {
    // add to fav fonts array
    favFonts.push(fontFamilyName);
    estore.set('favFonts', favFonts);
  } else if (!val && favFont) {
    // remove from fav fonts array
    favFonts.splice(favFontIndex, 1);
    estore.set('favFonts', favFonts);
  }
};
