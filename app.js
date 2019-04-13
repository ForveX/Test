const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const vechRoutes = require('./api/routes/vechicles');

mongoose.connect('mongodb+srv://testapp:testapp@main-cie3q.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use('/vechicles', vechRoutes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;