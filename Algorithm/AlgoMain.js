const ACValueCalculator = require('../algoritme_Values/acValue');
const Week = require('./models/week');
//const deligate = require('./algoritme_Functionality/deligateTrainingTypes');// OBS! THE OLD WAY TO DELIGATE TRAININGTYPES
const deligate = require('./algoritme_Functionality/deligaveTrainingTypes2.0'); // OBS! THE NEW WAY TO DELIGATE TRAININGTYPES
const trainingPlanCreate = require('./algoritme_Functionality/trainingPlanCreateService');
const trainingsplan = require('./models/trainingsplan');
const PDFGenerator = require('./ConvertTrainingsplanToPDF');
const wValues = require('../algoritme_Values/wValues')
const loggingRef = require("./helpers/logging"); // Loggin
/// <summary>
///   The head of the algorithm
///   This is where we collect and provoke all the methods which togehter creates the running program
/// </summary>
///
/// <param name="CooperResultInMeters">Distance of a cooper test</param>
/// <param name="KmPerWeek">weekly running distance in Kilometers</param>
module.exports = function RunningCalenderGenerator(CooperResultInMeters, KmPerWeek, StartDate, CreateXWeek, withoutVelocity, trainingsPhase) {
        var filename = "Logging file";
        var ACValue = ACValueCalculator(CooperResultInMeters, KmPerWeek);
        var WeekCounter = 1;
        var variationInWeeksBool = false;
        var caseNumber = 0;
        
        var firstTimeDeligateTypesMethodCalled = true;
      
        var createdTrainingWeekWithTypes;
        var previousIndexGenerated = 0; // Default start value, every list hast atleast one element, therefor it starts with that. 
        var wValueschemaWeekIndex;
        var wValuesObject  = new Array()
        wValuesObject = new wValues(ACValue);

        var firstTimeDeligateKilometersCalled = true;
        var kilometer = KmPerWeek;
        var monthlyStartValues;
        var listOfValidCases = [1,2,3,4]; //array of valid cases for the interval switch case.

        loggingRef(filename, "Data logging", ACValue, "Genereated ACValue");
        
        var ret = new Date(StartDate||new Date());
        ret = StartDate;
        var trainingsplansArray = new Array();
        for (let index = 0; index < CreateXWeek; index++) {
            if(wValueschemaWeekIndex == 0){
                wValuesObject = new wValues(ACValue);
            }

            //  ACValuePram, previousACValue, WeekTemplate, wValueschemaWeekIndexPram, wValuesObjecPram
            var deligateTrainingTypesObject = deligate(ACValue, Week(ret), wValuesObject, previousIndexGenerated);
            createdTrainingWeekWithTypes = deligateTrainingTypesObject[0];
            previousIndexGenerated = deligateTrainingTypesObject[1];
            firstTimeDeligateTypesMethodCalled = false;
           
            if(WeekCounter == 1 || WeekCounter == 5 || WeekCounter == 9 || WeekCounter == 13 || WeekCounter == 17 || WeekCounter == 21 || WeekCounter == 25 || WeekCounter == 29 || WeekCounter == 33 || WeekCounter == 37 ){ //Everu fourth week we'll need the start values, so we can +10 (-20 for the month)
            monthlyStartValues = kilometer;
            loggingRef(filename, "Data logging", monthlyStartValues, "every fourth week is a decline week");
            }
            
            var object = trainingPlanCreate(kilometer, CooperResultInMeters, ACValue, createdTrainingWeekWithTypes, WeekCounter, caseNumber, firstTimeDeligateKilometersCalled, monthlyStartValues, listOfValidCases, withoutVelocity, trainingsPhase)
            //console.log(object)
            trainingsplansArray.push(object.trainingsplansOneWeekWithTypes)
            kilometer = object.TotalKmDoneInWeek;
            caseNumber = object.caseNumber;
            firstTimeDeligateKilometersCalled = object.firstTimeDeligateKilometersCalled;
            monthlyStartValues = object.monthlyStartAmount;
            listOfValidCases = object.listOfValidCases;

            // Log
            if(kilometer < 12 ){
                loggingRef(filename, "ERROR!", kilometer, " kilometer returned from function is under 12km.. *trainingPlanCreate*");
            }
            // else if(monthlyStartValues == kilometer){
            //     loggingRef(filename, "ERROR!", monthlyStartValues, "monthlyStartValues is incorrect");
            // }else if(listOfValidCases.length == 4){
            //     loggingRef(filename, "ERROR!", listOfValidCases, "listOfValidCases..");
            // }
            
            console.log("CooperResultInMeters: "+CooperResultInMeters)
            console.log("KmPerWeek: "+kilometer)
            ACValue = ACValueCalculator(CooperResultInMeters, kilometer);
            console.log("ACValue After: "+ACValue)
            WeekCounter = WeekCounter + 1;
             console.log("-------------------END--------------------------")

        //Increment date - per weekly base.
            ret.setDate(ret.getDate()+ 7) ;
        }
        // Log
          if((WeekCounter-1) != CreateXWeek ){ 
            loggingRef(filename, "ERROR!", (WeekCounter-1), "WeekCounter returned a number of weeks that is NOT match the variable CreateXWeek for how man weeks that should be created");
        }else{
            loggingRef(filename, "SUCCESS", (WeekCounter-1), "Trainingplan is sucsesfully created");
        }

       PDFGenerator(trainingsplansArray);

    //  // TEST - MUST NOT BE DELETE YET! Importen for understand what the "trainingsplansArray" return and how to use it
    //     trainingsplansArray.forEach(TrainingWeek => {  // Element er en træningsuge
    //           console.log(TrainingWeek)
    //      TrainingWeek.forEach(day => {
    //         console.log(day.trainingPas)
    //         });
    //     });

    // Should be uncommented when algoMain is ready to be use with the API 
    return trainingsplan;
}

