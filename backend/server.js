const express = require('express');
const cors = require("cors");
const session = require("express-session");
// const sqlite3 = require("connect-sqlite3")

const databaseConnection = require("./configs/dbConfig");
const { PORT } = require("./constants");

const userRouter = require("./routes/user.route");
const tweetRouter = require("./routes/tweet.route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// routes
app.use("/user", userRouter);
app.use("/tweet", tweetRouter);

app.get("/", (req, res) => {
    res.status(200).send("<h1 style='text-align: center; min-heigh: 100vh; min-height: 100svh; background-color: gray; color: white; margin: 0px; padding: 0px;'>Twitter MERN - Backend</h1>");
});


app.listen(PORT, async () => {
    console.log(`Listening on port: ${PORT}`);
    try {
        await databaseConnection;
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error while connecting to MongoDB", err);
    }
});