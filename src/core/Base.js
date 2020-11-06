import React from "react";
import Menu from "../core/menu";

export default function Base({
  title = "My title",
  description = "my desciption",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div className="d-flex flex-column h-100">
      <Menu></Menu>
      <div className="container-fluid flex-shrink-0">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <div className="p-3"></div>
      <footer className="footer mt-auto py-3">
        <div className="container text-white text-center">
          <h5>Any questions? Feel free to reach out</h5>
          <button className="btn btn-md btn-warning">Contact us</button>
        </div>
      </footer>
    </div>
  );
}
