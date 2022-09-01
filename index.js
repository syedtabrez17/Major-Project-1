const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.use(express.static('./assets'));

// Use of Layouts
app.use(expressLayouts);
// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODo change the secret before deployment  in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb://localhost/codeial_development',
            autoRemove : 'disable'
        },
        function(err){
            console.log(err || 'Connect- mongodb setup ok ' )
        }
        )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// Use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        // console.log('Error: ',err);
        console.log(`Error in running thr server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});