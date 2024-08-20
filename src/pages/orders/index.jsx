import React, { useEffect, useState } from "react";
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

const Orders = ({ orders }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_USERS_URL}/find`,
      {
        params: { email },
      }
    );
    const foundUser = await response.data;
    const myOrders = orders.filter(
      (order) => order.customerId == foundUser._id
    );
    setAllOrders(myOrders);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMyOrders();
  }, []);

  useEffect(() => {
    setLoading(true);
    getMyOrders();
  }, [orders]);

  if (loading == true) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>My Orders</h2>
      {allOrders.length > 0 ? (
        allOrders.map((order) => (
          <div key={order._id}>
            <h4>Tracking Number: {order.trackingNumber}</h4>
            <p>Date Ordered: {order.orderDate}</p>
            <p>Order Status: {order.orderStatus}</p>
            <p>Shipping To: {order.shippingAddress}</p>
            <p>Method Of Shipping: {order.shippingMethod}</p>
            <h5>What you ordered:</h5>
            {order.products.map((product) => (
              <div key={product._id}>
                <p>{product.productName}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Unit Price: {product.unitPrice}</p>
                <p>Total Price: {product.totalPrice}</p>
              </div>
            ))}
            <h5>Order total: {order.totalAmount}</h5>
          </div>
        ))
      ) : (
        <div>
          <h1>You have no orders </h1>
        </div>
      )}
    </div>
  );
};

export default Orders;

export async function getServerSideProps() {
  const ordersUrl = process.env.NEXT_PUBLIC_ORDERS_URL;
  const res = await fetch(`${ordersUrl}`);
  const orders = await res.json();
  return {
    props: {
      orders,
    },
  };
}
