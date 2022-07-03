const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'AAnimaLL1994',
        database: 'employee_db'
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

        options: [
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

    
  }

