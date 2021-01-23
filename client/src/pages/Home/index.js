import React, { useEffect } from "react";
import { listProducts } from "./../../redux/actions/productActions";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../../components/Message";

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.listProducts);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="col-sm-12 padding-right">
      <div className="features_items" style={{ paddingTop: "25px" }}>
        <h2 className="title text-center">Features Items</h2>
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
          products.map((product) => (
            <div key={product._id} className="col-sm-4">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src={product.Image} alt="" />
                    <h2>{product.price}</h2>
                    <p>{product.name}n</p>
                    <a
                      href="javascript(0)"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>{product.price}</h2>
                      <p>{product.name}</p>
                      <a
                        href="javascript(0)"
                        className="btn btn-default add-to-cart"
                      >
                        <i className="fa fa-shopping-cart"></i>Add to cart
                      </a>
                    </div>
                  </div>
                </div>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li>
                      <a href="javascript(0)">
                        <i className="fa fa-plus-square"></i>Add to wishlist
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
