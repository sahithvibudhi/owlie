const User = require('../models/user');
const Follow = require('../models/follow');

module.exports = {
    me: async (req, res) => {
        const user = await User.findOne({
            username: res.locals.username
        });
        const { username, name, settings } = user;
        res.json({
            username, name, settings
        });
    },
    settings: async (req, res) => {
        let {
            youtube, spotify, medium, netflix
        } = req.body;
        let { username } = res.locals;
        let user = await User.findOne({username});
        user.settings = {
            youtube, spotify, medium, netflix
        };
        await user.save();
        const { name, settings } = user;
        res.json({ username, name, settings });
    },
    follow: async (req, res) => {
        const {username} = res.locals;
        const {follow} = req.body;
        const count = await Follow.count({ username, follow });
        console.log(count);
        if (count != 0) {
            return res.status(500).json({
                msg: 'you already follow this user!'
            });
        }
        const user = new Follow({
            username,
            follow
        });
        await user.save();
        res.json({ msg: 'ok' });
    },
    feed: async (req, res) => {
        const {username} = res.locals;
        const following = await Follow.find({username});
        const follwingUserNameList = following.map(follow => follow.follow);
        const info = await User.find({
            username: { $in: follwingUserNameList}
        });
        res.json(info);
    }
}