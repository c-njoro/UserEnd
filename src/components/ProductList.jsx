"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserInfoProvider } from "./GlobalState";
import Loading from "./Loading";
const axios = require("axios");

const ProductsList = ({ data }) => {
  const { userInfo } = useUserInfoProvider();
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
    if (!userInfo.loggedIn) {
      toast.warn(`Login or signup first to add items to your cart.`, {
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
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/addToCart`,
        {
          email: userInfo.userData.email,
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
          <div className="main-products-container md:flex md:flex-row overflow-scroll relative w-screen min-h-screen font-body bg-blue-100">
            <div className="filters-container md:pt-2 md:w-60 md:flex md:flex-col gap-2 pl-2 relative flex flex-col md:fixed md:left-0 justify-center md:justify-start pt-4">
              <div className="search-bar w-full flex justify-center">
                <input
                  type="text"
                  ref={searched}
                  style={{ color: "black" }}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="input md:w-full h-7 bg-gray-50 pl-2 rounded-full text-sm font-light text-gray-500 w-full z-20"
                />
                <p
                  className="non-found hide text-sm font-light text-red-400"
                  id="message"
                >
                  Showing relatable to the search
                </p>
              </div>

              <div className="category-bar grid grid-cols-3 md:flex md:flex-col gap-2 font-light text-gray-600 text-sm  md:justify-start justify-center">
                {categories.map((category) => (
                  <div key={category} className="categories">
                    <label htmlFor={category} className="radio md:ml-8 ml-2">
                      <input
                        type="radio"
                        value={category}
                        onChange={categoryCheck}
                        checked={checkedCategory === category}
                        name="category"
                        id={category}
                        className=""
                      />
                      <p className="label inline-block md:ml-2 ml-1 text-sm sm:text-base">
                        {category}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="btn flex justify-center">
                <button
                  onClick={clearFilters}
                  className="clear bg-gray-300 rounded-full p-1 font-bold text-gray-500 text-sm w-fit px-8"
                >
                  Clear Searches
                </button>
              </div>
            </div>

            <div className="products-container w-screen min-h-screen grid lg:grid-cols-3 sm:grid-cols-2 gap-6 p-8 justify-center md:ml-60 md:pt-4">
              {filteredProduct?.map((product) => (
                <div
                  key={product._id}
                  className="each-product bg-green-50 m-0 p-0 rounded-xl overflow-hidden max-h-[calc(75vh)] relative max-w-md sm:max-w-lg"
                >
                  {product.images.length > 0 ? (
                    <img
                      src={`${product.images[0].url}`}
                      alt="Profile Picture"
                      className="image h-72 m-0 p-0 w-full object-cover"
                    />
                  ) : (
                    ""
                  )}
                  <Link
                    href={`/product/${product._id}`}
                    className="link-tag w-full h-full relative"
                  >
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
                      className="product-info m-4"
                    >
                      <h2 className="product-name font-bold text-gray-500 mb-4 font-body">
                        {product.name}
                      </h2>
                      <p className="product-description font-light text-gray-800 mb-2 font-beauty text-sm md:text-base">
                        {product.description}
                      </p>
                    </motion.div>
                  </Link>
                  <p className="price-tag absolute top-0 left-0 font-light text-gray-700 bg-blue-50  rounded-full p-2 py-1 ml-2 mt-2">
                    Ksh. {product.price}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="cart-btn bg-blue-50 absolute top-0 right-0 text-3xl text-gray-500 mr-2 mt-2  cursor-pointer w-10 h-8 rounded-full p-1"
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
