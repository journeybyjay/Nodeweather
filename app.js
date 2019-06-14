var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var ejs = require('ejs');
var argv = require('yargs').argv
require('dotenv').config();

var city = argv.c || 'seoul';
var apikey = process.env.OPEN_API_KEY
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`

var port = 3000
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log('Server is Starting : Port no 3000')
});

app.get('/', (req, res) => {
    request(url, (err, request, body) => {
        if (err) {
            console.log('error:' + err);
        }

        var jsonw = JSON.parse(body);
        var message = `지금 온도는 ${Math.ceil((jsonw.main.temp-32)/1.8)} degrees in ${jsonw.name}`;
        //console.log(body);
        console.log(jsonw);
        console.log(message);

        var result = {
            weatherResult: Math.ceil((jsonw.main.temp-32)/1.8),
            weatherMessage: message
        }

        fs.readFile('index.html', 'utf-8', (error, data) => {
            if (error) {
                console.log(error);
            }

            res.send(
                ejs.render(data, {
                    data: result.weatherResult,
                    message: result.weatherMessage
                })
            )
        })
        console.log(result);
    })
});



