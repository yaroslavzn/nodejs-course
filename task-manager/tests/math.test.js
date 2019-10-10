const { calculateTip } = require("../src/math");

test("Should calculate tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate tip (with default tip value)", () => {
  const total = calculateTip(10);
  expect(total).toBe(15);
});
