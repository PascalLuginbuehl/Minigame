const express = require('express')
  , app = express()
  , exphbs = require('express-handlebars')
  , bodyParser = require('body-parser')
  , formidable = require('express-formidable')
  , session = require('express-session')
  , expressWs = require('express-ws')(app);


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
app.use(formidable.parse());


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
  console.log("asd");
  console.log(req.session.test = "LOL");
  ws.on('message', function(msg) {
    try {
      var json = JSON.parse(e.data);
      switch (json.task) {
        case "message":

          break;
        case "loadMessages":

          break;
        default:
          console.log("task not found");
      }
    } catch (e) {
      console.log("wrong JSON format");
    }
    console.log(req.session);
    ws.send(msg);
  });
});

// 404
// app.use(function(req, res, next) {
//   res.status(404).render('error', {});
// });

app.listen(80);
