/// <summary>
///   Training Type Kategories   
///   In this file you will find all the differnet types of training you can do, and should ONLY be used as a 
///   reference point, so the naming throughout the algorithme is the same and if changes are needed, this is 
///   the only place to change it. :)
/// </summary>
module.exports = function () { 

    var trainingsKatelog = new Object(); 

    // 
    trainingsKatelog.interval = "Interval";
    trainingsKatelog.jog = "Jog";
    trainingsKatelog.walk = "Walk";
    trainingsKatelog.restDay = "Rest Day";
    trainingsKatelog.tempo = "Tempo";
    trainingsKatelog.longrun = "Longrun";
    trainingsKatelog.longrunSpeed = "finish Speed";
    trainingsKatelog.dobbeltJog = "DobbeltJog"
    trainingsKatelog.warmup = "Warm up"; 
    trainingsKatelog.cooldown = "Cooldown";

    //used in the interval rep creation
    trainingsKatelog.active = "Active";
    trainingsKatelog.break = "Break";

    //Training Phases
    trainingsKatelog.baseTraning = "baseTraining";
    trainingsKatelog.specificTraning = "specificTraning";



    //Other to be implented later on.
    // Bakkeløb
    // Wave-running
    // Strides
    // Agility øvelser

    return trainingsKatelog;
}