require('zepto/zepto.min.js');
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
    }),

    select: testCase({
        setUp: function (done) {
            this.widget = widgets.select();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        },

        'when attached': testCase({
            setUp: function (done) {
                var widget = widgets.select();
                this.select = $(widget.toHTML('name', {choices: {
                    a: 'A',
                    b: 'B'
                }}))[0];
                this.attachedWidget = widget.attach(this.select);
                done();
            },

            'updates widget value when the checkbox is checked': function (test) {
                this.select.value = 'b';
                $(this.select).trigger('change');
                test.equal(this.attachedWidget.value, 'b');
                test.done();
            }
        })
    }),

    multipleCheckbox: testCase({
        setUp: function (done) {
            this.widget = widgets.multipleCheckbox();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        },

        'when attached': testCase({
            setUp: function (done) {
                var widget = widgets.multipleCheckbox();
                this.fieldset = document.createElement('div');
                this.fieldset.innerHTML = widget.toHTML('name', {choices: {
                    a: 'A',
                    b: 'B'
                }});
                this.attachedWidget = widget.attach(this.fieldset);
                done();
            },

            'updates widget value when a checkbox is toggled': function (test) {
                var aBox = this.fieldset.querySelector('[value=a]'),
                    bBox = this.fieldset.querySelector('[value=b]'),
                    $fieldset = $(this.fieldset);

                aBox.checked = true;
                $fieldset.trigger('change');
                test.deepEqual(this.attachedWidget.value, ['a']);

                bBox.checked = true;
                $fieldset.trigger('change');
                test.deepEqual(this.attachedWidget.value, ['a', 'b']);

                aBox.checked = false;
                $fieldset.trigger('change');
                test.deepEqual(this.attachedWidget.value, ['b']);
                test.done();
            }
        })
    }),

    multipleRadio: testCase({
        setUp: function (done) {
            this.widget = widgets.multipleRadio();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        },

        'when attached': testCase({
            setUp: function (done) {
                var widget = widgets.multipleRadio();
                this.container = document.createElement('form');
                this.container.innerHTML = widget.toHTML('name', {choices: {
                    a: 'A',
                    b: 'B'
                }});
                this.attachedWidget = widget.attach(this.container);
                done();
            },

            'updates widget value when a radio is checked': function (test) {
                var aBox = this.container.querySelector('[value=a]'),
                    bBox = this.container.querySelector('[value=b]'),
                    $container = $(this.container);

                aBox.checked = true;
                $container.trigger('change');
                test.equal(this.attachedWidget.value, 'a');

                bBox.checked = true;
                $container.trigger('change');
                test.equal(this.attachedWidget.value, 'b');
                test.done();
            }
        })
    })
};
