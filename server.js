const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

dotenv.config({path: 'config.env'});
const port = process.env.port || 8080;

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser
app.use(bodyparser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"))

//load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));


app.use('/',require('./server/routes/router'));

app.listen(port, ()=>{
    console.log(`Server is Running on Http Localhost http://localhost:${port}`)
});

