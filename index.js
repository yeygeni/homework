const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const {itemsRouter} = require('./routes/items');
const {categorysRouter} = require('./routes/categorys');
const mongoose = require('mongoose');
mongoose.connect('mongodb://yeygeni:123qwerty@ds211309.mlab.com:11309/hometask');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'./views'));

app.use('/items',itemsRouter);
app.use('/category',categorysRouter);


app.listen(3030,()=>{
	console.log('Working')
})