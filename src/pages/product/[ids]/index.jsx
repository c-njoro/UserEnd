"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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
        `http://localhost:3000/api/products/update/${currentData._id}`,
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

  //adding to cart
  const addToCart = async (objectId) => {
    try {
      const wholeUser = await checkAuthStatus();
      const { email } = wholeUser;
      const response = await axios.put(
        "http://localhost:3000/api/users/addFavorite",
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

  return (
    <div>
      <h1>{currentData.name}</h1>
      <div>
        {photos.length > 0
          ? photos.map((photo) => (
              <img
                src={`${photo.url}`}
                alt="Profile Picture"
                width="300"
                height="300"
                key={photo._id}
              />
            ))
          : ""}
      </div>
      <p>{currentData.description}</p>
      <button
        onClick={() => {
          addToCart(currentData._id);
        }}
      >
        Add To Cart
      </button>

      <button
        onClick={() => {
          console.log(formData);
        }}
      >
        Check form
      </button>

      <div>
        <form method="post" onSubmit={orderTheProduct}>
          <h1>Quick Order</h1>

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
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/products");
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
  const id = context?.params.ids;
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  const currentData = products.find((pr) => pr._id === id);
  return { props: { currentData } };
}
