const express = require('express')
  , app = express()
  , exphbs = require('express-handlebars')
  , bodyParser = require('body-parser')
  , formidable = require('express-formidable')
  , session = require('express-session')
  , expressWs = require('express-ws')(app)
  , Game = require('./Classes/Game.js');

app.use('/assets', express.static('public'));

app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  partialsDir: [
    'views/partials/',
  ],
}));

app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(formidable.parse());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
}));



// app.use(multilang);
app.all('/', function (req, res, next) {
  res.render('index', {});
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {

    expressWs.getWss().clients.forEach(function (client) {
      client.send(msg);
    });

  });
});


app.listen(80);
