const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const { JSON_TOKEN_SECRET } = require("../constants");
const Token = require('../models/token.model');

const generateJsonToken = ({ email }) => {
    const token = jwt.sign({ email }, JSON_TOKEN_SECRET);
    console.log({ token })
    return token;
}

const registerUser = async (req, res) => {
    try {
        console.log("Request received for registration")
        const data = req.body;
        if (!data.email || !data.name || !data.password || !data.gender) {
            return res.status(400).send({
                msg: "Email, Name, Password & Gender - All are required"
            });

        }
        console.log({ data });

        let user = await User.findOne({ email: data.email });
        if (user) {
            return res.status(400).send({
                msg: "This email is already taken."
            });
        }
        console.log({ user });
        const salt = bcrypt.genSaltSync(12);
        console.log({ salt });
        const hashedPassword = await bcrypt.hash(data.password, salt);
        console.log({ salt, hashedPassword });

        user = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            gender: data.gender,
            passwordSalt: salt,
        });
        await user.save();

        // login
        const token = generateJsonToken({ email: data.email });
        req.session.user = user;
        req.session.token = token;

        const tokens = await Token.find({ user: user.id });
        if (tokens) {
            for (const t of tokens) {
                await Token.findByIdAndDelete({ _id: t.id })
            }
        }
        const newToken = new Token({
            token: token,
            user: user.id
        });
        await newToken.save();

        return res.status(201).send({
            user: user,
            accessToken: token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Error occurred while creating user"
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email || !data.password) {
            res.status(400).send({
                msg: "Email & Password - Both are required"
            });
        }

        let user = await User.findOne({ email: data.email });
        if (user) {
            console.log({ user });
            console.log({ password: data.password, hash: user.password })
            const isPassValid = await bcrypt.compare(data.password, user.password);

            if (!isPassValid) {
                return res.status(404).send({
                    msg: "Incorrect Email Id or Password"
                })
            }

            const token = generateJsonToken({ email: user.email });
            req.session.user = user;
            req.session.token = token;
            console.log(req.session);

            const tokens = await Token.find({ user: user.id });
            if (tokens) {
                for (const t of tokens) {
                    await Token.findByIdAndDelete({ _id: t.id })
                }
            }
            const newToken = new Token({
                token: token,
                user: user.id
            });
            await newToken.save();

            return res.status(200).send({
                msg: "Login Successful",
                token: token,
                userId: user.id
            });
        } else {
            return res.status(400).send({
                msg: "Incorrect EmailId or Password"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: "Error occurred while logging in"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}