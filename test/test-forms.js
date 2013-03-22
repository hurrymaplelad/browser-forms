var testCase = nodeunit.testCase;

var forms = require('..'),
    fields = forms.fields,
    widgets = forms.widgets;

var form = forms.create({
    username: fields.string({required: true}),
    password: fields.password({required: true})
});

module.exports = {
    'are attachable': function (test) {
        test.ok(form.attach instanceof Function);
        test.done();
    },

    'once attached': testCase({
        setUp: function (done) {
            var formEl = document.createElement('form');
            formEl.innerHTML = form.toHTML();
            this.attachedForm = form.attach(formEl);
            done();
        },

        'work': function (test) {
            test.ok(this.attachedForm);
            test.done();
        }
    }),
};