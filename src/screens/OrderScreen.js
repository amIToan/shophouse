import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, orderPayment } from "../Redux/Actions/OrderActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import moment from "moment";
import { publicRequest } from "../requestMethods";
import { ORDER_PAYMENT_RESET } from "../Redux/Constants/OrderConstants";
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPayment, success: successPayment } = orderPay;
  console.log(loadingPayment, successPayment);
  const [sdkReady, setSdkReady] = useState(false);
  const { orderItems, loading, error } = orderDetails;
  useEffect(() => {
    window.scrollTo(0, 0);
    const addPayPalScript = async () => {
      const { data: clientId } = await publicRequest.get("/config/paypal");
      const Script = document.createElement("script");
      Script.type = "text/javascript";
      Script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      Script.async = true;
      Script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(Script);
    };
    if (!(orderItems || successPayment)) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!orderDetails.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPayment, orderDetails.isPaid, orderItems]);
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (orderItems && orderItems.orderItems) {
    orderItems.itemsPrice = addDecimal(
      orderItems.orderItems.reduce(
        (acc, curr) => acc + curr.qty * curr.price,
        0
      )
    );
  }
  const successPaymentHandler = (paymentResults) => {
    console.log(paymentResults);
    dispatch(orderPayment(orderId, paymentResults));
  };
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant={"alert-danger"}>{error}</Message>
        ) : !orderItems ? (
          <Message variant={"alert-danger"}>{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{orderItems.user && orderItems.user.name}</p>
                    <p>
                      <a
                        href={`mailto:${orderItems.user && orderItems.user.email
                          }`}
                      >
                        {orderItems.user && orderItems.user.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>
                      Shipping:{" "}
                      {orderItems.shippingAddress &&
                        orderItems.shippingAddress.postalCode}
                    </p>
                    <p>
                      Pay method:{" "}
                      {orderItems.paymentMethod && orderItems.paymentMethod}
                    </p>
                    {orderItems.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(orderItems.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      {` Address: ${orderItems.shippingAddress.address},${orderItems.shippingAddress.city}, ${orderItems.shippingAddress.country}`}
                    </p>
                    {orderItems.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(orderItems.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {orderItems.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {orderItems.orderItems.map((item) => (
                      <div className="order-product row" key={item.product}>
                        <div className="col-md-3 col-6">
                          <img src="/images/8.png" alt="product" />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>Price</h4>
                          <h6>{item.price * item.qty}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>{orderItems.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>{orderItems.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>{orderItems.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>{orderItems.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {!orderItems.isPaid && (
                  <div className="col-12">
                    {loadingPayment && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={`${orderItems.totalPrice}`}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
