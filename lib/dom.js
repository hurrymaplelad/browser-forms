var dom = module.exports = {
  // Selectors Level 2 working draft:
  // http://www.w3.org/TR/selectors-api2/#matches
  matches: function (element, selector) {
    // TODO: polyfill
    return element.webkitMatchesSelector(selector);
  },

  closest: function (element, selector) {
    do {
      if(dom.matches(element, selector)) return element;
    } while (element = element.parentElement);
    return null;
  }
};
