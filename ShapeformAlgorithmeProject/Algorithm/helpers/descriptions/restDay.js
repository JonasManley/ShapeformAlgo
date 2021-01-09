/// <summary>
///   Cotains the description of a RestDay workout - which should be used by displaying it in the frontend
/// </summary>
module.exports = function () { 

    var restDescriptions = new Object(); 

    //restDay
    var restDayLength = 0;
    restDescriptions.restDayDescriptionsText = "En rest dag kan være nødvenig for at få kroppen fuld restituneret til næste træning";
    restDescriptions.restDayDescriptions = `${restDayLength} active min today.`;


    return restDescriptions;
}