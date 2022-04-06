import React from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart, RemoveCart } from "../Redux/Actions/cartActions";
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => { };
  }, [dispatch, productId, qty]);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.userLogin);
  // const total = 1;
  const TotalMoney = cartItem.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const checkOutHandler = () => {
    if (userInfo) {
      history.push("/shipping");
    } else {
      history.push("/login");
    }

  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItem.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItem.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItem.map((item) => (
              <div className="cart-iterm row" key={item.product}>
                <div
                  className="remove-button d-flex justify-content-center align-items-center"
                  onClick={() => dispatch(RemoveCart(item.product))}
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map(
                      // first: Array(10) return an object from 1-> 10. Then I will use map.
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Price</h6>
                  <h4>{item.price}</h4>
                </div>
              </div>
            ))}
          </>
        )}
        {/* End of cart items */}
        <div className="total">
          <span className="sub">Total:</span>
          <span className="total-price">{TotalMoney}</span>
        </div>
        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Continue To Shopping</button>
          </Link>
          {TotalMoney > 0 && (
            <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
              <button onClick={checkOutHandler}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartScreen;
