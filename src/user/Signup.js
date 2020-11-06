import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Base from "../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = event => {
    setValues({ ...values, error: false, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                name="name"
                className="form-control"
                onChange={handleChange}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                name="email"
                className="form-control"
                onChange={handleChange}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                name="password"
                onChange={handleChange}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
      return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                    New account created successfully. Please <Link to="/signin">Login here</Link>
                </div>
            </div>
        </div>
      )
  }

  const errorMessage = () => {
    return (
      <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                  {error}
              </div>
          </div>
      </div>
    )
}

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {SignUpForm()}
    </Base>
  );
};

export default Signup;