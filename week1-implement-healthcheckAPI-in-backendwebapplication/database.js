// import Sequelize
const { Sequelize } = require('sequelize');

// create a Sequelize instance for MySQL database connection
// sequelize is the instance of the database connection created using the Sequelize library
// step1: login mysql: mysql -u root -p
// step2: CREATE DATABASE health_check_API;
// step3: SHOW DATABASES;
// step4: USE health_check_API;
// step5: CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// step6: SHOW TABLES;
// step7: DESCRIBE users;
// step8: exit;
const sequelize = new Sequelize('health_check_API', 'root', 'czy200331',{
    host: 'localhost', // database address: indicate development on your own device
    dialect: 'mysql', // the database we used
});

// test database connection
// Steps to Test the Database Connection:
	// 1.	Set up the database connection configuration with the database name, username, password, and host.
	// 2.	Use sequelize.authenticate() to verify whether the connection to the database can be established.
	// 3.	Use the try...catch block to handle successful and failed connections and log appropriate messages.
// function as asynchronous, meaning it can use await to wait for the result of asynchronous operations.
async function testConnection() {
    try {
        // The method sequelize.authenticate() tests whether the database connection can be established using the provided configuration (e.g., host, username, password).
        // returns a Promise, so await is used to wait for the connection attempt to succeed or fail.
        // await pauses the execution of the function until the Promise returned by sequelize.authenticate() resolves.
        await sequelize.authenticate(); // Attempt to connect to the database
        console.log('Connection has been established successsfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();
// export sequelize instance and testConnection function
module.exports = {sequelize};