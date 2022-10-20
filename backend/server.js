const express = require("express");
const dotenv = require("dotenv").config(); // Import Environment Variables
const colors = require("colors");
const { getDB } = require("./config/db");
const {errorHandler} = require('./middlewares/errorMiddleware');
const app = express();

const port = process.env.PORT || 5000

//Database Connection and Populate Sample Data
getDB()
    .then(res => {
        app.set('db',res);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


//Middleware for req.body
app.use(express.json()); // Convert request data to json format
app.use(express.urlencoded({ extended: false })); // Allows only url-encoded else reject

//Routes
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/dashboard',require('./routes/dashboardRoutes'));


//At last, ErrorMiddleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on PORT ${port}`.bold));