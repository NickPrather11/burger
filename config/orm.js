var connection = require("../config/connection.js");

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(cb) {
    connection.query("SELECT * FROM burgers;", function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(name, devouredBool, cb) {
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [name, devouredBool], function(
      err,
      result
    ) {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    var queryString = "UPDATE burgers SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function(condition, cb) {
    var queryString = "DELETE FROM burgers WHERE ";
    queryString += condition;
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
