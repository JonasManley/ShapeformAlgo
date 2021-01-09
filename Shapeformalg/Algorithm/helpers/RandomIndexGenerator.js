const wValues = require('../../algoritme_Values/wValues')
const BVValue = require('../../algoritme_Values/bvValue');
/// <summary>
///   Random Index Generator 
///   Based on wValues it gerneates an index which is used by DeligateTrainingtypes2.0 to create a trainingweek
/// </summary>
///
/// <param name="ACValue">Cooper test result and the weekly running distance into an value</param>
/// <param name="WeekTemplate">Template week that is prepared with days and ready for insertation of trainingtypes</param>
module.exports = function (previousIndexGenerated, ACValue) { 
     var currentGeneratedIndex; 
     var wValuesObejct = wValues(ACValue);

    if(ACValue == "A1" || ACValue == "A2" || ACValue == "A3" || ACValue == "A4" || ACValue == "A%" || ACValue == "A6" 
    || ACValue == "B1" || ACValue == "B2" || ACValue == "B3" || ACValue == "B4" || ACValue == "B%" || ACValue == "B6" 
    || ACValue == "C1" || ACValue == "C2" || ACValue == "C3" || ACValue == "C4" || ACValue == "C%" || ACValue == "C6"
    || ACValue == "D1" || ACValue == "D2" || ACValue == "D3" || ACValue == "D4" || ACValue == "D%" || ACValue == "F6"
    || ACValue == "E1" || ACValue == "E2" || ACValue == "E3" || ACValue == "E4" || ACValue == "E%" || ACValue == "E6"
    || ACValue == "F1" || ACValue == "F2" || ACValue == "F3" || ACValue == "F4" || ACValue == "F%" || ACValue == "F6"){
    //console.log(wValuesObejct)
    RandomIndexGeneratorFunction()
    function RandomIndexGeneratorFunction(){

    // console.log("Generate random index..")
    currentGeneratedIndex = Math.floor(Math.random() * wValuesObejct.length);
    // console.log("previousIndexGenerated: "+previousIndexGenerated)
    // console.log("currentGeneratedIndex: "+currentGeneratedIndex)

            if(previousIndexGenerated == currentGeneratedIndex){
                console.log("previousIndexGenerated == currentGeneratedIndex")
                console.log("wValuesObejct: "+wValuesObejct)
                while(previousIndexGenerated === currentGeneratedIndex &&  wValuesObejct.length > 1 ){
                    currentGeneratedIndex = Math.floor(Math.random() * wValuesObejct.length);
                    // console.log("previousIndexGenerated: "+previousIndexGenerated)
                    // console.log("currentGeneratedIndex: "+currentGeneratedIndex)
                }
            }
        }
    console.log("Generation is DONE.. Number generated is: "+currentGeneratedIndex)
    previousIndexGenerated = currentGeneratedIndex;

    return [currentGeneratedIndex, previousIndexGenerated];
    }else{
        console.log("Something went wrong")
        return null; 
    }
 }