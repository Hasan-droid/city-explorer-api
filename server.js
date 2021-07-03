const express = require('express');
const app = express();// initialize your express app instance
const cors = require('cors');
const { response } = require('express');
//const weather=require('./data/weather.json')
const axios = require('axios');
require('dotenv').config();
app.use(cors());



const PORT = process.env.PORT || 8000;
app.get('/', (req, resp) => {
    resp.json("hello world")
})

app.get('/movie' , (req , res)=> {
       let query=req.query.city;
   let url= `https://api.themoviedb.org/3/search/movie?api_key=${process.env.themoviedb_API_KEY}&query=${query}`
   const getMoviesAPI=axios.get(url).then(response=>{
       const movies=response.data.results;
       const findData=movies.map(item=> new renderMovies(item))
       res.send(findData);
   }).catch(error=>res.send(erorr.message));


})

app.get('/weather', (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
   

    let url = `${process.env.weathbit_DOMAIN}?key=${process.env.weathbit_API_KEY}&lat=${lat}&lon=${lon}`
    //  let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=0429ea16eed9494482b9b23e26dee600&lon=${lon}&lat=${lat}`

    const getWeathebitData = axios.get(url).then(response => {
        (console.log(response.data))
        // res.json(response.data)
        const weather = response.data;
        const findData = weather.data.map(item => new forecast(item))
        res.send(findData);
        console.log(weather);

    }).catch(error=>res.send(error.message));

})



class forecast {
    constructor(weatherData) {
        this.valid_data = weatherData.valid_date;
        this.description = weatherData.weather.description;
    }
}

class renderMovies{
constructor(data){
    this.original_title=data.original_title;
    this.vote_count=data.vote_count;
    this.poster_path='https://image.tmdb.org/t/p/original/'+data.poster_path;
}
}
app.listen(PORT);

