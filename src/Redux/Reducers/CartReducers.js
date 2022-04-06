import { CART_ADD_ITEM, CART_CLEAR_ITEM, CART_PAYMENT, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESS } from "../Constants/CartConstants";

export const cartReducer = (state = { cartItems: [], shippingAdress: {}, paymentMethod: null }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAdress: action.payload
      }
    case CART_PAYMENT:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_CLEAR_ITEM:
      return {

        ...state,
        cartItems: [],
      }
    default:
      return state;
  }
};
