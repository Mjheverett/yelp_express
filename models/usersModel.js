const db = require('./conn');

class ReviewerList {
    constructor(reviewer_name, email, password) {
        this.reviewer_name = reviewer_name;
        this.email = email;
        this.password = password;
    }

    static async addReviewer(title, review, stars, restaurant_id) {
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