import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didiRedirect: false,
  });

  const { email, password, error, loading, didiRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (event) => {
    setValues({
      ...values,
      error: false,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didiRedirect: true,
            });
          });
        }
      })
      .catch((e) => console.log("sigin failed"));
  };

  const performRedirect = () => {
    if (didiRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading ...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  function SigninForm() {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label htmlFor="" className="col-sm-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="col-sm-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-success btn-block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Base title="Signin Page" description="Page to signin">
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
}

export default Signin;
