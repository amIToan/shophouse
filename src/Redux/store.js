import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducers";
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdatedReducer,
} from "./Reducers/userReducer";
import {
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderReducer,
} from "./Reducers/OrderReducer";
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  updatedProfile: userUpdatedReducer,
  orders: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const adressFromLocalStorage = localStorage.getItem("shippigAdress")
  ? JSON.parse(localStorage.getItem("shippigAdress"))
  : null;
const paymentFromLocalStorage = localStorage.getItem("PaymentMethod")
  ? JSON.parse(localStorage.getItem("PaymentMethod"))
  : null;
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAdress: adressFromLocalStorage,
    paymentMethod: paymentFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
