// This file implements a middleware function that authenticates users 
// based on the Basic Authentication scheme. 
// Middleware is a function that executes before the actual request handler in Express. 
// In this case, the authenticateUser middleware ensures that only authenticated users 
// can access certain routes by checking the user’s credentials.

// Import dependencies
const bcrypt = require('bcryptjs');
// user model which interact with the database
// middleware fetch the user record from database using email
const User = require('../models/user');

// Define the Middleware Function
// asynchronous operations like querying the database and comparing passwords
exports.authenticateUser = async(req, res, next) => {
    // Extract the Authorization Header
    // Basic Authentication uses a header in the format: 
    // Authorization: Basic 
    // base64encoded(email:password).
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Miss or invalid authorization header'});
    }

    // Decode Base64 Credentials
    // The string after 'Basic ' is the base64-encoded credentials.
    const base64Credentials = authHeader.split(' ')[1];
    // decodes the base64-encoded string into its original email and password format (email:password)
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    // splits the decoded string into an array
    const [email, password] = credentials.split(':');

    // Validate the User Credentials
    try {
        // searches the database for a user with the specified email
        const user = await User.findOne({ where: {email} });
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Attach User to the Request Object
        // If the authentication is successful (email exists and password matches), 
        // the user is attached to req.user so that subsequent middleware or 
        // route handlers can access it.
        req.user = { email };
        // Proceed to Next Middleware or Route Handler
        // If everything is valid, the middleware calls next() to pass control to the next middleware or route handler.
        // the next handler is likely the route handler that processes the actual request 
        // (e.g., getUser or createUser in your userController.js).
        next();
    } catch (error) {
        res.status(500).json({ message: 'Authentication error', error: error.message });
    }
}
