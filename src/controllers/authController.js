if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express()
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("../../passport-config")
initializePassport(
    passport,
    name => users.find(user => user.name === name)
)

const router = express.Router();
app.use(express.urlencoded({extended:false}));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
}))

router.post("/register", async(req, res) => {
    try {
        if (req.body.confirm_password == req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create(req.body);
            console.log("User registered: \n    name: " + user.name + "\n    password: " + user.password)
            return res.send("Registration sucessful.");
        }
        else {
            return res.send("Incorrect password confirmation.")
        }
    } catch(err) {
        return res.status(400).send({ error: "Registration failed."})
    }

});

module.exports = app => app.use("/auth", router);