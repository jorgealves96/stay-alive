if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express()
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const path = require('path');

const authConfig = require("../config/auth")

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post("/register", async(req, res) => {
    const {name} = req.body;

    try {
        if (await User.findOne({name})) {
            return res.status(400).send({error: "User already exists."})
        }

        if (req.body.confirm_password == req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create(req.body);
            console.log("User registered: \n    name: " + user.name + "\n    password: " + user.password)
            return res.send({user, token: generateToken({id:user.id})});
        }
        else {
            return res.status(400).send({error: "Password confirmation failed."})
        }
    }
    catch(err) {
        return res.status(400).send({ error: "Registration failed."})
    }
});

router.post("/authenticate", async(req, res) => {
    const {name, password} = req.body;

    const user = await User.findOne({ name }).select("+password");

    if (!user)
        return res.status(400).send({ error: "User not found"});

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: "Password incorrect."})

    user.password = undefined;

    /*res.send({
        user,
        token: generateToken({id: user.id})});*/
    
        res.redirect('/home');
})

module.exports = app => app.use("/auth", router);