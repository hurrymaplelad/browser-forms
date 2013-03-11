var fields = require('forms/lib/fields');

// Selectors Level 2 working draft:
// http://www.w3.org/TR/selectors-api2/#matches
var matches = function (element, selector) {
  // TODO: polyfill
  return element.webkitMatchesSelector(selector);
};

var closest = function (element, selector) {
  do {
    if(matches(element, selector)) return element;
  } while (element = element.parentElement);
  return null;
};

var attachableField = {};

var ATTACH_DEFAULTS = {
  fieldElement: '.field',
  errorClass: 'error',
  errorMessageElement: '.error_msg'
};
attachableField.attach = function (widget, options) {
  var field = this;
  if(options) {
    options = Object.create(ATTACH_DEFAULTS, options);
  } else {
    options = ATTACH_DEFAULTS;
  }

  this.options = options;
  this.fieldElement = closest(widget.element, options.fieldElement);
  this.errorMessageElement = this.fieldElement.querySelector(options.errorMessageElement);

  widget.on('change', function() {
    field.bind(widget.value).validate(null, function(err, boundField) {
      var message = boundField.error;
      if(message) {
        console.log(boundField.toHTML());
        field.showError(message);
      } else {
        field.hideError();
      }
    });
  });
};

attachableField.showError = function (message) {
  this.fieldElement.classList.add(this.options.errorClass);
  this.errorMessageElement.innerHTML = message;
};

attachableField.hideError = function () {
  this.fieldElement.classList.remove(this.options.errorClass);
  this.errorMessageElement.innerHTML = '';
};

// Overridden to always create the wrapper
attachableField.errorHTML = function () {
  return '<p class="error_msg">' + (this.error || '') + '</p>';
}

// Mix attachableField into all fields
Object.keys(fields).forEach(function (fieldType) {
  module.exports[fieldType] = function() {
    var field = fields[fieldType].apply(null, arguments);
    Object.keys(attachableField).forEach(function (attr) {
      field[attr] = attachableField[attr];
    });
    return field
  };
});
