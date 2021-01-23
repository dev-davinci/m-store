import React from "react";

const UpperNavbar = () => {
  return (
    <div className="header_top">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="contactinfo">
              <ul className="nav nav-pills">
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-phone"></i> +20 01158328724
                  </a>
                </li>
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-envelope"></i>{" "}
                    dev.muhammad222000@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="social-icons pull-right">
              <ul className="nav navbar-nav">
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript(0);">
                    <i className="fa fa-google-plus"></i>
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

export default UpperNavbar;
