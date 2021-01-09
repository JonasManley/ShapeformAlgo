// const BVValue = require('../algoritme_Values/bvValue');
// const DeligateTrainingTypes = require('./algoritme_Functionality/deligateTrainingTypes');
// const Week = require('./models/week');
// const Day = require('./models/day');
// const TrainingsPasForm = require('./models/trainingPas');
// const wValues = require('../algoritme_Values/wValues'); 
// const randomIndexGen = require('../Algorithm/helpers/RandomIndexGenerator');  
const algoMain = require('./algoMain');
const trainingsKatelog = require("./helpers/trainingsKatelog")



//Whole service - gives a trainingsplan as a output.
//Inputs: (CooperResultInMeters, KmPerWeek, StartDate, CreateXWeek, withoutVelocity)

algoMain(2400, 15, new Date(), 16, false, trainingsKatelog.baseTraning) // Base traning 




//algoMain(1700, 12.5, new Date(), 16, false, trainingsKatelog.specificTraning) // Specific traning 

// randomIndexGen(1, "A1"); //RandomIndex method is tested 


// console.log(Math.floor(Math.random() * 1))


//how the new wValues works and how you can get values out.
// var wValuesObject = new wValues("A1");  //Descriptions object
// console.log(wValuesObject)
// console.log("Length before: "+wValuesObject.length)
// wValuesObject.splice(wValuesObject[1], 1);
// console.log(wValuesObject)
// console.log("Length after: "+wValuesObject.length)

// console.log("-----------------------------")
// wValuesObject[1].forEach(element => {
//     console.log(element)
// });




// Not really used any more (below..)

// var TotalKmDoneInWeek = 35; 

// if(TotalKmDoneInWeek >30 && TotalKmDoneInWeek <=40){ 
//     var longrunPercentageStart = 55;
//     var ReductionsValue = TotalKmDoneInWeek-30;
//     var longrunPercentage = longrunPercentageStart - ReductionsValue;  // Incrementet by one.. 55..54..53 etc.

//     longrunLength = (SlowKilometersStartValue/100)* longrunPercentage;
//     totalPercentageUsedSLOWCheck += longrunPercentage;
// }
// if(TotalKmDoneInWeek >40 && TotalKmDoneInWeek <=50){
//     var longrunPercentageStart = 45;
//     var ReductionsValue = TotalKmDoneInWeek-40;
//     var longrunPercentage = longrunPercentageStart - (ReductionsValue/2);  // Incrementet by one.. 55..54..53 etc.

//     longrunLength = (SlowKilometersStartValue/100)* longrunPercentage;
//     totalPercentageUsedSLOWCheck += longrunPercentage;
// }

// console.log();

//Test of generation of percentage for jog length.
// var TotalKmDoneInWeek = 30;
// var SlowKilometers = (TotalKmDoneInWeek/100)*80;

// if(TotalKmDoneInWeek >=30 && TotalKmDoneInWeek <=50){
//     var longrunPercentageStart = 45;
//     var ReductionsValue = TotalKmDoneInWeek-40;
//     var longrunPercentage = longrunPercentageStart - (ReductionsValue/2);  // Incrementet by one.. 55..54..53 etc.

//     longrunLength = (SlowKilometers/100)* longrunPercentage;
//     console.log("longrunLength: "+longrunLength)
// }



//test of how date can be incrementet. 
// var date = new Date();
// date.setDate(date.getDate() + 20);
// console.log(date);



    // var caseNumber;
    //var listOfValidCases = [1,2,3,4]; //array of valid cases
    // console.log(listOfValidCases.length)
    // console.log(Math.floor(Math.random() * 1) + 1)

    // caseNumber = Math.floor((Math.random() * listOfValidCases.length));
    // //Update the available trainings list - so the same case can't be use more than 4 times in a row.
    // console.log("Index choosen : " + caseNumber)
    // var index = listOfValidCases.indexOf(caseNumber); //removed
    // console.log("Values of index " + index)

// var array = [];
// for (let i = 0; i < 4; i++) {
//     if(listOfValidCases.length == 0){
//         listOfValidCases = [1,2,3,4]
//     }
//     caseNumber = Math.floor((Math.random() * listOfValidCases.length));
//     console.log("casenumber : " + caseNumber)
//     var firstArrayItem = listOfValidCases[caseNumber]
//     array.push(firstArrayItem);
    
//     listOfValidCases.splice(caseNumber, 1);
//     console.log("listOfValidCases length: " + listOfValidCases.length)

//     array.forEach(element => {
//         console.log(element)
//     });
    
// }

  

    



// var number = 41.4123;
// console.log(Math.ceil(((number *20) - 0.5)/20).toFixed(2));
// console.log((Math.ceil(number*20 - 0.5)/20).toFixed(2))

// //name, description, trainingType, warmup, concreteTraining, coolDown, focusArea
// var trainingpas1 = new TrainingsPasForm("Interval træning", "4x500m 2min pause", "Interval", 2, 15, 2, "Motion")
// //nameOfDay, date, trainingType, trainingPas
// var day = new Day("monday", "22-06-2019", "interval", trainingpas1)
// console.log(day)


//console.log(DeligateTrainingTypes("A1", Week(new Date())));
//console.log(Math.floor(Math.random() * 6) + 1);

// var BVValueList = BVValue("A1") 
// console.log(BVValueList.jog);






