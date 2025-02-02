import React, { useEffect, useState } from "react";
import { useUserInfoProvider } from "../../components/GlobalState";
import Loading from "../../components/Loading";
const axios = require("axios");

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { userInfo } = useUserInfoProvider();
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/fetchOrders?customerId=${userInfo.userData._id}`
    );
    const myOrders = await res.data;
    setAllOrders(myOrders);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMyOrders();
  }, []);

  if (loading == true) {
    return <Loading />;
  }

  return (
    <div className="main-order-container">
      <div className="heading">
        <h2 className="header">My Orders</h2>
      </div>

      <div className="all-orders">
        {" "}
        {allOrders.length > 0 ? (
          allOrders.map((order) => (
            <div key={order._id} className="each-order">
              <div className="order-date detail">
                <p className="top">Date ordered</p>
                <p className="bottom">{order.orderDate}</p>
              </div>

              <div className="order-status detail">
                <p className="top">Order status</p>
                <p className="bottom">{order.orderStatus}</p>
              </div>

              <div className="payment-status detail">
                <p className="top">Payment status</p>
                <p className="bottom">{order.paymentStatus}</p>
              </div>

              <div className="order-destination detail">
                <p className="top">Shipping to</p>
                <p className="bottom">{order.shippingAddress}</p>
              </div>

              <div className="shipping-method detail">
                <p className="top">How shipped</p>
                <p className="bottom">{order.shippingMethod}</p>
              </div>

              <div className="what-ordered detail">
                <p className="top">Items Ordered</p>
                {order.products.map((product) => (
                  <div key={product._id} className="item bottom">
                    <p>{product.productName}</p>
                    <p>X{product.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="order-totals detail">
                <p className="top">Total amount</p>
                <p className="bottom">Ksh. {order.totalAmount}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>OOPS!! You got no orders.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
