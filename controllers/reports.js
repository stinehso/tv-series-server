const fs = require('fs');
const path = require('path');
const fileHandling = require('../fileHandling');
const tvApi = require('./tvApi');


const getRelevantFields = (seriesInfo, episodeTable) => {
    // should also get episodeCount and releasedEpisodeCount from episodeTable
    let table = [];
    for (const show of seriesInfo) {
        let networkName;
        try {
            networkName = show.network.name;
        } catch (error) {
            networkName = '';
        }
        newRow = {
            name: show.name,
            network: networkName,
            genres: show.genres,
            episodeCount: 0,
            releasedEpisodeCount: 0 
        }
        table.push(newRow);
    }
    return table
}



const flattenGenres = (shows) => {
    for (const show of shows) {
        genresTxt = show.genres.join(', ')
        show.genres = genresTxt;
    }
    return shows
}



const prepareSendingFile = (fileName) => {
    const report = fs.readFileSync(fileName);
    return report
}


const summary = (seriesInfo, res) => {
    const headerString = 'SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT'
    episodeTable = tvApi.getShowInfoAndEpisodes(seriesInfo)
    let table = getRelevantFields(seriesInfo, episodeTable);
    table = flattenGenres(table)
    fileHandling.createFile(headerString, table, 'summary_report.txt')
    const tableObject = {
        headers: ['Name', 'Network', 'Genres', 'Episode count', 'Released episodes count'],
        keys: Object.keys(table[0]),
        table: table
    }
    res.json(tableObject)
}

const summaryFile = (req, res) => {
    //const file = prepareSendingFile('summary_report.txt')
    //res.send(file)
    const buffer = fs.readFileSync('summary_report.txt');
    const bufferBase64 = new Buffer.from(buffer);
    res.status(200).send(bufferBase64);
    //res.sendFile('/Users/Stine/Documents/Utvikling/Web/payex-kodeoppgave/tv-series-server/summary_report.txt')
}



module.exports = {
    summary,
    summaryFile
}



// * Top 10 - Skal liste serier sortert på rating  

// * Top network - Skal liste "network" samt aktuelle tv-serier basert på gjennomsnittlig-rating.
// AVERAGE_RATING;NETWORK;TOP_RATED_SHOW;TOP_RATING;SHOW_COUNT

// * Summay - Skal liste alle registrerte tv-serier
// SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT    

// * Best episode - lister opp hvilken episode som er best likt (rating) for tv-serier
// SHOW_NAME;NETWORK;GENRES;SEASON_NUMBER;EPISODE_NUMBER;EPISODE_NAME;RATING;

// * Recommended show
// SHOW_NAME;RATING;GENRES;SUMMARY;IMDB_LINK