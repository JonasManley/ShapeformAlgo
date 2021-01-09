/// <summary>
///   AC value Calculator
///   This method is combinding a Cooper test result and the weekly running distance, to calculate the AC Value.
/// </summary>
///
/// <param name="Cooper">Distance of a cooper test</param>
/// <param name="km">weekly running distance in Kilometers</param>

module.exports = function   (Cooper, km) { 

    var AValue = "";
    var CValue = "";

    // Finding the AValue 
    if(km >= 0 && km < 25) {
        AValue = "A";
    } else if (km >= 25 && km < 30){ 
        AValue = "B";
    } else if (km >= 30 && km < 50){
        AValue = "C";
    } else if (km >= 50 && km < 75){
        AValue = "D";
    } else if (km >= 75 && km < 100){
        AValue = "E";
    } else if (km >= 100 ){
        AValue = "F";
    } else {
        //TODO Error handling
        console.log("km input is invalid")
    }

    // Finding the CValue
    if (Cooper >= 0 && Cooper < 1000){
        CValue = "1";
    } else if (Cooper >= 1000 && Cooper < 2200){
        CValue = "2";
    } else if (Cooper >= 2200 && Cooper < 2500){
        CValue = "3";
    } else if (Cooper >= 2500 && Cooper < 3200){
        CValue = "4";
    } else if (Cooper >= 3200 && Cooper < 3800){
        CValue = "5";
    } else if (Cooper >= 3800){
        CValue = "6";
    } else {
        //TODO Error handling
        console.log("Cooper input is invalid")
    }

    // Combinding the values to get ACValue
    var ACValue = AValue + CValue;
    return ACValue;
};