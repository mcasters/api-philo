require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const sequelize = require("./src/config/sequelize");

const host = 'api.localhost';
const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Access-Control-Allow-Origin
app.use(cors());

// simple route
app.get("/", (req, res) => {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(e => console.error('Unable to connect to the database:', e))
    res.json({message: "Welcome to philo api !"});
});

app.listen(`${port}`, () => {
    console.log(`Server is running on http://${host}:${port}/`);
});