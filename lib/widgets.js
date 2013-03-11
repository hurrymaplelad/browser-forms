var widgets = require('forms/lib/widgets');

// Augment an input Element with the widget interface
widgets.forInput = function (input) {
  input.on = input.addEventListener;
  input.off = input.removeEventListener;
  input.element = input;
  return input;
};

module.exports = widgets;