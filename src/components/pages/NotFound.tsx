import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found-page">
      <h2>Not found</h2>
      <Link to="/" className="link-primary">
        <strong>Return home</strong>
      </Link>
    </div>
  );
}

export default NotFound;
