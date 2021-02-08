import React, { useEffect } from "react";
import { listProducts } from "./../../redux/actions/productActions";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import Message from "./../../components/Message";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";

const Home = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="col-sm-12 padding-right">
      <Meta />
      <Slider />
      <div className="features_items" style={{ paddingTop: "25px" }}>
        <h2 className="title text-center" style={{ fontSize: "40px" }}>
          Features Items
        </h2>
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
                    <img src={product.image} alt={product.name} />
                    <h2>${product.price}</h2>
                    <p>{product.name}</p>
                    <a href="/" className="btn btn-default add-to-cart">
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <h2>${product.price}</h2>
                      <Link
                        style={{ color: "#fff" }}
                        to={`products/${product._id}`}
                      >
                        {product.name}
                      </Link>
                      <a
                        href="/"
                        className="btn btn-default add-to-cart"
                        style={{
                          display: "block",
                          width: "50%",
                          margin: "10px auto",
                        }}
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
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </div>
    </div>
  );
};

export default Home;
