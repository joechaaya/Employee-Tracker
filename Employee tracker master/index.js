const mysql = require('mysql2')
const inquirer = require('inquirer');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'AAnimaLL1994',
        database: 'employee'
    },
  );

  db.connect(function (err) {
    if (err) throw err;
    console.log("You are now connected to the Employee Databse");

    startQuestions();
  });

  function startQuestions() {
    inquirer.prompt({
        type: "list",
        name: "jobs",
        message: "How can I be of service?",

        choices: [
            "View Departments",
            "View Roles",
            "View Employees",

            "Add New Department",
            "Add New Role",
            "Add New Employee",

            "Update An Employee's Role",

            "Delete A Department",
            "Delete A Role",
            "Delete An Employee",

            "Finish"
        ],
    })

    .then(function (selection) {
        console.log("You have chosen to" + selection.jobs);
        switch (selection.jobs) {
            case "View Departments":
                viewDept();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmployee();
                break;

            case "Add New Department":
                addDept();
                break;
            case "Add New Role":
                addRole()
                break;
            case "Add New Employee":
                addEmployee()
                break;

            case "Update An Employee's Role":
                updateEmployee();
                break;

            case "Delete A Department":
                delDept();
                break;
            case "Delete A Role":
                delRole();
                break;
            

            case "End":
                end();
        }
    });
  }

  function viewDept() {
    console.log("Department list");
    db.query("SELECT * FROM department", (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestions();
    });
};

function viewRole() {
    console.log("Roles list");
    db.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
    startQuestions();
    });
};

function viewEmployee() {
    console.log("Employee lis");
    db.query("SELECT * FROM employee", (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQuestions();
    });
};

function addDept() {
    inquirer.prompt({
        type: "input",
        name: "deptName",
        message: "Please enter the name of the department you would like to add",
    })
        .then(entry => {
            db.query(`INSERT INTO department (name) VALUES ( ? )`,
                entry.deptName, (err, res) => {
                    if (err) throw err;
                    console.log("dept added");
                });
            viewDept();
        });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role you would like to add?",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "How much salary does this role earn?",
        },
        {
            type: "input",
            name: "deptId",
            message: "What is the Department ID Number for this Role?",
        }
    ])
        .then(entry => {
            db.query(`INSERT INTO role (title, salary, dept_id) VALUES ( ?, ?, ? )`,
                [entry.roleName, entry.roleSalary, entry.deptId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Role Added!");
                });
            viewRole();
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirst",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "employeeLast",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is their Role ID Number?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is their Manager's ID Number?",
        }
    ])
        .then(entry => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )`,
                [entry.employeeFirst, entry.employeeLast, entry.roleId, entry.managerId],
                (err, res) => {
                    if (err) throw err;
                    console.log("Employee Added!");
                });
            viewEmployee();
        });
}