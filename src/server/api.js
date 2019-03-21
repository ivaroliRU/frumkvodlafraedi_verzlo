const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const exphbs  = require('express-handlebars');
const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const app = express();

//location of all static files such as "index.html"
var files = path.normalize("./dist");

//handlebars middleware setup
app.set('views', files + '/views');
app.engine('.hbs', exphbs({
        defaultLayout: 'main', 
        extname: '.hbs',
        layoutsDir: files + '/views/layouts',
        partialsDir: files + '/views/partials',
        helpers: {
            toJSON : function(object) {
                return JSON.stringify(object);
            }
        }
}));
app.set('view engine', '.hbs');

//setup
//app is able to get static files such as CSS files
app.use('/', express.static(files));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Use Session for authentication
app.use(session({
    secret:'e00beb37-6796-4862-b384-dbb2def7f894', //process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false,
    maxAge: null
}));

const oidc = new ExpressOIDC({
    issuer: `${process.env.ORG_URL}/oauth2/default`,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
    scope: '',//'openid profile',
});

//use okta for login
app.use(oidc.router)
app.use('/', indexRouter)
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = app;