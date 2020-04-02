const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://pisckipy:nopassword@reviewapi-a48cn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('successfully connected with mongodb.'))
  .catch(err => console.error(err))


app.use('/football', indexRouter);

module.exports = app;