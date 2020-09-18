const express = require("express");
const router = express.Router();
const restaurantModel = require("../models/restaurantModel");

const renderPage = async (req, res) => {
    const restaurantData = await restaurantModel.getOneRestaurant(req.params.slug);
    const reviewData = await restaurantModel.getAllReviews(req.params.slug);
    // console.log("restaurantData", restaurantData);
    
    res.render("template-restaurant", {
        locals: {
            title: "Yelp Express",
            restaurantData: restaurantData,
            reviewData: reviewData,
        },
        partials: {
            restaurants: "partial-restaurants",
            reviews: "partial-reviews",
        },
    });
}

router.get("/:slug?", async (req, res) => {
    renderPage(req, res);
});

router.post("/:slug?", async (req, res) => {
    const {title, review, rating, restaurant_id} = req.body;
    await restaurantModel.addReview(title, review, rating, restaurant_id);
    res.redirect('back');
    // res.sendStatus(200);
})

module.exports = router;