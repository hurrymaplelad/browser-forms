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
        this.emailInput = widgets.forInput(
            this.formEl.querySelector('[name=email]')
        );
        this.emailField = this.form.fields.email.attach(this.emailInput);
        done();
    },

    'Show and hide field errors when widgets change': function (test) {
        var that = this;

        // type an invalid value into the email input
        that.emailInput.value = 'fake@';
        $(that.emailInput).trigger('change');

        // expect an error message to show up
        waitFor(function () {
            return that.emailField.errorMessageElement.innerHTML.match(/enter a valid email/);
        }, function () {

            // type in a valid email
            that.emailInput.value = 'fake@example.com';
            $(that.emailInput).trigger('change');

            // expect the error message to disappear
            waitFor(function () {
                return !that.emailField.errorMessageElement.innerHTML;
            }, test.done);
        });
    },
});