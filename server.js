'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

var port = process.env.PORT || 3001;

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const posts = require('./routes/schedulePosts');
const rsvp = require('./routes/rsvp');
const parking = require('./routes/parking');
// const brewers = require('./routes/brewers');
// const votes = require('./routes/votes');
// const comments = require('./routes/comments');
// const perks = require('./routes/perks');
// const thanks = require('./routes/thanks');
// const dishes = require('./routes/dishes');

app.use('/api/schedulePosts', posts);
app.use('/api/rsvp', rsvp);
app.use('/api/parking', parking);
// app.use('/api/brewers', brewers);
// app.use('/api/votes', votes);
// app.use('/api/thanks', thanks);
// app.use('/api/comments', comments);
// app.use('/api/perks', perks);
// app.use('/api/dishes', dishes);

app.listen(port, function () {
  console.log('Listening on port', port);
});
