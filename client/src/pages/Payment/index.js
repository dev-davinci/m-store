import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "./../../redux/actions/cartActions";
import CheckoutSteps from "./../../components/CheckoutSteps";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      {/**<div className="shopper-info container mb-5">
        <CheckoutSteps step1 step2 step3 />
        <div className="row">
          <div className="col-sm-12 clearfix mx-auto">
            <div className="bill-to">
              <p>Payment</p>
              <div className="form-one">
                <h6>Payment Method</h6>

                <form onSubmit={submitHandler}>
                  <label for="paypal">Paypal</label>

                  <input
                    type="radio"
                    id="paypal"
                    name="paypal"
                    value="PayPal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked
                  />
                  <button className="btn btn-primary">Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  </div>*/}
      <div className="container">
        <form className="form-horizontal" onSubmit={submitHandler}>
          <p style={{ fontSize: "25px" }}> Payment Method</p>
          <div className="radio">
            <label>
              <input
                type="radio"
                id="paypal"
                name="paypal"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              />
              Paypal
            </label>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
