import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import "@testing-library/jest-dom";
import Dashboard from "../src/pages/Dashboard";

describe("Dashboard Page", () => {
  test("renders Dashboard heading", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
  });

  test("renders AssistantChat component", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
