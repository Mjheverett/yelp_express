"use strict";
const http = require("http");
const path = require('path')

const hostname = "127.0.0.1";
const port = 3337;

const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const morgan = require("morgan");
const logger = morgan("tiny");
const helmet = require("helmet");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    session({
        store: new FileStore(),
        secret: "lovely day",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false, // THIS IS OURS
    })
);

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server now running on http://${hostname}:${port}`);
});

const rootController = require("./routes/index");
const restaurantController = require("./routes/restaurant")
const usersController = require("./routes/users")

app.use("/", rootController); // <- ROOT route
app.use("/restaurant", restaurantController); // <- RESTAURANT route
app.use("/users", usersController); // <- USERS route