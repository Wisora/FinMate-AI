import React from "react";

function RecommendationCard({ recommendation }) {
  return (
    <div
      className="recommendation-card"
      role="region"
      aria-label="AI Recommendation"
    >
      <h4>{recommendation.title}</h4>
      <p>{recommendation.message}</p>
      <small>{recommendation.date}</small>
    </div>
  );
}

export default RecommendationCard;
