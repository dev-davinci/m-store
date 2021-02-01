import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const Cart = ({ match, history, location }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <section id="cart_items">
      <div class="container">
        <h2 className="title text-center" style={{ fontSize: "40px" }}>
          Your cart
        </h2>
        {cartItems.length === 0 ? (
          <Message variant="aler alert-danger">
            <h4
              style={{
                padding: "20px 15px",
                borderRadius: "50px",
                margin: "50px 0",
              }}
            >
              Your cart is empty. <Link to="/">Go Back?</Link>
            </h4>
          </Message>
        ) : (
          <>
            <div class="table-responsive cart_info">
              <table class="table table-condensed">
                <thead>
                  <tr class="cart_menu">
                    <td class="image">Item</td>
                    <td class="description"></td>
                    <td class="price">Price</td>
                    <td class="quantity">Quantity</td>
                    <td class="total">Total</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product}>
                      <td class="cart_product">
                        <a href="">
                          <img
                            src={item.image}
                            alt={item.alt}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </a>
                      </td>
                      <td class="cart_description">
                        <h4>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </h4>
                        <p>Web ID: {item._id}</p>
                      </td>
                      <td class="cart_price">
                        <p>${item.price}</p>
                      </td>
                      <td class="cart_quantity">
                        <select
                          style={{ width: "50%" }}
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td class="cart_total">
                        <p class="cart_total_price">${item.price * item.qty}</p>
                      </td>
                      <td class="cart_delete">
                        <a
                          class="cart_quantity_delete"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i class="fa fa-times"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="col-sm-12" style={{ padding: "0" }}>
              <div class="total_area">
                <ul style={{ padding: "0" }}>
                  <li>
                    Cart Sub Total{" "}
                    <span>
                      {" "}
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                  </li>
                </ul>

                <a
                  class="btn btn-default check_out"
                  style={{ margin: "20px 0" }}
                  onClick={checkoutHandler}
                >
                  Check Out
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
