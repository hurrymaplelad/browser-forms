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
            name: 'foo'
        });

        // field has an attach method
        test.ok(f.attach instanceof Function);

        // always includes error message wrapper in HTML, even when there's no error
        test.ok(/class.*error_msg/.test(f.toHTML()));
        test.done();

        // labelText uses this.name if set
        test.equals(f.labelText(), 'Foo');
    };

    exports[field + ' attached'] = function (test) {
        var f = fields[field]({
            label: 'test label',
            name: 'foo'
        });
        var fieldElement = elementFromString(f.toHTML());
        var widget = f.widget.attach(fieldElement.querySelector('[name=foo]'));
        var attached = f.attach(widget);

        // has methods to show and clear errors
        test.ok(attached.showError instanceof Function);
        test.ok(attached.clearError instanceof Function);
        test.done();
    };
};

testField('string');