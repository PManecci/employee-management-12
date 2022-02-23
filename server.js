const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const table = require('console.table');
const { add } = require('lodash');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(function (err) {
    if (err) throw err;
    initialPrompt();
})


//Intital Prompt
function initialPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'Please make a selection from the following options:',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role"
        ]
    })
    .then(function ({ options }) {
        switch (options) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Update An Employee Role":
                updateEmployee();
                break;
        }
    });
}

//Functions to execute selected option

//View All Departments

//View All Roles

//View All Employees

//Add A Department

//Add A Role

//Add An Employee

//Update An Employee Role