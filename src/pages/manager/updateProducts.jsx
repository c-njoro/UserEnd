"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

const UpdateProducts = () => {
  const [filteredProduct, setProducts] = useState([]);
  const searched = useRef();
  const [formData, setFormData] = useState({});
  const [productId, setProductId] = useState({});
  const [copySuccess, setCopySuccess] = useState("");
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const stockRef = useRef();
  const imagesRef = useRef();
  const waitIdRef = useRef();
  //images
  const [image, setImage] = useState([]);
  const [waitId, setId] = useState("");
  const [test, setTest] = useState({
    id: "",
    images: [],
  });

  //data from server manageent
  const getAllProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //logic to update a product information -images

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const idSubmission = (e) => {
    const enteredId = e.target.value;
    setProductId(enteredId);
  };

  const updateTheProduct = async (e) => {
    e.preventDefault();

    console.log(formData);
    console.log(productId);
    try {
      const updatedProduct = await axios.put(
        `http://localhost:3000/api/products/update/${productId}`,
        formData
      );
      console.log(updatedProduct.data);
      setFormData({});
      setProductId("");
      idRef.current.value = "";
      nameRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
      categoryRef.current.value = "default";
      toast.success("Product Was Updated Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

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

  //logic of adding images

  const onChange = (e) => {
    const upload = e.target.files;
    setImage(upload);
  };

  const waitIdSubmission = (e) => {
    const theId = e.target.value;
    setId(theId);
  };

  const addingImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    if (!image) {
      return;
    }

    try {
      const fileInfos = await axios.post(
        "http://localhost:3000/uploadProducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const toAdd = await fileInfos.data.fileInfos;
      if (toAdd) {
        setTest((previousState) => ({
          ...previousState,
          id: waitId,
          images: [...toAdd],
        }));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const addThem = async () => {
      const completeProduct = await axios.post(
        "http://localhost:3000/api/products/addImages",
        test
      );
      imagesRef.current.value = "";
      setTest((previousState) => ({
        ...previousState,
        id: "",
        images: [],
      }));
      setId("");
      setImage([]);
      waitIdRef.current.value = "";
      toast.success(`Images(s) Added To ${completeProduct.data.name}.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    if (!test.id) {
      return;
    } else {
      addThem();
    }
  }, [test]);

  return (
    <>
      {filteredProduct ? (
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
              <div>
                <h1>{product.name}</h1>
                <div>
                  <p>Id: {product._id}</p>
                  <p>{copySuccess}</p>
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
          ))}
        </div>
      ) : (
        <h1>No Products in our shop</h1>
      )}

      <div>
        <h1>Edit Product Information</h1>
        <form method="post" onSubmit={updateTheProduct}>
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
          <p>Only Write On Features You Want to Edit</p>
          <label htmlFor="name">
            <p>Product Name</p>{" "}
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            <p>Product Price</p>{" "}
            <input
              type="number"
              id="price"
              name="price"
              ref={priceRef}
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="stock">
            <p>Product Stock</p>{" "}
            <input
              type="number"
              id="stock"
              name="stock"
              ref={stockRef}
              value={formData.stock}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category">
            <p>Product Category</p>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              ref={categoryRef}
              value={formData.category}
            >
              <option value="default">No Category Chosen</option>
              <option value="Electronics">Electronic</option>
              <option value="Cameras">Camera</option>
              <option value="Laptops">Laptop</option>
              <option value="Accessories">Accessory</option>
              <option value="Headphones">Headphone</option>
              <option value="Sports">Sporting Equipment</option>
            </select>
          </label>
          <br />
          <input type="submit" value="Update Products Info" />
        </form>
      </div>

      <div>
        <h1>Add Image Products</h1>
        <form method="post" onSubmit={addingImages}>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="Enter Product Id..."
            onChange={waitIdSubmission}
            required
            ref={waitIdRef}
            autoComplete="off"
          />
          <input
            type="file"
            name="images"
            onChange={onChange}
            multiple
            ref={imagesRef}
          />
          <input type="submit" value="Add Images" />
        </form>
      </div>
    </>
  );
};

export default UpdateProducts;
