import { render, screen } from "@testing-library/react";
import React from "react";

function Hello() {
  return <h1>Hello FinMate AI!</h1>;
}

test("renders hello message", () => {
  render(<Hello />);
  expect(screen.getByText("Hello FinMate AI!")).toBeInTheDocument();
});
