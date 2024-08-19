"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

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
    <>
      {data.length > 0 ? (
        filteredProduct.length > 0 ? (
          <div>
            <div>
              <input
                type="text"
                ref={searched}
                style={{ color: "black" }}
                onChange={handleSearch}
                placeholder="Search..."
              />
              <p className="search-message hide" id="message">
                Showing relatable to the search
              </p>
            </div>

            <div>
              {categories.map((category) => (
                <div key={category}>
                  <label htmlFor={category}>
                    <input
                      type="radio"
                      value={category}
                      onChange={categoryCheck}
                      checked={checkedCategory === category}
                      name="category"
                      id={category}
                    />
                    {category}
                  </label>
                </div>
              ))}
              <button onClick={clearFilters}>Clear</button>
            </div>

            <div>
              {filteredProduct?.map((product) => (
                <div key={product._id}>
                  <h2>{product.name}</h2>

                  <Link
                    href={`/product/${product._id}`}
                    className="each-product"
                  >
                    {" "}
                    <div>
                      {product.images.length > 0 ? (
                        <img
                          src={`${product.images[0].url}`}
                          alt="Profile Picture"
                          width="400"
                          height="250"
                        />
                      ) : (
                        ""
                      )}
                      <p>{product.description}</p>
                      <p>Price: ${product.price}</p>
                    </div>
                  </Link>
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
    </>
  );
};

export default ProductsList;
