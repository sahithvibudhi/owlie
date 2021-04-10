const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    register: async (req, res) => {
        const username = req.body.username;
        const name = req.body.name;
        const user = new User({
            username, name
        });
        try {
            await user.save();
        } catch (err) {
            return res.status(500).json({
                err: err.name === 'MongoError' && err.code === 11000 ? 'User ID is already taken': 'Oops! Try again?'
            });
        }
        var token = jwt.sign({ username }, process.env.SECRET, { algorithm: 'HS256'});
        res.json({
            msg: "OK",
            token
        });
    }
}