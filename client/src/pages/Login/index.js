import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";

import { loginUser } from "./../../redux/actions/userActions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <h1>Login</h1>
          {loading ? (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          ) : error ? (
            <Message variant="alert alert-danger">{error}</Message>
          ) : (
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={submitHandler}>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <button type="submit" className="btn btn-default">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default Login;
