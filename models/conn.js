const host = "lallah.db.elephantsql.com";
const database = "bsommtfy";
const user = "bsommtfy";
const password = "YRexV_HyVRTaMimD9iUe6wXvV40R-PAO";

const pgp = require("pg-promise")({
    query: function (e) {
        console.log("QUERY:", e.query);
    },
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password,
};

const db = pgp(options);

module.exports = db;
