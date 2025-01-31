import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { useUserInfoProvider } from "./GlobalState";
import Header from "./Header";
import useUserInfo from "./hooks/UserHook";

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

  const {
    data: userDetails,
    isLoading: detailsLoading,
    error: detailsError,
    refetch: detailsRefetch,
  } = useUserInfo();

  useEffect(() => {
    if (userDetails) {
      setUserInfo(userDetails);
    }
  }, [userDetails]);

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
