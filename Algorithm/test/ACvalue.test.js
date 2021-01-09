const CalculateACValue = require('../../algoritme_Values/acValue');

// Test for kategori A1-F1
test('Test AC value generation: A1', () => {
    expect(CalculateACValue(900,5)).toBe("A1");
  });

  test('Test AC value generation: B1', () => {
    expect(CalculateACValue(900,25)).toBe("B1");
  });

  test('Test AC value generation: C1', () => {
    expect(CalculateACValue(900,30)).toBe("C1");
  });

  test('Test AC value generation: D1', () => {
    expect(CalculateACValue(900,50)).toBe("D1");
  });

  test('Test AC value generation: E1', () => {
    expect(CalculateACValue(900,75)).toBe("E1");
  });

  test('Test AC value generation: F1', () => {
    expect(CalculateACValue(900,100)).toBe("F1");
  });

  // Test for kategori B2-F2
  test('Test AC value generation: A2', () => {
    expect(CalculateACValue(1000,5)).toBe("A2");
  });

  test('Test AC value generation: B2', () => {
    expect(CalculateACValue(1000,25)).toBe("B2");
  });

  test('Test AC value generation: C2', () => {
    expect(CalculateACValue(1000,30)).toBe("C2");
  });

  test('Test AC value generation: D2', () => {
    expect(CalculateACValue(1000,50)).toBe("D2");
  });

  test('Test AC value generation: E2', () => {
    expect(CalculateACValue(1000,75)).toBe("E2");
  });

  test('Test AC value generation: F2', () => {
    expect(CalculateACValue(1000,100)).toBe("F2");
  });

  // Test for kategori B3-F3
  test('Test AC value generation: A3', () => {
    expect(CalculateACValue(2200,5)).toBe("A3");
  });

  test('Test AC value generation: B3', () => {
    expect(CalculateACValue(2200,25)).toBe("B3");
  });

  test('Test AC value generation: C3', () => {
    expect(CalculateACValue(2200,30)).toBe("C3");
  });

  test('Test AC value generation: D3', () => {
    expect(CalculateACValue(2200,50)).toBe("D3");
  });

  test('Test AC value generation: E3', () => {
    expect(CalculateACValue(2200,75)).toBe("E3");
  });

  test('Test AC value generation: F3', () => {
    expect(CalculateACValue(2200,100)).toBe("F3");
  });

   // Test for kategori B4-F4
   test('Test AC value generation: A4', () => {
    expect(CalculateACValue(2500,5)).toBe("A4");
  });

  test('Test AC value generation: B4', () => {
    expect(CalculateACValue(2500,25)).toBe("B4");
  });

  test('Test AC value generation: C4', () => {
    expect(CalculateACValue(2500,30)).toBe("C4");
  });

  test('Test AC value generation: D4', () => {
    expect(CalculateACValue(2500,50)).toBe("D4");
  });

  test('Test AC value generation: E4', () => {
    expect(CalculateACValue(2500,75)).toBe("E4");
  });

  test('Test AC value generation: F4', () => {
    expect(CalculateACValue(2500,100)).toBe("F4");
  });

   // Test for kategori B5-F5
   test('Test AC value generation: A5', () => {
    expect(CalculateACValue(3200,5)).toBe("A5");
  });

  test('Test AC value generation: B5', () => {
    expect(CalculateACValue(3200,25)).toBe("B5");
  });

  test('Test AC value generation: C5', () => {
    expect(CalculateACValue(3200,30)).toBe("C5");
  });

  test('Test AC value generation: D5', () => {
    expect(CalculateACValue(3200,50)).toBe("D5");
  });

  test('Test AC value generation: E5', () => {
    expect(CalculateACValue(3200,75)).toBe("E5");
  });

  test('Test AC value generation: F5', () => {
    expect(CalculateACValue(3200,100)).toBe("F5");
  });

  // Test for kategori B6-F6
  test('Test AC value generation: A6', () => {
    expect(CalculateACValue(3800,5)).toBe("A6");
  });

  test('Test AC value generation: B6', () => {
    expect(CalculateACValue(3800,25)).toBe("B6");
  });

  test('Test AC value generation: C6', () => {
    expect(CalculateACValue(3800,30)).toBe("C6");
  });

  test('Test AC value generation: D6', () => {
    expect(CalculateACValue(3800,50)).toBe("D6");
  });

  test('Test AC value generation: E6', () => {
    expect(CalculateACValue(3800,75)).toBe("E6");
  });

  test('Test AC value generation: F6', () => {
    expect(CalculateACValue(3800,100)).toBe("F6");
  });