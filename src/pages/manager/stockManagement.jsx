"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageStock() {
  const [products, setInitialProducts] = useState([]);
  const [abundant, setAbundant] = useState([]);
  const [average, setAverage] = useState([]);
  const [low, setLow] = useState([]);
  const [out, setOut] = useState([]);
  const [filteredProduct, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [addedStock, setAddedStock] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const searched = useRef();
  const idRef = useRef();
  const stockRef = useRef();

  const groupProducts = () => {
    if (products.length > 0) {
      //seperate categories
      const abundantProducts = products.filter((pr) => pr.stock >= 20);
      const averageProducts = products.filter(
        (pr) => pr.stock < 20 && pr.stock >= 10
      );
      const lowProducts = products.filter(
        (pr) => pr.stock < 10 && pr.stock > 0
      );
      const outProducts = products.filter((pr) => pr.stock == 0);

      //set products accordingly
      setAbundant(abundantProducts);
      setAverage(averageProducts);
      setLow(lowProducts);
      setOut(outProducts);
    }
  };

  const getAllProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/products");
    setInitialProducts(res.data);
  };

  useEffect(() => {
    getAllProducts();
    groupProducts();
  }, []);

  useEffect(() => {
    groupProducts();
  }, [products]);

  const handleSearch = () => {
    const message = document.getElementById("message");
    const searchTerm = searched.current.value;
    if (!searchTerm) {
      message.classList.add("hide");
      setProducts([]);
      return;
    }
    const searchedData = products.filter((each) =>
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

  const copyToClipboard = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success("ID copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  //stock adding
  const idSubmission = (e) => {
    const enteredId = e.target.value;
    setProductId(enteredId);
  };

  const stockSubmission = (e) => {
    const enteredStock = e.target.value;
    setAddedStock(enteredStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //find the product first
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/findById/${productId}`
      );
      setCurrentStock(res.data.stock);
    } catch (error) {
      toast.error("Could not find the product", {
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
  };

  useEffect(() => {
    if (addedStock == 0) {
      return;
    }
    const totalStock = parseInt(currentStock) + parseInt(addedStock);
    const addStock = async () => {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/products/update/${productId}`,
          {
            stock: totalStock,
          }
        );
        toast.success("Stock updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const updatedProduct = await res.data;
        if (updatedProduct) {
          idRef.current.value = "";
          stockRef.current.value = "";
          setAddedStock(0);
          setCurrentStock(0);
          getAllProducts();
        }
      } catch (error) {
        console.log("Could not update stock", error);
      }
    };

    if (addedStock !== 0) {
      addStock();
    }
  }, [currentStock]);

  return (
    <>
      <div>
        <div>
          <h1>UserSearch</h1>
          <div>
            {" "}
            <input
              type="text"
              ref={searched}
              style={{ color: "black" }}
              onChange={handleSearch}
              placeholder="Search..."
            />
            <p className="search-message hide" id="message">
              {`Item not found ! :(`}
            </p>
          </div>
          <div>
            {filteredProduct.length > 0
              ? filteredProduct?.map((product) => (
                  <div key={product._id}>
                    <div>
                      <h1>{product.name}</h1>
                      <div>
                        <p>Id: {product._id}</p>
                        <button
                          onClick={() => {
                            copyToClipboard(product._id);
                          }}
                        >
                          Copy Id
                        </button>
                      </div>

                      <p>Price: {product.price}</p>
                      <p>Stock: {product.stock}</p>
                      <p>Category: {product.category}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div>
          <h1>Abundant</h1>
          <div>
            {abundant.length > 0 ? (
              abundant?.map((product) => (
                <div key={product._id}>
                  <div>
                    <h1>{product.name}</h1>
                    <div>
                      <p>Id: {product._id}</p>
                      <button
                        onClick={() => {
                          copyToClipboard(product._id);
                        }}
                      >
                        Copy Id
                      </button>
                    </div>

                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>No Products In Abudant In The Store</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <h1>Averagely Stocked</h1>
          <div>
            {average.length > 0 ? (
              average?.map((product) => (
                <div key={product._id}>
                  <div>
                    <h1>{product.name}</h1>
                    <div>
                      <p>Id: {product._id}</p>
                      <button
                        onClick={() => {
                          copyToClipboard(product._id);
                        }}
                      >
                        Copy Id
                      </button>
                    </div>

                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>No Products In Average In The Store</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <h1>Low On Stock</h1>
          <div>
            {low.length > 0 ? (
              low?.map((product) => (
                <div key={product._id}>
                  <div>
                    <h1>{product.name}</h1>
                    <div>
                      <p>Id: {product._id}</p>
                      <button
                        onClick={() => {
                          copyToClipboard(product._id);
                        }}
                      >
                        Copy Id
                      </button>
                    </div>

                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>No Products In Running Low In The Store</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <h1>Out Of Stock!!</h1>
          <div>
            {out.length > 0 ? (
              out?.map((product) => (
                <div key={product._id}>
                  <div>
                    <h1>{product.name}</h1>
                    <div>
                      <p>Id: {product._id}</p>
                      <button
                        onClick={() => {
                          copyToClipboard(product._id);
                        }}
                      >
                        Copy Id
                      </button>
                    </div>

                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>No Products In Out Of Stock In The Store</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <form method="post" onSubmit={handleSubmit}>
            <h1>Add Product Stock</h1>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="Enter Product Id..."
              onChange={idSubmission}
              required
              autoComplete="off"
              ref={idRef}
            />
            <label htmlFor="stock">
              <p>Product Stock</p>{" "}
              <input
                type="number"
                id="stock"
                name="stock"
                ref={stockRef}
                value={addedStock}
                onChange={stockSubmission}
              />
            </label>

            <input type="submit" value="Add Stock" />
          </form>
        </div>
      </div>
    </>
  );
}
