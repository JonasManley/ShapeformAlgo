/// <summary>
///   Cotains the description of a Interval workout - which should be used by displaying it in the frontend
/// </summary>
module.exports = function (reps, repLength, repBreak) { 

    var intervalDecription = new Object(); 

    //interval
    this.reps = reps;
    this.repLength = repLength;
    this.repBreak = repBreak;
    intervalDecription.intervalDescriptionsText = "Intervaltræning giver dig en store VO2 maks, som gør dig istand til at løbe hurtigere";
    intervalDecription.interval = `${reps} x ${repLength}m (with ${repBreak}m slow walk inbetween each interval)`;


    return intervalDecription;
}