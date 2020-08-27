const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());


let seriesList;
fs.readFile('./Series.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    seriesList = data.toString('utf8').split('\r\n')
})


app.get('/', (req, res) => { 
    res.send(seriesList) 
})






app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
