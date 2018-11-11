let fs                 = require('fs'),
    path               = require('path'),
    express            = require('express'),
    mongoose           = require('mongoose'),
    logRequest         = require('morgan'),
    expressValidator   = require('express-validator'),
    bodyParser         = require('body-parser'),
    config             = require('./config/config.js');


global.logger = require('./lib/logger/index.js');

// Check environment
if(process.env.NODE_ENV === 'test'){
  global.config = config.test;
}else {
  global.config = config.def;
}

// Create database connection
let dbConfig = global.config.mongodb.host + global.config.mongodb.db;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig, {useNewUrlParser: true}, function (err) {
  if (err) {
    logger.error("Mongodb connection error: " + JSON.stringify(err));
    throw err;
  }else {
    logger.info("Successfully connected to " + dbConfig);
  }
});

// Plugging mongoose a native Promise library
mongoose.Promise = global.Promise;

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(logRequest('combined'));
app.use('/apidoc', express.static('apidoc'));

//Load backend controllers
const CONTROLLERS_PATH = path.join(__dirname, './controllers');
fs.readdirSync(CONTROLLERS_PATH).forEach(function (dir) {
  let controllerPath = path.join(CONTROLLERS_PATH, dir, 'router.js');
  if (fs.existsSync(controllerPath)) {
    app.use('/', require(controllerPath));
  }
});

app.all('*', function(req, res){
  res.send('404 Not found');
});

let port = global.config.app.port;
app.listen(port, function(){
  logger.info('App listening on port ' + port);
});

module.exports = app;