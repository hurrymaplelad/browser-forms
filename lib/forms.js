var forms = require('forms/lib/forms'),
    dom = require('./dom'),
    mix = require('./utils').mix;

var attachableForm = {},
    attachedForm = {};

attachableForm.attach = function (element, options) {
  var form = this;
  var attached = mix(Object.create(form), attachedForm);
  options = options || {}
  // Attach all fields
  Object.keys(form.fields).forEach(function (name) {
    var field = form.fields[name],
        widgetElement = element.querySelector(field.widget.selector(name)),
        attachedWidget = field.widget.attach(widgetElement)
        fieldOptions = mix({form: attached}, options.field || {});
    attached.fields[name] = field.attach(attachedWidget, fieldOptions);
  });
  return attached;
};

// Mix attachability into created forms
module.exports = Object.create(forms);
module.exports.create = function () {
  var form = forms.create.apply(forms, arguments);
  mix(form, attachableForm);
  return form;
};
