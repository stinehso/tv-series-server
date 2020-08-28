const express = require('express');
const cors = require('cors');
const fs = require('fs');
const async  = require('express-async-await');
const fetch = require('node-fetch');

const reports = require('./controllers/reports')

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
                setTimeout(() => console.log('Trying API again'), 2000);
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



app.get('/all', (req, res) => { 
    fs.readFile('./Series.txt', (err, data) => {
        if (err) throw err;
        seriesList = data.toString('utf8').split('\r\n')
        getShowInfo(seriesList)
        .then(info => {
            console.log(info);
            fs.writeFile('./all.json', info, () => {
                res.send(info)
            })
            
        })
    })
})



app.get('/summary', (req, res) => {
    getShowInfo(seriesList)
    .then(info => {
        reports.summary(info, res)
    }) 
})





app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
