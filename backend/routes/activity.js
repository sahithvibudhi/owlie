const Activity = require("../models/activity");
const User = require("../models/user");
const { domain_from_url } = require("../helpers/url");


module.exports = {
    register: async (req, res) => {
        const { username } = res.locals;
        const {
            location
        } = req.body;
        const domain = domain_from_url(location);
        const burst = domain.split('.');
        if (burst.length == 0 || !domain) return res.json({
            err: 'something is wrong with the URL'
        });
        const app = burst[0];
        const user = await User.findOne({ username });
        if (user.settings && !user.settings[app]) {
            return res.json({
                err: `${username} turned off tracking for ${app}`
            });
        }
        const activity = new Activity({
            username,
            app,
            location
        });
        await activity.save();
        user.location = location;
        user.app = app;
        await user.save();
        res.json({app, location, username});
    }
}