// Initialize Sequelize Connection
const { Sequelize } = require('sequelize');
// import the configuration settings for your Sequelize instance from a configuration file
// for development usage, you can access different databases for different usages 
// like development, test and production
const config = require('../config/config').development;

// Creating a Sequelize Instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

// Syncing the Database
sequelize.sync({ alter: true }) // synchronize your models with the database
    // If the models change, Sequelize will attempt to alter the existing tables to match the new structure.
    // Handling Sync Success and Errors
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.log('Failed to sync database:', err));

// Exporting the Sequelize Instance
module.exports = sequelize;