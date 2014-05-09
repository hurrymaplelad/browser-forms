var forms = require('forms/lib/forms'),
    mix = require('./utils').mix;

var attachableForm = {},
    attachedForm = {};

attachableForm.attach = function (element, options) {
  var form = this;
  var attached = mix(Object.create(form), attachedForm);
  options = options || {};

  function attachField (name, parentName) {
      var field = parentName ? form.fields[parentName].fields[name] : form.fields[name],
          widgetElement = element.querySelector(field.widget.selector(name, parentName));
      if (widgetElement) {
          var attachedWidget = field.widget.attach(widgetElement);
          var fieldOptions = mix({form: attached}, options.field || {});
          attached.fields[name] = field.attach(attachedWidget, fieldOptions);
      }
  }

  function attachFields (fields, parentName) {
      Object.keys(fields).forEach(function (name) {
          if (fields[name].fields != null) {
              attachFields(fields[name].fields, name);
          } else {
              attachField(name, parentName)
          }
      });
      return attached;
  }

  return attachFields(form.fields)
};

// Mix attachability into created forms
module.exports = Object.create(forms);
module.exports.create = function () {
  var form = forms.create.apply(forms, arguments);
  mix(form, attachableForm);
  return form;
};
