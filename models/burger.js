var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(name, devouredBool, cb) {
    orm.insertOne(name, devouredBool, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne(objColVals, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = burger;
