require('zepto');

var forms = require('../index'),
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

document.getElementById('form').innerHTML = reg_form.toHTML();
var emailWidget = widgets.forInput(
    document.querySelector('[name=email]')
);
var emailField = reg_form.fields.email.attach(emailWidget);

// $(document).on('change', 'input', function(event) {
//     var formEl = event.target.form;
//     var $inputs = $('input', formEl);
//     var data = {};
//     $inputs.each(function(i, input) {
//         data[input.name] = input.value;
//     });
//     reg_form.bind(data).validate(function (err, f) {
//         render(f);
//     });
// });

// render(reg_form);

