"use client";

import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserInfoProvider } from "../../../components/GlobalState";

export default function OneProduct({ currentData }) {
  const { userInfo } = useUserInfoProvider();
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    payment: "",
    note: "",
    quantity: 1,
  });
  const [quickOrder, setQuickOrder] = useState("hide");
  const [counter, setCounter] = useState(0);

  const toggleQuickOrder = () => {
    if (quickOrder === "hide") {
      setQuickOrder("quick-order");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setQuickOrder("hide");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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

    if (!userInfo.loggedIn) {
      toast.warn("Login or signup in order to make this order.", {
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

    if (
      !formData.address ||
      !formData.phone ||
      !formData.payment ||
      !formData.method ||
      !formData.note ||
      !formData.quantity ||
      formData.quantity <= 0
    ) {
      if (formData.quantity <= 0) {
        toast.warn("Quantity cannot be less than 1", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      toast.warn("Order form not correctly or completely filled.", {
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
      const order = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/makeOrder`,
        {
          customerId: userInfo.userData._id,
          shippingAddress: formData.address,
          contactInfo: {
            phone: formData.phone,
            email: "bigiie@gmail.com",
          },
          paymentMethod: formData.payment,
          transactionId: "RESAOUN",
          totalAmount: currentData.price * formData.quantity,
          products: [
            {
              productId: currentData._id,
              productName: currentData.name,
              quantity: formData.quantity,
              unitPrice: currentData.price,
              totalPrice: currentData.price * formData.quantity,
            },
          ],
          shippingMethod: formData.method,
          shippingCost: 5,
          taxRate: 0.123,
          taxAmount: 10.08,
          orderNotes: formData.note,
          internalNotes: "New customer, verify address first.",
        }
      );
      const newStock = currentData.stock - formData.quantity;
      const updateStock = await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updateProducts?id=${currentData._id}`,
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
        quantity: 1,
      });
    } catch (error) {
      toast.error("Error placing order, Try Again", {
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

  useEffect(() => {
    if (currentData.images.length > 0) {
      setPhotos(currentData.images);
    }
  }, []);
  const nextImage = () => {
    const totalLength = photos.length - 1;
    if (counter < totalLength) {
      setCounter(counter + 1);
    } else if (counter == totalLength) {
      setCounter(0);
    }
  };
  const previousImage = () => {
    const totalLength = photos.length - 1;
    if (counter == 0) {
      setCounter(totalLength);
    } else if (counter <= totalLength) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="one-product-container relative w-screen pb-6 h-max md:h-[calc(90vh)] bg-blue-100 grid md:grid-cols-2 grid-cols-1 place-items-center px-3 gap-8">
      <div className="images-slider w-full h-max md:h-[calc(90vh)] relative flex flex-col justify-center items-center ">
        {photos.length > 0 ? (
          <div className="image-container">
            <img
              src={`${photos[counter].url}`}
              alt="Profile Picture"
              width="300"
              height="300"
              key={photos[counter]._id}
              className="image w-[calc(95vw)] md:w-[calc(48vw)] h-[calc(50vh)] md:h-[calc(70vh)] object-cover"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="next size-10 bg-blue-50 p-2 rounded-full absolute top-1/2 right-0"
              onClick={nextImage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="previous  size-10 bg-blue-50 p-2 rounded-full absolute top-1/2 left-0"
              onClick={previousImage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        ) : (
          <img
            src="/images/noImage.webp"
            alt="Profile Picture"
            width="300"
            height="300"
            key="no-image"
          />
        )}
      </div>
      <div className="product-details w-full h-full flex flex-col justify-center items-start gap-4 md:gap-8">
        <div className="name w-full h-max flex flex-row justify-start items-center py-4">
          <h1 className="the-name xl:text-5xl md:text-4xl sm:text-3xl text-2xl text-gray-700 font-bold font-body tracking-wider ">
            {currentData.name}
          </h1>
        </div>
        <div className="rating-sharing w-full h-max flex flex-row justify-between px-4 items-center">
          <div className="rating">
            <Rating
              name="rating"
              value={4}
              readOnly
              precision={0.5}
              size="large" // Available sizes: small, medium, large
            />
          </div>
          <div className="sharing  flex flex-row justify-start items-center gap-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
        <div className="text-gray-700 font-bold">
          <p>@Ksh. {currentData.price}</p>
        </div>
        <div className="text-gray-700 font-bold ">
          <p>In Stock. {currentData.stock}</p>
        </div>
        <div className="description w-full h-max ">
          <p className="font-body tracking-wide text-gray-700 text-sm sm:text-base">
            {currentData.description}
          </p>
        </div>
        <div className="actions w-full h-max  flex xl:flex-row flex-col xl:justify-between gap-3">
          <button
            onClick={() => {
              addToCart(currentData._id);
            }}
            className="cart-button flex flex-row justify-center bg-blue-200 px-10 py-2 rounded-full shadow-lg items-center text-gray-800 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-orange-600 mr-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <p>Add To Cart</p>
          </button>
          {quickOrder === "hide" ? (
            <button
              onClick={toggleQuickOrder}
              className="order-button  flex flex-row justify-center bg-blue-200 px-10 py-2 rounded-full shadow-lg items-center text-gray-800 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-600 mr-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>

              <p>Place An Order</p>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={`${quickOrder} quick-order absolute w-[calc(100vw)] md:h-[calc(100vh)] h-full place-items-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="w-full h-full  flex flex-col justify-center items-center px-1">
          <div className="xl:w-1/2 lg:w-2/3 sm:w-4/5 w-11/12 h-max bg-blue-50 p-5 rounded-lg shadow-lg flex flex-col gap-8">
            <div className="flex flex-row justify-between items-center">
              <h1 className="form-heading font-semibold font-body tracking-wide text-green-500">
                Quick Order
              </h1>{" "}
              <button onClick={toggleQuickOrder} className="order-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              method="post"
              onSubmit={orderTheProduct}
              className="order-form w-full h-max flex flex-col justify-start items-center gap-5 text-sm sm:text-base"
            >
              <label
                htmlFor="quantity"
                className="input text w-full h-max grid grid-cols-1 md:grid-cols-4"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Quantity
                </p>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  onChange={handleChange}
                  value={formData.quantity}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
                />
              </label>

              <label
                htmlFor="address"
                className="input text w-full h-max grid md:grid-cols-4 grid-cols-1"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Shipping Address
                </p>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
                />
              </label>

              <label
                htmlFor="phone"
                className="input text w-full h-max grid grid-cols-1 md:grid-cols-4"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Phone Number{" "}
                </p>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
                />
              </label>

              <label
                htmlFor="payment"
                className="input select w-full h-max grid-cols-1 grid md:grid-cols-4"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Payment Method
                </p>
                <select
                  name="payment"
                  id="payment"
                  required
                  onChange={handleChange}
                  value={formData.payment}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
                >
                  <option value="default">-Select Payment Method-</option>
                  <option value="mpesa">Mpesa</option>
                  <option value="onDelivery">Pay On Delivery</option>
                </select>
              </label>

              <label
                htmlFor="method"
                className="input select w-full h-max grid grid-cols-1 md:grid-cols-4"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Shipping Method
                </p>
                <select
                  name="method"
                  id="method"
                  required
                  onChange={handleChange}
                  value={formData.method}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
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

              <label
                htmlFor="note"
                className="input text-area w-full h-max grid grid-cols-1 md:grid-cols-4"
              >
                <p className="label md:col-span-1 font-semibold uppercase tracking-wider  text-gray-500 sm:text-sm font-beauty text-xs">
                  Note for the delivery personel
                </p>
                <input
                  type="text"
                  aria-multiline
                  id="note"
                  name="note"
                  onChange={handleChange}
                  value={formData.note}
                  className="input-box col-span-3 h-8 w-full bg-blue-100 px-5 rounded-full shadow-md"
                ></input>
              </label>

              <div className="submit-button flex flex-row justify-center bg-blue-200 px-10 py-2 rounded-full shadow-lg items-center text-gray-800 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-600 mr-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <input type="submit" value="Submit Order" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // We can return empty paths and let fallback handle the generation
  return {
    paths: [], // Don't pre-render any pages at build time
    fallback: "blocking", // Generate pages on first request
  };
}

export async function getStaticProps(context) {
  try {
    const id = context?.params?.ids;
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    const res = await axios.get(`${frontendUrl}/api/oneProduct?id=${id}`);

    if (res.status !== 200) {
      return {
        notFound: true, // This will show your 404 page
      };
    }

    const currentData = await res.data;

    return {
      props: { currentData },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
