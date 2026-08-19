import React from "react";

function Toast({ message, onClose }) {
  return (
    <div className="toast" role="alert" aria-live="assertive">
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          marginLeft: "10px",
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
}

export default Toast;
