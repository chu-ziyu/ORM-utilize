// Import dependencies
const express = require('express');
const { createUser, getUser } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Routers help organize routes in separate files to keep the application clean and manageable.
const router = express.Router();

// handles the creation of a new user
router.post('/users', createUser); 
// retrieves the information of the currently authenticated user
// Middleware: authenticateUser is used here before accessing the getUser handler. 
// This means the user must be authenticated to access this route.
router.get('/users/me', authenticateUser, getUser);

// Export the router
module.exports = router;