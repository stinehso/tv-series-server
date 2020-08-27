const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

let seriesList;

app.get('/', (req, res) => { 
    fs.readFile('./Series.txt', (err, data) => {
        if (err) throw err;
        seriesList = data.toString('utf8').split('\r\n')
        res.send(seriesList) 
    })
})






app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
