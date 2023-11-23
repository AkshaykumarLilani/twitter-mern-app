const express = require('express');
const { createATweet, readAllTweets, updateATweet, deleteATweet } = require('../controllers/tweet.controller');
const isAuthenticatedMiddleware = require('../middlewares/isAuthenticatedMiddleware');


const router = express.Router();

router.post("/", isAuthenticatedMiddleware, createATweet);
router.get("/", isAuthenticatedMiddleware, readAllTweets);

router.patch("/:id", isAuthenticatedMiddleware, updateATweet);
router.delete("/:id", isAuthenticatedMiddleware, deleteATweet);


module.exports = router;