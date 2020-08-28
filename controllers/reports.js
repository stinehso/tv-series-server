const fs = require('fs');
const path = require('path');

const getRelevantFields = (seriesInfo, fields) => {
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

const createFile = (headerString, table, fileName) => {
    txtString = headerString + '\n';
    for (const show of table) {
        props = Object.values(show);
        row = props.join(';');
        txtString = txtString + row + '\n'
    }
    fs.writeFileSync(fileName, txtString, err => {
        if (err) {
            console.log(err);
        }
    })
}

const flattenGenres = (shows) => {
    for (const show of shows) {
        genresTxt = show.genres.join(', ')
        show.genres = genresTxt;
    }
    return shows
}

// const createSummaryFile = (table) => {
//     txtString = 'SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT\n';
//     for (const show of table) {
//         genresTxt = show.genres.join(', ')
//         row = [show.name, show.network, genresTxt, show.episodeCount, show.releasedEpisodeCount].join(';')
//         txtString = txtString + row + '\n'
//     }
//     fs.writeFileSync('summary_report.txt', txtString, err => {
//         if (err) {
//             console.log(err);
//         }
//     })
// }


const prepareSendingFile = (fileName) => {
    console.log('send');
    const report = fs.readFileSync(fileName)
    return report
}


// SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT
const summary = (seriesInfo, res) => {
    //console.log(seriesInfo);
    const fields = 'SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT'
    //const props = [name, show.network, genresTxt, show.episodeCount, show.releasedEpisodeCount]
    let table = getRelevantFields(seriesInfo, fields);
    //table = sortAlpha(table)
    //console.log(table);
    createSummaryFile(table)
    const tableObject = {
        headers: Object.keys(table[0]),
        table: table
    }
    res.json(tableObject)
    //const file = prepareSendingFile('summary_report.txt')
    //res.send(file)
    //res.sendFile('/Users/Stine/Documents/Utvikling/Web/payex-kodeoppgave/tv-series-server/summary_report.txt')
}

module.exports = {
    summary
}


// * NextWeek - Skal grupperes per dag:
// SHOW_NAME;MONDAY;TUESDAY;WEDNESDAY;THURSDAY;FRIDAY;SATURDAY;SUNDAY

// * Top 10 - Skal liste serier sortert på rating  

// * Top network - Skal liste "network" samt aktuelle tv-serier basert på gjennomsnittlig-rating.
// AVERAGE_RATING;NETWORK;TOP_RATED_SHOW;TOP_RATING;SHOW_COUNT

// * Summay - Skal liste alle registrerte tv-serier
// SHOW_NAME;NETWORK;GENRES;EPISODE_COUNT;RELEASED_EPISODE_COUNT    

// * Best episode - lister opp hvilken episode som er best likt (rating) for tv-serier
// SHOW_NAME;NETWORK;GENRES;SEASON_NUMBER;EPISODE_NUMBER;EPISODE_NAME;RATING;

// * Recommended show
// SHOW_NAME;RATING;GENRES;SUMMARY;IMDB_LINK