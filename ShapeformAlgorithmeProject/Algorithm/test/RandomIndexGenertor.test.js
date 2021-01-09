const randomIndexGenerator = require('../helpers/RandomIndexGenerator');

test('Test RandomGeneratior with positive number', () => {
    expect(randomIndexGenerator(2,"A6")).not.toBeNull();
  });

  test('Test Random Generatior with not accepted AV value', () => {
    expect(randomIndexGenerator(2,"A7")).toBeNull();
  });

  test('Test Random Generatior with no input', () => {
    expect(randomIndexGenerator(null ," ")).toBeNull();
  });

