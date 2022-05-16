const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myConnection');

require('dotenv').config;


const app = express();

// importing routes
const  articuloRoutes = require('./routes/articulo');
const  clienteRoutes = require('./routes/cliente');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'testPrueba'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', clienteRoutes);
//app.use('/articulo', articuloRoutes);


// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});