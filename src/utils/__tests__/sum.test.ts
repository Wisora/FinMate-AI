describe("Sum function", () => {
  function sum(a: number, b: number): number {
    return a + b;
  }

  it("adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
