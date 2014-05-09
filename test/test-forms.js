var testCase = nodeunit.testCase;

var forms = require('..'),
    fields = forms.fields,
    widgets = forms.widgets;

var form = forms.create({
    username: fields.string({required: true}),
    password: fields.password({required: true})
});

var multiSectionForm = forms.create({
    userDetails: {
        username: fields.string({required: true}),
        password: fields.password({required: true})
    },
    address: {
        street: fields.string({required: true})
    }
});

var formMissingAddress = forms.create({
    userDetails: {
        username: fields.string({required: true}),
        password: fields.password({required: true})
    }
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

    'multi form attach': testCase({
        setUp: function (done) {
            var formEl = document.createElement('form');
            formEl.innerHTML = multiSectionForm.toHTML();
            this.attachedForm = multiSectionForm.attach(formEl);
            done();
        },

        'work': function (test) {
            test.ok(this.attachedForm);
            test.done();
        }
    }),

    'should not error when field is missing from page': testCase({
        setUp: function (done) {
            this.formEl = document.createElement('form');
            this.formEl.innerHTML = formMissingAddress.toHTML();
            done();
        },

        'work': function (test) {
            var self = this;
            test.doesNotThrow(function() { multiSectionForm.attach(self.formEl); });
            test.done();
        }
    })
};