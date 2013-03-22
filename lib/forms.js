var forms = require('forms/lib/forms'),
    dom = require('./dom'),
    mix = require('./mix');

var attachableForm = {},
    attachedForm = {};

attachableForm.attach = function (element) {
  var form = this;
  var attached = mix(Object.create(form), attachedForm);
  return attached;
};

// Mix attachability into created forms
module.exports = Object.create(forms);
module.exports.create = function () {
  var form = forms.create.apply(forms, arguments);
  mix(form, attachableForm);
  return form;
};
