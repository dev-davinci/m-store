import React from "react";

const BottomFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <p className="pull-left">
            Copyright © 2021 M Store. All rights reserved.
          </p>
          <p className="pull-right">
            Developed By{" "}
            <span>
              <a target="_blank" href="http://www.themeum.com">
                Muhammad Gamal
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
