import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "./../../redux/actions/userActions";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h2 className="title text-center" style={{ fontSize: "30px" }}>
        Users
      </h2>
      <div className="container">
        <div className="row">
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
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Admin</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fa fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i className="fa fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
