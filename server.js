const express = require('express');
const app = express() ;// initialize your express app instance
const cors = require('cors');
const weather=require('./data/weather.json')
require('dotenv').config();
app.use(cors());



const PORT = process.env.PORT || 8000;
app.get('/', (req, resp) => {
    resp.send("hello world")
})

app.get('/weather',(req , res)=>{
    
    const findData=weather.data.map(item=>new forecast(item))        
         res.send(findData);
         console.log(weather);
})

class forecast{
    constructor(weatherData){
        this.valid_data=weatherData.valid_date;
        this.description=weatherData.weather.description;
    }
}
app.listen(PORT);

