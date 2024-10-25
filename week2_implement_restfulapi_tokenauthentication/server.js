// load environment variables from a .env file into process.env
require('dotenv').config();
// Express app is imported from app.js
const app = require('./app');
const PORT = process.env.PORT;

// starts the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});