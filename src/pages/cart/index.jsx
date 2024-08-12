"use client";

import axios from "axios";
import Link from "next/link";
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

export default function Cart({}) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});

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

  const reduceCount = async (id) => {
    try {
      const wholeUser = await checkAuthStatus();
      const { email } = wholeUser;
      let count = 0;
      const response = await axios.get("http://localhost:3000/api/users/find", {
        params: { email },
      });
      const foundUser = await response.data;
      const cartP = await foundUser.favoriteProducts;

      for (let num of cartP) {
        if (num === id) {
          count++;
        }
      }

      if (count <= 1) {
        toast.warn("One Count Remaining!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      await axios.post("http://localhost:3000/api/users/reduceFavorite", {
        email,
        id,
      });
      getCart();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const increaseCount = async (id) => {
    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;

    try {
      await axios.put("http://localhost:3000/api/users/increaseFavorite", {
        email,
        id,
      });
      getCart();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeProduct = async (id) => {
    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;

    try {
      await axios.post("http://localhost:3000/api/users/removeFavorite", {
        email,
        id,
      });

      toast.warn(`Removed From Cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      getCart();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Cart</h1>
      <p>{process.env.GITHUB_ID}</p>
      <div>
        {cart.length > 0 ? (
          Object.values(counts).map((pr) => (
            <div key={pr._id}>
              <h2>{pr.name}</h2>

              <Link href={`/product/${pr._id}`} className="each-product">
                {pr.images.length > 0 ? (
                  <img
                    src={`http://localhost:3000/${pr.images[0].url}`}
                    alt="Profile Picture"
                    width="200"
                    height="200"
                  />
                ) : (
                  ""
                )}
                <p>{pr.description}</p>
                <p>{pr.price}</p>
              </Link>
              <p>Counts: {pr.count}</p>
              <button onClick={() => increaseCount(pr._id)}>Add</button>
              <button
                onClick={() => {
                  reduceCount(pr._id);
                }}
              >
                Reduce
              </button>
              <button
                onClick={() => {
                  removeProduct(pr._id);
                }}
              >
                Remove from cart
              </button>
            </div>
          ))
        ) : (
          <h1>No items in your Cart!!</h1>
        )}
      </div>
      {cart.length > 0 ? (
        <div>
          <p>{total}</p>
          <Link href="/checkout">Check Out</Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
