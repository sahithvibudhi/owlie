const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

dotenv.config();

const auth = require('./routes/auth');
const user = require('./routes/user');
const activity = require('./routes/activity');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

const authMiddleware = (req, res, next) => {
    const data = jwt.verify(req.headers.token, process.env.SECRET);
    res.locals.username = data.username;
    next();
};

app.get('/', (req, res) => {
  res.send('Hello Surfer! are you lost? check out Owlie chrome browser extension')
});

// user
app.post('/user/register', auth.register);
app.get('/user/me', authMiddleware, user.me);
app.post('/user/settings', authMiddleware, user.settings);

//friend
app.post('/follow', authMiddleware, user.follow);

//what are the friends upto?
app.get('/feed', authMiddleware, user.feed);

//activity
app.post('/activity', authMiddleware, activity.register);

mongoose.connect(process.env.MONGO_URI, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
});
