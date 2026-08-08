// Accessible loading spinner (pure CSS animation). Use during simulated async.

export function Spinner({ label = "Loading", size = 18, className = "" }) {
  return (
    <span
      className={`spinner ${className}`}
      role="status"
      style={{ width: size, height: size }}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
