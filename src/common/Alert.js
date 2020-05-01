import React from "react";

function Alert({ text }) {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>Error :</strong> {text}
    </div>
  );
}

export default Alert;
