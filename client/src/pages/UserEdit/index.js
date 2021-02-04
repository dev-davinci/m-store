import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";
import { getUserDetails, updateUser } from "./../../redux/actions/userActions";
import { USER_UPDATE_RESET } from "./../../redux/consts/userConsts";

const UserEdit = ({ history, match }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
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
              <h2>Edit User</h2>
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
                  type="checkbox"
                  id="admin"
                  name="admin"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label for="admin">admin</label>

                <button type="submit" className="btn btn-default">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserEdit;
