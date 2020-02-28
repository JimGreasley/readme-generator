function generateMarkdown(answers, userEmail, userImage) {
  return `
# ${answers.projectTitle}

## Description

${answers.projectDescription}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Credits](#credits)
* [Tests](#tests)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Credits

${answers.credits}

## License

${answers.license}

## Badges

![](https://img.shields.io/badge/license-MIT-green)

## Contributing

${answers.contribute}

## Tests

${answers.tests}

## Questions

Email: ${userEmail}

![](${userImage})
`;
}

module.exports = generateMarkdown;
