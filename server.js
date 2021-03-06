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
      connection.query(
        "INSERT INTO department SET ?",
        {
          id: answer.idDepartment,
          department_name: answer.nameDepartment
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was added successfully!");
          start();
        }
      );
    });
  }

  function viewDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }


  //Function for Roles
  function firstRoles() {
    inquirer
    .prompt({
        name: "avuRoles",
        type: "list",
        message: "Would you like to ADD to, VIEW or UPDATE the roles?",
        choices: ["ADD", "VIEW", "UPDATE"]
        })
        .then(function(answer) {
        if (answer.avuRoles === "ADD") {
            addRoles();
        }
        else if(answer.avuRoles === "VIEW") {
            viewRoles();
        }
        else if(answer.avuRoles === "UPDATE") {
            updateRoles();
        } else {
            connection.end();
        }
    });
  }

  function addRoles() {
    inquirer
    .prompt([
      {
        name: "idRole",
        type: "input",
        message: "What is the ID of the role you would like to add?"
      },
      {
        name: "titleRole",
        type: "input",
        message: "What is the title of the role you would like to add?"
      },
      {
        name: "salaryRole",
        type: "input",
        message: "What is the salary of the role you would like to add?"
      },
      {
        name: "department_idRole",
        type: "input",
        message: "What is the department ID of the role you would like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO business_role SET ?",
        {
          id: answer.idRole,
          title: answer.titleRole,
          salary: answer.salaryRole,
          department_id: answer.department_idRole
        },
        function(err) {
          if (err) throw err;
          console.log("Your role was added successfully!");
          start();
        }
      );
    });
  }

  function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM business_role", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }


  function updateRoles() {
    connection.query("SELECT * FROM business_role", function(err, results) {
      if (err) throw err;
      inquirer
      .prompt([
        {
          name: "updateRole",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message:"Which role would you like to update?"
        }
      ]).then(function(updateAnswer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === updateAnswer.choice) {
            chosenItem = results[i];
          }
        }
       console.log(updateAnswer);
      });
    });
  }


  //function for Employees
  function firstEmployees() {
    inquirer
    .prompt({
        name: "avuEmployees",
        type: "list",
        message: "Would you like to ADD to, VIEW or UPDATE the employees?",
        choices: ["ADD", "VIEW", "UPDATE"]
        })
        .then(function(answer) {
        if (answer.avuEmployees === "ADD") {
            addEmployees();
        }
        else if(answer.avuEmployees === "VIEW") {
            viewEmployees();
        }
        else if(answer.avuEmployees === "UPDATE") {
            updateEmployees();
        } else {
            connection.end();
        }
    });
  }

  function addEmployees() {
    inquirer
    .prompt([
      {
        name: "idEmployee",
        type: "input",
        message: "What is the ID of the employee you would like to add?"
      },
      {
        name: "firstNameEmployee",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "lastNameEmployee",
        type: "input",
        message: "What is the last name of the employee you would like to add?"
      },
      {
        name: "idRoleEmployee",
        type: "input",
        message: "What is the role ID of the employee you would like to add?"
      },
      {
        name: "idManagerEmployee",
        type: "input",
        message: "What is the manager's ID of the employee you would like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          id: answer.idEmployee,
          first_name: answer.firstNameEmployee,
          last_name: answer.lastNameEmployee,
          role_id: answer.idRoleEmployee,
          manager_id: answer.idManagerEmployee
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was added successfully!");
          start();
        }
      );
    });
  }

  function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }

  function updateEmployees() {}