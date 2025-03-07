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
    payment: "",
    note: "",
  });

  const { refetch: refetchCart } = useCart();

  const [orderProducts, setOrderProducts] = useState<orderProduct[]>([]);

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
    if (formData && orderProducts.length > 0) {
      makeTheOrder();
    }
  }, [formData, orderProducts]);

  const makeTheOrder = async () => {
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
        payment: "",
        note: "",
      });

      localStorage.removeItem("formData");
      localStorage.removeItem("orderProducts");
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
        Your order was successfully placed!!
      </h1>
      <h2 className="w-full text-center text-xl text-gray-600 tracking-widest">
        Thankyou for shopping with us!
      </h2>
      <Link
        href="/"
        className="bg-blue-200  w-max px-10 py-3 flex flex-row justify-center items-center uppercase tracking-widest font-bold text-sm text-gray-700"
      >
        Back to shop
      </Link>

      {formData && (
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-600">Order Details</h3>
          <div className="w-full flex flex-col gap-2">
            <h4 className="text-gray-600">Phone: {formData.phone}</h4>
            <h4 className="text-gray-600">Method: {formData.method}</h4>
            <h4 className="text-gray-600">Address: {formData.address}</h4>
            <h4 className="text-gray-600">Payment: {formData.payment}</h4>
            <h4 className="text-gray-600">Note: {formData.note}</h4>
          </div>
        </div>
      )}

      {orderProducts && (
        <div>
          {orderProducts.map((product, index) => (
            <div key={index} className="w-full flex flex-col gap-2">
              <h3 className="text-lg font-bold text-gray-600">
                Product {index + 1}
              </h3>
              <h4 className="text-gray-600">
                Product Name: {product.productName}
              </h4>
              <h4 className="text-gray-600">Quantity: {product.quantity}</h4>
              <h4 className="text-gray-600">Unit Price: {product.unitPrice}</h4>
              <h4 className="text-gray-600">
                Total Price: {product.totalPrice}
              </h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThankyouPage;
