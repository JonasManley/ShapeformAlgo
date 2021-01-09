/// <summary>
///   Cotains the description of a dobbelt workout - which should be used by displaying it in the frontend
/// </summary>
module.exports = function (jogLength) { 

    var dobbeltjogDescriptions = new Object(); 

    //jog
    this.jogLength = jogLength;
    dobbeltjogDescriptions.dobbeltjogDescriptionsText = "dobbelt jog er et godt redskab til at kunne få flere langsomme kilometer i benene";
    dobbeltjogDescriptions.dobbeltjogDescriptions = `${jogLength} meters controlled jog x 2`;

    return jogDescriptions;
}