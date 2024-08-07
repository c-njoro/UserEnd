"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ProductsList = ({ data }) => {
  const [filteredProduct, setProducts] = useState([]);
  const searched = useRef();

  useEffect(() => {
    setProducts(data);
  }, []);

  const handleSearch = () => {
    const message = document.getElementById("message");
    const searchTerm = searched.current.value;
    const searchedData = data.filter((each) =>
      each.name.toLowerCase().includes(searchTerm)
    );
    if (searchedData.length > 0) {
      setProducts(searchedData);
      message.classList.add("hide");
      return;
    }
    message.classList.remove("hide");
    setProducts([]);
  };

  return (
    <>
      {filteredProduct.length > 0 ? (
        <div>
          <input
            type="text"
            ref={searched}
            style={{ color: "black" }}
            onChange={handleSearch}
            placeholder="Search..."
          />
          <h1 className="search-message hide" id="message">
            {`Item not found ! :(`}
          </h1>
          {filteredProduct?.map((product) => (
            <div key={product._id}>
              {product.images.length > 0 ? (
                <img
                  src={`http://localhost:3000/${product.images[0].url}`}
                  alt="Profile Picture"
                  width="200"
                  height="200"
                />
              ) : (
                ""
              )}

              <Link href={`/product/${product._id}`} className="each-product">
                {" "}
                <div>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>No Products in our shop</h1>
      )}
    </>
  );
};

export default ProductsList;
