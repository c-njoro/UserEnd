import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { useUserInfoProvider } from "./GlobalState";
import Header from "./Header";

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

const Structure = ({ children }) => {
  const { userInfo, setUserInfo } = useUserInfoProvider();

  const getUserInfo = async () => {
    const statusInfo = await checkAuthStatus();

    if (!statusInfo.authenticated) {
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/oneUser?email=${statusInfo.user.email}`
      );
      const userDetails = res.data;
      console.log("From Structure: ", userDetails);
      setUserInfo({
        loggedIn: true,
        email: statusInfo.user.email,
        userData: userDetails,
      });
    } catch (error) {
      console.error("Could not fetch user: ", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="bg-blue-100">
      <div className="fixed top-0 left-0 z-50">
        <Header />
      </div>
      <div className="pt-[calc(12vh)] pb-5 md:mb-12">{children}</div>
      <div>
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Structure;
