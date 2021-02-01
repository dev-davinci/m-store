import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import {
  getUserDetails,
  updateUserProfile,
} from "./../../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "./../../redux/consts/userConsts";
import Message from "../../components/Message";
import { listMyOrders } from "../../redux/actions/orderActions";
import { Table, Button, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserProfile = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <section id="form" style={{ backgroundColor: "#f4f4f4", margin: "40px 0" }}>
      <div className="container">
        <div className="row">
          {message && <Message variant="alert alert-danger">{message}</Message>}
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
            <>
              <div
                className="col-sm-6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "500px",
                }}
              >
                <div
                  className="login-form"
                  style={{ height: "50%", width: "80%" }}
                >
                  <h2>Update your information</h2>
                  <form onSubmit={submitHandler}>
                    <input
                      type="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
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

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    <button type="submit" className="btn btn-default">
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-6">
                <h2>My Orders</h2>
                {loadingOrders ? (
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                ) : errorOrders ? (
                  <Message variant="danger">{errorOrders}</Message>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className="btn-sm" variant="light">
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </>
          )}{" "}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
