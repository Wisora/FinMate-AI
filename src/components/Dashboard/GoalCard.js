import React from "react";

function GoalCard({ goal }) {
  const progressPercent = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100,
  );

  return (
    <div className="goal-card" role="region" aria-label="Financial Goal">
      <h4>{goal.title}</h4>
      <p>
        <strong>Target:</strong> {goal.targetAmount}
      </p>
      <p>
        <strong>Current:</strong> {goal.currentAmount}
      </p>
      <p>
        <strong>Deadline:</strong> {goal.deadline}
      </p>
      <div className="progress-bar" aria-label="Goal progress">
        <div
          className="progress-fill"
          style={{
            width: `${progressPercent}%`,
            background: "#0078d4",
            height: "10px",
            borderRadius: "4px",
          }}
        ></div>
      </div>
      <small>Created: {goal.createdAt}</small>
    </div>
  );
}

export default GoalCard;
