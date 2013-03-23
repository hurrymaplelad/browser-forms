var sharedSuites = {
        fields: require('forms/test/test-fields'),
        forms: require('forms/test/test-forms'),
        // render: require('forms/test/test-render'),
        validators: require('forms/test/test-validators'),
        // widgets: require('forms/test/test-widgets')
    }, clientSuites = {
        fields: require('./test-fields'),
        forms: require('./test-forms'),
        widgets: require('./test-widgets'),
        integrations: require('./test-integrations')
    };

nodeunit.run({
    client: clientSuites,
    shared: sharedSuites
});
