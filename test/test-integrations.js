var testCase = nodeunit.testCase;

require('zepto');
var forms = require('..'),
    fields = forms.fields,
    validators = forms.validators,
    widgets = forms.widgets;

var waitFor = function (fn, pass) {
    var check = function () {
        if(fn()) {
            pass();
        } else {
            throw new Error('Timeout while waiting');
        }
    }; 
    setTimeout(check, 50);
};

module.exports = testCase({
    setUp: function (done) {
        this.form = forms.create({
            username: fields.string({required: true}),
            password: fields.password({required: true}),
            confirm:  fields.password({
                required: true,
                validators: [validators.matchField('password')]
            }),
            email: fields.email()
        });

        this.formEl = document.createElement('form');
        this.formEl.innerHTML = this.form.toHTML();
        this.emailWidget = this.form.fields.email.widget.attach(
            this.formEl.querySelector('[name=email]')
        );
        this.emailField = this.form.fields.email.attach(this.emailWidget);
        done();
    },

    'Show and hide field errors when widgets change': function (test) {
        var that = this,
            emailInput = that.emailWidget.element;

        // type an invalid value into the email input
        emailInput.value = 'fake@';
        $(emailInput).trigger('change');

        // expect an error message to show up
        waitFor(function () {
            return that.emailField.errorMessageElement.innerHTML.match(/enter a valid email/);
        }, function () {

            // type in a valid email
            emailInput.value = 'fake@example.com';
            $(emailInput).trigger('change');

            // // expect the error message to disappear
            // waitFor(function () {
            //     return !that.emailField.errorMessageElement.innerHTML;
            // }, test.done);
            test.done();
        });
    },
});