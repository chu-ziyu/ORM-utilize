// set up the Express server and the /healthz endpoint
const express = require('express');
const {sequelize} = require('./database');

const app = express();
const PORT = process.env.PORT || 8080;

// Built-in middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define Health check endpoint
// The code checks if the request contains any query parameters (req.query) or 
// body content (req.body). If either is present, the server responds with a 400 
// Bad Request status. This ensures that no data is passed in the health check request, 
// as the endpoint is only supposed to test the server and database status.
app.get('/healthz', async(req, res) => {
    // // Check for any payload
    if(Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
        return res.status(400).send();
    }
    // test the database connection
    try {
        // This method checks whether the database connection is working and return a promise.
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        // This header ensures that the response is not cached.
        // You always need a real-time status not a cached version.
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        // return Status Codes
        return res.status(200).send(); // OK
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.status(503).send(); // Service Unavailable
    }
});

// start the express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});