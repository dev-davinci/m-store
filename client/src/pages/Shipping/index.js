import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveShippingAddress } from "../../redux/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  console.log(shippingAddress);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      {/** 
      <div classNameName="shopper-info container mb-5">
        <CheckoutSteps step1 step2 />
        <div classNameName="row">
          <div classNameName="col-sm-12 clearfix ">
            <div classNameName="bill-to w-50 mx-auto">
              <p>Bill To</p>
              <div classNameName="form-one">
                <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    placeholder="Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Country *"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Zip / Postal Code *"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />

                  <button classNameName="btn btn-primary">Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
      <div className="container">
        <form className="form-horizontal" onSubmit={submitHandler}>
          <h2 className="title text-center" style={{ fontSize: "30px" }}>
            Bill to
          </h2>
          <div className="form-group ">
            <label className="control-label col-sm-2" for="address">
              Address:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                id="address"
                placeholder="Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label className="control-label col-sm-2" for="city">
              City:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                id="city"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label className="control-label col-sm-2" for="country">
              Country:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                id="country"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group ">
            <label className="control-label col-sm-2" for="postalcode">
              Zip / Postal Code:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                id="postalcode"
                placeholder="Zip / Postal Code *"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
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

export default Shipping;
