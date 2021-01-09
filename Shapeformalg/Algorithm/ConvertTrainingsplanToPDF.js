const rep = require('./models/rep');
const trainingsKatelog = require('./helpers/trainingsKatelog');
const PDFMerger = require('pdf-merger-js'); 
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const { text } = require('body-parser');
/// <summary>
///   The PDF Converter
///   This is the logik that visualize the the training program by creating a PDF
/// </summary>
///
/// <param name="TrainingsPlan">A trainingsplan in JSON format</param>

module.exports = function RunningCalenderGenerator(TrainingsPlan) { 
// Define font files
  var fonts = {
        Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    };

  // Creation of used Instances
  var printer = new PdfPrinter(fonts);
  var dayNames = [];
  var dailyProgram = [];
  var dayHeader = [];
  var weeklyProgram = [];
  var trainingsKatelogSchema = trainingsKatelog();
  var weekCounter = 1;

    // Function which is populating each day with data
    function PopulateBody(day){
        var intervalItensity;
        var intervalDistance;
        var pauseItensity;
        var pauseDistance;
        var intervalAllreadySettet = false; // value to check interval is allready created
        var pauseDataHasBeenPulled = false;
        reps = []; // resetting the reps list before going into the foreach
        var reps = [[{text: "Description", style: 'descriptionText', margin: [10, 10, 10, 4]}, {text:[{text: "Length"}, {text: "\n(meter)", style: 'descriptionVariables'}], margin: [10, 10, 10, 4], style: 'descriptionText'}, {text:[{text: "Pace"}, {text: "\n(min/km)", style: 'descriptionVariables'}], margin: [10, 10, 10, 4], style: 'descriptionText'}]]; // Setting a default header to the reps table

        // Going through each rep and pull the data that needs to be visualized
        if(day.trainingPas.name == trainingsKatelogSchema.dobbeltJog){
            reps.push(
                [{
                    table: {
                        widths: ['128%','128%','55.5%'],
                        body: [
                            [{text: "Morning", style: 'descriptionText', fillColor: '#a3d2ca', border: [false, false, false, false], colSpan: 3},'',''],
                            [{text: trainingsKatelogSchema.jog, style: 'descriptionText', margin: [0, 10, 0, 10]}, {text: RoundingDistance(day.trainingPas.concreteTraining[0].distance), fillColor: '#FFFFFF', style: 'textForDay'}, {text: RoundingItensity(day.trainingPas.concreteTraining[0].itensity), fillColor: '#FFFFFF', style: 'textForDay'}],
                            [{text: " ", fillColor: '#EFEFEF', margin: [10, 28, 10, 4], border: [false, false, false, false], colSpan: 3},'',''],
                            [{text: "Afternoon", style: 'descriptionText', fillColor: '#a3d2ca', border: [false, true, false, false], colSpan: 3},'',''],
                            [{text: trainingsKatelogSchema.jog, style: 'descriptionText', margin: [0, 10, 0, 10]}, {text: RoundingDistance(day.trainingPas.concreteTraining[1].distance), fillColor: '#FFFFFF', style: 'textForDay'}, {text: RoundingItensity(day.trainingPas.concreteTraining[1].itensity), fillColor: '#FFFFFF', style: 'textForDay'}],
                        ]
                    },border: [false, false, false, false] 
                }, {text:' ', border: [false, false, false, false]},{text:' ', border: [false, false, false, false]},]
            );
            // Create a trainingpas foreach trainingtype
        } else {
            day.trainingPas.concreteTraining.forEach(rep => {
                if(day.trainingType == trainingsKatelogSchema.interval && (rep.name == trainingsKatelogSchema.active || rep.name == trainingsKatelogSchema.break || rep.name == "repCount")){
                    if(rep.name == trainingsKatelogSchema.active)
                    {
                        intervalItensity = rep.itensity;
                        intervalDistance = rep.distance;
                    } else if (rep.name == trainingsKatelogSchema.break)
                    {
                        pauseItensity = rep.itensity;
                        pauseDistance = rep.distance;
                        pauseDataHasBeenPulled = true;
                    }
                    
                    if(intervalAllreadySettet == false && pauseDataHasBeenPulled == true && rep.name == "repCount"){
                        CreateIntervalRep(rep.distance);
                        intervalAllreadySettet = true;
                    }
    
                } else if (rep.name == trainingsKatelogSchema.warmup || rep.name == trainingsKatelogSchema.cooldown && !rep.distance == 0 || rep.name == trainingsKatelogSchema.jog || rep.name == trainingsKatelogSchema.longrun || rep.name == trainingsKatelogSchema.tempo || rep.name == trainingsKatelogSchema.longrunSpeed && !rep.distance == 0) {
                    reps.push(
                        [{text: rep.name, style: 'descriptionText', margin: [0, 10, 0, 10]}, {text: RoundingDistance(rep.distance), fillColor: '#FFFFFF', style: 'textForDay'}, {text: RoundingItensity(rep.itensity), fillColor: '#FFFFFF', style: 'textForDay'}]
                    ) 
                } else if (rep.name == trainingsKatelogSchema.walk){
                    reps.push(
                    [{text: rep.name, style: 'descriptionText', margin: [0, 10, 0, 10]}, {text: RoundingDistance(rep.distance), fillColor: '#FFFFFF', style: 'textForDay'}, {text: rep.itensity, fillColor: '#FFFFFF', style: 'textForDay'}]
                    )
                }  else {
    
                }
            });
        }

        function CreateIntervalRep(repCount){
            if(day.trainingType == trainingsKatelogSchema.interval) {
                reps.push(
                    [{
                        table: {
                            widths: ['132%','0%','148.5%','65.5%'],
                            body: [
                                [{text: day.trainingType, style: 'descriptionText', fillColor: '#a3d2ca', border: [false, false, false, false], colSpan: 4},'','',''],
                                [{text: repCount,  style: 'descriptionTextForInterval', margin: [10, 22, 0, 25], rowSpan: 2, border: [true, true, false, true]},{image: 'images/repeat.png', fit: [48,48], relativePosition: {x: -41, y: 8}, rowSpan: 2, border: [false, true, false, true], style: 'descriptionTextForInterval'},{text: RoundingDistance(intervalDistance), fillColor: '#FFFFFF',  style: 'textForDay'},{text: RoundingItensity(intervalItensity), fillColor: '#FFFFFF', style: 'textForDay'}],
                                ['','',{text: RoundingDistance(pauseDistance), fillColor: '#FFFFFF',  style: 'textForDay'},{text: RoundingItensity(pauseItensity), fillColor: '#FFFFFF', style: 'textForDay'}]
                            ]
                        },border: [false, false, false, false] 
                    }, {text:' ', border: [false, false, false, false]},{text:' ', border: [false, false, false, false]},]
                );
            }
        }
        // Check if its a Rest day then we dont want a table to be created
        if(day.trainingType == trainingsKatelogSchema.restDay) {
            var repsTable = {}
        } else {
            var repsTable = { 
                style: 'tableForDays',
                table: {
                    widths: ['40%', '40%','20%'],
                    body: 
                        reps
                },
                layout: {
                    //// remove all margins in all tables
                    //defaultBorder: false,
                        // hLineWidth: function(i, node) {
                        //   return (i === 0 || i === node.table.body.length) ? 0 : 1;
                        // },
                        // vLineWidth: function(i, node) {
                        //     return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                        //   },
                    paddingLeft: function(i, node) { return -1; },
                    paddingRight: function(i, node) { return -1; },
                    paddingTop: function(i, node) { return -1; },
                    paddingBottom: function(i, node) { return -1; }
                },
                unbreakable: true,
            }
        }
        return repsTable;
    }

    function CreateHeaderOfDay(day){
        var header = {};
        if(day.trainingType == trainingsKatelogSchema.interval){
            header = {text: day.trainingType, fillColor: '#5eaaa8', style: 'dayTrainingType'};
        } else if (day.trainingType == trainingsKatelogSchema.jog || day.trainingType == trainingsKatelogSchema.dobbeltJog || day.trainingType == trainingsKatelogSchema.longrun || day.trainingType == trainingsKatelogSchema.tempo) {
            header = {text: day.trainingType, fillColor: '#5eaaa8', style: 'dayTrainingType'};
        } else {
            header = {text: day.trainingType, fillColor: '#5eaaa8', style: 'dayTrainingType'};
        }
        return header;
    }

    function CreateDateDescription(day){
        var colorToFill = '';
        var dailyIcon = {};

        if(day.trainingType == trainingsKatelogSchema.interval || day.trainingType == trainingsKatelogSchema.tempo){
            var dailyIcon = {image: 'images/intervals.png', width: 25, height: 25, style: 'iconStyle'};
            colorToFill = '#056676'
        } else if (day.trainingType == trainingsKatelogSchema.jog || day.trainingType == trainingsKatelogSchema.dobbeltJog || day.trainingType == trainingsKatelogSchema.longrun) {
            var dailyIcon = {image: 'images/run.png', width: 25, height: 25, style: 'iconStyle'};  
            colorToFill = '#056676'
        } else if (day.trainingType == trainingsKatelogSchema.walk) {
            var dailyIcon = {image: 'images/walk.png', width: 25, height: 25, style: 'iconStyle'};  
            colorToFill = '#056676'
        } else {
            colorToFill = '#056676'
            var dailyIcon = {image: 'images/off.png', width: 25, height: 25, style: 'iconStyle'};
        }

        var dateDescription = {/*day.nameOfDay + " " + */text: day.date.toDateString(), style: 'dayTitle', fillColor: colorToFill, color: '#FFFFFF'};
        var packages = [[dateDescription, dailyIcon]];
        var test = {   
            table: {
                heights: [25, 25],
                widths: ['85%', '*'],
                body: 
                    packages
            },
        };
    return test;
    }
    // This function has the responsebility to create the weeks and holds then as a element in a array
    function BuildBody(TrainingsPlan){
        TrainingsPlan.forEach(TrainingWeek => { 
            
            
            TrainingWeek.forEach(day => {

                // For each day push a element to weeklyprogram
                dayNames.push(
                    [CreateDateDescription(day)],
                );
                dayHeader.push(CreateHeaderOfDay(day))
                dailyProgram.push([
                    PopulateBody(day)
                    ],
                );    
            });
            // For each week create a new table
            weeklyProgram.push(
                {
                    text: 'WEEK ' + weekCounter,      //Should be a weekCounter.
                    style: 'header'

                },
                {
                    style: 'tableExample',
                    table: { 
                        // width specified for every table of a day | 7 days in a week.
                        widths: ['14.2857142857%', '14.2857142857%','14.2857142857%', '14.2857142857%', '14.2857142857%', '14.2857142857%', '14.2857142857%',],
                        //widths: [225, 225, 225, 225, 225, 225, 225],
                        body: [
                            dayNames,
                            dayHeader,
                            dailyProgram
                        ]
                    },
                    layout: {
                        //// remove all margins in all tables
                        //defaultBorder: false,
                            // hLineWidth: function(i, node) {
                            //   return (i === 0 || i === node.table.body.length) ? 0 : 1;
                            // },
                            // vLineWidth: function(i, node) {
                            //     return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                            //   },
                            hLineWidth: function (i, node) {
                                return (i === 0 ) ? 0 : 1;
                            },
                            vLineWidth: function(i, node) {
                                return (i === 0 ) ? 1 : 1;
                            },
                        paddingLeft: function(i, node) { return -1; },
                        paddingRight: function(i, node) { return -1; },
                        paddingTop: function(i, node) { return -1; },
                        paddingBottom: function(i, node) { return -1; }
                    },
                    unbreakable: true
                },
            );
            dayHeader = [];   
            dailyProgram = [];
            dayNames = [];
            weekCounter = weekCounter + 1;
        });      
    var formatted = weeklyProgram;
    return formatted;
    }

    // Correcting the distance to a more readable and user friendly number.
    function RoundingItensity(dataToAdjust){
        if(dataToAdjust.indexOf(':') > -1){
            var min = dataToAdjust.split(":")[0];
            var seconds = dataToAdjust.split(":")[1];
            if(seconds > 56){
                min = parseInt(min) + 1;
                seconds = "00"
            } else if (seconds < 10) { 
                if(seconds > 2.5 && seconds < 7.5){
                    seconds = "05";
                } else if (seconds < 2.5){
                    seconds = "00";
                } else if (seconds > 7.5){
                    seconds = "10";
                }
            } else {
                seconds = Math.round(seconds/5)*5;
            }
            return `${min + ":" + seconds}`;
        } else {
            return dataToAdjust;
        }
        
    }

    // Correcting the distance to a more readable and user friendly number.
    function RoundingDistance(dataToAdjust){
        return Math.round((dataToAdjust * 1000)/100)*100; // this adjust to the nearest 100 can be changed to whatever.
    }
  
    var docDefinition = {
        content: [
            BuildBody(TrainingsPlan)
        ],
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
        pageSize: 'A2',
        background: function () {
            return {
                canvas: [
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 1700, h: 1190.5,
                        color: '#e8ded2'
                    }
                ]
            };
        },
        styles: {
            header: {
                fontSize: 25,
                bold: true,
                margin: [10, 0, 0, 10],
            },
            textForDay: {
                fontSize: 8,
                margin: [0, 10, 0, 10],
                alignment: "center"
            },
            dayTitle: {
                fontSize: 12,
                bolditalics: true,
                bold: true,
                margin: [0, 4, 0, 4],
                alignment: "center"
            },
            dayTrainingType: {
                fontSize: 10,
                bolditalics: true,
                bold: true,
                margin: [0, 4, 0, 4],
                alignment: "center",
                color: '#FFFFFF'
            },
            descriptionText: {
                fontSize: 8,
                bold: true,
                alignment: "center",
                fillColor: '#a3d2ca'
            },
            descriptionVariables: {
                fontSize: 6,
                alignment: "center",
                color: '#002266'
            },
            descriptionTextForInterval: {
                fontSize: 18,
                bold: true,
                alignment: "center",
                fillColor: '#a3d2ca'
            },
            tableExample: {
                fontSize: 8,
                fillColor: '#EFEFEF',
                // margin: [left, top, right, bottom]
                margin: [0, 0, 0, 25]
            },
            tableForDays: {
                fontSize: 8,
                fillColor: 'blue',
                margin: [0, 0, 0, 0]
                //fillOpacity: 0.3
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            iconStyle: {
                alignment: 'center', 
                fillColor: '#056676'
            }
        },
        defaultStyle: {
            alignment: 'justify'
        }
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document1.pdf'));
    pdfDoc.end();
    var merger = new PDFMerger();
    (async () => {
    
        await new Promise(resolve => setTimeout(resolve, 1000));

        merger.add('intro.pdf');  //merge all pages. parameter is the path to file and filename.
        merger.add('document1.pdf');
        // merger.add('pdf2.pdf', [2]); // merge only page 2
        // merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
        // merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
        // merger.add('pdf3.pdf', '1 to 2'); //merge pages 1 to 2
        // merger.add('pdf3.pdf', '3-4'); //merge pages 3 to 4
        
        merger.save('merged.pdf'); //save under given name

        // Deletes Document1 agian
        try {
            fs.unlinkSync('./document1.pdf')
            //file removed
        } catch(err) {
            console.error(err)
        }
    })();
}
