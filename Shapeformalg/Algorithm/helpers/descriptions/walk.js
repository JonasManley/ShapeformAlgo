/// <summary>
///   Cotains the description of a Walk workout - which should be used by displaying it in the frontend
/// </summary>
module.exports = function (walkLength) { 

    var walkDescriptions = new Object(); 

    //walk
    this.walkLength = walkLength;
    walkDescriptions.walkDescriptionsText = "walk er en god måde at få restitueret på og kørt noget nyt blod igemmen kroppen også derfor vi anbefaler at gå en tur dagen efter en hård træning som intervaller.";
    walkDescriptions.walkDescriptions = `${walkLength} km easy walk.`;

    return walkDescriptions;
} 