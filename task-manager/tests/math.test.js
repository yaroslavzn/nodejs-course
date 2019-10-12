const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit
} = require("../src/math");

test("Should calculate tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate tip (with default tip value)", () => {
  const total = calculateTip(10);
  expect(total).toBe(15);
});

test("Should convert 32 F to 0 C", () => {
  const total = fahrenheitToCelsius(32);

  expect(total).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const total = celsiusToFahrenheit(0);

  expect(total).toBe(32);
});
