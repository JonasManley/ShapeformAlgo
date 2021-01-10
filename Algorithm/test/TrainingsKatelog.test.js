const trainingsKatelog = require("../helpers/trainingsKatelog");


// trainingsKatelog.interval = "Interval";
// trainingsKatelog.jog = "Jog";
// trainingsKatelog.walk = "Walk";
// trainingsKatelog.restDay = "Rest Day";
// trainingsKatelog.tempo = "Tempo";
// trainingsKatelog.longrun = "Longrun";
// trainingsKatelog.longrunSpeed = "finish Speed";
// trainingsKatelog.dobbeltJog = "DobbeltJog"
// trainingsKatelog.warmup = "Warm up"; 
// trainingsKatelog.cooldown = "Cooldown";

// //used in the interval rep creation
// trainingsKatelog.active = "Active";
// trainingsKatelog.break = "Break";



test('Test trainginsKatelog intervar', () => {
    expect(trainingsKatelog().interval).toBe("Interval");
  });

  test('Test trainginsKatelog jog', () => {
    expect(trainingsKatelog().jog).toBe("Jog");
  });
  
  test('Test trainginsKatelog walk', () => {
    expect(trainingsKatelog().walk).toBe("Walk");
  });
  
  test('Test trainginsKatelog restDay', () => {
    expect(trainingsKatelog().restDay).toBe("Rest Day");
  });
  
  test('Test trainginsKatelog tempo', () => {
    expect(trainingsKatelog().tempo).toBe("Tempo");
  });
  
  test('Test trainginsKatelog lonrun', () => {
    expect(trainingsKatelog().longrun ).toBe("Longrun");
  });
  
  test('Test trainginsKatelog longrunSpeed', () => {
    expect(trainingsKatelog().longrunSpeed).toBe("finish Speed");
  });
  
  test('Test trainginsKatelog DobbeltJog', () => {
    expect(trainingsKatelog().dobbeltJog).toBe("DobbeltJog");
  });
  
  test('Test trainginsKatelog warmup', () => {
    expect(trainingsKatelog().warmup).toBe("Warm up");
  });
  
  test('Test trainginsKatelog Cooldown', () => {
    expect(trainingsKatelog().cooldown).toBe("Cooldown");
  });
  
  test('Test trainginsKatelog Active', () => {
    expect(trainingsKatelog().active).toBe("Active");
  });
  
  test('Test trainginsKatelog Break', () => {
    expect(trainingsKatelog().break).toBe("Break");
  });