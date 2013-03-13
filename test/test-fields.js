var forms = require('..'),
    fields = forms.fields,
    widgets = forms.widgets;

var elementFromString = function (string) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = string;
    return wrapper.firstChild;
};

var testField = function (field) {
    exports[field + ' attach'] = function (test) {
        var f = fields[field]({
            label: 'test label',
            name: 'test'
        });

        // field has an attach method
        test.ok(f.attach instanceof Function);

        var fieldElement = elementFromString(f.toHTML());
        var widget = widgets.forInput(fieldElement.querySelector('[name=test]'));
        var attached = f.attach(widget);

        // attached fields have showError and clearError methods
        test.ok(attached.showError instanceof Function);
        test.ok(attached.clearError instanceof Function);

        test.done();
    };
};

testField('string');
