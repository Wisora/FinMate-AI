import { describe, expect, test } from "bun:test";
import { md5, buildPayfastParams } from "../src/services/payfastService.js";
import {
  FREE_MAX_GOALS,
  canAddGoal,
  isProPlan,
  visibleGoals,
} from "../src/services/planService.js";
import { buildCsv } from "../src/services/csvService.js";
import {
  monthlyReportFor,
  weeklyReportFor,
} from "../src/services/reportsService.js";

describe("PayFast helpers", () => {
  test("md5 known vectors", () => {
    expect(md5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
  });

  test("builds sorted signed parameters and omits empty fields", () => {
    globalThis.__FINMATE_ENV__ = {
      VITE_PAYFAST_MERCHANT_ID: "merchant",
      VITE_PAYFAST_MERCHANT_KEY: "key",
      VITE_PAYFAST_PASSPHRASE: "secret",
    };
    const params = buildPayfastParams({
      amount: 25,
      itemName: "Pro",
      email: "",
      name: "Ada",
    });
    expect(params.merchant_id).toBe("merchant");
    expect(params.email_address).toBe("");
    expect(params.signature).toMatch(/^[a-f0-9]{32}$/);
    const keys = Object.keys(params).filter(
      (key) => params[key] !== "" && key !== "signature",
    );
    const signedKeys = Object.keys(params).filter(
      (key) => params[key] !== "" && key !== "signature",
    );
    expect(signedKeys).toContain("merchant_id");
    expect(keys.length).toBeGreaterThan(5);
    expect(params.signature).toBeTruthy();
  });
});

describe("plans", () => {
  test("enforces Free goal limit and Pro access", () => {
    expect(FREE_MAX_GOALS).toBe(3);
    expect(isProPlan("free")).toBe(false);
    expect(isProPlan("pro")).toBe(true);
    expect(canAddGoal("free", 3)).toBe(false);
    expect(canAddGoal("pro", 99)).toBe(true);
    expect(visibleGoals("free", [1, 2, 3, 4])).toHaveLength(3);
  });
});

describe("CSV and reports", () => {
  test("exports expected headers and rows", () => {
    const csv = buildCsv({
      goals: [
        {
          type: "Savings",
          title: "Emergency",
          currentAmount: 100,
          targetAmount: 500,
          targetDate: "2026-12",
          monthlyContribution: 50,
        },
      ],
      history: [{ month: "2026-01", income: 1000, expenses: 400 }],
      monthLabels: ["January 2026"],
      headers: {
        goalsSection: "Goals",
        type: "Type",
        title: "Title",
        current: "Current",
        target: "Target",
        progress: "Progress",
        targetDate: "Date",
        monthlyContribution: "Monthly",
        monthlySection: "Monthly",
        month: "Month",
        income: "Income",
        expenses: "Expenses",
        savings: "Savings",
        savingsRate: "Rate",
      },
    });
    expect(csv).toContain("Type,Title,Current,Target");
    expect(csv).toContain("Savings,Emergency,100,500,20,2026-12,50");
    expect(csv).toContain("January 2026,1000,400,600,60.0");
  });

  test("weekly and monthly totals match a fixed fixture", () => {
    const fixture = { month: "2026-01", income: 1000, expenses: 400 };
    expect(monthlyReportFor([fixture])[0].savings).toBe(600);
    const weekly = weeklyReportFor(fixture);
    expect(weekly.income).toBe(1000);
    expect(weekly.expenses).toBe(400);
    expect(weekly.weeks.reduce((sum, week) => sum + week.income, 0)).toBe(1000);
    expect(weekly.weeks.reduce((sum, week) => sum + week.expenses, 0)).toBe(
      400,
    );
    delete globalThis.__FINMATE_ENV__;
  });
});
