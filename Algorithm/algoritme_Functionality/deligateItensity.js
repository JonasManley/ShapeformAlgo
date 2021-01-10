const TrainingZone = require('../models/trainingZone');
/// <summary>
///   Deligates training types 
///   This function deligates training types for one week based on BV Value and AC Value 
/// </summary>
///
/// <param name="ACValue">Cooper test result and the weekly running distance into an value</param>
/// <param name="Week">Template week that is prepared for insertation of values</param>
module.exports = function (withoutVelocity) { 
    
    // Place intensity given prediffend Trainingzones
    var TrainingZones = new Object();
    if(withoutVelocity == true){
        TrainingZones.Easy = new TrainingZone("Easy","Easy");
        TrainingZones.Marathon = new TrainingZone("Marathon", "Tempo"); 
        TrainingZones.Threshold = new TrainingZone("Threshold", "Fast"); 
        TrainingZones.Interval = new TrainingZone("Interval", "Very Fast");
        TrainingZones.Repetition = new TrainingZone("Repetition", "All out");
    }else{
        // Training Zones START - should be modified ATM   05:13 - 05:45
        // Mathias enemark fra instagram 
        TrainingZones.Easy = new TrainingZone("Easy", EasyPaceCalculator(7, 06, 6, 25));
        TrainingZones.Marathon = new TrainingZone("Marathon", "5:52"); 
        TrainingZones.Threshold = new TrainingZone("Threshold", "5:27"); 
        TrainingZones.Interval = new TrainingZone("Interval", "4:59");
        TrainingZones.Repetition = new TrainingZone("Repetition", "4:38 ");
        // Training Zones END
    } 
    

    function EasyPaceCalculator(slowestMin, slowestSec, fastestMin, fastestSec) {
        //Finds the interval of the to given paces and takes 20% of that
        var easyPaceInSec = (((slowestMin * 60) + slowestSec) - ((fastestMin * 60) + fastestSec)) * (20 / 100);
        //Calculates the pace back to min from sec
        easyPaceInSec = easyPaceInSec + (fastestMin * 60) + fastestSec;
        easyPaceInSec = easyPaceInSec / 60;

        var de = easyPaceInSec.toFixed(2).toString().split(".");
        var min = de[0];
        var sec = de[1];
        var easyPace = min + ":" + ((sec/100) * 60).toFixed(0);
        return easyPace;
    }
    return TrainingZones;
}