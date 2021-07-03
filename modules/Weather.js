const axios = require('axios');

const weather = (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;


    let url = `${process.env.weathbit_DOMAIN}?key=${process.env.weathbit_API_KEY}&lat=${lat}&lon=${lon}`
    const getWeathebitData = axios.get(url).then(response => {
        const weather = response.data;
        const findData = weather.data.map(item => new forecast(item))
        res.send(findData);
        console.log(weather);

    }).catch(error => res.send(error.message));

}

class forecast {
    constructor(weatherData) {
        this.valid_data = weatherData.valid_date;
        this.description = weatherData.weather.description;
    }
}

module.exports = weather;
