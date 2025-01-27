const getSystemFonts = require('get-system-fonts').default;
// Get all available fonts
var systemFonts = getSystemFonts()
  .then(fontPaths => {    
    // Display font details
      console.log(`Family: ${fontPaths}`);
      
  })
  .catch(err => {
    console.error('Error fetching fonts:', err);
  });
