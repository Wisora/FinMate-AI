import { GoalCard } from '../src/components/Dashboard/GoalCard';
import { ReportCard } from '../src/components/Dashboard/ReportCard';
import { RecommendationCard } from '../src/components/Dashboard/RecommendationCard';
import { AssistantChat } from '../src/components/Dashboard/AssistantChat';

describe("Dashboard Components", () => {
  test("renders GoalCard with goal title", () => {
    const goal = { title: "Save Money", targetAmount: 1000, currentAmount: 200 };
    render(<GoalCard goal={goal} />);
    expect(screen.getByText(/save money/i)).toBeInTheDocument();
  });

  test("renders ReportCard with report type", () => {
    const report = { id: 1, type: "Weekly Report", date: "2026-08-22", income: 500, expenses: 300, savings: 200 };
    render(<ReportCard report={report} />);
    expect(screen.getByText(/weekly report/i)).toBeInTheDocument();
  });

  test("renders RecommendationCard with recommendation text", () => {
    const recommendation = { id: 1, text: "Cut down on dining out" };
    render(<RecommendationCard recommendation={recommendation} />);
    expect(screen.getByText(/cut down on dining out/i)).toBeInTheDocument();
  });

  test("renders AssistantChat with input box", () => {
    render(<AssistantChat />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
