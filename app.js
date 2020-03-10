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
  user: 'cutgjnpbhhnlxk',
  host: 'ec2-3-229-210-93.compute-1.amazonaws.com',
  database: 'de3rqa7h6sj6eo',
  password: 'aee78baf84fdfcc6853e39bf27f42714a658967a73e9f74c72554b235d0f8642',
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