require('zepto');

var forms = require('../index'),
    fields = forms.fields,
    validators = forms.validators,
    widgets = forms.widgets;

var form = forms.create({
    name:  fields.string({required: true}),
    email: fields.email({required: true, label: 'Email Address'}),
    website: fields.url(),
    count: fields.number({required: true}),
    password: fields.password({required: true}),
    password_confirm: fields.password({
        required: true,
        validators: [validators.matchField('password')]
    }),
    spam_me: fields.boolean({
        validators: [function (form, field, callback) {
            callback(field.data ? 'Don´t do it!' : null);
        }]
    }),
    notes: fields.string({
        widget: widgets.textarea({rows: 6})
    }),
    options: fields.string({
        choices: {
            one: 'option one',
            two: 'option two',
            three: 'option three'
        },
        widget: widgets.select(),
        validators: [function (form, field, callback) {
            if (field.data === 'two') {
                callback('two?! are you crazy?!');
            } else {
                callback();
            }
        }]
    }),
    more_options: fields.array({
        choices: {one: 'item 1', two: 'item 2', three: 'item 3'},
        widget: widgets.multipleCheckbox(),
        validators: [function (form, field, callback) {
            callback(field.data.length ? 'Don´t do it!' : null);
        }]
    }),
    even_more: fields.string({
        choices: {one: 'item 1', two: 'item 2', three: 'item 3'},
        widget: widgets.multipleRadio(),
        validators: [function (form, field, callback) {
            callback(field.data === 'two' ? 'two?! are you crazy?!' : null);
        }]
    })
    // and_more: fields.array({
    //     choices: {one: 'item 1', two: 'item 2', three: 'item 3'},
    //     widget: widgets.multipleSelect()
    // }),
});

var formEl = document.getElementById('form')
formEl.innerHTML = form.toHTML();
form.attach(formEl);