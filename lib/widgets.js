var widgets = require('forms/lib/widgets'),
    mix = require('./mix');

var mixIntoWidget = function (type, mixin) {
  var factory = widgets[type];
  widgets[type] = function () {
    var widget = factory.apply(null, arguments);
    mix(widget, mixin);
    return widget;
  };
};

var attachableToInput = {
    attach: function (input) {
        var attached = Object.create(this);
        attached.element = input;
        attached.on = input.addEventListener.bind(input);
        attached.off = input.removeEventListener.bind(input);
        attached.on('change', function () {
          attached.value = input.value;
        });
        return attached;
    }
};

mixIntoWidget('text', attachableToInput);
mixIntoWidget('password', attachableToInput);

mixIntoWidget('checkbox', {
    attach: function (input) {
        var attached = Object.create(this);
        attached.element = input;
        attached.on = input.addEventListener.bind(input);
        attached.off = input.removeEventListener.bind(input);
        attached.on('change', function () {
          attached.value = input.checked;
        });
        return attached;
    }
});

module.exports = widgets;