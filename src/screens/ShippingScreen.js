import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { savingAdress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAdress
  } = useSelector(state => state.cart)
  let oldAdress = {}
  if (shippingAdress) {
    oldAdress = {
      address: shippingAdress.address,
      city: shippingAdress.city,
      postalCode: shippingAdress.postalCode,
      country: shippingAdress.country,
    }
  }

  const [state, setState] = useState(oldAdress)
  console.log(state)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch, shippingAdress])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savingAdress(state))
    history.push("/payment")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
        >
          <h6>DELIVERY ADDRESS</h6>
          <input type="text" placeholder="Enter address" name="address" value={state.address} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          <input type="text" placeholder="Enter city" name="city" value={state.city} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          <input type="text" placeholder="Enter postal code" name="postalCode" value={state.postalCode} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          <input type="text" placeholder="Enter country" name="country" value={state.country} onChange={(e) => setState({ ...state, [e.target.name]: e.target.value })} />
          <button type="submit" className="text-white" onClick={submitHandler}>
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
