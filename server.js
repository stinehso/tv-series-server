const express = require('express');
const cors = require('cors');
const fs = require('fs');
//const async  = require('express-async-await');
//const fetch = require('node-fetch');

const tvApi = require('./controllers/tvApi');
const reports = require('./controllers/reports');

const app = express();

app.use(express.json());
app.use(cors());


const readFile = () => {
    fs.readFile('./Series.txt', (err, data) => {
        if (err) throw err;
        seriesList = data.toString('utf8').split('\r\n');
        return seriesList
    })
}

let seriesList = readFile();






app.get('/summary', (req, res) => {
    console.log(seriesList);
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})

app.get('/summary/download', reports.summaryFile)

app.get('/nextWeek', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.nextWeek(info, res)
    }) 
})

app.get('/top10', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})

app.get('/topNetworks', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})

app.get('/bestEpisode', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})

app.get('/recommended', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})




app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
