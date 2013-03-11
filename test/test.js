var forms = require('forms');
var sharedSuites = {
    fieldsSuite: require('forms/test/test-fields'),
    formsSuite: require('forms/test/test-forms'),
    renderSuite: require('forms/test/test-render'),
    validatorsSuite: require('forms/test/test-validators'),
    widgetsSuite: require('forms/test/test-widgets')
};

var clientSuite = {
    'bundles': function (test) {
        test.ok(forms, 'forms loaded');
        test.done();
    }
};
 
nodeunit.run([
  clientSuite,
  sharedSuites
]);
