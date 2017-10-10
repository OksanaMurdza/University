const express = require('express');
const session = require('express-session');
const app = express();
const Server  = require("http").Server;
const server = Server(app);
const config = require('./config');
const cookieParser = require('cookie-parser');
const path = require('path');
const twig = require('twig');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || config.server.port;        // set our port

app.use(express.static('src/build'));

app.set('views', __dirname + '/views');
app.engine('twig', twig.renderFile);
app.set('view engine', 'twig');

;

app.use(cors());
const routes = require('./api/routes/app.js');
app.use('/api', routes);

app.get('*', (req , res) => {
    console.log('index');
    res.render('index.twig');
});

app.listen(port);
console.log('nodejs backend is startup on port ' + port + '!');

