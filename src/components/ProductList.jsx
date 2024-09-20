"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
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

const ProductsList = ({ data }) => {
  const [filteredProduct, setProducts] = useState([]);
  const searched = useRef();
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Sports",
  ];
  const [checkedCategory, setChecked] = useState("");
  const [loading, setLoading] = useState(false);

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
      toast.success(`Added item to Cart!`, {
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
        toast.warn(`Item already in your Cart!`, {
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

  const initialSetUp = () => {
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    initialSetUp();
  }, []);

  const categoryCheck = (e) => {
    const selected = e.target.value;
    setChecked(selected);
  };

  const filterByCategory = () => {
    if (checkedCategory.trim() === "") {
      return;
    }
    searched.current.value = "";
    const categorizedData = data.filter(
      (each) => each.category === checkedCategory
    );

    if (categorizedData.length < 1) {
      toast.warn(`${checkedCategory} items not available rn!!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    setProducts(categorizedData);
  };

  useEffect(() => {
    filterByCategory();
  }, [checkedCategory]);

  const handleSearch = () => {
    const message = document.getElementById("message");
    const searchTerm = searched.current.value;

    if (!searchTerm && !checkedCategory) {
      setProducts(data);
      message.classList.add("hide");
      return;
    } else if (!searchTerm && checkedCategory) {
      filterByCategory();
      message.classList.add("hide");
      return;
    }

    if (filteredProduct.length < 1) {
      toast.warn("items not available rn!!", {
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
    const searchedData = filteredProduct.filter((each) =>
      each.name.toLowerCase().includes(searchTerm)
    );
    if (searchedData.length > 0) {
      setProducts(searchedData);
      message.classList.add("hide");
      return;
    }
    message.classList.remove("hide");
    setProducts(filteredProduct);
  };

  const clearFilters = () => {
    searched.current.value = "";
    setChecked("");
    setProducts(data);
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-gray-200">
      {data.length > 0 ? (
        filteredProduct.length > 0 ? (
          <div className="main-products-container">
            <div className="filters-container">
              <div className="search-bar">
                <input
                  type="text"
                  ref={searched}
                  style={{ color: "black" }}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="input"
                />
                <p className="non-found hide" id="message">
                  Showing relatable to the search
                </p>
              </div>

              <div className="category-bar">
                {categories.map((category) => (
                  <div key={category} className="categories">
                    <label htmlFor={category} className="radio">
                      <input
                        type="radio"
                        value={category}
                        onChange={categoryCheck}
                        checked={checkedCategory === category}
                        name="category"
                        id={category}
                        className=""
                      />
                      <p className="label">{category}</p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="btn">
                <button onClick={clearFilters} className="clear">
                  Clear Searches
                </button>
              </div>
            </div>

            <div className="products-container">
              {filteredProduct?.map((product) => (
                <div key={product._id} className="each-product">
                  {product.images.length > 0 ? (
                    <img
                      src={`${product.images[0].url}`}
                      alt="Profile Picture"
                      className="image"
                    />
                  ) : (
                    ""
                  )}
                  <Link href={`/product/${product._id}`} className="link-tag">
                    {" "}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="product-info"
                    >
                      <h2 className="product-name">{product.name}</h2>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </motion.div>
                  </Link>
                  <p className="price-tag">Ksh. {product.price}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="cart-btn"
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
              ))}
            </div>
          </div>
        ) : (
          <Loading />
        )
      ) : (
        <h1>No Products in our shop</h1>
      )}
    </div>
  );
};

export default ProductsList;
