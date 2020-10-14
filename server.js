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
          firstDepartments();
        }
        else if(answer.category === "ROLES") {
          firstRoles();
        }
        else if(answer.category === "EMPLOYEES") {
          firstEmployees();
        } else {
          connection.end();
        }
      });
  }

  //Function for Departments
  function firstDepartments() {
    inquirer
    .prompt({
      name: "avDepartments",
      type: "list",
      message: "Would you like to ADD to or VIEW the departments?",
      choices: ["ADD", "VIEW"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.avDepartments === "ADD") {
        addDepartments();
      } else if(answer.avDepartments === "VIEW") {
        viewDepartments();
      } else {
        connection.end();
      }
    });
  }

  function addDepartments() {
    inquirer
    .prompt([
      {
        name: "idDepartment",
        type: "input",
        message: "What is the ID of the department you would like to add?"
      },
      {
        name: "nameDepartment",
        type: "input",
        message: "What is the name of the department you would like to add?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          id: answer.idDepartment,
          department_name: answer.nameDepartment
        },
        function(err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          //start();
        }
      );
    });
  }

  function viewDepartments() {}


  //Function for Roles
  function firstRoles() {
    console.log("roles");
  }


  //function for Employees
  function firstEmployees() {
    console.log("employees");
  }