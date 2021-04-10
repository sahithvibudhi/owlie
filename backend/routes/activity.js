const Activity = require("../models/activity")
const User = require("../models/user")

function domain_from_url(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}

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
        const activity = new Activity({
            username,
            app,
            location
        });
        await activity.save();
        const user = await User.findOne({username});
        user.location = location;
        user.app = app;
        await user.save();
        res.json({app, location, username});
    }
}