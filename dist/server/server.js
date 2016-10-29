var express = require('express'), app = express(), exphbs = require('express-handlebars'), bodyParser = require('body-parser'), formidable = require('express-formidable'), session = require('express-session'), expressWs = require('express-ws')(app);
app.use('/assets', express.static('dist/client'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'layout',
    partialsDir: [
        'views/partials/',
    ],
}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
}));
app.all('/', function (req, res, next) {
    res.render('index', {});
});
app.listen(8080);
