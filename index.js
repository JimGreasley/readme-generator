const inquirer = require("inquirer");

const dotenv = require('dotenv');
const fs = require('fs');
const API = require("./utils/api");

var userImage = "";
var userEmail;


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
        message: "Please specify the license (if any) governing your project.",
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
    }
];


function writeToFile(fileName, data) {
}

function init() {

    inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        }

    ]).then(function ({ username }) {

        API.getUser(username)
           .then(function({data}){
              //console.log(data);
              userImage = data.avatar_url;
              console.log(userImage);
              userEmail = data.email;

              inquirer
                .prompt(questions)
                .then(function(answers) {
                    console.log(answers);
                    const title = "# " + answers.projectTitle + "\n\n";
                    fs.writeFile("gdReadMe.md", title, function(err){});

                    const hdgDesc     = "## Description\n";
                    const description = answers.projectDescription + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgDesc, function(err){});
                    fs.appendFile("gdReadMe.md", description, function(err){});

                    const hdgInstall   = "## Installation\n";
                    const installation = answers.installation + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgInstall, function(err){});
                    fs.appendFile("gdReadMe.md", installation, function(err){});

                    const hdgUsage     = "## Usage\n";
                    const usage        = answers.usage + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgUsage, function(err){});
                    fs.appendFile("gdReadMe.md", usage, function(err){});

                    const hdgCredits   = "## Credits\n";
                    const credits      = answers.credits + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgCredits, function(err){});
                    fs.appendFile("gdReadMe.md", credits, function(err){});

                    const hdgLicense   = "## License\n";
                    const license      = answers.license + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgLicense, function(err){});
                    fs.appendFile("gdReadMe.md", license, function(err){});

                    const hdgBadges    = "## Badges\n";
                    //const badges       = answers.badges + "\n\n";
                    const badges       = 
                    "[GitHub](https://img.shields.io/badge/license-MIT-green)\n\n";
                    fs.appendFile("gdReadMe.md", hdgBadges, function(err){});
                    fs.appendFile("gdReadMe.md", badges, function(err){});

                    const hdgContribute = "## Contributing\n";
                    const contribute    = answers.contribute + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgContribute, function(err){});
                    fs.appendFile("gdReadMe.md", contribute, function(err){});

                    const hdgTests      = "## Tests\n";
                    const tests         = answers.tests + "\n\n";
                    fs.appendFile("gdReadMe.md", hdgTests, function(err){});
                    fs.appendFile("gdReadMe.md", tests, function(err){});

                    const image         = "![Alt Text](" + userImage + ")";
                    fs.appendFile("gdReadMe.md", image, function(err){});                     
              })
        })
    })
}

// function qetUserRepoInfo() {
//     inquirer
//         .prompt(questions)
//         .then(function(answers) {
//             console.log(answers);
//         })
// }



init();

//getUserRepoInfo();



        //var filename = data.name.toLowerCase().split(' ').join('') + ".json";
        //fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {
        //  if (err) {
        //    return console.log(err);
        //  }
        //  console.log("Success!");
