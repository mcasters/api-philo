require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const sequelize = require('./dist/config/sequelize');

const host = 'api.localhost';
const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Access-Control-Allow-Origin
app.use(cors());

// To sync the ddb
app.get('/sync', function (req, res) {
    sequelize.sync({force: true})
        .then(function () {
            console.log('sync done');
            res.send(200, 'sync done')
        })
        .catch(function (error) {
            console.log('there was a problem');
            res.send(200, 'there was a problem');
        });
});

// simple route
app.get("/", (req, res) =>
    res.json({message: "Welcome to philo api !"})
);
require("./dist/routes/author.routes.js")(app);
require("./dist/routes/notableIdea.routes.js")(app);
require("./dist/routes/work.routes.js")(app);
require("./dist/routes/quote.routes.js")(app);
require("./dist/routes/school.routes.js")(app);
require("./dist/routes/topic.routes.js")(app);

app.listen(`${port}`, () => {
    console.log(`Server is running on http://${host}:${port}/`);
});