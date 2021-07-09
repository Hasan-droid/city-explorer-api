
const axios = require('axios');
const memory={};
const weather = (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let memoryKey=`${lat}-${lon}`;
    if(memoryKey in memory)
    {   console.log('cache hit')
        res.send(memory[memoryKey])
    }
    else
    {
        let url = `${process.env.weathbit_DOMAIN}?key=${process.env.weathbit_API_KEY}&lat=${lat}&lon=${lon}`
        const getWeathebitData = axios.get(url).then(response => {
            const weather = response.data;
            const findData = weather.data.map(item => new forecast(item))
            memory[memoryKey]=findData;
            console.log('cache missed')
            res.send(findData);
            // console.log(weather);
    
        }).catch(error => res.send(error.message));
    }

   

}

class forecast {
    constructor(weatherData) {
        this.valid_data = weatherData.valid_date;
        this.description = weatherData.weather.description;
    }
}

module.exports = weather;
