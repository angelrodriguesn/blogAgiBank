import './commands'

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('astra is not defined') || 
      err.message.includes('imagesLoaded is not a function') ||
      err.message.includes('$scope') ||
      err.message.includes('publicPath') ||
      err.message.includes('jetpackCarouselStrings') ||
      err.message.includes('astraNavMenuToggle is not defined') ||
      err.message.includes('Cannot read properties of undefined') ||
      err.message.includes('scrollData') ||
      err.message.includes('already been declared')) {
    return false;
  }
  return true;
})
