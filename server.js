const express = require('express');
const cors = require('cors');
const fs = require('fs');
//const async  = require('express-async-await');
//const fetch = require('node-fetch');

const tvApi = require('./controllers/tvApi');
const summary = require('./controllers/summary');
const nextWeek = require('./controllers/nextWeek');

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
const root = __dirname





app.get('/summary', (req, res) => {
    console.log(seriesList);
    tvApi.getShowInfo(seriesList)
    .then(info => {
        summary.summary(info, res)
    }) 
})

app.get('/summary/download', (req, res) => summary.summaryFile(req, res, root))

app.get('/nextWeek', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        nextWeek.nextWeek(info, res)
    }) 
})

app.get('/top10', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        summary.summary(info, res)
    }) 
})

app.get('/topNetworks', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        summary.summary(info, res)
    }) 
})

app.get('/bestEpisode', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        summary.summary(info, res)
    }) 
})

app.get('/recommended', (req, res) => {
    tvApi.getShowInfo(seriesList)
    .then(info => {
        summary.summary(info, res)
    }) 
})

// * Top 10 - Skal liste serier sortert på rating  

// * Top network - Skal liste "network" samt aktuelle tv-serier basert på gjennomsnittlig-rating.
// AVERAGE_RATING;NETWORK;TOP_RATED_SHOW;TOP_RATING;SHOW_COUNT

// * Summay - Skal liste alle registrerte tv-serier
// SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT    

// * Best episode - lister opp hvilken episode som er best likt (rating) for tv-serier
// SHOW_NAME;NETWORK;GENRES;SEASON_NUMBER;EPISODE_NUMBER;EPISODE_NAME;RATING;

// * Recommended show
// SHOW_NAME;RATING;GENRES;SUMMARY;IMDB_LINK




app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
