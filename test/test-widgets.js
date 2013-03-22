var testCase = nodeunit.testCase;

var widgets = require('..').widgets;

module.exports = {
    text: testCase({
        setUp: function (done) {
            this.widget = widgets.text();
            done();
        },

        'is attachable': function (test) {
            test.ok(this.widget.attach instanceof Function);
            test.done();
        }
    })
};