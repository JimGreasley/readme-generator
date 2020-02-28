// Node modules
const inquirer = require("inquirer");
const dotenv = require('dotenv');
const util = require("util");
const fs = require('fs');

// Local modules
const API = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

// global vars for GitHub data
var userImage = "";
var userEmail;

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        message: "What is your project title?",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "What is your project description?",
        name: "projectDescription"
    },
    {
        type: "input",
        message: "What are the steps required to install your project?",
        name: "installation"
    },
    {
        type: "input",
        message: "What are the special instructions for usage?",
        name: "usage"
    },
    {
        type: "input",
        message: "Who were your collaborators on this project?",
        name: "credits"
    },
    {
        type: "input",
        message: "Please specify the license (if any) governing your project:",
        name: "license"
    },
    // {
    //     type: "input",
    //     message: "What are the badges to be referenced?",
    //     name: "badges"
    // },
    {
        type: "input",
        message: "What are the guidelines for other developers to contribute?",
        name: "contribute"
    },
    {
        type: "input",
        message: "Please provide any test scripts that can be run.",
        name: "tests"
    // },
    // {
    //     type: "input",
    //     message: "Questions?",
    //     name: "questions"
    }
];



async function main() {
    const { username } = await inquirer.prompt({
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    });
    //console.log(username);

    const { data } = await API.getUser(username);
    //console.log(data);
    userImage = data.avatar_url;
    //console.log(userImage);
    if (data.email === null) {
        userEmail = "not available"
    } else {
        userEmail = data.email;
    }

    const answers = await inquirer.prompt(questions)

    const markdown = generateMarkdown(answers, userEmail, userImage);

    return writeFileAsync("gdReadMe.md", markdown);

}


main();
