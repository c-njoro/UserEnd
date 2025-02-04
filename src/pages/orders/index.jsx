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
    <div className="main-order-container bg-blue-100 flex flex-col  w-screen min-h-screen font-beauty">
      <div className="heading flex justify-center sm:flex-row flex-col pt-2 w-full items-center mb-4">
        <h2 className="header font-bold text-gray-700 text-3xl p-2">
          My Orders
        </h2>
      </div>

      <div className="all-orders w-full  h-max  flex flex-col justify-center items-center gap-4 py-2 bg-blue-100 rounded-3xl px-2">
        {" "}
        {allOrders.length > 0 ? (
          allOrders.map((order) => (
            <div
              key={order._id}
              className="each-order grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 w-full bg-gray-100 shadow-lg rounded-md px-2 hover:bg-gray-200"
            >
              <div className="order-date detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Date ordered
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  {new Date(order.orderDate).toLocaleDateString("en-CA")}
                </p>
              </div>

              <div className="order-status detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Order status
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  {order.orderStatus}
                </p>
              </div>

              <div className="payment-status detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Payment status
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  {order.paymentStatus}
                </p>
              </div>

              <div className="order-destination detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Shipping to
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  {order.shippingAddress}
                </p>
              </div>

              <div className="shipping-method detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  How shipped
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  {order.shippingMethod}
                </p>
              </div>

              <div className="what-ordered detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Items Ordered
                </p>
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="item bottom capitalize font-beauty text-sm font-bold text-gray-800  flex justify-between flex-row gap-6"
                  >
                    <p>{product.productName}</p>
                    <p>X{product.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="order-totals detail flex flex-col justify-start items-start gap-4 border-r-2 border-b pb-2">
                <p className="top capitalize font-body font-light text-gray-400 underline">
                  Total amount
                </p>
                <p className="bottom capitalize font-beauty text-sm font-bold text-gray-800">
                  Ksh. {order.totalAmount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-max flex flex-col justify-center item-center py-8 gap-10">
            <h1 className="font-body font-bold capitalize ">
              OOPS!! You got no orders.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
