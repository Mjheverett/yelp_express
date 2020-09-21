const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("template", {
        locals: {
            title: "Yelp Express",
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
        },
        partials: {
            restaurants: "partial-signup",
        },
    });
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Form submission is:", req.body);
    res.sendStatus(200);
})

router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log("Form submission is:", req.body);
    res.sendStatus(200);
})

module.exports = router;