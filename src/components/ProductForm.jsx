import axios from "axios";
import { useEffect, useRef, useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    seller: "",
    stock: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadedImages, setUploads] = useState([]);
  const [image, setImage] = useState([]);
  const [waitId, setId] = useState("");
  const [test, setTest] = useState({
    id: "",
    images: [],
  });
  const imagesRef = useRef(null);
  //mainly product details side
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/products", {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        seller: formData.seller,
        category: formData.category,
        stock: formData.stock,
      });
      setSuccessMessage(`${formData.name} created successfully`);
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        seller: "",
        stock: 0,
      });
      setId(res.data._id);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Product already exists");
        } else if (error.response.status === 400) {
          setErrorMessage("Missing information");
        } else {
          setErrorMessage(error.message);
        }
      }
    }
  };

  //mainly product images part
  const onChange = (e) => {
    const upload = e.target.files;
    setImage(upload);
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

      console.log(fileInfos.data.fileInfos);
      console.log("Setting data");
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
    console.log("Test Changed Succesfully");

    const addThem = async () => {
      const completeProduct = await axios.post(
        "http://localhost:3000/api/products/addImages",
        test
      );
      imagesRef.current.value = "";
      console.log(completeProduct.data);
      setTest((previousState) => ({
        ...previousState,
        id: "",
        images: [],
      }));
      setId("");
      setImage([]);
    };

    if (!test.id) {
      return;
    } else {
      addThem();
    }
  }, [test]);

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Add A New Product</h1>
        <label htmlFor="name">
          <p>Product Name</p>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label htmlFor="price">
          <p>Product Price</p>
          <input
            type="number"
            id="price"
            name="price"
            required
            onChange={handleChange}
            value={formData.price}
          />
        </label>
        <label htmlFor="stock">
          <p>Product In Stock</p>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            onChange={handleChange}
            value={formData.stock}
          />
        </label>
        <label htmlFor="category">
          <p>Product Category</p>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={formData.category}
            required
          >
            <option value="choose">No Category Chosen</option>
            <option value="Electronics">Electronic</option>
            <option value="Cameras">Camera</option>
            <option value="Laptops">Laptop</option>
            <option value="Accessories">Accessory</option>
            <option value="Headphones">Headphone</option>
            <option value="Sports">Sporting Equipment</option>
          </select>
        </label>
        <label htmlFor="seller">
          <p>Product Seller/Manufacturer</p>
          <input
            type="text"
            id="seller"
            name="seller"
            required
            onChange={handleChange}
            value={formData.seller}
          />
        </label>
        <label htmlFor="description">
          <p>Product Description</p>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            required
            onChange={handleChange}
          />
        </label>

        <br />
        <input type="submit" value="Create Product" />
      </form>

      <form method="post" enctype="multipart/form-data" onSubmit={addingImages}>
        <h2>Now Add Product Images</h2>
        <input
          type="file"
          name="images"
          onChange={onChange}
          multiple
          ref={imagesRef}
        />
        <input type="submit" value="Add Images" />
      </form>
      <p>{errorMessage}</p>
      <p>{successMessage}</p>
    </div>
  );
};

export default ProductForm;
