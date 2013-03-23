require('zepto');
var testCase = nodeunit.testCase;
var widgets = require('..').widgets;

var inputSuite = function (type) { return testCase({
    setUp: function (done) {
        this.widget = widgets[type]();
        done();
    },

    'is attachable': function (test) {
        test.ok(this.widget.attach instanceof Function);
        test.done();
    },

    'when attached': testCase({
        setUp: function (done) {
            var widget = widgets[type]();
            this.input = $(widget.toHTML())[0];
            this.attachedWidget = widget.attach(this.input);
            done();
        },

        'updates widget value on input text change': function (test) {
            $(this.input).val("juice appeal").trigger('change');
            test.equal(this.attachedWidget.value, "juice appeal");
            test.done();
        }
    })
})};


module.exports = {
    text: inputSuite('text'),
    password: inputSuite('password'),
    hidden: inputSuite('hidden'),
    textarea: inputSuite('textarea'),

    color: testCase({
        setUp: function (done) {
            this.widget = widgets.color();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        },

        'when attached': testCase({
            setUp: function (done) {
                var widget = widgets.color();
                this.input = $(widget.toHTML())[0];
                this.attachedWidget = widget.attach(this.input);
                done();
            },

            'updates widget value when a color is chosen': function (test) {
                $(this.input).val("#decade").trigger('change');
                test.equal(this.attachedWidget.value, "#decade");
                test.done();
            }
        })
    }),

    checkbox: testCase({
        setUp: function (done) {
            this.widget = widgets.checkbox();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        },

        'when attached': testCase({
            setUp: function (done) {
                var widget = widgets.checkbox();
                this.input = $(widget.toHTML())[0];
                this.attachedWidget = widget.attach(this.input);
                done();
            },

            'updates widget value when the checkbox is checked': function (test) {
                test.notEqual(this.attachedWidget.value, true);
                this.input.checked = true;
                $(this.input).trigger('change');
                test.equal(this.attachedWidget.value, true);
                test.done();
            }
        })
    })
};