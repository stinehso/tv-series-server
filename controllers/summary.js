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


const summaryFile = (req, res, root) => {
    res.sendFile('./summary_report.txt', {root: root})
}



module.exports = {
    summary,
    summaryFile
}



