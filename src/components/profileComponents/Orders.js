import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";
import { Link } from "react-router-dom";
const Orders = ({ loading, orderList, error }) => {
  console.log(orderList)
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? <Loading /> : error ? <Message variant={"alert-danger"}>{error}</Message> :
        orderList && orderList.orderItems && orderList.orderItems.length === 0 ?
          <><div className="col-12 alert alert-info text-center mt-3">
            No Orders
            <Link
              className="btn btn-success mx-2 px-3 py-2"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              START SHOPPING
            </Link>
          </div> </>
          : <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList && orderList.map(item =>
                    <tr className={item.isPaid ? "alert-success" : "alert-danger"} key={item._id}>
                      <td>
                        <a href={`/order/${item._id}`} className="link">
                          {item._id}
                        </a>
                      </td>
                      <td>{item.isPaid ? <span>Paid</span> : <span>Not Paid</span>}</td>
                      <td>{item.isPaid ? moment(item.paidAt).calendar() : moment(item.createdAt).calendar()}</td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </>

      }

    </div>
  );
};

export default Orders;
