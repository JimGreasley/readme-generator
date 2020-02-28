# readme-generator

Create a command-line application that dynamically generates a README.md from a user's input.

The user will be prompted for their GitHub username, which will be used to make a call to the GitHub API to retrieve their email and profile image. They will then be prompted with questions about their project.

The README will be populated with the following:

* Project title
* Description
* Table of Contents
* Installation
* Usage
* License
* Badge
* Contributing
* Tests
* Questions
  * User GitHub profile picture
  * User GitHub email


## Algorithm

The main code block is defined as an async function. Within it the GitHub username is prompted using inquirer along with the 'await' option. That is followed by an API call to GitHub, also using 'await' option, to get the user's email and image. Upon return the user's email and image are saved in variables. 
This is followed by prompting the user, again using inquirer with the 'await' option, for answers to a series of questions about the project for which the README is being created. Then the generateMarkdown function is called, passing the user's answers object and email and image variables, to create the text of the README markdown. Finally, a promisified fs.writeFile function 'writeFileAsync' is used to create the ReadMe markdown file ('gdMReadMe.md') using the data returned by generateMarkdown.

Both the API and generateMarkdown functions are defined in their own files within the utils folder.


## Link

https://jimgreasley.github.io/readme-generator/