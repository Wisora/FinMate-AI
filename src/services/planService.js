// Plan gating — Free vs Pro rules shared across the app.
// The plan itself is persisted in settingsService (localStorage key "plan").

export const FREE_MAX_GOALS = 3;

export function isProPlan(plan) {
  return plan === "pro";
}

// A Free user may only create up to FREE_MAX_GOALS goals.
export function canAddGoal(plan, currentCount) {
  return isProPlan(plan) || Number(currentCount) < FREE_MAX_GOALS;
}

// Number of goals a Free user may *see* (limit visibility too).
export function visibleGoals(plan, goals) {
  return isProPlan(plan) || !Array.isArray(goals)
    ? goals
    : goals.slice(0, FREE_MAX_GOALS);
}
