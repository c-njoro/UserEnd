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
