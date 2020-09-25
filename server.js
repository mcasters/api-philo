require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

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
app.get("/", (req, res) =>
    res.json({message: "Welcome to philo api !"})
);
require("./dist/routes/author.routes.js")(app);

app.listen(`${port}`, () => {
    console.log(`Server is running on http://${host}:${port}/`);
});