/// <summary>
///   Not Implemented
/// </summary>
module.exports = function (tempoLength) { 

    var descriptions = new Object(); 

    //tempo                   ------------>       Skal skrive om, den giver ikke mening.        <-------------
    var tempoLength;
    descriptions.tempoDescriptionsText = "Tempo turen er i samme kategori som interval, dog er den også med til at simullere hvordan et race bliver";
    descriptions.tempoDescriptions = `${tempoLength} km. tempo run`;

    return descriptions;
}