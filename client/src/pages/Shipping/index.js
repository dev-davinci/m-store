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
      <div className="shopper-info container mb-5">
        <CheckoutSteps step1 step2 />
        <div className="row">
          <div className="col-sm-5 clearfix">
            <div className="bill-to">
              <p>Bill To</p>
              <div className="form-one">
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

                  <button className="btn btn-primary">Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
