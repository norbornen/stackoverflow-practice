// @ts-check

const express = require('express');
const request = require('request-promise')
const app = express();

const key = '27dd86c06ee0058cdea528fcf006a5df';

app.get('/', (req, res) => {
  const city = 'Kyiv';
  const needIcon = 1;

  request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((resp) => {
      const weatherData = JSON.parse(resp);
      const icon = weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].icon : undefined;
      if (needIcon && icon) {
        request(`http://openweathermap.org/img/w/${icon}.png`).pipe(res);
      } else {
        res.json(weatherData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json({ error: `${err}` });
    });
});



app.listen(3003, 'localhost');
