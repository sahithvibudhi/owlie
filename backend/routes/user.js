const User = require('../models/user');
const Follow = require('../models/follow');
const { domain_from_url } = require("../helpers/url");

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
        const userExist = await User.count({username: follow});
        if (userExist == 0) {
            return res.json({
                msg: `${follow} does not exist`
            });
        }
        if (count != 0) {
            return res.json({
                msg: 'you already follow this user!'
            });
        }
        const user = new Follow({
            username,
            follow
        });
        await user.save();
        res.json({ msg: `You are now following ${follow}` });
    },
    feed: async (req, res) => {
        const {username} = res.locals;
        const following = await Follow.find({username});
        const follwingUserNameList = following.map(follow => follow.follow);
        const info = await User.find({
            username: { $in: follwingUserNameList}
        });
        let feed = info;
        const {location} = req.query;
        if (location) {
            const domain = domain_from_url(location);
            const burst = domain.split('.');
            if (burst.length == 0 || !domain) return res.json({
                err: 'something is wrong with the URL'
            });
            const app = burst[0];
            feed = info.filter(user => user.app == app);
        }
        feed = feed.filter(user => user.settings && user.app && user.settings[user.app]);
        res.json(feed);
    }
}