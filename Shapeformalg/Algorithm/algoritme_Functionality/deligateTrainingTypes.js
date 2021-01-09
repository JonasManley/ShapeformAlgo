const BVValue = require('../../algoritme_Values/bvValue');
const trainingsKatelog = require('../helpers/trainingsKatelog');
/// <summary>
///   Deligates training types 
///   This function deligates training types for one week based on BV Value and AC Value 
/// </summary>
///
/// <param name="ACValue">Cooper test result and the weekly running distance into an value</param>
/// <param name="Week">Template week that is prepared for insertation of values</param>
module.exports = function (ACValue, WeekTemplate) { 

    // Week to return
    var createdWeek;

    // Values for controling the flow and check if the week created is correctly made. 
    var belastningsValue = 100;
    var trainingsCount = 0; // count how many training a person have had. 
    var jogCount = 0;
    var intervalCount = 0;
    var tempoCount = 0;
    var longrunCount = 0;
    var walkCount = 0;
    var dobbeltjogCount = 0;

    var BVValues = BVValue(ACValue);
    var trainingsKatelogShema = trainingsKatelog();
    var Week = WeekTemplate;

    // Generator prams. 
    var listOfValidCases =  BVValues.ValidTrainings; // Valid cases  [3,1,2]
    var intervalDone;
    var tempoDone;
    var longDone;
    var jogDone;
    var walkDone;
    var dobbeltjogDone;

    // State until a fitting week has been found
    var PerfectWeekHasBeenFound = false;

    ValidatesPotientialWeek();

    // Validates the potiential week  
    function ValidatesPotientialWeek (){
    while (PerfectWeekHasBeenFound === false) // Run until a acceptable week has been found 
        if(trainingsCount == BVValues.trainingpasses && belastningsValue >50){
            createdWeek = potientialWeek;
            PerfectWeekHasBeenFound = true;
            console.log(trainingsCount);
            console.log(belastningsValue);
            console.log("perfect");
            break;
        } else {
            var potientialWeek = PotientialWeek(); 
            //console.log("sdasda" + potientialWeek)
            //console.log("uge not good enough - BV:" + belastningsValue + " trainingsCount:" + trainingsCount + " trainingpasses:" + BVValues.trainingpasses);
        }
        //console.log("BV:" + belastningsValue + " trainingsCount:" + trainingsCount + " trainingpasses:" + BVValues.trainingpasses);
    }

    // Method which allow us to create one week with the right trainigtypes based on a weight system, so we insure every training is present. 
    function PotientialWeek(){
        //console.log(BVValues)
        // Reset the controller-values declared at the top
        jogCount = 0;
        intervalCount = 0;
        tempoCount = 0;
        longrunCount = 0;
        walkCount = 0;
        trainingsCount = 0;
        belastningsValue = 100;
        dobbeltjogCount = 0;
        // For each day execute following code...
        Week.forEach(day => {
            // console.log(ACValue)
            // console.log("longruns:  " + BVValues.longRunsPerWeek);
            // console.log(Week)
            // console.log(listOfValidCases)
            
            // If belastningValue is too low for any activity or all walks have been used -> give a rest day
            if ((BVValues.walksPerWeek == walkCount) &&
            (BVValues.intervalsPerWeek == intervalCount || belastningsValue < BVValues.interval) &&
            (BVValues.longRunsPerWeek == longrunCount || belastningsValue < BVValues.longRun) &&
            (BVValues.temposPerWeek == tempoCount || belastningsValue < BVValues.tempo) &&
            (BVValues.jogsPerWeek == jogCount || belastningsValue < BVValues.jog))
            {
                day.trainingType = trainingsKatelogShema.restDay;
                UpdateBVIncrease(BVValues.restDay);
            //console.log("RestDay was chosen for " + day.nameOfDay);
            } else {
                // pick a random case until it gets one which are accepted
                var accepted = false;
                while(accepted === false){
                    var generatedCase = CaseGeneretor();
                    switch (generatedCase) {
                        case 1: // Interval Rules
                        //console.log("---------------------------------------------------"+BVValues.interval)
                            if(belastningsValue >= BVValues.interval && BVValues.intervalsPerWeek > intervalCount){
                                day.trainingType = trainingsKatelogShema.interval;
                                UpdateBVDecrease(BVValues.interval);
                                trainingsCount += 1;
                                intervalCount += 1;
                                accepted = true;
                                //console.log("interval was chosen for" + day.nameOfDay);
                            }
                            break;
                        case 2: // Tempo Rules
                        //console.log("---------------------------------------------------"+BVValues.tempo)
                            if(belastningsValue >= BVValues.tempo && BVValues.temposPerWeek > tempoCount){
                                day.trainingType = trainingsKatelogShema.tempo;
                                UpdateBVDecrease(BVValues.tempo);
                                trainingsCount += 1;
                                tempoCount += 1;
                                accepted = true;
                                UpdateBVIncrease(BVValues.defaultRest);
                                //console.log("tempo was chosen for " + day.nameOfDay);
                            }
                            break;
                        case 3: // LongRun Rules
                            if(belastningsValue >= BVValues.longRun && BVValues.longRunsPerWeek > longrunCount){
                                day.trainingType = trainingsKatelogShema.longrun;
                                UpdateBVDecrease(BVValues.longRun);
                                trainingsCount += 1;
                                longrunCount += 1;
                                accepted = true;
                                //console.log("Long Run was chosen for " + day.nameOfDay);
                            }
                            break;
                        case 4: // Jog Rules
                            if(belastningsValue >= BVValues.jog && BVValues.jogsPerWeek > jogCount){
                                // if trainingpasses is more than 7 we need to have more than one trainingpas per week.
                                if(BVValues.trainingpasses > 7 && (BVValues.jogsPerWeek - jogCount) > 1 && dobbeltjogCount < 1){
                                    day.trainingType = trainingsKatelogShema.dobbeltJog;
                                    UpdateBVDecrease(BVValues.jog + BVValues.jog);
                                    trainingsCount += 2;
                                    jogCount += 2;
                                    dobbeltjogCount += 1;
                                    accepted = true;
                                    UpdateBVIncrease(BVValues.defaultRest);
                                } else {
                                    day.trainingType = trainingsKatelogShema.jog;
                                    UpdateBVDecrease(BVValues.jog);
                                    trainingsCount += 1;
                                    jogCount += 1;
                                    accepted = true;
                                    UpdateBVIncrease(BVValues.defaultRest);
                                }
                                
                                //console.log("Jog was chosen for " + day.nameOfDay);
                            }
                            break;
                        case 5: // walk Rules
                            if(belastningsValue >= 0 && BVValues.walksPerWeek > walkCount){
                                day.trainingType = trainingsKatelogShema.walk;
                                UpdateBVIncrease(BVValues.walk);
                                trainingsCount += 1;
                                walkCount += 1;
                                accepted = true;
                                UpdateBVIncrease(BVValues.defaultRest);
                               //console.log("walk was chosen for " + day.nameOfDay);
                            }
                    };
                }
            }
        });
        return Week;
    }

    // Method to decrease the BV value
    function UpdateBVDecrease(value){
            belastningsValue -= value;
    }

    // Method to Increase the BV value
    function UpdateBVIncrease(value){
        belastningsValue += value;
        // Rest cap cant go over 100
        if(belastningsValue >= 100) {
            belastningsValue = 100;
        }
    }

    // Interval = 1, Tempo = 2, Long = 3, jog = 4, walk = 5.
    function CaseGeneretor(){
        //console.log("Case Generetor functions");
        if(trainingsCount == 0 ){
            //console.log(listOfValidCases.length)
            var casenumber = Math.floor((Math.random() * listOfValidCases.length));
            //console.log("casenumber Test: "+casenumber)
            return listOfValidCases[casenumber];
        }
        else if(BVValues.intervalsPerWeek == intervalCount && intervalDone == false){  //Interval
                
            listOfValidCases.splice(index, 1);
            //console.log("Case Generetor case 1");
            intervalDone = true;
        }
        else if(BVValues.temposPerWeek == tempoCount && tempoDone == false){  //Tempo
            var index = listOfValidCases.indexOf(1);
            listOfValidCases.splice(index, 1);
            //console.log("Case Generetor case 2")
            tempoDone = true;
        }
        else if(BVValues.longRunsPerWeek == longrunCount && longDone == false){  //Long
            var index = listOfValidCases.indexOf(2);
            listOfValidCases.splice(index, 1);
            longDone = true;
            //console.log("Case Generetor case 3")
        }
        else if(BVValues.jogsPerWeek == jogCount && jogDone == false){  //Jog
            var index = listOfValidCases.indexOf(3);
            listOfValidCases.splice(index, 1);
            jogDone = true;
            //console.log("Case Generetor case 4")
        }
        else if(BVValues.walksPerWeek == walkCount && walkDone == false){  //walk
            var index = listOfValidCases.indexOf(4);
            listOfValidCases.splice(index, 1);
            walkDone = true;
            //console.log("Case Generetor case 5")
        }
        else if(BVValues.dobbeltjogPerWeek == dobbeltjogCount && dobbeltjogDone == false){  //walk
            var index = listOfValidCases.indexOf(5);
            listOfValidCases.splice(index, 1);
            walkDone = true;
            //console.log("Case Generetor case 5")
        }
        else{
            var casenumber = Math.floor(Math.random() * listOfValidCases.length);
            //console.log("casenumber: "+casenumber)
            return listOfValidCases[casenumber];
        }
        // console.log("Random Math genrates a number form case list now.. ");
        // var casenumber = Math.floor(Math.random() * listOfValidCases.length);
        return listOfValidCases[casenumber];
    };

    /*TEST*/ //console.log("createdWeek --- >   " + createdWeek[0].trainingType)
    return [createdWeek];
}