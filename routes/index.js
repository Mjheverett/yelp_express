const express = require("express");
const router = express.Router();
const restaurantModel = require("../models/restaurantModel");

const renderPage = async res => {
    const restaurantData = await restaurantModel.getAllRestaurants();
    // const statusData = await rankModel.getAllStatuses();
    console.log("restaurantData", restaurantData);
    // console.log("rankData". rankData);
    res.render("template", {
        locals: {
            title: "Yelp Express",
            restaurantData: restaurantData,
            // statusData: statusData,
        },
        partials: {
            restaurants: "partial-index",
        },
    });
}

router.get("/", async (req, res, next) => {
    renderPage(res);
});

router.post("/", async (req, res) => {
    for (let key in req.body) {
        if (req.body[key] !== '') {
            await restaurantModel.updateData();
        }
    }
    renderPage(res);
})

module.exports = router;