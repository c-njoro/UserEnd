"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function OneProduct({ currentData }) {
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    payment: "",
    note: "",
  });
  const [quickOrder, setQuickOrder] = useState("hide");
  const [counter, setCounter] = useState(0);

  const toggleQuickOrder = () => {
    if (quickOrder === "hide") {
      setQuickOrder("quick-order");
    } else {
      setQuickOrder("hide");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  //finding the current user
  const orderTheProduct = async (e) => {
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_USERS_URL}/find`,
      {
        params: { email },
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const foundUser = await response.data;

    try {
      const order = await axios.post(`${process.env.NEXT_PUBLIC_ORDERS_URL}`, {
        customerId: foundUser._id,
        shippingAddress: formData.address,
        contactInfo: {
          phone: formData.phone,
          email: "bigiie@gmail.com",
        },
        paymentMethod: formData.payment,
        transactionId: "RESAOUN",
        totalAmount: currentData.price,
        products: [
          {
            productId: currentData._id,
            productName: currentData.name,
            quantity: 1,
            unitPrice: currentData.price,
            totalPrice: currentData.price,
          },
        ],
        shippingMethod: formData.method,
        shippingCost: 5,
        taxRate: 0.123,
        taxAmount: 10.08,
        orderNotes: formData.note,
        internalNotes: "New customer, verify address first.",
      });
      const newStock = currentData.stock - 1;
      const updateStock = await axios.put(
        `${process.env.NEXT_PUBLIC_PRODUCTS_URL}/update/${currentData._id}`,
        { stock: newStock }
      );
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
    } catch (error) {
      toast.error("Error placing order, Try Again", {
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

  //adding to cart
  const addToCart = async (objectId) => {
    try {
      const wholeUser = await checkAuthStatus();
      const { email } = wholeUser;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_USERS_URL}/addFavorite`,
        {
          email: email,
          id: objectId,
        }
      );
      toast.success(`${currentData.name} added to Cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      if (error.response.status == 408) {
        toast.warn(`${currentData.name} already to Cart!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error while adding item", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (currentData.images.length > 0) {
      setPhotos(currentData.images);
    }
  }, []);
  const nextImage = () => {
    const totalLength = photos.length - 1;
    if (counter < totalLength) {
      setCounter(counter + 1);
    } else if (counter == totalLength) {
      setCounter(0);
    }
  };
  const previousImage = () => {
    const totalLength = photos.length - 1;
    if (counter == 0) {
      setCounter(totalLength);
    } else if (counter <= totalLength) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="one-product-container">
      <div className="images-slider">
        {photos.length > 0 ? (
          <div className="image-container">
            <img
              src={`${photos[counter].url}`}
              alt="Profile Picture"
              width="300"
              height="300"
              key={photos[counter]._id}
              className="image"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="next"
              onClick={nextImage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="previous"
              onClick={previousImage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        ) : (
          <img
            src="/images/noImage.webp"
            alt="Profile Picture"
            width="300"
            height="300"
            key="no-image"
          />
        )}
      </div>
      <div className="product-details">
        <div className="name">
          <h1 className="the-name">{currentData.name}</h1>
        </div>
        <div className="rating-sharing">
          <div className="rating">
            <ReactStars
              count={5}
              value={4}
              activeColor="#ffd700"
              edit={false} // Prevents user from changing the rating
              classNames="stars"
            />
          </div>
          <div className="sharing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
        <div className="text-gray-700 font-bold">
          <p>@Ksh. {currentData.price}</p>
        </div>
        <div className="text-gray-700 font-bold">
          <p>In Stock. {currentData.stock}</p>
        </div>
        <div className="description">
          <p>{currentData.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => {
              addToCart(currentData._id);
            }}
            className="cart-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <p>Add To Cart</p>
          </button>
          {quickOrder === "hide" ? (
            <button onClick={toggleQuickOrder} className="order-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>

              <p>Make Quick Order</p>
            </button>
          ) : (
            <button onClick={toggleQuickOrder} className="order-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>

              <p>Quit Order</p>
            </button>
          )}
        </div>
      </div>

      <div className={`${quickOrder} quick-order`}>
        <form method="post" onSubmit={orderTheProduct} className="order-form">
          <h1 className="form-heading">Quick Order</h1>

          <label htmlFor="address" className="input text">
            <p className="label">Shipping Address</p>
            <input
              type="text"
              id="address"
              name="address"
              required
              onChange={handleChange}
              value={formData.address}
              className="input-box"
            />
          </label>

          <label htmlFor="phone" className="input text">
            <p className="label">Phone Number </p>
            <input
              type="tel"
              pattern="[0-9]{10}"
              id="phone"
              name="phone"
              required
              onChange={handleChange}
              value={formData.phone}
              className="input-box"
            />
          </label>

          <label htmlFor="payment" className="input select">
            <p className="label">Payment Method</p>
            <select
              name="payment"
              id="payment"
              required
              onChange={handleChange}
              value={formData.payment}
              className="input-box"
            >
              <option value="default">-Select Payment Method-</option>
              <option value="mpesa">Mpesa</option>
              <option value="onDelivery">Pay On Delivery</option>
            </select>
          </label>

          <label htmlFor="method" className="input select">
            <p className="label">Shipping Method</p>
            <select
              name="method"
              id="method"
              required
              onChange={handleChange}
              value={formData.method}
              className="input-box"
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

          <label htmlFor="note" className="input text-area">
            <p className="label">Note for the delivery personel</p>
            <input
              type="text"
              aria-multiline
              id="note"
              name="note"
              onChange={handleChange}
              value={formData.note}
              className="input-box"
            ></input>
          </label>

          <div className="submit-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
            <input type="submit" value="Place Order Now" />
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const productsUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
  const res = await fetch(`${productsUrl}`, {
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const products = await res.json();

  const allPaths = products.map((pr) => {
    return {
      params: {
        ids: pr._id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const productsUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
  const id = context?.params.ids;
  const res = await fetch(`${productsUrl}`, {
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const products = await res.json();
  const currentData = products.find((pr) => pr._id === id);
  return { props: { currentData } };
}
