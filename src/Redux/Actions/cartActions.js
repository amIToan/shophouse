import { publicRequest } from "../../requestMethods";
import { CART_REMOVE_ITEM, CART_ADD_ITEM, CART_SAVE_SHIPPING_ADRESS, CART_PAYMENT } from "../Constants/CartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await publicRequest.get(`/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
//Remove

export const RemoveCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVING ADRESS
//Remove

export const savingAdress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADRESS,
    payload: data,
  });
  localStorage.setItem("shippigAdress", JSON.stringify(data));
};
export const paymentMethods = (data) => async (dispatch) => {
  dispatch({
    type: CART_PAYMENT,
    payload: data,
  });
  localStorage.setItem("PaymentMethod", JSON.stringify(data));
};


