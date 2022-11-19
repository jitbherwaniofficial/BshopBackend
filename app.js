const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

//IT ALLOWS ANY OTHER HTTP REQUEST TO BE PASSED FROM ANY ORIGIN//
app.use(cors());
app.options('*',cors());

//ROUTES//
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');
const categoriesRouter = require('./routers/categories');


const api = process.env.API_URL;

//MIDDLEWARES//
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'))
app.use(errorHandler)

//ROUTERS//
app.use(`/${api}/products`, productsRouter);
app.use(`/${api}/users`, usersRouter);
app.use(`/${api}/orders`, ordersRouter);
app.use(`/${api}/categories`, categoriesRouter);

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('DATABASE CONNECTED');
    }).catch((err) => {
        console.log(err);
    })

app.listen(3000, () => {
    console.log(api);
    console.log("server is running on http://localhost:3000");
})