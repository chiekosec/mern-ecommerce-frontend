import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-warning btn-sm mb-3" to="/admin/dashboard">
          <span>&lt; Admin Dashboard</span>
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <div className="alert alert-success">Category Added</div>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter category</p>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            className="form-control my-3"
            autoFocus
            required
            placeholder="Eg, Summer"
          />
          <button className="btn btn-outline-info" onClick={handleSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Add Category"
      description="Add T-shirt category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {categoryForm()}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
