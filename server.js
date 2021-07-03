const express = require('express');
const app = express();// initialize your express app instance
const cors = require('cors');
const weather = require('./modules/Weather')
const movie = require('./modules/Movie')
const index=require('./modules/Index')
require('dotenv').config();
app.use(cors());



const PORT = process.env.PORT || 8000;
app.get('/', index )
app.get('/movie', movie)
app.get('/weather', weather)
app.listen(PORT);

