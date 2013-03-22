module.exports = function (into, from) {
  Object.keys(from).forEach(function (key) {
    into[key] = from[key];
  });
  return into;
};
