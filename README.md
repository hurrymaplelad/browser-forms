# Browser Forms

Constructing a good form by hand is a lot of work. 
Rails, Django, and jQuery contain code to make this process less painful.
This module is an attempt to provide browser-side helpers using the same
validators and interfaces [caolan/forms](http://github.com/caolan/forms) to uses for
server-side Express form processing.

    npm install browser-forms
    
**Heads up! This library is evolving rapidly**


## Goals

### Implement polished interaction by default
  - Validation errors appear when the user finishes interacting.
  - Don't show validation errors on an empty form.
  - Don't change invalid input.
  - Disable form submission while processing.
  - Expose hooks to customize interaction where appropriate.

### Be flexible with form markup
  - Add a few constraints to keep the API simple.
  - Generate sane default markup.
  - Use your existing templating language and pipeline if you like.
  - Try horizontal or vertical Bootstrap forms.
  - Or vanilla HTML5 inputs.
  - Or jQuery UI widgets.
  - Code against interfaces to allow full custom implementations as needed.

### Run on the Server and in the Browser
  - Validators run both places.
  - Use the same interfaces and abstractions to make reuse fun.
  - Don't require a DOM on the server

## Examples

- Bootstrap
- Html5
- Default Forms
- Simple tweeks
- Full custom DOM

## Interfaces

### Widget
  - `.value`
  - `.attach(element)`
  - `.on('change', callback)`
  - `.off('change', callback)`

### Field
  - `.attach(attachedWidget, {fieldElement, errorMessageElement, errorClass})`
  - `.showError(message)`
  - `.clearError()`

### Form 
 - `.attach(element)`

## DOM Constraints
Build whatever markup you like, but mind these constraints if you want to smooth interactions:

- Each field must have a root element.  It can just be the input, see the HTML5 example.
- If you're using an errorMessageElement, it should always be in the DOM.  Show and hide it with CSS.  This gives developers more flexibility in field markup.
- Each widget must have a root element.  Easy for an `<input/>`, interesting for a radio button group.

## Divergence from caolan/forms
- `widget.toHTML()` must return a single root element for delegation and location
- fields default `label` to `labelText(name)` if `name` is set and `label` is not
- Validators almost exclusively check `field.data`, why not pass just one arg?
- Choices and fields need stable iteration order...

