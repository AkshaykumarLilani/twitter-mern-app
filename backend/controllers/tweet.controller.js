const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

const createATweet = async (req, res) => {
    try {
        // {
        //     "user": "id",
        //     "title": "title",
        //     "body": "body",
        //     "category": "education"
        // }

        const body = req.body;
        console.log({ body });

        if (!body.user || !body.title || !body.body || !body.category) {
            return res.status(400).send({
                msg: "title, body and category - all are required."
            })
        }

        let user = await User.findOne({ _id: body.user });
        if (!user) {
            return res.status(400).send({
                msg: "No user found"
            })
        }

        const newTweet = new Tweet({
            user: user._id,
            title: body.title,
            body: body.body,
            category: body.category
        });
        await newTweet.save();
        return res.status(201).send({
            msg: "Tweet creation successful",
            tweet: newTweet
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Internal Server Error"
        });
    }
};

const readAllTweets = async (req, res) => {
    try {
        const query = req.query;
        console.log({ query });
        const tweets = await Tweet.find(query);
        return res.status(200).send({
            tweets
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Internal Server Error"
        });
    }
}

const updateATweet = async (req, res) => {
    try {
        const id = req.params?.id;
        console.log({ id, req: req.session.user });

        const tweet = await Tweet.findOne({ _id: id }).populate('user');
        if (!tweet) {
            return res.status(404).send({
                msg: "tweet not found"
            })
        }

        console.log({ tweet })
        const isOwner = req.session?.user?.email === tweet.user?.email
        console.log({ isOwner })

        if (isOwner) {
            const body = req.body;
            const t = await Tweet.findOneAndUpdate({ _id: tweet._id }, { ...body });
            return res.status(200).send({
                msg: "Tweet updated successfully"
            });
        } else {
            return res.status(403).send({
                msg: "You don't own this tweet"
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Internal Server Error"
        });
    }
}

const deleteATweet = async (req, res) => {
    try {
        const id = req.params?.id;
        console.log({ id, req: req.session.user });

        const tweet = await Tweet.findOne({ _id: id }).populate('user');
        if (!tweet) {
            return res.status(404).send({
                msg: "tweet not found"
            })
        }

        console.log({ tweet })
        const isOwner = req.session?.user?.email === tweet.user?.email
        console.log({ isOwner })

        if (isOwner) {
            const t = await Tweet.findByIdAndDelete({ _id: id })
            return res.status(200).send({
                msg: "Tweet Deleted successfully"
            });
        } else {
            return res.status(403).send({
                msg: "You don't own this tweet"
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Internal Server Error"
        })
    }
}

module.exports = {
    createATweet,
    readAllTweets,
    updateATweet,
    deleteATweet
}