const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

// Use of Layouts
app.use(expressLayouts);
// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Use express router
app.use('/',require('./routes/index'));

// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        // console.log('Error: ',err);
        console.log(`Error in running thr server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});