import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
