const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
            "Add An Employee"
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
        }
    });
}

//Functions to execute selected option

//View All Departments
function viewAllDepartments() {
    let query = `SELECT * FROM department`

    db.query(query, (err, res) => {
        if (err) throw err;
        initialPrompt();

        console.table(['Department ID', 'Department Name'], res);
    });
}

//View All Roles
function viewAllRoles() {
    let query = `SELECT * FROM role`

    db.query(query, (err, res) => {
        if (err) throw err;
        initialPrompt();

        console.table(['Role ID', 'Title', 'Salary', 'Department ID'], res);
    });
}

//View All Employees
function viewAllEmployees() {
    let query = `SELECT * FROM employee`

    db.query(query, (err, res) => {
        if (err) throw err;
        initialPrompt();

        console.table(['Employee ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'], res);
    });
}

//Add A Department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Department Name: "
            }
        ]).then((res) => {
            let query = `INSERT INTO department SET ?`;

            db.query(query, {name: res.name}, (err, res) => {
                if (err) throw err;

                initialPrompt();
            });
        });
}

//Add A Role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Enter Title for New Role: "
            },
            {
                type: "input",
                name: "salary",
                message: "Enter Salary for Role: "
            },
        ]).then((res) => {
            let query = `INSERT INTO role SET ?`;

            db.query(query, {
                title: res.title,
                salary: res.salary,
            }, (err, res) => {
                if (err) throw err;

                initialPrompt();
            });
        });
}

//Add An Employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter Employee First Name: "
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter Employee Last Name: "
            },
        ]).then((res) => {
            let query = `INSERT INTO employee SET ?`;

            db.query(query, {
                first_name: res.first_name,
                last_name: res.last_name,
            }, (err, res) => {
                if (err) throw err;

                initialPrompt();
            });
        });
}

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});