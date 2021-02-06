import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "./../../redux/actions/productActions";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { PRODUCT_CREATE_RESET } from "../../redux/consts/productConsts";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.listProducts);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(""));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <h2 className="title text-center" style={{ fontSize: "30px" }}>
        Users
      </h2>

      <div className="container">
        <div className="row">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
          {loadingDelete && (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          )}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          )}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-primary">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-primary"
                        onClick={() => deleteHandler(product._id)}
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

export default ProductList;
