import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../actions/AuthActions";
import { AuthContext } from "../../Context/AuthContext";
import Header from "./Header";
import Loader from "../../common/loader";
import Alert from "../../common/Alert";

export default function RegistrationForm(props) {
  const { userData, dispatch } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    auth(state.email, state.password, isSignUp, dispatch);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  if (userData.loading) {
    return <Loader />;
  }
  let errorMessage = null;
  if (userData.error) {
    errorMessage = <Alert text={userData.error.message} />;
  }

  return (
    <>
      {userData.token !== null && <Redirect to="/tasks" />}
      <Header title="Authentication" />

      <div className="container d-flex align-items-center flex-column">
        {errorMessage}
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <form>
            <div className="form-group text-left">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={state.email}
                onChange={handleChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
          </form>
          <button
            onClick={handleSubmitClick}
            type="submit"
            className="btn btn-primary"
          >
            {isSignUp ? "REGISTER" : "LOG IN"}
          </button>
          <button
            className="btn btn-link btn-lg"
            onClick={switchAuthModeHandler}
          >
            SWITCH TO {isSignUp ? "LOGIN" : "REGISTER"}
          </button>
        </div>
      </div>
    </>
  );
}
