/// <reference path="../../definitions/node.d.ts"/>
import Game from "../common/Classes/Game";
import Entity from "../common/Classes/Entity";
import V from "../common/Classes/Vector";
import Communicator from "./../server/Communicator";

const express = require('express')
  , app = express()
  , exphbs = require('express-handlebars')
  , bodyParser = require('body-parser')
  , formidable = require('express-formidable')
  , session = require('express-session')
  , expressWs = require('express-ws')(app);


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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(formidable.parse());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
}));



app.all('/', function (req, res, next) {
  res.render('index', {});
});







function getTime() {
  let hrend = process.hrtime();
  return hrend[0] + hrend[1]/1000000;
}


let game = new Game({
  gameLoopInterval: 16,

  map: {
    height: 1000,
    width: 1000,
  },

  textureBasepath: 'assets/images/',
  textures: {
    'dirt': {
      texture: 'dirt.png',
      w: 16,
      h: 16,
      spriteMax: 5,
    },
    'house': {
      texture: 'house.png',
      w: 254,
      h: 198,
      spriteMax: 1,
    },
    'duck': {
      texture: 'player.png',
      w: 16,
      h: 18,
      spriteMax: 4,
    },
  },

  models: {
    'dirt': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 16,
        h: 16,
      }],
    },
    'house': {
      solid: true,
      static: true,
      hitbox: [{
        x: 0,
        y: 0,
        w: 254,
        h: 198,
      }],
    },
    'duck': {
      solid: true,
      static: false,
      hitbox: [{
        x: 0,
        y: 0,
        w: 18,
        h: 18,
      }],
    }
  },
}, getTime);


game.addEntity(new Entity(
  new V(0, 0),
  game.models['house'],
));

game.addEntity(new Entity(
  new V(700, 700),
  game.models['house'],
));


let communicator = new Communicator(game, app, expressWs);




app.listen(8080);
