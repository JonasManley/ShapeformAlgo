const randomIndexGen = require('../helpers/RandomIndexGenerator'); 
const rep = require('../models/rep');  
const trainingsKatelogShema = require('../helpers/trainingsKatelog'); 
/// <summary>
///   Interval Creation
///   This is the place where all the different types of interval, hill repeats and more will be created 
/// </summary>
///
/// <param name="placeholdeText">placeholdeText</param>

module.exports = function (amountOfRepsToBeDone, trainingPasObject, Day, acValue, cooldownInclueded, calculatedIntervalWarmupCooldownTotalLength, calculatedIntervalRepLength, calculatedIntervalBreakLength, IntervalWarmupLength, IntervalCooldownLength, TrainingZones) { 
    var IntervalWarmupLength;
    var IntervalCooldownLength;
    
    test();
    function test(){
    // Logic for warmup inclueded or not.
        console.log("calculatedIntervalWarmupCooldownTotalLength variable: "+calculatedIntervalWarmupCooldownTotalLength)
      
       console.log("is cooldownInclueded? "+ cooldownInclueded)

        if(cooldownInclueded === false){
            IntervalWarmupLength = calculatedIntervalWarmupCooldownTotalLength;
            console.log("calculated IntervalWarmupLength: " + IntervalWarmupLength)
        } else{
            IntervalWarmupLength = (calculatedIntervalWarmupCooldownTotalLength/3)*2; //Warmup length
            IntervalCooldownLength = (calculatedIntervalWarmupCooldownTotalLength/3)*1; //cooldown length
            console.log("calculated IntervalWarmupLength: " + IntervalWarmupLength)
        }
        trainingPasObject.concreteTraining.push( new rep(trainingsKatelogShema.cooldown, IntervalCooldownLength, TrainingZones.Easy.velocityPerKm));

        //Data/information nesserray to have for creations of a training (should be modifyed based on which goal one have instead of this standard way)
        var repCount = 0;
        var oneRep = (calculatedIntervalRepLength/amountOfRepsToBeDone);
        var oneRepBreak = (calculatedIntervalBreakLength/amountOfRepsToBeDone);
        // logic to build a Interval
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
        trainingPasObject.name = trainingsKatelogShema.interval;
               
    };
    return [trainingPasObject]
};