var fs = require('fs'); // For logging, able to read, write and modifi a .txt file.
/// <summary>
///  
///
/// </summary>
module.exports = function (Filename, Severity, Data, Datatype ) { 
    
    // Date used to log
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    //console.log(dateTime)

    fs.appendFile(Filename, Severity + "  -->  " + dateTime + "   " + "Data: " + Data + " " + Datatype + " " + "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
 }