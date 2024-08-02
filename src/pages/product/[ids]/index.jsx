"use client";

import axios from "axios";
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
      toast.success("Added to Cart", {
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
        toast.warn("Product Already in Cart", {
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

  return (
    <div>
      <h1>{currentData.name}</h1>
      <p>{currentData.description}</p>
      <button
        onClick={() => {
          addToCart(currentData._id);
        }}
      >
        Add To Cart
      </button>
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
  console.log(context);
  const id = context?.params.ids;
  console.log(id);
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  const currentData = products.find((pr) => pr._id === id);
  console.log(currentData);

  return { props: { currentData } };
}
