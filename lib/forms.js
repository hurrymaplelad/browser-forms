var forms = require('forms/lib/forms'),
    dom = require('./dom'),
    mix = require('./mix');

var attachableForm = {},
    attachedForm = {};

attachableForm.attach = function (element) {
  var form = this;
  var attached = mix(Object.create(form), attachedForm);
  // Attach all fields
  Object.keys(form.fields).forEach(function (name) {
    var field = form.fields[name],
        widgetElement = element.querySelector(field.widget.selector(name)),
        attachedWidget = field.widget.attach(widgetElement);
    attached.fields[name] = field.attach(attachedWidget, {form: attached});
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
