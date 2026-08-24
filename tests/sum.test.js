/**
 * @jest-environment jsdom
 */
describe("Sum function", () => {
  function sum(a, b) {
    return a + b;
  }

  it("adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
