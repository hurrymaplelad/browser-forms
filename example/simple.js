var forms = require('forms'),
    fields = forms.fields,
    validators = forms.validators,
    widgets = forms.widgets;

// our example registration form
var reg_form = forms.create({
    username: fields.string({required: true}),
    password: fields.password({required: true}),
    confirm:  fields.password({
        required: true,
        validators: [validators.matchField('password')]
    }),
    email: fields.email()
});

document.getElementById('form-container').innerHTML = reg_form.toHTML();
