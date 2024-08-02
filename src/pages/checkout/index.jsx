"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [mpesa, setMpesa] = useState("pay-hide");
  const [wallet, setWallet] = useState("pay-hide");

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

  useEffect(() => {
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
      </div>

      <div className={wallet}>
        <h1>Wallet</h1>
      </div>
    </>
  );
}
