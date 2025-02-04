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
  const [mpesa, setMpesa] = useState("pay-hide");
  const [wallet, setWallet] = useState("pay-hide");
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    payment: "",
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

  const mpesaToggle = () => {
    if (mpesa === "pay-hide" && wallet === "pay-hide") {
      setMpesa("mpesa");
    } else if (mpesa === "pay-hide" && wallet !== "pay-hide") {
      setMpesa("mpesa");
      setWallet("pay-hide");
    }
  };

  const walletToggle = () => {
    if (mpesa === "pay-hide" && wallet === "pay-hide") {
      setWallet("wallet");
    } else if (mpesa !== "pay-hide" && wallet === "pay-hide") {
      setWallet("wallet");
      setMpesa("pay-hide");
    }
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

  //update stock after purchase
  const updateStock = () => {
    try {
      Object.values(counts).map(async (co) => {
        const newStock = co.stock - co.count;
        const updateStock = await axios.put(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updateProducts?id=${co._id}`,
          { stock: newStock },
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
      });
    } catch (error) {
      console.log("Error while updating stock: ", error);
    }
  };

  //clearing the cart after order
  const clearCart = async () => {
    try {
      const clearTheCart = await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updateUser?id=${userInfo.userData._id}`,
        {
          favoriteProducts: [],
        }
      );
      console.log("Cart cleared");
      const updatedUser = clearTheCart.data;
      updatedUser ? refetchCart() : "";
    } catch (error) {
      console.log("An error while clearing cart: ", error);
    }
  };

  const makingTheOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.address ||
      !formData.phone ||
      !formData.payment ||
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

    try {
      const order = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/makeOrder`,
        {
          customerId: userInfo.userData._id,
          shippingAddress: formData.address,
          contactInfo: {
            phone: formData.phone,
            email: userInfo.userData.email,
          },
          paymentMethod: formData.payment,
          transactionId: "TEST_ID",
          totalAmount: total,
          products: orderProducts,
          shippingMethod: formData.method,
          shippingCost: 5,
          taxRate: 0.123,
          taxAmount: 10.08,
          orderNotes: formData.note,
          internalNotes: "New customer, verify address first.",
        }
      );

      clearCart();

      updateStock();

      setOrderProducts([]);

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
      });

      router.push("/");
    } catch (error) {
      toast.error("An error occured, Please Try Again!!", {
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

  return (
    <div className="main-checkout-container bg-blue-100 flex flex-col p-4 w-screen min-h-[calc(88vh)] font-beauty">
      <div className="heading flex justify-center sm:flex-row flex-col px-2 w-full items-center mb-4">
        <h1 className="header font-bold text-gray-700 text-3xl p-2">
          Check Out Your Cart
        </h1>
      </div>

      <div className="pay-toggle flex flex-col justify-center items-center text-base text-gray-500 font-bold font-beauty">
        <p>Totals: Ksh. {total}</p>
        <p>Pay Via: </p>
        <div className="btns flex flex-row">
          <button
            onClick={mpesaToggle}
            className="payment-mthd text-sm text-green-500 capitalize font-bold bg-gray-100 px-4 py-2  flex justify-center items-center gap-2 shadow-md border-r-2 border-l-2 border-gray-300"
          >
            M-Pesa
          </button>
          <button
            onClick={walletToggle}
            className="payment-mthd text-sm text-orange-500 capitalize font-bold bg-gray-100 px-4 py-2  flex justify-center items-center gap-2 shadow-md border-r-2 border-l-2 border-gray-300"
          >
            Wallet
          </button>
        </div>
      </div>

      <div
        className={`${mpesa} method-chosen w-full h-max justify-center pt-8`}
      >
        <div className="mpesa bg-blue-50 rounded-3xl shadow-lg lg:w-1/2 md:w-2/3 sm:w-4/5 w-11/12 flex flex-col gap-4 p-8">
          <div className="mpesa-label w-full flex justify-center items-center h-max">
            <img
              src="/images/M-PESA-removebg-preview.png"
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
                onSubmit={makingTheOrder}
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
                  htmlFor="payment"
                  className="label-input grid sm:grid-cols-3 w-full grid-cols-1"
                >
                  <p className="label sm:col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center lg:text-base text-sm">
                    Payment Method
                  </p>
                  <select
                    name="payment"
                    id="payment"
                    required
                    onChange={handleChange}
                    value={formData.payment}
                    className="input sm:col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                  >
                    <option value="default">-Select Payment Method-</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="onDelivery">Pay On Delivery</option>
                  </select>
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

      <div className={`${wallet} method-chosen`}>
        <h1>Wallet</h1>
      </div>
    </div>
  );
}
