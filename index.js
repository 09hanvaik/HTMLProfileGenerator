const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Constants for different operations
const operations = ["Add an engineer", "Add an intern", "Finish building the team"];

// Function to prompt for manager details
async function promptManager() {
  const managerData = await inquirer.prompt([
    {
      type: "input",
      message: "Please enter the manager's name:",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter the manager's Id:",
      name: "id",
    },
    {
      type: "input",
      message: "Please enter the manager's email:",
      name: "email",
    },
    {
      type: "input",
      message: "Please enter the manager's office number:",
      name: "officeN",
    },
  ]);

  const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeN);
  teamMembers.push(manager);

  await promptTeam();
}
