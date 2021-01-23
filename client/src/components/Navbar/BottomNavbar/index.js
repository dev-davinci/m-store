import React from "react";

const BottomNavbar = () => {
  return (
    <div className="header-bottom">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="logo pull-left">
              <a href="index.html">
                <img src="images/home/logo.png" alt="" />
              </a>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="mainmenu pull-right">
              <ul
                className="nav navbar-nav collapse navbar-collapse"
                style={{ marginTop: "15px" }}
              >
                <li>
                  <a href="javascript(0)">
                    <i
                      className="fa fa-user"
                      style={{ paddingLeft: "15px" }}
                    ></i>{" "}
                    Account
                  </a>
                </li>
                <li>
                  <a href="javascript(0)">
                    <i className="fa fa-star"></i> Wishlist
                  </a>
                </li>
                <li>
                  <a href="checkout.html">
                    <i className="fa fa-crosshairs"></i> Checkout
                  </a>
                </li>
                <li>
                  <a href="cart.html">
                    <i className="fa fa-shopping-cart"></i> Cart
                  </a>
                </li>
                <li>
                  <a href="login.html">
                    <i className="fa fa-lock"></i> Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
