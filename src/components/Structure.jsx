import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import { useUserInfoProvider } from "./GlobalState";
import Header from "./Header";
import useUserInfo from "./hooks/UserHook";

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
    <div className="relative w-full overflow-hidden h-max">
      <div className="fixed top-0 left-0 z-50 sm:bg-transparent bg-header">
        <Header />
      </div>
      <div className="w-full pt-[calc(12vh)]">{children}</div>
      <div>
        <Footer />
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Structure;
