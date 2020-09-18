const db = require('./conn');

class YelpList {
    constructor(restaurant_name, category, takeout) {
        this.restaurant_name = restaurant_name;
        this.category = category;
        this.takeout = takeout;
    }

    static async getAllRestaurants() {
        try {
            const response = await db.any(
                `SELECT * FROM restaurants 
                ORDER BY restaurants.id;`
            );
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    }

    static async getOneRestaurant(slug) {
        try {
            // console.log("req params in model", slug);
            const response = await db.one(
                `SELECT * FROM restaurants 
                WHERE slug = $1;`, [slug]
            );
            // console.log("getOne response", response);
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    }

    static async getAllReviews(slug) {
        try {
            const restaurant_id = await db.one(
                'SELECT id FROM restaurants WHERE slug = $1;', [slug]
            );
            const response = await db.any(
                `SELECT * FROM reviews 
                WHERE reviews.restaurant_id = $1;`, [restaurant_id.id]
            );
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    }

    static async addReview(title, review, stars, restaurant_id) {
        const starRating = Number(stars);
        try {
            const response = await db.result(
                `INSERT INTO reviews(title, review, stars, reviewer_id, restaurant_id) VALUES ($1, $2, $3, $4, $5)`, [title, review, starRating, 1, restaurant_id]
            );
            return response;
        } catch (error) {
            console.error("ERROR:", error);
            return error;
        }
    }
}

module.exports = YelpList;

//addReview instance method instead of static method then dont need to pass the id.