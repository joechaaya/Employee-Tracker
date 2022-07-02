const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`We are now connected to the employee_db database`)

)

options();

function options() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            choices: ['View Data', 'Add Data', 'Update Employee Role', 'Exit Program'],
            description: 'Which option would you like to select'
        },
    ]).then(res => {
        switch (res.options) {
            case ('View Data'):
                viewData();
                break;
                case ('Add Data'):
                    addData();
                    break;
                    case ('Update Employee Role'):
                        updateData();
                        break;
                        default:
                            console.log('Thank you and have a nice day');
                            process.exit();
        }
    })
}

