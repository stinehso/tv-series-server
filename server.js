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
