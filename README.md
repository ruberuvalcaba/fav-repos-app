# Getting Started with Favorite GitHub Repos Web App

This web app allows you to search your favorite repositories from Github, and select and store them. It's a practice exercise and it's not warranted to be fully functional at all times.

## Stack/Tools

- React 18
- Typescript vCurrent
- Testing in Jest
- Chakra UI
- Code formatting/validating with Prettier and ESlint and via pre-commit hooks with Husky
- Webpack 5 as bundler

## Development Set Up

This app is connected to GitHub API (https://docs.github.com/en/rest) that uses an auth token that will expire on May 21st, 2023. For local development and testing after that date, you can follow the steps on GitHub API and create your own token and use it in a local environment variable, `GITHUB_TOKEN`, storing it in your `.env` local file.
Selected repositories are meant to be stored in a third-party `repo server API` that works for testing purposes only and it isn't publicly available, however, the API implementation can be replaced later on.
# install dependencies
`yarn`

# Running the app
`yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
# Testing the app
`yarn test`
Launches the test runner in the interactive watch mode.

# Reporting on patterns found in the code.
`yarn lint`

