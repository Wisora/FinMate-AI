import React from "react";
import { Link } from "react-router-dom";

function PromoBanner({ message, link }) {
  return (
    <div className="promo-banner" role="region" aria-label="Promotional Banner">
      <p>{message}</p>
      {link && (
        <Link to={link} aria-label="Learn more about promotion">
          Learn More
        </Link>
      )}
    </div>
  );
}

export default PromoBanner;
