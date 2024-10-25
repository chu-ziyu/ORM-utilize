## Skill Stack
- database: MySQL
- language: JavaScript
- ORM: Sequelize
- framework: Express
- encryption: bcryptjs
- testing: Jest, Supertest, chai(with CommonJS), mocha

## Project Structure
a02_project/
│
├── controllers/      # Controllers that handle API requests
│   └── userController.js
├── middlewares/      # Middleware, such as authentication
│   └── authMiddleware.js
├── models/           # Database model definitions
│   └── index.js      # Initializes Sequelize
│   └── user.js       # User model
├── routes/           # API route definitions
│   └── userRoutes.js
├── config/           # Configuration for the database and other parameters
│   └── config.js     # Sequelize connection configuration
│   └── dotenv.js     # Loads environment variables
├── tests/            # Test folder
│   └── user.test.js  # Tests for user API
├── .env              # Stores environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
├── app.js            # Entry point of the application
└── server.js         # File that starts the server

## Project Setup
1. Initialize your Node.js project: Set up a new directory for your project.
    - mkdir firstname_lastname_neuid_A02
    - cd firstname_lastname_neuid_A02
    - npm init -y
2. Install dependencies:
    - npm install express sequelize mysql2 bcryptjs body-parser dotenv
    - npm install --save-dev nodemon jest supertest
    - npm install mocha --save-dev
    - npm install chai --save-dev
    •	sequelize for ORM.
	•	mysql2 for MySQL support, Sequelize need it to intereact with MySQL.
	•	bcryptjs for password hashing.
	•	body-parser to handle JSON request bodies.
	•	dotenv for managing environment variables in .env file.
	•	nodemon for development, automatically restarting the server.
	•	jest and supertest for unit testing and Integration testing.
3. Config Sequelize:
    - create .env file on root
    - create config.js in config/ to config Sequelize

## Web Development
1. Build and Define user models in models/user.js
2. Initialize Sequelize Connection in models/index.js(can name it database.js)
3. Create controllers/userController.js to handle API requests connect with user
4. Build middleware like authtication in middlewares/authMiddleware.js
5. Build routes/userRoutes.js to define API routs
6. Set up the entrance for the application as app.js
7. Use server.js to start the server
8. Unit test and Integration test
9. Postman API test

## Run Project
- npm run dev
- npm test

## API test with Postman
![alt text](<Screenshot 2024-10-24 at 5.31.52 PM.png>)
![alt text](<Screenshot 2024-10-24 at 5.33.42 PM.png>)
![alt text](<Screenshot 2024-10-24 at 5.34.01 PM.png>)
![alt text](<Screenshot 2024-10-24 at 5.37.08 PM.png>)
![alt text](<Screenshot 2024-10-24 at 6.01.31 PM.png>)