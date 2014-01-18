module.exports = function (config) {
    config.set({
        frameworks: ['nodeunit'],
        files:  [
            'test/built/*.js'
        ],
        autoWatch: false
    });
};
