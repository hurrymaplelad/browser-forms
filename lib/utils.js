module.exports = {
  mix: function (into, from) {
    Object.keys(from).forEach(function (key) {
      into[key] = from[key];
    });
    return into;
  },

  after: function (host, methodName, filter) {
    var original = host[methodName].bind(host);
    host[methodName] = function () {
      var result = original.apply(host, arguments);
      return filter(result);
    };
  },

  around: function (host, methodName, wrapper) {
    host[methodName] = wrapper(host[methodName]);
  }
};
