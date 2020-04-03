const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

// Swagger set up
const options = require('./swagger')
const specs = swaggerJsdoc(options);
app.use("/football/v1/docs", swaggerUi.serve);
app.get("/football/v1/docs", swaggerUi.setup(specs, { explorer: true }));

app.use('/football/v1/', indexRouter);

module.exports = app;