const randomIndexGen = require('../../Algorithm/helpers/RandomIndexGenerator'); 
const loggingRef = require("../helpers/logging"); // Loggin
/// <summary>
///   Deligates training types 
///   This function deligates training types for one week based on BV Value and AC Value 
/// </summary>
///
/// <param name="ACValue">Cooper test result and the weekly running distance into an value</param>
/// <param name="WeekTemplate">Template week that is prepared with days and ready for insertation of trainingtypes</param>
module.exports = function (ACValuePram, WeekTemplate, wValuesObjecPram, previousIndexGenerated) { 
   // var wValuesObjectCheckList  = new wValues(ACValuePram);
    var wValuesDayCounterIndex = 0;
    var createdWeekWithTrainingtype;
    var randomIndexGeneratedObject;
    var index;
    var filename = "Logging file";

    weedWithTrainingCreated()
        function weedWithTrainingCreated(){
            randomIndexGeneratedObject = randomIndexGen(previousIndexGenerated, ACValuePram);
            index = randomIndexGeneratedObject[0];
            // console.log("randomIndexGeneratedObject: "+randomIndexGeneratedObject)
            // console.log("randomIndexGenerated inside of class DeligateTrainingTypes2.0")

            WeekTemplate.forEach(day => {
                // console.log("-------------index---------------: "+index)
                // console.log("----------------wValuesDayCounterIndex------------------: "+ wValuesDayCounterIndex)
                // console.log(wValuesObjecPram)
                // console.log("------------------------------")
                    var trainingtypeFromWeekTemplate = wValuesObjecPram[index][wValuesDayCounterIndex];  
                    //console.log("trainingtypeFromWeekTemplate: "+ trainingtypeFromWeekTemplate)
                    wValuesDayCounterIndex = wValuesDayCounterIndex +1;
                    day.trainingType = trainingtypeFromWeekTemplate;
                    createdWeekWithTrainingtype = WeekTemplate;
                });
                if(createdWeekWithTrainingtype.count == WeekTemplate.count){
                    loggingRef(filename, "SUCCESS", createdWeekWithTrainingtype.count, "createdWeekWithTrainingtype.count indeholder det samme som WeekTemplate, trainignsplan med typer template er derfor oprettet");
                }
            }
    return [createdWeekWithTrainingtype, randomIndexGeneratedObject[1]];
}