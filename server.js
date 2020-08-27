const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!') })





app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
