import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";

const Structure = ({ children }) => {
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
