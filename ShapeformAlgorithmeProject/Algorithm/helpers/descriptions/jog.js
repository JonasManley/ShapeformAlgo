/// <summary>
/// Cotains the description of a Jog workout - which should be used by displaying it in the frontend
/// </summary>
module.exports = function (jogLength) { 

    var jogDescriptions = new Object(); 

    //jog
    this.jogLength = jogLength;
    jogDescriptions.jogDescriptionsText = "Jog er et vigtigt element for at forbedre din udholdenhed, så du kan løbe længere";
    jogDescriptions.jogDescriptions = `${jogLength} meters controlled jog.`;

    return jogDescriptions;
}