const async  = require('express-async-await');
const fetch = require('node-fetch');



async function callTVmaze(show) {
    let tryAgain = true;
    let response;
    while (tryAgain) {
        response = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${show}`, {
            headers: {
                'User-Agent': 'SeriesReportServer'
            }
        })
            .then(res => res.json())
            .then(res => {
            if (res.status === 429) {
                setTimeout(() => console.log('Trying API again for ', show), 3000);
            } else {
                tryAgain = false;
                return res
            }
        }).catch(e => console.log('error:', e))
    }
    return response   
}

async function getShowInfo(seriesList) {
    let seriesInfo = [];
    for (const show of seriesList) {
        let info = await callTVmaze(show)
        seriesInfo.push(info)
    }
    return seriesInfo
} 

async function getShowInfoAndEpisodes(seriesList) {
    let seriesInfo = [];
    for (const show of seriesList) {
        let info = await callTVmaze(show+'&embed=episodes')
        episodes = {
            show: info.name,
            episodes: info._embedded.episodes
        }
        seriesInfo.push(episodes)
    }
    return seriesInfo
} 

module.exports = {
    getShowInfo,
    getShowInfoAndEpisodes
}