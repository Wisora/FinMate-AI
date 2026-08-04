// goalsService.js
// Handles goal management for FinMate AI

let goals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 5000,
    progress: 1500,
    deadline: "2026-12-31"
  },
  {
    id: 2,
    title: "Vacation Savings",
    target: 3000,
    progress: 1200,
    deadline: "2026-10-15"
  }
];

// Fetch all goals
export function getGoals() {
  return goals;
}

// Add a new goal
export async function addGoal(title, target, deadline) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGoal = {
        id: goals.length + 1,
        title,
        target,
        progress: 0,
        deadline
      };
      goals.push(newGoal);
      resolve(newGoal);
    }, 500); // simulate API delay
  });
}

// Update progress for a goal
export async function updateGoal(goalId, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) {
        reject(new Error("Goal not found"));
        return;
      }
      goal.progress = Math.min(goal.progress + amount, goal.target);
      resolve(goal);
    }, 500);
  });
}

// Delete a goal
export async function deleteGoal(goalId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = goals.findIndex(g => g.id === goalId);
      if (index === -1) {
        reject(new Error("Goal not found"));
        return;
      }
      const removed = goals.splice(index, 1)[0];
      resolve(removed);
    }, 500);
  });
}
