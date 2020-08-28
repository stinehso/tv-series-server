const fs = require('fs');



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


module.exports = {
    createFile
}