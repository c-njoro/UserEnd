import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <div
      className="main-footer-container w-[calc(100vw)] h-max relative flex flex-col gap-4 justify-center items-center"
      style={{ backgroundColor: "rgb(199, 217, 234)" }}
    >
      <div className="newsletter w-full grid grid-cols-1 place-items-center  py-2 gap-2 shadow-sm md:absolute md:-top-8 md:w-10/12 md:px-8 md:rounded-full md:shadow-xl md:grid-cols-3 bg-blue-50">
        <div className="prompt md:col-span-1">
          <p className="capitalize tracking-wide font-body flex justify-center text-gray-500">
            Subscribe to our
          </p>
          <h2 className="uppercase font-bold font-beauty text-lg text-gray-600 tracking-wider flex justify-center">
            newsletter
          </h2>
        </div>
        <div className="form w-full flex justify-center md:col-span-2">
          <form className=" w-full flex flex-row gap-2 px-5 justify-between">
            <input
              type="email"
              required
              className="email w-4/5 h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
              placeholder="Enter your email address..."
            />
            <input
              type="submit"
              value="submit"
              className="submit bg-white text-gray-700 font-beauty font-bold tracking-wider py-1 uppercase px-6 
          w-max h-max shadow-md rounded-lg cursor-pointer"
            />
          </form>
        </div>
      </div>

      <div className="information w-full h-max grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center pb-4 md:mt-16 lg:grid-cols-4">
        <div className="company part w-full flex flex-col gap-1 justify-start pl-8">
          <h1 className="font-bold capitalize font-body tracking-wider text-lg text-gray-800">
            C-Techs
          </h1>
          <p className="font-semibold font-body text-gray-600 text-sm">
            It features wireless connectivity, high-quality prints, and easy
            setup, making it ideal for home offices.
          </p>
          <div className="socials w-full flex flex-row justify-start gap-3 mt-2">
            <h5 className="text-xl text-gray-500 bg-blue-100 p-2 rounded-lg shadow-sm">
              <FiFacebook />
            </h5>
            <h5 className="text-xl text-gray-500 bg-blue-100 p-2 rounded-lg shadow-sm">
              <FaInstagram />
            </h5>
            <h5 className="text-xl text-gray-500 bg-blue-100 p-2 rounded-lg shadow-sm">
              <FaTiktok />
            </h5>
            <h5 className="text-xl text-gray-500 bg-blue-100 p-2 rounded-lg shadow-sm">
              <FaLinkedinIn />
            </h5>
          </div>
        </div>

        <div className="more part w-full flex flex-col gap-1 justify-start pl-8">
          <h1 className="font-bold capitalize font-body tracking-wider text-lg text-gray-800">
            Information
          </h1>
          <p className="font-semibold font-body text-gray-600 text-sm">
            {" "}
            Our company
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">
            About us
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">Blog</p>
        </div>

        <div className="helpful-links part w-full flex flex-col gap-1 justify-start pl-8">
          <h1 className="font-bold capitalize font-body tracking-wider text-lg text-gray-800">
            Helpful links
          </h1>
          <p className="font-semibold font-body text-gray-600 text-sm">
            Services
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">
            support
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">
            Terms and conditions
          </p>
        </div>

        <div className="navigation part w-full flex flex-col gap-1 justify-start pl-8">
          <h1 className="font-bold capitalize font-body tracking-wider text-lg text-gray-800">
            Navigation
          </h1>
          <p className="font-semibold font-body text-gray-600 text-sm">
            <Link href="/">Home</Link>
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">
            <Link href="/product">Products</Link>
          </p>
          <p className="font-semibold font-body text-gray-600 text-sm">
            <Link href="/about">About Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
