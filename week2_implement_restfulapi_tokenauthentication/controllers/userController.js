const User = require('../models/user');

// an asynchronous function that will handle the creation of a new user
// It’s designed to be used as a route handler in your Express application.
exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // Check for existing users
        const existingUser = await User.findOne({ where: {email} });
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'})
        }
        // Create a new user
        const newUser = await User.create({ email, password, firstName, lastName });
        // Send a response
        // If the user is successfully created, 
        // a 201 Created status is sent back to the client, along with a JSON response
        res.status(201).json({
            if: newUser.id,
            email: newUser.email,
            lastName: newUser.lastName,
            firstName: newUser.firstName,
            account_created: newUser.account_created,
            account_updated: newUser.account_updated
        });
    } catch (error) {
        // 500 Internal Server Error
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }  
};

// Fetch user's info
// asynchronous function that retrieves user information based on the authenticated user’s email
exports.getUser = async (req, res) => {
    const { email } = req.user;
    try {
        // the reason using email is that you can use column name for sql query
        // the reason using ['password'] is that you can return a user without password
        const user = await User.findOne({ where: {email}, attributes: {exclude: ['password']} });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}