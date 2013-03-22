var fields = require('forms/lib/fields'),
    dom = require('./dom'),
    mix = require('./mix');

var attachableField = {},
    attachedField = {};

var ATTACH_DEFAULTS = {
  fieldElement: '.field',
  errorClass: 'error',
  errorMessageElement: '.error_msg',
  form: null
};
attachableField.attach = function (attachedWidget, options) {
  var field = this;
  if(options) {
    options = mix(Object.create(ATTACH_DEFAULTS), options);
  } else {
    options = ATTACH_DEFAULTS;
  }
  var attached = mix(Object.create(this), attachedField);
  attached.options = options;
  attached.widget = attachedWidget;
  attached.fieldElement = dom.closest(attachedWidget.element, options.fieldElement);
  attached.errorMessageElement = attached.fieldElement.querySelector(options.errorMessageElement);

  attachedWidget.on('change', function() {
    field.bind(attachedWidget.value).validate(options.form, function(err, boundField) {
      attached.error = boundField.error;
      attached.value = boundField.value;
      attached.data = boundField.data;

      if(attached.error) {
        attached.showError(attached.error);
      } else {
        attached.clearError();
      }
    });
  });

  return attached;
};
// Overridden to always create the wrapper
attachableField.errorHTML = function () {
  return '<p class="error_msg">' + (this.error || '') + '</p>';
}

attachedField.showError = function (message) {
  this.error = message;
  this.fieldElement.classList.add(this.options.errorClass);
  this.errorMessageElement.innerHTML = message;
};

attachedField.clearError = function () {
  this.error = '';
  this.fieldElement.classList.remove(this.options.errorClass);
  this.errorMessageElement.innerHTML = '';
};

// Mix attachableField into all fields
Object.keys(fields).forEach(function (fieldType) {
  module.exports[fieldType] = function() {
    var field = fields[fieldType].apply(null, arguments);
    mix(field, attachableField);
    return field
  };
});
