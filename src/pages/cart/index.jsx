"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";

require("dotenv").config();

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();
    console.log(data.user);
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
  const [ids, setIds] = useState([]);

  const getCart = async () => {
    try {
      const wholeUser = await checkAuthStatus();
      const email = wholeUser.email;

      try {
        const findUrl = `${process.env.NEXT_PUBLIC_USERS_URL}/find?email=${email}`;
        const response = await fetch(findUrl, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        // If the response is not OK, log the status
        if (!response.ok) {
          const errorText = await response.text(); // Get the actual text of the response
          throw new Error(
            `HTTP error! status: ${response.status}. Response: ${errorText}`
          );
        }

        const foundUser = await response.json();

        const cartP = await foundUser.favoriteProducts;
        setIds(cartP);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTheCart = async () => {
      const resData = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/bulk`,
        { ids }
      );

      setCart(await resData.data);
      setLoading(false);
    };

    if (ids.length > 0) {
      fetchTheCart();
    }
  }, [ids]);

  useEffect(() => {
    setLoading(true);
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
    const rounded = parseFloat(grandTotal.toFixed(2));
    setTotal(rounded);
  }, [cart]);

  const reduceCount = async (id) => {
    try {
      const wholeUser = await checkAuthStatus();
      const { email } = wholeUser;
      let count = 0;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_USERS_URL}/find`,
        {
          params: { email },
        }
      );
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

      await axios.post(`${process.env.NEXT_PUBLIC_USERS_URL}/reduceFavorite`, {
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
      await axios.put(`${process.env.NEXT_PUBLIC_USERS_URL}/increaseFavorite`, {
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
      await axios.post(`${process.env.NEXT_PUBLIC_USERS_URL}/removeFavorite`, {
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

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div className="main-cart-container">
      <div className="heading">
        <div>
          <h1 className="header">My Cart</h1>
        </div>
      </div>

      <div className="cart-products">
        {cart.length > 0 ? (
          Object.values(counts).map((pr) => (
            <div key={pr._id} className="product">
              <div className="icon-side">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="cart-icon"
                  onClick={() => {
                    addToCart(product._id);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>

              <div className="image-side">
                {pr.images.length > 0 ? (
                  <img
                    src={`${pr.images[0].url}`}
                    alt="Profile Picture"
                    width="200"
                    height="200"
                    className="image"
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="more-side">
                <div className="product-details">
                  <h2 className="product-name">{pr.name}</h2>
                  <p className="product-desc">{pr.description}</p>
                </div>

                <div className="algo-part">
                  <div className="price-side">
                    <p className="the-price">@Ksh. {pr.price}</p>
                  </div>

                  <div className="count-side">
                    <button
                      onClick={() => increaseCount(pr._id)}
                      className="count-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                    <p>{pr.count}</p>
                    <button
                      onClick={() => {
                        reduceCount(pr._id);
                      }}
                      className="count-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="action-part">
                  <Link href={`/product/${pr._id}`} className="action">
                    View More...
                  </Link>
                  <button
                    onClick={() => {
                      removeProduct(pr._id);
                    }}
                    className="action"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    <p>Remove item</p>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>No items in your Cart!!</h1>
            <div className="going-back-to-shop">
              <div className="role-show">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
                <Link href="/product" className="link">
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {cart.length > 0 ? (
          <div className="payment">
            <p className="total">Totals: Ksh. {total}</p>
            <Link href="/checkout" className="checkout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>

              <p>Check Out</p>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
