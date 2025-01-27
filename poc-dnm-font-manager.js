const fontManager = require('dnm-font-manager');
const systemFontsManager = new fontManager();
// Get all available fonts
var systemFonts = systemFontsManager.getFontsExtendedSync()

systemFontsManager.getFontsExtended()
  .then(font => {    
    // Display font details
      console.log(`Family: ${font.family}`);
      console.log(`Postscript Name: ${font.postscriptName}`);
      console.log(`Style: ${font.style}`);
      console.log(`Weight: ${font.weight}`);
      console.log(`Width: ${font.width}`);
      console.log(`Italic: ${font.italic}`);
      console.log('-------------------------');
  })
  .catch(err => {
    console.error('Error fetching fonts:', err);
  });
