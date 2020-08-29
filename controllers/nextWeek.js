const fileHandling = require('../fileHandling');

const filterRunning = (table) => {
    // should take a list of objects and return the ones that hvave status: running
    return table
}

const getNextWeekFields = (table) => {
    // find the relevant values for the table
    return table
}

const handleNextWeek = (seriesInfo, res) => {
    const headerString = 'SHOW_NAME;MONDAY;TUESDAY;WEDNESDAY;THURSDAY;FRIDAY;SATURDAY;SUNDAY'
    let table = getNextWeekFields(seriesinfo);
    table = filterRunning(table);

    fileHandling.createFile(headerString, table, 'nextWeek_report.txt')
    const tableObject = {
        headers: ['Name', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        keys: Object.keys(table[0]),
        table: table
    }
    res.json(tableObject)
}

module.exports = {
    handleNextWeek
}