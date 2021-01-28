import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "./../../redux/actions/productActions";
import Loader from "react-loader-spinner";
import Message from "./../../components/Message";

const ProductDetails = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { product, error, loading } = productDetails;

  console.log(product);
  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match]);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <div className="col-sm-12">
      <div className="product-details">
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
            <div className="col-sm-5">
              <div className="view-product">
                <img src="images/product-details/1.jpg" alt="" />
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                <img
                  src="images/product-details/new.jpg"
                  className="newarrival"
                  alt=""
                />
                <h2>{product.name}</h2>
                <p>Web ID: {product._id}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>US {product.price}</span>
                  <label>Quantity:</label>
                  <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    max={product.countInStock}
                  />
                  <button
                    type="button"
                    className="btn btn-fefault cart"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    <i className="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b>{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </p>

                <p>
                  <b>Brand:</b> {product.brand}
                </p>
                <a href="">
                  <img
                    src="images/product-details/share.png"
                    className="share img-responsive"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
