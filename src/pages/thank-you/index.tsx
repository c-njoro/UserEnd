import { useUserInfoProvider } from "@/components/GlobalState";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCart from "../../components/hooks/cartHook";

interface orderProduct {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const ThankyouPage = () => {
  const router = useRouter();
  const { tracking_id } = router.query;
  const { userInfo } = useUserInfoProvider();
  const [formData, setFormData] = useState({
    phone: "",
    method: "",
    address: "",
    note: "",
  });

  const { refetch: refetchCart } = useCart();

  const [orderProducts, setOrderProducts] = useState<orderProduct[]>([]);
  const [creatingOrder, setCreatingOrder] = useState(true);
  const [continueTry, setContinueTry] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }

      const savedOrderProducts = localStorage.getItem("orderProducts");
      if (savedOrderProducts) {
        setOrderProducts(JSON.parse(savedOrderProducts));
      }
    }
  }, []);

  useEffect(() => {
    const isFormDataComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (isFormDataComplete && orderProducts.length >= 1 && continueTry) {
      const retry = setTimeout(() => {
        console.log("Retrying order creation...");
        makeTheOrder();
      }, 1500);

      return () => clearTimeout(retry); // Cleanup to prevent multiple calls
    }
  }, [formData, orderProducts, continueTry]); // ✅ Add continueTry to prevent unnecessary loops

  const makeTheOrder = async () => {
    setCreatingOrder(true);

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

    setContinueTry(false);

    const total = orderProducts.reduce((acc, product) => {
      return acc + product.totalPrice;
    }, 0);

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
          paymentMethod: "Paid while ordering",
          paymentStatus: "paid",
          transactionId: tracking_id ? tracking_id : "Test_Paid",
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
        method: "",
        address: "",
        note: "",
      });

      localStorage.removeItem("formData");
      localStorage.removeItem("orderProducts");
      setCreatingOrder(false);
    } catch (error) {
      toast.warn("Wait as we process your order!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Error placing order", error);
      setContinueTry(true);
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="w-full text-center text-3xl font-body font-bold text-green-600 tracking-widest">
        {creatingOrder
          ? "Your payment was successful, we are processing your order"
          : "Your Order Was Placed Successfully!"}
      </h1>
      {creatingOrder ? (
        <div className="h-max w-max flex flex-row justify-between items-center px-8 py-3 rounded-lg shadow-lg bg-blue-300">
          <p className="text-sm font-bold uppercase mr-5 tracking-widest text-white">
            Processing Order
          </p>
          <div className="bg-transparent border-l border-t border-b w-10 h-10 rounded-full animate-spin"></div>
        </div>
      ) : (
        <h2 className="w-full text-center text-xl text-gray-600 tracking-widest">
          Thankyou for shopping with us!
        </h2>
      )}

      {!creatingOrder && (
        <Link
          href="/"
          className="bg-blue-200  w-max px-10 py-3 flex flex-row justify-center items-center uppercase tracking-widest font-bold text-sm text-gray-700"
        >
          Continue Shopping
        </Link>
      )}
    </div>
  );
};

export default ThankyouPage;
