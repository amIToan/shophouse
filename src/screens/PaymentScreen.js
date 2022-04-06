import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethods, savingAdress } from "../Redux/Actions/cartActions";
const PaymentScreen = ({ history }) => {
  let { shippingAdress, paymentMethod
  } = useSelector(state => state.cart)
  if (paymentMethod) {
    paymentMethod = paymentMethod
  } else {
    paymentMethod = "PayPal"
  }
  const [payment, setPayment] = useState(paymentMethod)
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentMethods(payment))
    history.push("/placeorder")
  };
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!shippingAdress) {
      history.push("shipping")
    }
  }
    , [dispatch])
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input className="form-check-input" type="radio" value={payment} onChange={e => setPayment(e.target.value)} />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>

          <button type="submit">
            <Link to="/placeorder" className="text-white">
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
