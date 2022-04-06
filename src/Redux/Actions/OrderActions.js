import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from "../Constants/OrderConstants";
import { CART_CLEAR_ITEM } from "../Constants/CartConstants";
import { userRequest } from "../../requestMethods";
/// CreateORder
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
    });
    // const {userLogin: {userInfo}} = getState()
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await userRequest.post(`/orders`, order, config);
    dispatch({ type: ORDER_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEM });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//////////////Get ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    // const {userLogin: {userInfo}} = getState()
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await userRequest.get(`/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//////////order payment
//////////////Get ORDER DETAILS
export const orderPayment = (id, paymentresults) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await userRequest.put(
      `/orders/${id}/pay`,
      paymentresults,
      config
    );
    console.log(data);
    dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAYMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//// ORDER LISTS
export const getOrderLists = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });
    const { data } = await userRequest.get(
      `/orders/`
    );
    console.log(data);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
