const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const UserModel = require("../models/usersModel");

router.get("/login", (req, res) => {
    res.render("template", {
        locals: {
            title: "Yelp Express",
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            restaurants: "partial-login",
        },
    });
});

router.get("/signup", (req, res) => {
    res.render("template", {
        locals: {
            title: "Yelp Express",
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            restaurants: "partial-signup",
        },
    });
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const userInstance = new UserModel(null, null, email, password);

    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        
        if (!!response.isValid) {
            const { reviewer_name, user_id } = response;
            req.session.reviewer_name = reviewer_name;
            req.session.user_id = user_id;
            res.redirect("/");
        } else {
            res.send(401);
        }
    })
});

router.post("/signup", (req, res) => {
    const { reviewer_name, email, password } = req.body;
    
    // Salt AND Hash our password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new UserModel(null, reviewer_name, email, hash);

    userInstance.addUser().then(response => {
        if (response.id !== undefined) {
            res.redirect("/users/login");
        } else {
            res.redirect("/users/signup");
        }
    })
});

module.exports = router;