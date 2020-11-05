# SENG6245_Library_System
This is a online library system that provide normal library functionality. Allow user to view book and librarian to manage books

## Technology
Frontend: <br />
react, react-bootstrap, axios <br />
Backend: <br />
nodejs, express <br />
Database: <br />
Postgresql <br />

## Require Packages
1. Please download and install npm package manager (https://www.npmjs.com/get-npm). It also contains nodejs.
2. Download the postgresql and install the PgAdmin with it (https://www.postgresql.org/download/).
3. The rest of the packages would be download through npm, so just follow the setup the application section.

## Setup the application
Please clone the repository to a directory you like and follow the instructions below

### Frontend
1. Open a terminal in ./client directory
2. Run "npm install" or "npm install --save"

### Backend
1. Open a terminal in ./ directory
2. Run "npm install" or "npm install --save"

### Database
1. Open PgAdmin or psql terminal
2. Setup a user name "admin" and password "Pa$$w0rd". (If you choose your own password, 
please change the password in the following file: "./config/database.js", "./config/testDatabase.js")
3. Setup two databases, one call "libraryDB", the other call "libraryDBTesting". First database is for development and the second one is for testing. (You can choose your own name for the databases, you will need to change the name in the following file: "./config/database.js", "./config/testDatabase.js)
4. Run ./database/schema.sql in PgAdmin query tool or psql terminal. Make sure the script is ran for both databases.

## Start the application
The following section will walk through how to start the frontend and backend. Also how to run the test cases

### Frontend
1. Open a terminal in ./client directory
2. Run "npm start"
3. The frontend should be up and running at localhost:3000, access this address in any browser

### Backend
1. Open a terminal in ./ directory
2. Run "npm start"
3. The backend should be up and running at localhost:5000

### Testing
1. Open a terminal in ./ directory
2. In this terminal run "npm run start-test"
3. Open another terminal in ./ directory
4. In second terminal run "npm test", to run through all the test cases

## Documentation
Detail documentations for codes are under doc directory <br />
Test cases for both frontend and backend are under test directory <br />

Setup React with Nodejs tutorial: https://www.codementor.io/@kakarganpat/how-to-setup-react-and-node-js-in-a-project-koxwqbssl