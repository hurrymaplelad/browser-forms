var widgets = require('forms/lib/widgets'),
    mix = require('./mix');

var after = function (host, methodName, filter) {
  var original = host[methodName].bind(host);
  host[methodName] = function () {
    var result = original.apply(host, arguments);
    return filter(result);
  };
};

var around = function (host, methodName, wrapper) {
  host[methodName] = wrapper(host[methodName]);
};

var mixIntoWidget = function (type, mixin) {
  after(widgets, type, function (widget) {
    mix(widget, mixin);
    return widget;
  });
};

var attachableToInput = {
    selector: function (name) {
      return '[name='+name+']';
    },

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
mixIntoWidget('hidden', attachableToInput);
mixIntoWidget('color', attachableToInput);
mixIntoWidget('textarea', attachableToInput);

mixIntoWidget('checkbox', {
    selector: function (name) {
        return '[name='+ name + ']';
    },

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


after(widgets, 'multipleCheckbox', function (widget) {

  mix(widget, {

    selector: function (name) {
      return '[data-name='+ name + ']';
    },

    attach: function (container) {
        var attached = Object.create(this),
            boxes = container.querySelectorAll('[type=checkbox]');
        attached.element = container;
        attached.on = container.addEventListener.bind(container);
        attached.off = container.removeEventListener.bind(container);
        attached.on('change', function () {
          var values = [],
              i, box;
          for (i = 0; i < boxes.length; ++i) {
            box = boxes.item(i);
            if(box.checked) {
              values.push(box.value);
            }
          }
          attached.value = values;
        });
        return attached;
    }
  });

  around(widget, 'toHTML', function (original) {
    return function (name, f) {
      return [
        '<div data-name="', name, '">',
        original.call(this, name, f),
        '</div>'
      ].join('');
    };
  });

  return widget;
});

module.exports = widgets;