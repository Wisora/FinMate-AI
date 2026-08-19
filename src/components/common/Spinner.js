import React from "react";

function Spinner() {
  return (
    <div className="spinner" role="status" aria-label="Loading">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
