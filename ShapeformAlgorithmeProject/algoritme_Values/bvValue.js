/// <summary>
///   This is where we generate BV Value
///   BV value is used to place workout types acordingly 
/// </summary>
///
/// <param name="ACValue">ACValue which indicate how many times a person can run a week</param>
module.exports = function GenerateBVValue(ACValue) {

    var BVValues = new Object();

    // Default Values

    // Values from the generator
    var interval = 1;
    var tempo = 2;
    var longRun = 3;
    var jog = 4;
    var walk = 5;
    var dobbeltjog = 6;

    // Per Week Values
    BVValues.jogsPerWeek = 0;
    BVValues.intervalsPerWeek = 0;
    BVValues.walksPerWeek = 0;
    BVValues.longRunsPerWeek = 0;
    BVValues.temposPerWeek = 0;

    // Declaration of itensity values, has to be declared to validation of a rest day.
    BVValues.interval = 101;
    BVValues.tempo = 101;
    BVValues.longRun = 101;
    BVValues.jog = 101;

    // Rest Default Values 
    BVValues.restDay = 40;
    BVValues.walk = 40;
    BVValues.defaultRest = 10;

//------------------------------------------------------------------------A Kategori start----------------------------------------------------------------------------//

    switch (ACValue) {
        case "A1":
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.defaultRest = 20;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 3;
          break;
        case "A2":
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.defaultRest = 20;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 3;
          break;
        case "A3":
           // How many times each training need to be placed per week for the certain AC Value
           BVValues.jogsPerWeek = 2;
           BVValues.intervalsPerWeek = 1;
           BVValues.walksPerWeek = 1;
           BVValues.defaultRest = 20;
           // How many trainingpasses the week contains for the certain AC Value 
           BVValues.trainingpasses = 4;
          break;
        case "A4":
           // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 5;
          break;
        case "A5":
             // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 5;
          break;
        case "A6":
           // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 5;
          break;
//-----------------------------------------------------------------A kategori end-----------------------------------------------------------------------------------//


//-----------------------------------------------------------------B kategori start-----------------------------------------------------------------------------------//
            case "B1":
              // How many times each training need to be placed per week for the certain AC Value
              BVValues.jogsPerWeek = 2;
              BVValues.intervalsPerWeek = 1;
              BVValues.longRunsPerWeek = 1;
              BVValues.QuallityPas = 1; //used to create a trainings week with kilometers
              // How many trainingpasses the week contains for the certain AC Value 
              BVValues.trainingpasses = 4;
            break;
            case "B2":
              // How many times each training need to be placed per week for the certain AC Value
              BVValues.jogsPerWeek = 2;
              BVValues.intervalsPerWeek = 1;
              BVValues.longRunsPerWeek = 1;
              // How many trainingpasses the week contains for the certain AC Value 
              BVValues.trainingpasses = 4;
            break;
            case "B3":
              // How many times each training need to be placed per week for the certain AC Value
              BVValues.jogsPerWeek = 2;
              BVValues.intervalsPerWeek = 1;
              BVValues.walksPerWeek = 1;
              BVValues.longRunsPerWeek = 1;
              // How many trainingpasses the week contains for the certain AC Value 
              BVValues.trainingpasses = 5;
            break;

            case "B4":  //Works
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            BVValues.longRunsPerWeek = 1;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 6;
            break;

            case "B5":  
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            BVValues.longRunsPerWeek = 1;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 6;
            break;

            case "B6":  //Works
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 2;
            BVValues.longRunsPerWeek = 1;
            // How many trainingpasses the week contains for the certain AC Value 
            BVValues.trainingpasses = 6;
            break;

//---------------------------------------------------------------------B kategori end-------------------------------------------------------------------------------//

//---------------------------------------------------------------------C kategori start-------------------------------------------------------------------------------//
        case "C1":
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2;
            BVValues.intervalsPerWeek = 1;
            BVValues.walksPerWeek = 0;
            BVValues.longRunsPerWeek = 1;
            BVValues.temposPerWeek = 1;
            // How many trainingpasses the week contains for the certain AC Value
            BVValues.trainingpasses = 5;
        break;
        case "C2":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 2;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 1;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 6;
        break;
        case "C3":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 2;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 7;
        break;
        case "C4":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 2;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 7;
        break;
        case "C5":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 2;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 7;
        break;
        case "C6":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 2;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 7;
        break;
//---------------------------------------------------------------------C kategori end-------------------------------------------------------------------------------//

//----------------------------------------------------------------------D kategori start-------------------------------------------------------------------------------//

        case "D1":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1; 
          BVValues.temposPerWeek = 1;
          BVValues.QuallityPas = 2; //used to create a trainings week with kilometers
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        case "D2":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          BVValues.QuallityPas = 2; //used to create a trainings week with kilometers
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        case "D3":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          BVValues.QuallityPas = 2; //used to create a trainings week with kilometers
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        case "D4":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          BVValues.QuallityPas = 2; //used to create a trainings week with kilometers
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        case "D5":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          BVValues.QuallityPas = 2; //used to create a trainings week with kilometers
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        case "D6":
          // How many times each training need to be placed per week for the certain AC Value
          BVValues.jogsPerWeek = 3;
          BVValues.intervalsPerWeek = 1;
          BVValues.walksPerWeek = 2;
          BVValues.longRunsPerWeek = 1;
          BVValues.temposPerWeek = 1;
          // How many trainingpasses the week contains for the certain AC Value
          BVValues.trainingpasses = 8;
        break;
        //---------------------------------------------------------------------D kategori end-------------------------------------------------------------------------------//

        //---------------------------------------------------------------------E kategori start-------------------------------------------------------------------------------//
        case "E1":
            // How many times each training need to be placed per week for the certain AC Value
            BVValues.jogsPerWeek = 2; // One double day and two nornal - then theres one rest day in a week for a walk
            BVValues.dobbeltjog = 1; // Only used as a boolean pramameter. 
            BVValues.intervalsPerWeek = 1;
            BVValues.dobbeltjogPerWeek = 1;
            BVValues.walksPerWeek = 1; //Sould have one on a interval day
            BVValues.longRunsPerWeek = 1;
            BVValues.temposPerWeek = 1;
            // How many trainingpasses the week contains for the certain AC Value
            BVValues.trainingpasses = 8;
          break;
      }
    return BVValues;
}