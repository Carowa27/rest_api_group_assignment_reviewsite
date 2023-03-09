# Group Assignment - REST API Reviewsite

## Assignment description

_Time for the assignment: 2 weeks_
The assignment is to build a REST API for a reviewsite that specifies in a type of business.
We chose different kinds of resorts to visit when in a city.
For example Gröna Lund in Stockholm, Kolmården in Norrköping etc.

Via the REST API that we create, you should be able to do everything needed for a functioning review site.
It includes:

- User management and login
- Management of the review data for the various companies
- Manage data about the companies that the site lists
- The data you retrieve must be able to be grouped/filtered/sorted in a logical way; for example companies for a specific city 10 at a time
- Users should not be able to create or change data without being logged in
- Users should only be able to change/delete their own data, and not data from other users (unless they are admin)

In addition to the above functionality, the following requirements must also be met:

- All data must be stored in a SQLite database
- All queries against the database must be written in so-called "raw SQL"
- The API must validate incoming requests to see that they send with the right data
- The API must have a basic security implementation:
  - Basic input cleanup
  - CORS (only allow GET, PUT, PATCH, DELETE and POST requests from http://localhost:3000)
  - Your SQL queries must take SQL injection into account
  - Basic Helmet JS
  - The login process must follow "best practices"

### Groupmembers

Carolina https://github.com/Carowa27/
Mikael https://github.com/Mikaelwendin/
Bryar https://github.com/bryaro/

## About the assignment

### techniques used

#### languages

- Javascript

#### npm packages

- expressJs
- bcrypt
- cors
- dotenv
- jsonwebtoken
- sequelize
- sqlite3
- nodemon

#### programs

- postman
- dbeaver

### dbDesign

![dbDesign](/dbDesign/db_design.png "dbDesign")

### test user credentials

username:"adde_lito",
password: "sunshine0nAcloudyDay",

username: "Prosit_the_third",
password: "nyserAlltid#prosit",

username: "M_Sisso",
password: "mm0tW#23",

username: "Crow_3000",
password: "enoDp8tvw!p=",

username: "Slars",
password: "hereIGoagain!",

username: "admin",
password: "adminadmin"
