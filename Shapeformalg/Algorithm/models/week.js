const Day = require('./day');

/// <summary>
///   Week Generater
///   This script generates a template week that is prepared for insertation of values
/// </summary>
///
/// <param name="StartDate">The date the program have to start</param>
module.exports = function CreateOneTraningWeek(StartDate){

// Week 
var week = new Array();

// Get current date object
var today = new Date();

// Translate number of day to name
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
//

// Find the next monday given a date
function nextWeekdayDate(date) {
    var monday = 1;
    var ret = new Date(date||new Date());
    ret.setDate(ret.getDate() + (monday - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
  }

// Create a hole week
var placeHolderDate = new Date();
var BoolTest = 0;

function CreateWeek (startDateOfWeek) {
    //Check current date and evaluatre weahter it a monday or not (if it's not monday, set dateOfCreation for træningsplan to next monday)
    if(startDateOfWeek.getDay() != 1){
        startDateOfWeek = nextWeekdayDate(startDateOfWeek);
    }
    
    for (i = 0; i < 7; i++) {

        var dayIndicator = 1 + i

        // Getting dates
        if(BoolTest === 0){
            var nextDay = new Date(startDateOfWeek);
            nextDay.setDate(startDateOfWeek.getDate() + i);
        }
       
        // Locate Sunday
        if (dayIndicator === 7) {
            dayIndicator = 0;
        }

        // Create a new day and add to week
        week.push(new Day(weekday[dayIndicator], nextDay), );
        if(dayIndicator === 0){
            placeHolderDate.setDate(nextDay.getDate()+1);
            
        }
    }
}

// TESTING COMMANDS
//today.setDate(today.getDate()+17)
//CreateWeek(placeHolderDate);
//var date = new Date();
//console.log(nextWeekdayDate(date, 1));

CreateWeek(StartDate);
return week;
}