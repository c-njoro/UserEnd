"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserInfoProvider } from "../../components/GlobalState";
import useCart from "../../components/hooks/cartHook";
require("dotenv").config();

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

export default function Checkout() {
  const router = useRouter();
  const { userInfo } = useUserInfoProvider();
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    note: "",
  });

  const {
    data: cart,
    isLoading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useCart();

  useEffect(() => {
    if (cart) {
      const countOccurrences = () => {
        let tempCounts = {};
        cart.forEach((obj) => {
          if (tempCounts[obj._id]) {
            tempCounts[obj._id].count++;
          } else {
            tempCounts[obj._id] = { ...obj, count: 1 };
          }
        });
        setCounts(tempCounts);
      };

      countOccurrences();
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const productsWithTotal = cart.map((product) => ({
        ...product,
        total: product.price,
      }));
      const grandTotal = productsWithTotal.reduce(
        (sum, product) => sum + product.total,
        0
      );
      const rounded = parseFloat(grandTotal.toFixed(2));
      setTotal(rounded);
    }
  }, [cart]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  //setting products to be in the order
  const createProducts = () => {
    Object.values(counts).map((co) => {
      setOrderProducts((previousState) => [
        ...previousState,
        {
          productId: co._id,
          productName: co.name,
          quantity: co.count,
          unitPrice: co.price,
          totalPrice: co.price * co.count,
        },
      ]);
    });
  };

  //make payment

  const makePayment = async (e) => {
    e.preventDefault();
    if (
      !formData.address ||
      !formData.phone ||
      !formData.method ||
      !formData.note
    ) {
      toast.error("Please fill ot the form correctly", {
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

    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("orderProducts", JSON.stringify(orderProducts));

    try {
      console.log("clicked: ", userInfo.userData.name, userInfo.userData.email);
      const response = await axios.post(
        "/api/sendPayment",
        {
          amount: total,
          name: userInfo.userData.name,
          email: userInfo.userData.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);

      if (response.status === 200 && response.data) {
        console.log("Payment response: ", response.data.checkout_url);
        window.location.href = response.data.checkout_url; // Redirect user to payment page
      } else {
        alert("Payment failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="main-checkout-container bg-blue-100 flex flex-col p-4 w-screen min-h-[calc(88vh)] font-beauty">
      <div className="heading flex justify-center sm:flex-row flex-col px-2 w-full items-center mb-4">
        <h1 className="header font-bold text-gray-700 text-3xl p-2">
          Check Out Your Cart
        </h1>
      </div>

      <div className="pay-toggle flex flex-col justify-center items-center text-base text-gray-500 font-bold font-beauty">
        <p>Totals: Ksh. {total}</p>

        <div className="btns flex flex-row">
          <button className="payment-mthd text-sm text-green-500 capitalize font-bold bg-gray-100 px-4 py-2  flex justify-center items-center gap-2 shadow-md border-r-2 border-l-2 border-gray-300">
            Creating Your Order
          </button>
        </div>
      </div>

      <div
        className={` method-chosen w-full h-max flex flex-row justify-center pt-8`}
      >
        <div className="mpesa bg-blue-50 rounded-3xl shadow-lg lg:w-1/2 md:w-2/3 sm:w-4/5 w-11/12 flex flex-col gap-4 p-8">
          <div className="mpesa-label w-full flex justify-center items-center h-max">
            <img
              src="/images/storeLogo-removebg-preview.png"
              alt="mpesa image"
              width="200"
              height="50"
              className="image-png"
            />
          </div>
          {orderProducts.length > 0 ? (
            <div className="mpesa-form w-full ">
              <form
                method="post"
                onSubmit={makePayment}
                className="form flex flex-col gap-2 w-full h-max justify-center items-center"
              >
                <label
                  htmlFor="address"
                  className="label-input grid sm:grid-cols-3 w-full grid-cols-1"
                >
                  <p className="label sm:col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center lg:text-base text-sm">
                    Shipping Address
                  </p>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    onChange={handleChange}
                    value={formData.address}
                    className="input sm:col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                  />
                </label>

                <label
                  htmlFor="phone"
                  className="label-input grid sm:grid-cols-3 w-full grid-cols-1"
                >
                  <p className="label sm:col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center lg:text-base text-sm">
                    Phone Number
                  </p>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    id="phone"
                    name="phone"
                    required
                    onChange={handleChange}
                    value={formData.phone}
                    className="input sm:col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                  />
                </label>

                <label
                  htmlFor="method"
                  className="label-input grid sm:grid-cols-3 w-full grid-cols-1"
                >
                  <p className="label sm:col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center lg:text-base text-sm">
                    Shipping Method
                  </p>
                  <select
                    name="method"
                    id="method"
                    required
                    onChange={handleChange}
                    value={formData.method}
                    className="input sm:col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
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
                  className="label-input grid sm:grid-cols-3 w-full grid-cols-1"
                >
                  <p className="label sm:col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center lg:text-base text-sm">
                    Note for the delivery personel
                  </p>
                  <input
                    type="text"
                    aria-multiline
                    id="note"
                    name="note"
                    onChange={handleChange}
                    value={formData.note}
                    className="input sm:col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                  ></input>
                </label>

                <input
                  type="submit"
                  value="Place Order Now"
                  className="submit-btn bg-white text-gray-500 font-beauty font-bold tracking-wider py-2 px-6 w-max h-max shadow-md rounded-full cursor-pointer"
                />
              </form>
            </div>
          ) : (
            <div className="product-confirmation w-full">
              {cart ? (
                <div className="product-list w-full flex flex-col justify-center items-center gap-4">
                  {Object.values(counts).map((pr) => (
                    <div
                      key={pr._id}
                      className="product-in-list flex flex-row w-full justify-between m-2 font-beauty text-gray-600 font-semibold"
                    >
                      <h2>{pr.name}</h2>
                      <p>X{pr.count}</p>
                    </div>
                  ))}
                  <button
                    onClick={createProducts}
                    className="confirm-btn  bg-white text-gray-500 font-beauty font-bold tracking-wider py-2 px-6 w-max h-max shadow-md rounded-full cursor-pointer"
                  >
                    Confirm Products
                  </button>
                </div>
              ) : (
                <div className="w-full h-maf flex flex-col justify-center items-center">
                  <h1 className="font-body font-semibold uppercase">
                    Ooops, seems your cart is empty, nothing to checkout!!
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
