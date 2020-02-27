// Node modules
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
    console.log(userImage);
    if (data.email === null) {
        userEmail = "not available"
    } else {
        userEmail = data.email;
    }

    const answers = await inquirer.prompt(questions)

    writeToFile("gdReadMe.md", answers);

}


main();


async function writeToFile(fileName, answers) {
    try {
    
        console.log(answers);

        const title = "# " + answers.projectTitle + "\n\n";
        //const title = "# ReadMe Generator\n\n";
        fs.writeFileSync(fileName, title);

        const hdgDesc     = "## Description\n";
        fs.appendFileSync(fileName, hdgDesc);

        const description = answers.projectDescription + "\n\n";
        //const description = "Create a good README from user input.\n\n";
        fs.appendFileSync(fileName, description);

        const tableOfContents = "## Table of Contents\n\n" +
                                "* [Installation](#installation)\n" +
                                "* [Usage](#usage)\n" +
                                "* [Credits](#credits)\n" +
                                "* [License](#license)\n" +
                                "* [Credits](#credits)\n" +
                                "* [Tests](#tests)\n" +
                                "* [Contributing](#contributing)\n"
                                "* [Questions](#questions)\n\n";
        fs.appendFileSync(fileName, tableOfContents);

        const hdgInstall   = "## Installation\n";
        fs.appendFileSync(fileName, hdgInstall);

        const installation = answers.installation + "\n\n";
        fs.appendFileSync(fileName, installation);

        const hdgUsage     = "## Usage\n";
        fs.appendFileSync(fileName, hdgUsage);

        const usage        = answers.usage + "\n\n";
        fs.appendFileSync(fileName, usage);

        const hdgCredits   = "## Credits\n";
        fs.appendFileSync(fileName, hdgCredits);

        const credits      = answers.credits + "\n\n";
        fs.appendFileSync(fileName, credits);

        const hdgLicense   = "## License\n";
        fs.appendFileSync(fileName, hdgLicense);

        const license      = answers.license + "\n\n";
        fs.appendFileSync(fileName, license);

        const hdgBadges    = "## Badges\n";
        fs.appendFileSync(fileName, hdgBadges);

        //const badges       = answers.badges + "\n\n";
        const badges       = 
             "[GitHub](https://img.shields.io/badge/license-MIT-green)\n\n";
        fs.appendFileSync(fileName, badges);

        const hdgContribute = "## Contributing\n";
        fs.appendFileSync(fileName, hdgContribute);

        const contribute    = answers.contribute + "\n\n";
        fs.appendFileSync(fileName, contribute);

        const hdgTests      = "## Tests\n";
        fs.appendFileSync(fileName, hdgTests);

        const tests         = answers.tests + "\n\n";
        fs.appendFileSync(fileName, tests);

        const questions     = "## Questions\n";
        //const questions     = answers.questions + "\n\n";
        fs.appendFileSync(fileName, questions);

        const email     = "Email: " + userEmail + "\n\n";
        fs.appendFileSync(fileName, email);

        const image         = "![Alt Text](" + userImage + ")";
        fs.appendFileSync(fileName, image);

    } catch (err) {
        console.log(err);
    }

}
