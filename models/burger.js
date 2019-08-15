var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all(function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(name, devouredBool, cb) {
    orm.create(name, devouredBool, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update(objColVals, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = burger;
