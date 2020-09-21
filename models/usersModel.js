'use strict'
const db = require("./conn");
const bcrypt = require("bcryptjs");

class UserModel {
    constructor(id, reviewer_name, email, password) {
        this.id = id;
        this.reviewer_name = reviewer_name;
        this.email = email;
        this.password = password;
    }

    // PRIVATE (Instance) METHOD TO CHECK PASSWORD VALIDITY
    async checkPassword(hashedPassword) {
        // RETURNS TRUE OR FALSE
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async addUser() {
        try {
            const response = await db.one(`INSERT INTO reviewers (reviewer_name, email, password) VALUES ($1, $2, $3) RETURNING id;`, [this.reviewer_name, this.email, this.password]);
            return response;
        } catch (error) {
            console.error("ERROR:", error.message);
            return error;
        }
    }

    async login() {
        try {
            const response = await db.one(`SELECT id, reviewer_name, email, password FROM reviewers WHERE email = $1;`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                const { reviewer_name, id } = response;
                return { isValid, reviewer_name, user_id: id };
            } else {
                return { isValid };
            }
        } catch (error) {
            console.error("ERROR:", error.message);
            return error;
        }
    }
}

module.exports = UserModel;

//addReview instance method instead of static method then dont need to pass the id.