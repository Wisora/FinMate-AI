import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from '../src/components/Navbar';

describe("Navbar Component", () => {
  test("renders Home link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
  });

  test("renders Profile link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });

  test("renders Reports link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /reports/i })).toBeInTheDocument();
  });

  test("renders Settings link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  test("renders Upgrade link", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /upgrade/i })).toBeInTheDocument();
  });
});
