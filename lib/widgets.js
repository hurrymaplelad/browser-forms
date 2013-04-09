var widgets = require('forms/lib/widgets'),
    utils = require('./utils'),
    mix = utils.mix,
    around = utils.around,
    after = utils.after;

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
mixIntoWidget('select', attachableToInput);

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


after(widgets, 'multipleRadio', function (widget) {

  mix(widget, {

    selector: function (name) {
      return '[data-name='+ name + ']';
    },

    // Parse the widget's value from DOM state
    _getValue: function () {
      var i, radio;
      for (i = 0; i < this.radios.length; ++i) {
        radio = this.radios.item(i);
        if(radio.checked) {
          return radio.value;
        }
      }
      return null;
    },

    attach: function (container) {
        var attached = Object.create(this);
        attached.radios = container.querySelectorAll('[type=radio]');
        attached.element = container;
        attached.on = container.addEventListener.bind(container);
        attached.off = container.removeEventListener.bind(container);
        attached.on('change', function () {
          attached.value = attached._getValue();
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