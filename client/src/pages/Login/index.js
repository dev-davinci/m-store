import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";

import { loginUser } from "./../../redux/actions/userActions";
import image from "./images/shipping.jpg";

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
    <section id="form" style={{ backgroundColor: "#f4f4f4", margin: "40px 0" }}>
      <div className="container">
        <div className="row">
          <div
            className="col-sm-6"
            style={{
              display: "flex",
              alignItems: "center",
              height: "500px",
            }}
          >
            <div className="login-form" style={{ height: "50%", width: "80%" }}>
              <h2>Login to your account</h2>
              {error && <Message variant="alert alert-danger">{error}</Message>}
              {loading && (
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              )}
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
          <div className="col-sm-6">
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "500px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
