//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

//Create connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!057Captain",
    database: "employeeTrackerDB"
  });

  //Make connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //next function
  });
