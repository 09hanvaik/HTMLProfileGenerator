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

// Function to prompt for adding an engineer
async function promptEngineer() {
    const engineerData = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the engineer's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the engineer's Id:",
        name: "id",
      },
      {
        type: "input",
        message: "Please enter the engineer's email:",
        name: "email",
      },
      {
        type: "input",
        message: "Please enter the engineer's GitHub username:",
        name: "github",
      },
    ]);
  
    const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
    teamMembers.push(engineer);
  
    await promptTeam();
  }

  // Function to prompt for adding an intern
async function promptIntern() {
    const internData = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the intern's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the intern's Id:",
        name: "id",
      },
      {
        type: "input",
        message: "Please enter the intern's email:",
        name: "email",
      },
      {
        type: "input",
        message: "Please enter the intern's school:",
        name: "school",
      },
    ]);
  
    const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
    teamMembers.push(intern);
  
    await promptTeam();
  }

  // Function to prompt for team-related operations
async function promptTeam() {
    const teamChoice = await inquirer.prompt([
      {
        type: "list",
        message: "What do you want to do next?",
        name: "teamChoice",
        choices: operations,
      },
    ]);
  
    if (teamChoice.teamChoice === "Add an engineer") {
      await promptEngineer();
    } else if (teamChoice.teamChoice === "Add an intern") {
      await promptIntern();
    } else if (teamChoice.teamChoice === "Finish building the team") {
      generateHTML();
    }
  }
  
  // Function to generate HTML file
  function generateHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
  
    const htmlContent = render(teamMembers);
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`HTML file generated at: ${outputPath}`);
  }
  
  // Initial function to kick off the process
  async function init() {
    await promptManager();
  }
  
  // Start the initialization process
  init();