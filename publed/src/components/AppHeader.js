import React from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <div>
      <Link
        to="/about"
        className="block text-left  text-ternary-light sm:mx-4 mb-2 sm:py-2"
        aria-label="About"
      >
        About
      </Link>
    </div>
  );
};

export default AppHeader;
