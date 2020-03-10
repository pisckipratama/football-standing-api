let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

// set db connection 
const {
  Pool
} = require('pg')
const pool = new Pool({
  user: 'pisckipy',
  host: 'localhost',
  database: 'football',
  password: 'Bismillah',
  port: 5432,
})

var indexRouter = require('./routes/index')(pool);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/football', indexRouter);

module.exports = app;