const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

require("./src/controllers/authController")(app);
require("./src/controllers/projectController")(app);
// viewed at http://localhost:3000

const dirname = __dirname + "/public/"

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Server running on: ' + add + ":" + port + " or localhost:" + port);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(dirname + 'login.html'));
    console.log("Acessing login page.")
});

app.get("/home", function(req, res) {
    res.sendFile(path.join(dirname + "home.html"))
    console.log("Acessing home page.");
});

app.get("/forgotpassword", function(req, res) {
    res.sendFile(path.join(dirname + "forgotpassword.html"))
    console.log("Acessing forgot password page.")
})

app.get("/store", function(req, res) {
    res.sendFile(path.join(dirname + "store.html"))
    console.log("Acessing store page.")
})

app.get("/about", function(req, res) {
    res.sendFile(path.join(dirname + "about.html"))
    console.log("Acessing about page.")
})

app.get("/policy", function(req, res) {
    res.sendFile(path.join(dirname + "policy.html"))
    console.log("Acessing policy page.")
})

app.get("/contact", function(req, res) {
    res.sendFile(path.join(dirname + "contact.html"))
    console.log("Acessing contact us page.")
})

app.get("/covid", function(req, res) {
    //getCovidCases();
    res.sendFile(path.join(dirname + "covid.html"))
    console.log("Acessing covid-19 world cases page.")
});

app.get("/covid_search", function(req, res) {
    res.sendFile(path.join(dirname + "covid_search.html"))
    console.log("Acessing covid-19 search by country page.")
})


app.listen(port);