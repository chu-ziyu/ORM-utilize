// In Sequelize, DataTypes is an object used to define the data types of model attributes.
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('./index'); // import Sequelize instance

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING, // Defines the email field as a string type
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    account_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

// encrypted the password before the user is saved
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;