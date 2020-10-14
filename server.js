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
    start();
  });

  // Start Function
function start() {
    inquirer
      .prompt({
        name: "category",
        type: "list",
        message: "Which category would you like to select?",
        choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.category === "DEPARTMENTS") {
          departments();
        }
        else if(answer.category === "ROLES") {
          roles();
        }
        else if(answer.category === "EMPLOYEES") {
          employees();
        } else {
          connection.end();
        }
      });
  }