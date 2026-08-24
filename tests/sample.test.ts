/**
 * @jest-environment node
 */
describe("Sample math test", () => {
  it("adds numbers correctly", () => {
    const sum = 2 + 3;
    expect(sum).toBe(5);
  });
});
