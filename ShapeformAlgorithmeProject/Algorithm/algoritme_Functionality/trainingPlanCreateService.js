const DeligateTrainingTypes = require('./deligateTrainingTypes');
const DeligateItensity = require('./deligateItensity');
const Week = require('../models/week');  // WeekTemplate TrainingPas
const trainingPas = require('../models/trainingPas'); 
const BVValue = require('../../algoritme_Values/bvValue');
const trainingsplan = require('../models/trainingsplan');
const rep = require('../models/rep');  
    const trainingsKatelog = require('../helpers/trainingsKatelog'); 
const intervalDescriptions = require('../helpers/descriptions/interval');
const jogDescriptions = require('../helpers/descriptions/jog');
const walkDescriptions = require('../helpers/descriptions/walk');
const restDay = require('../helpers/descriptions/restDay');
const longrunDescriptions = require('../helpers/descriptions/longrun');
const dobbeltJogDescriptions = require('../helpers/descriptions/dobbeltJog');
const tempoDescriptions = require('../helpers/descriptions/tempo');
const ACValueCalculator = require('../../algoritme_Values/acValue'); 
const intervalCreation = require('./intervalCreation');
const loggingRef = require("../helpers/logging");

///   Deligates Kilometers  
///   This function deligates Kilometers to each day based on the different trainingtypes.  
/// </summary>
///
/// <param name="KmPerWeek">How many kilometers a person runs a week, parameter is collected at the start of AlgoMain.js</param>
/// <param name="DeligateTrainingTypes">A week with all the needed trainingtypes distributed</param>
/// <param name="ACValue">Cooper test result and the weekly running distance into an value<</param>
module.exports = function (KmPerWeek, CooperResultInMeters, ACValue, trainingsplansOneWeekWithTypes, WeekCounter, caseNumber, firstTimeDeligateKilometersCalled, monthlyStartValues, listOfValidCases, withoutVelocity, trainingsPhase) { 
    //TEST - could i call the deligate method here? Yes! Can be deleted. 
    // var x = deligate("A1", Week(new Date()));
    // return x;

    //Logic explained.
    //Step 1. Fetch a week with deligated trainingtrypes 
    //Step 2. take the baseline of km (gotten from the AlgoMain)
    //Step 3. use the 80/20 rule and store the kilometers as two variables 
    //Step 4. Start calculating distances based on a percentage weight given each rep (warmp, jog, longrund, intervalbreak etc.)  
              //NOTE: There are differentiated between fast and slow kilometers 
    //Step 5. run through a object "trainingsplansOneWeekWithTypes" and match up calculated dist. with the trainingstype.
    //Step 6. return the finale trainigsplan
    
    console.log("firstTimeDeligateKilometersCalled: "+firstTimeDeligateKilometersCalled )
    //Variables
    var acValue = ACValue;
    var bvValue = BVValue(acValue);
    var TrainingZones = DeligateItensity(withoutVelocity);
    var trainingsKatelogShema = trainingsKatelog();
    var ACValueWithNoNumber = acValue.replace(/[0-9]/, '');
    var ACValueNumber = ACValue;
    // used to generate specific trainings
    var EightTweentyRuleVal = true;
    var TotalKmDoneInWeek = KmPerWeek;
    var intenseKilometers;  // used in the 80/20 rule 
    var SlowKilometers;  // used in the 80/20 rule 
    var monthlyStartAmount = monthlyStartValues;
    var IntervalWarmupLength;
    var IntervalCooldownLength;
    var ReductionsValue;
    var cooldownInclueded;
    // ---- Belov is newly added ----
    //Kategori Length Procentages:
    var longrunProcentage;
    var longrunSpeedProcentage;
    var intervalWarmupProcentage;
    var intervalCooldownProcentage
    var intervalRepProcentage;
    var intervalBreakProcentage
    var jogProcentage;
    var tempoWarmupProcentage;
    var tempoRep;
    var walkRepBetweenJogProcentage; // Used to delegate some easy km to in kategori 1-2 (A,B,C,D,E & F)
    // Length variable
    var calculatedLongrunLength
    var calculatedlongrunSpeedProcentage;
    var calculatedIntervalWarmupCooldownTotalLength;
    var calculatedIntervalRepLength;
    var calculatedIntervalBreakLength;
    var calculatedJogLength;
    var calculatedTempoLengthSlow;
    var calculatedTempoLengthFast;
    var walkRepBetweenJogLength;

    // Log 
    var filename = "Logging file";

    // Calculating the different distances 
    function calculateDistancesForTraningTypes(){
        EightTweentyRuleMethod(); // First 80/20 rule 
        switch (ACValueWithNoNumber) 
        {
            case "A": //[Jog, Interval]
                console.log("---------------A Case------------------?")
                if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
                acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"||                             //--
                acValue == "E1" || acValue == "E2" || acValue == "E3"){
                    longrunProcentage =0; 
                    longrunSpeedProcentage = 0;
                    intervalWarmupCooldown = 15.833; 
                    intervalRepProcentage = 100;
                    intervalBreakProcentage = 12.5;
                    jogProcentage = 61;
                    walkRepBetweenJogProcentage = 10.66666667;
                    tempoWarmupProcentage = 0;
                    tempoRep = 0;
                    cooldownInclueded = false
                    
                    ReductionsValue = TotalKmDoneInWeek-12;
                    // Slow kilometers calculated
                    intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/2);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -=(ReductionsValue/2) // Valve change
                    jogProcentage += ReductionsValue;  // Jog 
                     
                     CalculatingLengths()
                }else{
                    longrunProcentage =0; 
                    longrunSpeedProcentage = 0;
                    intervalWarmupCooldown = 20.833;
                    intervalRepProcentage = 100;
                    intervalBreakProcentage = 12.5;
                    jogProcentage = 66.66666667;
                    tempoWarmupProcentage = 0;
                    tempoRep = 0;
                    cooldownInclueded = false
                    
                    ReductionsValue = TotalKmDoneInWeek-12;
                    // Slow kilometers calculated
                    intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/2);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -=(ReductionsValue/2) // Valve change
                    jogProcentage += ReductionsValue;  // Jog 
                     
                     CalculatingLengths()
                }
                break;
            case "B":  //[Jog, Interval, longrun]
            console.log("--------------B case ----------------")
            if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
            acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"||                             //--
            acValue == "E1" || acValue == "E2" || acValue == "E3"){
                longrunProcentage = 40; // Start procentage of 50%
                longrunSpeedProcentage = 16;
                intervalWarmupCooldown = 10.0;
                intervalRepProcentage = 84;
                intervalBreakProcentage = 12.5;
                jogProcentage = 29;
                walkRepBetweenJogProcentage = 8;
                tempoWarmupProcentage = 0;
                tempoRep = 0;
                cooldownInclueded = false

                ReductionsValue = TotalKmDoneInWeek-25;
                // Slow kilometers calculated
                intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/100);  // Incrementet by one.. 55..54..53 etc.
                ReductionsValue -= (ReductionsValue/100); // Value change
                longrunProcentage += ReductionsValue/3;
                intervalBreakProcentage += ReductionsValue/3; 
                jogProcentage += ReductionsValue/3;
                // Fast kilometers deligated
                var ReductionsValueFastkm = TotalKmDoneInWeek-25;
                intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                tempoRep += ReductionsValueFastkm; 
                
                CalculatingLengths()
            }else{
                longrunProcentage = 40; // Start procentage of 50%
                longrunSpeedProcentage = 20;
                intervalWarmupCooldown = 12.5;
                intervalRepProcentage = 80;
                intervalBreakProcentage = 12.5;
                jogProcentage = 35;
                walkRepBetweenJogProcentage = 0;
                tempoWarmupProcentage = 0;
                tempoRep = 0;
                cooldownInclueded = false

                ReductionsValue = TotalKmDoneInWeek-25;
                // Slow kilometers calculated
                intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/100);  // Incrementet by one.. 55..54..53 etc.
                ReductionsValue -= (ReductionsValue/100); // Value change
                longrunProcentage += ReductionsValue/3;
                intervalBreakProcentage += ReductionsValue/3; 
                jogProcentage += ReductionsValue/3;
                // Fast kilometers deligated
                var ReductionsValueFastkm = TotalKmDoneInWeek-25;
                intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                tempoRep += ReductionsValueFastkm; 
                
                CalculatingLengths()
            }
            break;
            case "C": 
            if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
            acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"||                             //--
            acValue == "E1" || acValue == "E2" || acValue == "E3"){
                if(TotalKmDoneInWeek >=30 && TotalKmDoneInWeek <40){ //Tested and works
                    longrunProcentage =43; // Start procentage of 53%
                    longrunSpeedProcentage = 0;
                    intervalWarmupCooldown = 7.8125;
                    intervalRepProcentage = 78.128;
                    intervalBreakProcentage = 9.76525;
                    jogProcentage = 25.53125;
                    walkRepBetweenJogProcentage = 4;
                    tempoWarmupProcentage = 9.890625;
                    tempoRep = 21.875;
                    cooldownInclueded = false

                    ReductionsValue = TotalKmDoneInWeek-30;
                    // Procentage for calc. distances when longrun procentage change 
                    intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/100);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -= (ReductionsValue/100); // Values change 
                    longrunPercentage = longrunProcentage - ReductionsValue;  // Incrementet by one.. 55..54..53 etc.  longrun percentage
                    intervalWarmupCooldown += ReductionsValue/4; 
                    intervalBreakProcentage += ReductionsValue/4;
                    jogProcentage += ReductionsValue/4;
                    tempoWarmupProcentage += ReductionsValue/4;

                    // Fast kilometers deligated
                    var ReductionsValueFastkm = TotalKmDoneInWeek-30;
                    intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                    tempoRep += ReductionsValueFastkm; 
                    
                    CalculatingLengths()
                    }
                else if(TotalKmDoneInWeek >=40 && TotalKmDoneInWeek <50){ //Tested and works
                    //Theres a rest form 55 to 10, which we firstly need to give the three other values procentages.
                    longrunProcentage =45; 
                    longrunSpeedProcentage = 0;
                    intervalWarmupCooldown = 10.9375;
                    intervalRepProcentage = 75;
                    intervalBreakProcentage = 6.25;
                    jogProcentage = 27.25;
                    walkRepBetweenJogProcentage = 4;
                    tempoWarmupProcentage = 6.5625;
                    tempoRep = 25;


                    ReductionsValue = TotalKmDoneInWeek-40;
                    // Slow kilometers calculated
                    longrunProcentage -= (ReductionsValue/3); //Longrun procentage
                    ReductionsValue -= (ReductionsValue/3); //Value change
                    // Procentage for calc. distances when longrun procentage change 
                    intervalWarmupCooldown += ReductionsValue/4; 
                    intervalBreakProcentage += ReductionsValue/4;
                    jogProcentage += ReductionsValue/4;
                    tempoWarmupProcentage += ReductionsValue/4;
                     // Fast kilometers deligated
                     var ReductionsValueFastkm = TotalKmDoneInWeek-40;
                     intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                     tempoRep += ReductionsValueFastkm;  

                    CalculatingLengths()
                }
            }else{
                if(TotalKmDoneInWeek >=30 && TotalKmDoneInWeek <40){ //Tested and works
                    longrunProcentage =43; // Start procentage of 53%
                    longrunSpeedProcentage = 13;
                    intervalWarmupCooldown = 7.8125;
                    intervalRepProcentage = 66.128;
                    intervalBreakProcentage = 9.76525;
                    jogProcentage = 29.53125;
                    walkRepBetweenJogProcentage = 0;
                    tempoWarmupProcentage = 9.890625;
                    tempoRep = 20.875;
                    cooldownInclueded = false

                    ReductionsValue = TotalKmDoneInWeek-30;
                    // Procentage for calc. distances when longrun procentage change 
                    intervalWarmupCooldown = intervalWarmupCooldown - (ReductionsValue/100);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -= (ReductionsValue/100); // Values change 
                    longrunPercentage = longrunProcentage - ReductionsValue;  // Incrementet by one.. 55..54..53 etc.  longrun percentage
                    intervalWarmupCooldown += ReductionsValue/4; 
                    intervalBreakProcentage += ReductionsValue/4;
                    jogProcentage += ReductionsValue/4;
                    tempoWarmupProcentage += ReductionsValue/4;

                    // Fast kilometers deligated
                    var ReductionsValueFastkm = TotalKmDoneInWeek-30;
                    intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                    tempoRep += ReductionsValueFastkm; 
                    
                    CalculatingLengths()
                    }
                else if(TotalKmDoneInWeek >=40 && TotalKmDoneInWeek <50){ //Tested and works
                    //Theres a rest form 55 to 10, which we firstly need to give the three other values procentages.
                    longrunProcentage =45; 
                    longrunSpeedProcentage = 12;
                    intervalWarmupCooldown = 10.9375;
                    intervalRepProcentage = 65;
                    intervalBreakProcentage = 6.25;
                    jogProcentage = 31.25;
                    walkRepBetweenJogProcentage = 0;
                    tempoWarmupProcentage = 6.5625;
                    tempoRep = 23;


                    ReductionsValue = TotalKmDoneInWeek-40;
                    // Slow kilometers calculated
                    longrunProcentage -= (ReductionsValue/3); //Longrun procentage
                    ReductionsValue -= (ReductionsValue/3); //Value change
                    // Procentage for calc. distances when longrun procentage change 
                    intervalWarmupCooldown += ReductionsValue/4; 
                    intervalBreakProcentage += ReductionsValue/4;
                    jogProcentage += ReductionsValue/4;
                    tempoWarmupProcentage += ReductionsValue/4;
                     // Fast kilometers deligated
                     var ReductionsValueFastkm = TotalKmDoneInWeek-40;
                     intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                     tempoRep += ReductionsValueFastkm;  

                    CalculatingLengths()
                }
            }
                break;
                case "D": 
                if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
                acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"||                             //--
                acValue == "E1" || acValue == "E2" || acValue == "E3"){
                    if(TotalKmDoneInWeek >=50 && TotalKmDoneInWeek <60){
                        longrunProcentage = 37; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                        longrunSpeedProcentage = 7;
                        intervalWarmupCooldown = 8.75;
                        intervalRepProcentage = 60;
                        intervalBreakProcentage = 5;
                        jogProcentage = 35;
                        walkRepBetweenJogProcentage = 4;
                        tempoWarmupProcentage = 10.25;
                        tempoRep = 32 ;

                        ReductionsValue = TotalKmDoneInWeek-50;
                        longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                        ReductionsValue -= (ReductionsValue*0.5);
                        // Slow kilometers deligated 
                        jogProcentage += ReductionsValue/2;
                        tempoWarmupProcentage += ReductionsValue/2;
                        // Fast kilometers deligated
                        var ReductionsValueFastkm = TotalKmDoneInWeek-50;
                        intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                        tempoRep += ReductionsValueFastkm;
                        CalculatingLengths()
                    }
                    if(TotalKmDoneInWeek >=60 && TotalKmDoneInWeek <75){
                        longrunProcentage = 36; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                        longrunSpeedProcentage = 0;
                        intervalWarmupCooldown = 7.291666667;                    
                        intervalRepProcentage = 50;
                        intervalBreakProcentage = 4.166666667;
                        jogProcentage = 38.66666667;
                        walkRepBetweenJogProcentage = 4;
                        tempoWarmupProcentage = 9.875;
                        tempoRep = 40;
                        console.log("longrunProcentage No change: "+longrunProcentage)

                        ReductionsValue = TotalKmDoneInWeek-60;
                        longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                        ReductionsValue -= (ReductionsValue*0.5);
                        // Slow kilometers deligated 
                        jogProcentage += ReductionsValue/2;
                        tempoWarmupProcentage += ReductionsValue/2;
                        // Fast kilometers deligated
                        var ReductionsValueFastkm = TotalKmDoneInWeek-60;
                        intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                        tempoRep += ReductionsValueFastkm;
                        CalculatingLengths()
                    }
                }else{
                    if(TotalKmDoneInWeek >=50 && TotalKmDoneInWeek <60){
                        longrunProcentage = 37; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                        longrunSpeedProcentage = 15;
                        intervalWarmupCooldown = 8.75;
                        intervalRepProcentage = 57;
                        intervalBreakProcentage = 5;
                        jogProcentage = 39;
                        walkRepBetweenJogProcentage = 0;
                        tempoWarmupProcentage = 10.25;
                        tempoRep = 27 ;

                        ReductionsValue = TotalKmDoneInWeek-50;
                        longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                        ReductionsValue -= (ReductionsValue*0.5);
                        // Slow kilometers deligated 
                        jogProcentage += ReductionsValue/2;
                        tempoWarmupProcentage += ReductionsValue/2;
                        // Fast kilometers deligated
                        var ReductionsValueFastkm = TotalKmDoneInWeek-50;
                        intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                        tempoRep += ReductionsValueFastkm;
                        CalculatingLengths()
                    }
                    if(TotalKmDoneInWeek >=60 && TotalKmDoneInWeek <75){
                        longrunProcentage = 36; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                        longrunSpeedProcentage = 10;
                        intervalWarmupCooldown = 7.291666667;                    
                        intervalRepProcentage = 48;
                        intervalBreakProcentage = 4.166666667;
                        jogProcentage = 42.66666667;
                        walkRepBetweenJogProcentage = 0;
                        tempoWarmupProcentage = 9.875;
                        tempoRep = 42;
                        console.log("longrunProcentage No change: "+longrunProcentage)

                        ReductionsValue = TotalKmDoneInWeek-60;
                        longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                        ReductionsValue -= (ReductionsValue*0.5);
                        // Slow kilometers deligated 
                        jogProcentage += ReductionsValue/2;
                        tempoWarmupProcentage += ReductionsValue/2;
                        // Fast kilometers deligated
                        var ReductionsValueFastkm = TotalKmDoneInWeek-60;
                        intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                        tempoRep += ReductionsValueFastkm;
                        CalculatingLengths()
                    }
                }
                break;
            case "E": 
                if(TotalKmDoneInWeek >=75 && TotalKmDoneInWeek <85){
                    longrunProcentage = 30; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                    longrunSpeedProcentage = 15;
                    intervalWarmupCooldown = 5;                    
                    intervalRepProcentage = 40;
                    intervalBreakProcentage = 3.33;
                    jogProcentage = 56,66666667;
                    walkRepBetweenJogProcentage = 0;
                    tempoWarmupProcentage = 5;
                    tempoRep = 50;
                    console.log("longrunProcentage No change: "+longrunProcentage)

                    ReductionsValue = TotalKmDoneInWeek-75;
                    longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -= (ReductionsValue*0.5);
                    // Slow kilometers deligated 
                    jogProcentage += ReductionsValue/2;
                    tempoWarmupProcentage += ReductionsValue/2;
                    // Fast kilometers deligated
                    var ReductionsValueFastkm = TotalKmDoneInWeek-75;
                    intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                    tempoRep += ReductionsValueFastkm;
                    CalculatingLengths()
                }
                else if(TotalKmDoneInWeek >=85 && TotalKmDoneInWeek <100){
                    longrunProcentage = 30.88235294; // NOTE: procentage is going from 50km = 42% to 75km = 30% longrun
                    longrunSpeedProcentage = 10;
                    intervalWarmupCooldown = 4.411764706;                    
                    intervalRepProcentage = 35.29411765;
                    intervalBreakProcentage = 2.941176471;
                    jogProcentage = 57.35294118;
                    walkRepBetweenJogProcentage = 0;
                    tempoWarmupProcentage = 4.411764706;
                    tempoRep = 50;
                    console.log("longrunProcentage No change: "+longrunProcentage)

                    ReductionsValue = TotalKmDoneInWeek-85;
                    longrunProcentage = longrunProcentage -(ReductionsValue*0.5);  // Incrementet by one.. 55..54..53 etc.
                    ReductionsValue -= (ReductionsValue*0.5);
                    // Slow kilometers deligated 
                    jogProcentage += ReductionsValue/2;
                    tempoWarmupProcentage += ReductionsValue/2;
                    // Fast kilometers deligated
                    var ReductionsValueFastkm = TotalKmDoneInWeek-85;
                    intervalRepProcentage = intervalRepProcentage -(ReductionsValueFastkm);  // Incrementet by one.. 55..54..53 etc.
                    tempoRep += ReductionsValueFastkm;
                    CalculatingLengths()
                }
                break;
            case "F": 
                break;
        }
    }


    // Calculating slow and fast kilometers based on 80% to slow and 20% til fast.
    function EightTweentyRuleMethod(){
        while(EightTweentyRuleVal === true){
            if(firstTimeDeligateKilometersCalled === true){ // Enable the program to use the first km, becouse this should not be increased straight away by 10% (it's the starting week)
                if(TotalKmDoneInWeek < 12 ){
                    TotalKmDoneInWeek = 12;
                    monthlyStartAmount = 12;
                    firstTimeDeligateKilometersCalled = false;
                }
                else{
                    monthlyStartAmount = monthlyStartValues;
                    firstTimeDeligateKilometersCalled = false;
                }
            }
            if(acValue == "A1" || acValue == "A2" ){
                if(firstTimeDeligateKilometersCalled === true) { // Enable the program to use the first km, becouse this should not be increased straight away by 10% (it's the starting week)
                intenseKilometers = (TotalKmDoneInWeek/100) * 7;
                SlowKilometers = (TotalKmDoneInWeek/100) * 93;  
                //console.log("intense minutes: "+intenseKilometers+ " -- "+"slowMinutes: "+SlowKilometers)
                EightTweentyRuleVal = false;
                firstTimeDeligateKilometersCalled = false;
                }
                intenseKilometers = (TotalKmDoneInWeek/100) * 7;
                SlowKilometers = (TotalKmDoneInWeek/100) * 93;  
                EightTweentyRuleVal = false;
            }
            else{ //TotalKmDoneInWeek >= 15
                if(firstTimeDeligateKilometersCalled === true) { // Enable the program to use the first km, becouse this should not be increased straight away by 10% (it's the starting week)
                intenseKilometers = (TotalKmDoneInWeek/100) * 20;
                SlowKilometers = (TotalKmDoneInWeek/100) * 80;  
                //console.log("intense minutes: "+intenseKilometers+ " -- "+"slowMinutes: "+SlowKilometers)
                EightTweentyRuleVal = false;
                firstTimeDeligateKilometersCalled = false;
                }
                intenseKilometers = (TotalKmDoneInWeek/100) * 20;
                SlowKilometers = (TotalKmDoneInWeek/100) * 80;  
                EightTweentyRuleVal = false;
                //console.log("intense minutes: "+intenseKilometers+ " -- "+"slowMinutes: "+SlowKilometers)
            }
        }
    }
    
    
    //First it finds the kategori (A,B..F) then it runs through based on quality passes and spitting out available kilometers 
    //by running through one week at the time and addning a "trainingPas" object to the day object, so the day now contains 
    //a specfic amount of kilometers.
    //After a week is complete it's  then added to the list "trainingsplanCreated" which contains X amount of weeks with trainingtypes and kilometers.
   
    createTrainingsPlan();
       function createTrainingsPlan()
        {
            
            EightTweentyRuleMethod(); // 80/20 rule applyed so distance can be calculated 
            calculateDistancesForTraningTypes() // calc. length to each trainingtype

            // Running through each day of the week element that we're currently in and assign each day a Traningspas with filled out attributes
            // and generation a Interval training based on a case which changes every fourth week and are never the same to give som varraity to the trainingplan
            trainingsplansOneWeekWithTypes.forEach(Day => {
            if(Day.trainingType == trainingsKatelogShema.interval){
                var trainingPasObject = new trainingPas();

                 // Logic for chaning the case to the interval generation every fourth week 
                 if( WeekCounter == 1 || (WeekCounter % 4) == 0){ //every
                    console.log("listOfValidCases length Before: " + listOfValidCases.length)
                    var index = Math.floor((Math.random() * listOfValidCases.length));
                    console.log("index: "+index)
                    caseNumber = listOfValidCases[index]
                    console.log("caseNumber: "+caseNumber)
                    listOfValidCases.splice(index, 1);
                    console.log("listOfValidCases length AFter: " + listOfValidCases.length)

                    if(listOfValidCases.length == 0 ){
                        console.log("List of valid cases is updated")
                        console.log("listOfValidCases.length: "+listOfValidCases.length)
                        listOfValidCases = [1,2,3,4];
                         console.log("Updated listOfValidCases.length: "+listOfValidCases.length)
                    }
                    
                }
                switch(ACValueWithNoNumber){
                    case "A": 
                    //Logic for creating different interval trainings concretetraining
                        switch(caseNumber){
                            case 1: //4 reps 
                            var repsInterval1 = 4;
                            creatingIntervalTraining(repsInterval1, trainingPasObject, Day, caseNumber);
                            break;
                            case 2: //5 reps 
                            var repsInterval2 = 5;
                            creatingIntervalTraining(repsInterval2, trainingPasObject, Day, caseNumber);
                            break;
                            case 3: //6 reps 
                            var repsInterval3 = 6;
                            creatingIntervalTraining(repsInterval3, trainingPasObject, Day, caseNumber);
                            break;
                            case 4: //12 reps 
                            var repsInterval4 = 7;
                            creatingIntervalTraining(repsInterval4, trainingPasObject, Day, caseNumber);
                            break;

                            // code belov is for interval creation class implentation - its not working at the moment. 
                            // case 1: //4 reps 
                            // var repsInterval1 = 4;
                            // var createdInterval = intervalCreation(repsInterval1, trainingPasObject, Day, acValue, cooldownInclueded, calculatedIntervalWarmupCooldownTotalLength, calculatedIntervalRepLength, calculatedIntervalBreakLength, IntervalWarmupLength, IntervalCooldownLength, TrainingZones)
                            // Day.trainingPas = createdInterval[0];  
                            // break;
                            // case 2: //5 reps 
                            // var repsInterval2 = 5;
                            // intervalCreation(repsInterval1, trainingPasObject, Day, acValue, cooldownInclueded, calculatedIntervalWarmupCooldownTotalLength, calculatedIntervalRepLength, calculatedIntervalBreakLength, IntervalWarmupLength, IntervalCooldownLength, TrainingZones)
                            // break;
                            // case 3: //6 reps 
                            // var repsInterval3 = 6;
                            // intervalCreation(repsInterval1, trainingPasObject, Day, acValue, cooldownInclueded, calculatedIntervalWarmupCooldownTotalLength, calculatedIntervalRepLength, calculatedIntervalBreakLength, IntervalWarmupLength, IntervalCooldownLength, TrainingZones)
                            // break;
                            // case 4: //12 reps 
                            // var repsInterval4 = 7;
                            // intervalCreation(repsInterval1, trainingPasObject, Day, acValue, cooldownInclueded, calculatedIntervalWarmupCooldownTotalLength, calculatedIntervalRepLength, calculatedIntervalBreakLength, IntervalWarmupLength, IntervalCooldownLength, TrainingZones)
                            // break;
                        }
                    break;
                    case "B": 
                        switch(caseNumber){
                            case 1: //4 reps 
                            var repsInterval1 = 4;
                            creatingIntervalTraining(repsInterval1, trainingPasObject, Day, caseNumber);
                            break;
                            case 2: //5 reps 
                            var repsInterval2 = 5;
                            creatingIntervalTraining(repsInterval2, trainingPasObject, Day, caseNumber);
                            break;
                            case 3: //6 reps 
                            var repsInterval3 = 6;
                            creatingIntervalTraining(repsInterval3, trainingPasObject, Day, caseNumber);
                            break;
                            case 4: //12 reps 
                            var repsInterval4 = 7;
                            creatingIntervalTraining(repsInterval4, trainingPasObject, Day, caseNumber);
                            break;
                        }
                    break;
                    case "C": 
                        switch(caseNumber){
                            case 1: //4 reps 
                            var repsInterval1 = 4;
                            creatingIntervalTraining(repsInterval1, trainingPasObject, Day, caseNumber);
                            break;
                            case 2: //5 reps 
                            var repsInterval2 = 5;
                            creatingIntervalTraining(repsInterval2, trainingPasObject, Day, caseNumber);
                            break;
                            case 3: //6 reps 
                            var repsInterval3 = 6;
                            creatingIntervalTraining(repsInterval3, trainingPasObject, Day, caseNumber);
                            break;
                            case 4: //12 reps 
                            var repsInterval4 = 7;
                            creatingIntervalTraining(repsInterval4, trainingPasObject, Day, caseNumber);
                            break;
                        }
                    break;
                    case "D": 
                        switch(caseNumber){
                            case 1: //4 reps 
                            var repsInterval1 = 4;
                            creatingIntervalTraining(repsInterval1, trainingPasObject, Day, caseNumber);
                            break;
                            case 2: //5 reps 
                            var repsInterval2 = 5;
                            creatingIntervalTraining(repsInterval2, trainingPasObject, Day, caseNumber);
                            break;
                            case 3: //6 reps 
                            var repsInterval3 = 6;
                            creatingIntervalTraining(repsInterval3, trainingPasObject, Day, caseNumber);
                            break;
                            case 4: //12 reps 
                            var repsInterval4 = 7;
                            creatingIntervalTraining(repsInterval4, trainingPasObject, Day, caseNumber);
                            break;
                        }
                    break;
                    case "E": 
                        switch(caseNumber){
                            case 1: //4 reps 
                            var repsInterval1 = 4;
                            creatingIntervalTraining(repsInterval1, trainingPasObject, Day, caseNumber);
                            break;
                            case 2: //5 reps 
                            var repsInterval2 = 5;
                            creatingIntervalTraining(repsInterval2, trainingPasObject, Day, caseNumber);
                            break;
                            case 3: //6 reps 
                            var repsInterval3 = 6;
                            creatingIntervalTraining(repsInterval3, trainingPasObject, Day, caseNumber);
                            break;
                            case 4: //12 reps 
                            var repsInterval4 = 7;
                            creatingIntervalTraining(repsInterval4, trainingPasObject, Day, caseNumber);
                            break;
                        }
                    break;
                }
            } 
            else if(Day.trainingType == trainingsKatelogShema.longrun){
                var trainingPasObject = new trainingPas();
    
                trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.longrun, calculatedLongrunLength, TrainingZones.Easy.velocityPerKm))
                if(longrunSpeedProcentage != 0){
                    trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.longrunSpeed, calculatedlongrunSpeedProcentage, TrainingZones.Threshold.velocityPerKm))
                }
                var longrunDescriptionsObject = new longrunDescriptions(calculatedLongrunLength);  //Descriptions object
    
                trainingPasObject.name = trainingsKatelogShema.longrun;
                trainingPasObject.description = longrunDescriptionsObject;
                
                Day.trainingPas = trainingPasObject;
            }
            else if(Day.trainingType == trainingsKatelogShema.tempo){
                var trainingPasObject = new trainingPas()
                
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.warmup, calculatedTempoLengthSlow, TrainingZones.Easy.velocityPerKm));  //Warmup 
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.tempo, calculatedTempoLengthFast, TrainingZones.Threshold.velocityPerKm));  //Speed

                var tempoDescriptionsObject = new tempoDescriptions(calculatedTempoLengthSlow);  //Descriptions object
               
                trainingPasObject.name = trainingsKatelogShema.tempo;
                trainingPasObject.description = tempoDescriptionsObject;
    
                Day.trainingPas = trainingPasObject;
            }
            else if(Day.trainingType == trainingsKatelogShema.jog){
                if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
                acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"                                   //--
                /*|| acValue == "E1" || acValue == "E2" || acValue == "E3"*/){
                    var trainingPasObject = new trainingPas();
                    var divider = 3;
                    var calculatedJogLengthDivided = calculatedJogLength/divider;
                    var walkRepBetweenJogProcentageDivided = (walkRepBetweenJogLength/divider); //by dividing wiht 10 makes the number 0.2 and then * 1000 in pdf = 200m 

                    for (let index = 0; index <=4; index++) {
                        trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.walk, walkRepBetweenJogProcentageDivided, "Walk Normal"));
                        trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.jog, calculatedJogLengthDivided, TrainingZones.Easy.velocityPerKm));
                        index++;
                        
                    }

                    var jogDescriptionsObject = new jogDescriptions(calculatedJogLength);  //Descriptions object
        
                    trainingPasObject.name = trainingsKatelogShema.jog;
                    trainingPasObject.description = jogDescriptionsObject;
                    
                    Day.trainingPas = trainingPasObject;
                }else{
                    var trainingPasObject = new trainingPas();
                
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.jog, calculatedJogLength, TrainingZones.Easy.velocityPerKm));
                var jogDescriptionsObject = new jogDescriptions(calculatedJogLength);  //Descriptions object
    
                trainingPasObject.name = trainingsKatelogShema.jog;
                trainingPasObject.description = jogDescriptionsObject;
                
                Day.trainingPas = trainingPasObject;
                }
            }
            else if(Day.trainingType == trainingsKatelogShema.dobbeltJog){
                var trainingPasObject = new trainingPas();
               
                trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.dobbeltJog, calculatedJogLength, TrainingZones.Easy.velocityPerKm))
                trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.dobbeltJog, calculatedJogLength, TrainingZones.Easy.velocityPerKm))

                var dobbeltJogDescriptionsObjekt = new walkDescriptions(calculatedJogLength);  //Descriptions object
                trainingPasObject.description = dobbeltJogDescriptionsObjekt;
                trainingPasObject.name = trainingsKatelogShema.dobbeltJog;
                
                Day.trainingPas = trainingPasObject;
            }
            else if(Day.trainingType == trainingsKatelogShema.walk){
                var trainingPasObject = new trainingPas();
                var walkMeters = 4; //In meters
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.walk, walkMeters, "Walk"));
                // console.log("ACValue: "+acValue + "   " + "walkMeters: "+walkMeters)
    
                var walkDescriptionsObject = new walkDescriptions(walkMeters);  //Descriptions object
                trainingPasObject.description = walkDescriptionsObject;
                trainingPasObject.name = trainingsKatelogShema.walk;
               
                Day.trainingPas = trainingPasObject;
            }
            else if(Day.trainingType == trainingsKatelogShema.restDay){
                var trainingPasObject = new trainingPas()
                var restDayDescriptionsObject = new restDay();  //Descriptions object
    
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.restDay, 0, 0));
    
                trainingPasObject.name = trainingsKatelogShema.restDay;
                trainingPasObject.description = restDayDescriptionsObject;
    
                Day.trainingPas = trainingPasObject;
            }
            });
            //console.log("Completed week is addede to the trainingsplan")
            EightTweentyRuleVal = true;
        }
        // console.log("ACValueWithNoNumber: "+ACValueWithNoNumber)
        // console.log("TotalKmDoneInWeek: "+TotalKmDoneInWeek)


        if(trainingsPhase == trainingsKatelog.baseTraining){
            // logic for base training kilometer increasment 
            // Inceasing and decreasing km pr month - set one time to avoid uncorrectly values.
            var aIncrement = 108;
            var bIncrement = 108;
            var cIncrement = 104.5;
            var dIncrement = 104.5;
            var eIncrement = 103;
            var fIncrement = 102;
            if(WeekCounter == 4 || WeekCounter == 8 || WeekCounter == 12 || WeekCounter == 16 || WeekCounter == 20 || WeekCounter == 24 || WeekCounter == 28 || WeekCounter == 32 || WeekCounter == 36 )  // ----->  OBS!!! Skal laves smarte, så man kan genere x antal uge og stadig bruge funktioneliteten <-----
            {
                // These values should match the once down below (line)
                switch(ACValueWithNoNumber){
                    case "A": 
                        if(acValue == "A1" || acValue == "A2" || acValue == "A3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*107.5; 
                        }else{
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*aIncrement;  
                        }
                    break;
                    case "B": 
                        if(acValue == "B1" || acValue == "B2" || acValue == "B3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*105; 
                        }else{
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*bIncrement;  
                        } 
                    break;
                    case "C": 
                        if(acValue == "C1" || acValue == "C2" || acValue == "C3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*103; 
                        }else{
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*cIncrement; 
                        } 
                    break;
                    case "D": 
                        if(acValue == "D1" || acValue == "D2" || acValue == "D3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*103; 
                        }else{
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*dIncrement; 
                        } 
                    break;
                    case "E":
                        if(acValue == "E1" || acValue == "E2" || acValue == "E3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*103;  
                        }else{
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*eIncrement; 
                        } 
                    break;
                    case "F":
                        if(acValue == "F1" || acValue == "F2" || acValue == "F3" ){
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*102; 
                        }else{ 
                            TotalKmDoneInWeek = (monthlyStartAmount/100)*fIncrement; 
                        } 
                    break;
                }
                monthlyStartAmount = TotalKmDoneInWeek;
                console.log("---Every 4 week---")
                console.log("monthlyStartAmount: "+monthlyStartAmount)
                console.log("TotalKmDoneInWeek: "+TotalKmDoneInWeek)
                console.log("---Every 4 week---")
                
                //AC updateres 
                ACValueNumber = ACValueCalculator(CooperResultInMeters, TotalKmDoneInWeek); 
                ACValueWithNoNumber = ACValueNumber.replace(/[0-9]/, '');
            }else{ 
                //Icreaing km pr week and depending on which kategorier decides how much to incease.
                switch(ACValueWithNoNumber){
                    case "A": 
                        if(acValue == "A1" || acValue == "A2" || acValue == "A3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 107.5; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * aIncrement; 
                        }
                    break;
                    case "B": 
                        if(acValue == "B1" || acValue == "B2" || acValue == "B3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 106; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * bIncrement; 
                        } 
                    break;
                    case "C": 
                        if(acValue == "C1" || acValue == "C2" || acValue == "C3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 103; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * cIncrement;  
                        } 
                    break;
                    case "D": 
                        if(acValue == "D1" || acValue == "D2" || acValue == "D3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 103; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * dIncrement;  
                        } 
                    break;
                    case "E":
                        if(acValue == "E1" || acValue == "E2" || acValue == "E3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 103; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * eIncrement;  
                        } 
                    break;
                    case "F":
                        if(acValue == "F1" || acValue == "F2" || acValue == "F3" ){
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * 102; 
                        }else{
                            TotalKmDoneInWeek = (TotalKmDoneInWeek/100) * fIncrement;  
                        } 
                    break;
                }
            }
        }
        else if(trainingsPhase == trainingsKatelog.specificTraining){
            // logic for specific training speed increasment 


        }
        else if(trainingsPhase == trainingsKatelogShema.cooldown){
            // logic for cooldown and this should be based on the differende goals, fx a marathon need a longer cooldown period than a 5-10km race.
        }


        loggingRef(filename, "Data logging", TotalKmDoneInWeek, " km" );


        console.log("Km amount just before returning it "+TotalKmDoneInWeek)
        var returnedInformaitons = {trainingsplansOneWeekWithTypes, TotalKmDoneInWeek, caseNumber, firstTimeDeligateKilometersCalled, monthlyStartAmount, listOfValidCases};
        return returnedInformaitons;


          // Method used --> could be moved to another file.
        //By giving the four prams. this function is able to generate a interval training with reps and breaks (break is = 2:1).
        function CalculatingLengths(){
            //Testing code 
            // console.log("TotalKmDoneInWeek: "+TotalKmDoneInWeek)
            // console.log("SlowKilometers: "+SlowKilometers)
            // console.log("intenseKilometers: "+intenseKilometers)
            // console.log("longrunProcentage: "+longrunProcentage)
            // console.log("intervalWarmupCooldown: "+intervalWarmupCooldown)
            // console.log("intervalBreakProcentage: "+intervalBreakProcentage)
            // console.log("jogProcentage: "+jogProcentage)
            // console.log("walkRepBetweenJogProcentage: "+walkRepBetweenJogProcentage)
            // console.log("tempoWarmupProcentage: "+tempoWarmupProcentage)
            // console.log("samlet procentage slow: "+(intervalWarmupCooldown+intervalBreakProcentage+jogProcentage+tempoWarmupProcentage+longrunProcentage+walkRepBetweenJogProcentage))
            // console.log("tempoRep: "+tempoRep)
            // console.log("intervalRepProcentage: "+intervalRepProcentage)
            // console.log("samlet procentage fast: "+(intervalRepProcentage+tempoRep))
            // console.log("-----bvValue.jogsPerWeek: "+bvValue.jogsPerWeek)

            //calculation Lengths
            calculatedLongrunLength = (SlowKilometers/100)* longrunProcentage; // Longrun length 
            calculatedlongrunSpeedProcentage = (intenseKilometers/100)* longrunSpeedProcentage;
            calculatedIntervalWarmupCooldownTotalLength = (SlowKilometers/100)* intervalWarmupCooldown; //Warmup and cooldown lengths for interval
            calculatedIntervalRepLength = (intenseKilometers/100)*intervalRepProcentage;  // Interval rep total length
            calculatedIntervalBreakLength = (SlowKilometers/100)* intervalBreakProcentage; // Interval break total length
            calculatedJogLength = (((SlowKilometers/100) * jogProcentage)/bvValue.jogsPerWeek); // each Jog length
            calculatedTempoLengthSlow = (SlowKilometers/100)* tempoWarmupProcentage; //Tempo Warmup
            calculatedTempoLengthFast = (intenseKilometers/100)* tempoRep; // Tempo Fast
            walkRepBetweenJogLength = (((SlowKilometers/100)*walkRepBetweenJogProcentage)/bvValue.jogsPerWeek); // Total
}           
        
        // Method used --> could be moved to another file.
        //By giving the four prams. this function is able to generate a interval training with reps and breaks (break is = 2:1).
        function creatingIntervalTraining(amountOfRepsToBeDone, trainingPasObject, Day){
            if(cooldownInclueded === false){
                IntervalWarmupLength = calculatedIntervalWarmupCooldownTotalLength;
            } else{
                IntervalWarmupLength = (calculatedIntervalWarmupCooldownTotalLength/3)*2; //Warmup length
                IntervalCooldownLength = (calculatedIntervalWarmupCooldownTotalLength/3)*1; //cooldown length
            }
            var repCount = 0;
            var oneRep = (calculatedIntervalRepLength/amountOfRepsToBeDone);
            var oneRepBreak = (calculatedIntervalBreakLength/amountOfRepsToBeDone);

            //  //logic to build a Interval
            trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.warmup, IntervalWarmupLength, TrainingZones.Easy.velocityPerKm));        // Warmup rep added
            if(acValue == "A1" || acValue == "A2" || acValue == "A3" || acValue == "B1" || acValue == "B2" || acValue == "B3"||                             // Walk/break rep added
                acValue == "C1" || acValue == "C2" || acValue == "C3"|| acValue == "D1" || acValue == "D2" || acValue == "D3"||                             //--
                acValue == "E1" || acValue == "E2" || acValue == "E3"){ 
                // Good with a break after warmup and before the first rep
                trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.walk, 0.3, "Walk")); // 1/3 of af km is aprroxi. 3min break.  // OBS! this is not within the slow kilometers (choosen implementation - Jonas)
            }
            while(repCount < amountOfRepsToBeDone){                                                                                                         // Interval reps + break creation
                  trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.active, oneRep, TrainingZones.Interval.velocityPerKm));             // Interval fast rep added
                  trainingPasObject.concreteTraining.push(new rep(trainingsKatelogShema.break, oneRepBreak, TrainingZones.Easy.velocityPerKm));             // Interval break rep added
                  repCount = repCount +1;
              }
              trainingPasObject.concreteTraining.push( new rep("repCount", repCount, 0)); // Not a Ideal solution, but we need to pass the repcount.
              trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.cooldown, IntervalCooldownLength, TrainingZones.Easy.velocityPerKm));
            
            var intervalDescriptionsObject = new intervalDescriptions(amountOfRepsToBeDone, oneRep, oneRepBreak);  //Descriptions object
            trainingPasObject.name = trainingsKatelogShema.interval;
            trainingPasObject.description = intervalDescriptionsObject;
           
            Day.trainingPas = trainingPasObject;          
    }
}

