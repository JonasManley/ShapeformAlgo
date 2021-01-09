/// <summary>
///   This is where we generate Week (w) Value
///   w-value is used to place workout types acordingly to a valid predefined schema.
/// </summary>
const trainingWeekSchemaObject = require('../Algorithm/models/trainingWeekSchema'); 
const trainingsKatelog = require('../Algorithm/helpers/trainingsKatelog'); 


module.exports = function GenerateWValues(acValuePram) {
    var ValidTrainingShemas = new trainingWeekSchemaObject();
    var T = trainingsKatelog();
    
    var acValue = acValuePram;
    var ACValueWithNoNumber = acValuePram.replace(/[0-9]/, '');

    GetValiedTraningWeeks();
    function GetValiedTraningWeeks(){
        console.log(ACValueWithNoNumber)
        switch(ACValueWithNoNumber) {
            case "A": //[2x Jog, 1x Interval]'
            console.log(acValue)
                if(acValue == "A1" || acValue == "A2") {
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.restDay, T.jog, T.restDay, T.interval, T.restDay, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.restDay, T.jog, T.restDay, T.jog, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.restDay, T.interval, T.restDay, T.restDay, T.jog, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.restDay, T.jog, T.restDay, T.interval, T.restDay, T.restDay, T.jog))
                }else if(acValue == "A3" ){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.restDay, T.jog, T.restDay, T.interval, T.walk, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.restDay, T.jog, T.restDay, T.jog, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.restDay, T.interval, T.walk, T.restDay, T.jog, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.restDay, T.jog, T.restDay, T.interval, T.walk, T.restDay, T.jog))
                }else if(acValue == "A4" || acValue == "A5" || acValue == "A6"){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.walk, T.jog, T.restDay, T.interval, T.walk, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.restDay, T.jog, T.walk, T.jog, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.restDay, T.interval, T.walk, T.restDay, T.jog, T.walk))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.walk, T.jog, T.restDay, T.interval, T.walk, T.restDay, T.jog))
                }
                break;
            case "B":  //[2x Jog, 1x Interval, 1x Longrun]
                if(acValue == "B1" || acValue == "B2") {
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.jog, T.jog, T.restDay, T.longrun, T.restDay))
                }else if(acValue == "B3" ){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.jog, T.jog, T.restDay, T.longrun, T.restDay))
                }else if(acValue == "B4" || acValue == "B5" || acValue == "B6"){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.jog, T.jog, T.restDay, T.longrun, T.walk))
                }
                break;
            case "C":  //[2x Jog, 1x Interval, 1x Longrun, 1x Tempo]
            if(acValue == "C1" || acValue == "C2") {
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.tempo, T.jog, T.jog, T.longrun, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.jog, T.tempo, T.jog, T.longrun, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.restDay, T.interval, T.restDay, T.tempo, T.jog, T.jog, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.restDay, T.tempo, T.jog, T.longrun, T.restDay))
            }else if(acValue == "C3" ){
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.tempo, T.jog, T.jog, T.longrun, T.restDay))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.jog, T.tempo, T.jog, T.longrun, T.restDay))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.restDay, T.interval, T.walk, T.tempo, T.jog, T.jog, T.longrun))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.walk, T.tempo, T.jog, T.longrun, T.restDay))
            }else if(acValue == "C4" || acValue == "C5" || acValue == "C6"){
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.tempo, T.jog, T.jog, T.longrun, T.walk))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.jog, T.tempo, T.jog, T.longrun, T.walk))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.walk, T.interval, T.walk, T.tempo, T.jog, T.jog, T.longrun))
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.walk, T.tempo, T.jog, T.longrun, T.restDay))
            }
            break;
            case "D":  //[1x Jog, 1x dobbletjog 1x Interval, 1x Longrun, 1x Tempo]
                if(acValue == "D1" || acValue == "D2") {
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.restDay, T.tempo, T.dobbeltJog, T.restDay, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.tempo, T.dobbeltJog, T.restDay, T.interval, T.restDay, T.longrun))
                }else if(acValue == "D3" ){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.restDay))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.walk, T.tempo, T.dobbeltJog, T.restDay, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.tempo, T.dobbeltJog, T.restDay, T.interval, T.walk, T.longrun))
                }else if(acValue == "D4" || acValue == "D5" || acValue == "D6"){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.walk))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.walk, T.tempo, T.dobbeltJog, T.walk, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.tempo, T.dobbeltJog, T.walk, T.interval, T.walk, T.longrun))
                
                }
                break;
            case "E": //[2x Jog, 1x dobbletjog 1x Interval, 1x Longrun, 1x Tempo]
                if(acValue == "E1" || acValue == "E2") {
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.restDay, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.jog))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.restDay, T.tempo, T.dobbeltJog, T.jog, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.tempo, T.dobbeltJog, T.jog, T.interval, T.restDay, T.longrun))
                }else if(acValue == "E3" || acValue == "E4" || acValue == "E5" || acValue == "E6" ){
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.walk, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.jog))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.interval, T.walk, T.tempo, T.dobbeltJog, T.jog, T.longrun))
                    ValidTrainingShemas.trainingWeekArray.push(new Array(T.jog, T.tempo, T.dobbeltJog, T.walk, T.interval, T.jog, T.longrun))
                }
                break;
            case "F":  
                ValidTrainingShemas.trainingWeekArray.push(new Array(T.interval, T.jog, T.dobbeltJog, T.tempo, T.jog, T.longrun, T.jog))
                break;
        }
    }
    return ValidTrainingShemas.trainingWeekArray;
}
