"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require("dotenv").config();

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

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [mpesa, setMpesa] = useState("pay-hide");
  const [wallet, setWallet] = useState("pay-hide");
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    payment: "",
    note: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const getCart = async () => {
    try {
      setLoading(false);
      const wholeUser = await checkAuthStatus();
      const { email } = wholeUser;
      const response = await axios.get("http://localhost:3000/api/users/find", {
        params: { email },
      });
      const foundUser = await response.data;
      const cartP = await foundUser.favoriteProducts;
      const ids = [...cartP];

      try {
        const resData = await axios.post(
          "http://localhost:3000/api/products/bulk",
          { ids }
        );

        setCart(await resData.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const countOccurrences = () => {
    let tempCounts = {};
    cart.forEach((obj) => {
      if (tempCounts[obj._id]) {
        tempCounts[obj._id].count++;
      } else {
        tempCounts[obj._id] = { ...obj, count: 1 };
      }
    });
    setCounts(tempCounts);
  };

  useEffect(() => {
    countOccurrences();
  }, [cart]);

  useEffect(() => {
    const productsWithTotal = cart.map((product) => ({
      ...product,
      total: product.price,
    }));
    const grandTotal = productsWithTotal.reduce(
      (sum, product) => sum + product.total,
      0
    );
    setTotal(grandTotal);
  }, [cart]);

  const mpesaToggle = () => {
    if (mpesa === "pay-hide" && wallet === "pay-hide") {
      setMpesa("mpesa");
    } else if (mpesa === "pay-hide" && wallet !== "pay-hide") {
      setMpesa("mpesa");
      setWallet("pay-hide");
    }
  };

  const walletToggle = () => {
    if (mpesa === "pay-hide" && wallet === "pay-hide") {
      setWallet("wallet");
    } else if (mpesa !== "pay-hide" && wallet === "pay-hide") {
      setWallet("wallet");
      setMpesa("pay-hide");
    }
  };

  //setting products to be in the order
  const createProducts = () => {
    Object.values(counts).map((co) => {
      setOrderProducts((previousState) => [
        ...previousState,
        {
          productId: co._id,
          productName: co.name,
          quantity: co.count,
          unitPrice: co.price,
          totalPrice: co.price * co.count,
        },
      ]);
    });
  };

  const makingTheOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.address ||
      !formData.phone ||
      !formData.payment ||
      !formData.method ||
      !formData.note
    ) {
      alert("NO Full Data");
      return;
    }

    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;
    const response = await axios.get("http://localhost:3000/api/users/find", {
      params: { email },
    });
    const foundUser = await response.data;

    try {
      const order = await axios.post("http://localhost:3000/api/orders", {
        customerId: foundUser._id,
        shippingAddress: formData.address,
        contactInfo: {
          phone: formData.phone,
          email: foundUser.email,
        },
        paymentMethod: formData.payment,
        transactionId: "RESAOUN",
        totalAmount: total,
        products: orderProducts,
        shippingMethod: formData.method,
        shippingCost: 5,
        taxRate: 0.123,
        taxAmount: 10.08,
        orderNotes: formData.note,
        internalNotes: "New customer, verify address first.",
      });
      toast.success("Your Order Was Placed Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        phone: "",
        method: "default",
        address: "",
        payment: "default",
        note: "",
      });
      setOrderProducts([]);

      const clearTheCart = axios.put(
        `http://localhost:3000/api/users/update/${foundUser._id}`,
        {
          favoriteProducts: [],
        }
      );
    } catch (error) {
      toast.error("An error occured, Please Try Again!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Error placing order", error);
    }
  };

  return (
    <>
      <div>
        <h1>Check Out Your Cart</h1>
        <p>Totals: {total}</p>
        <p>Pay Via: </p>
        <button onClick={mpesaToggle}>M-Pesa</button>
        <button onClick={walletToggle}>Wallet</button>
      </div>

      <div className={mpesa}>
        <h1>M-Pesa</h1>

        {orderProducts.length > 0 ? (
          <div>
            <form method="post" onSubmit={makingTheOrder}>
              <h1>Fill the following to make the order</h1>

              <label htmlFor="address">
                <p>Shipping Address</p>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </label>

              <label htmlFor="phone">
                <p>Phone Number: </p>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
              </label>

              <label htmlFor="payment">
                <p>Payment Method</p>
                <select
                  name="payment"
                  id="payment"
                  required
                  onChange={handleChange}
                  value={formData.payment}
                >
                  <option value="default">-Select Payment Method-</option>
                  <option value="mpesa">Mpesa</option>
                  <option value="onDelivery">Pay On Delivery</option>
                </select>
              </label>

              <label htmlFor="method">
                <p>Shipping Method</p>
                <select
                  name="method"
                  id="method"
                  required
                  onChange={handleChange}
                  value={formData.method}
                >
                  <option value="default">-Select Shipping Method-</option>
                  <option value="To be delivered at your home address">
                    Door Delivery
                  </option>
                  <option value="To be collected at pickup station">
                    Pick Up Station
                  </option>
                </select>
              </label>

              <label htmlFor="note">
                <p>Note for the delivery personel</p>
                <input
                  type="text"
                  aria-multiline
                  id="note"
                  name="note"
                  onChange={handleChange}
                  value={formData.note}
                ></input>
              </label>

              <input type="submit" value="Place Order Now" />
            </form>
          </div>
        ) : (
          <div>
            {cart.length > 0 ? (
              Object.values(counts).map((pr) => (
                <div key={pr._id}>
                  <h2>{pr.name}</h2>
                  <p>Counts: {pr.count}</p>
                </div>
              ))
            ) : (
              <h1>No items in your Cart!!</h1>
            )}
            <button onClick={createProducts}>Confirm Products</button>
          </div>
        )}
      </div>

      <div className={wallet}>
        <h1>Wallet</h1>
      </div>
    </>
  );
}
