import useProducts from "@/components/hooks/ProductsHook";
import useUserInfo from "@/components/hooks/UserHook";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const {
    data: initialProducts,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const { refetch: refetchUser } = useUserInfo();

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <div className="main-home-container w-screen min-h-screen bg-blue-100 flex flex-col justify-center items-center gap-10 pb-12">
      <div className="topper w-full h-[calc(60vh)]  relative  shadow-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="info w-full h-full flex flex-col justify-center items-center absolute gap-6"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 className="off font-bold sm:text-9xl text-7xl  font-body text-white tracking-wider">
            10% OFF
          </h1>
          <h3 className="every font-body font-bold text-white sm:text-4xl text-3xl tracking-widest uppercase">
            On everything
          </h3>
          <p className="font-light font-body tracking-wide capitalize text-white">
            Shop Technology here at C-Techs
          </p>
          <Link
            href="/product"
            className="shop bg-white shadow-md w-max px-6 py-3 uppercase font-bold font-beauty text-green-600 tracking-wide rounded-full flex flex-row items-center gap-4 justify-center hover:text-white hover:bg-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <p>shop now</p>
          </Link>
        </motion.div>
      </div>

      <div className="top-products  w-full min-h-[calc(30vh)] h-max flex flex-col items-center justify-center gap-4">
        <div className="sub-heading w-full h-max flex flex-col justify-start p-4 capitalize font-semibold font-body text-2xl tracking-wide text-gray-700">
          <h1 className="sub">top products</h1>
        </div>
        <div className="top-cards w-full flex justify-center items-center h-max">
          {initialProducts ? (
            <div className="the-cards w-full grid md:grid-cols-4 grid-cols-2 gap-6  place-items-center h-max">
              {initialProducts.slice(0, 4).map((pr) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  key={pr._id}
                  className="card lg:w-[calc(18vw)] md:w-[calc(20vw)] w-[calc(40vw)] min-h-[calc(32vh)]  flex flex-col gap-4 bg-blue-50 rounded shadow-lg overflow-hidden"
                >
                  <div className="image-holder w-full h-[calc(25vh)] overflow-hidden">
                    {pr.images.length > 0 ? (
                      <img
                        src={`${pr.images[0].url}`}
                        alt="Product Picture"
                        className="image w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/noImage.webp"
                        alt="Product Picture"
                        className="image w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <Link
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100,
                    }}
                    href={`/product/${pr._id}`}
                    className="details pl-4 pb-4 flex flex-col gap-2"
                  >
                    <p className="name font-body font-semibold text-gray-600 text-sm sm:text-base">
                      {pr.name}
                    </p>
                    <p
                      className="price-strike font-beauty font-semibold text-red-600 text-sm sm:text-base"
                      style={{ textDecoration: "line-through" }}
                    >
                      {(pr.price + pr.price * 0.1).toFixed(2)}
                    </p>
                    <p className="price font-beauty font-semibold text-green-600 text-sm sm:text-base">
                      Ksh. {pr.price}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : productsLoading ? (
            <div className="w-full h-max flex flex-col justify-center items-center">
              <p className="font-bold font-body tracking-widest ">Loading...</p>
            </div>
          ) : productsError ? (
            <div className="w-full h-max flex flex-col justify-center items-center">
              <p className="text-red-500 font-body font-bold tracking-wider">
                Server Error while fetching top products
              </p>
              <button
                onClick={() => refetchProducts()}
                className="bg-black text-white w-max h-max py-3 px-5 rounded-full shadow-lg uppercase text-sm tracking-wider"
              >
                Retry Fetch
              </button>
            </div>
          ) : (
            <div className="w-full h-max flex flex-col justify-center items-center">
              <p className="text-red-500 font-body font-bold tracking-wider">
                Problem occured on products fetch
              </p>
              <button
                onClick={() => refetchProducts()}
                className="bg-black text-white w-max h-max py-3 px-5 rounded-full shadow-lg uppercase text-sm tracking-wider"
              >
                Retry Fetch
              </button>
            </div>
          )}
        </div>
        <div className="sub-heading w-full">
          <Link
            href="/product"
            className="link w-full flex justify-center items-center bg-blue-100 shadow-md rounded-full py-3 font-body font-semibold uppercase tracking-widest"
          >
            View All
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
        className="new-arrival w-[calc(80vw)] max-h-[calc(50vh)] grid sm:grid-cols-2  bg-blue-50 rounded-lg shadow-2xl relative"
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          className="shop-new flex flex-col gap-4 items-center justify-center w-full h-[calc(50vh)] z-20 px-1"
        >
          <h1 className="head capitalize font-bold font-body text-4xl tracking-wider text-gray-800">
            Shop New Arrivals
          </h1>
          <Link
            href="/product"
            className="now bg-white shadow-md w-2/3 px-6 py-3 uppercase font-bold font-beauty text-green-600 
        tracking-wide rounded-md flex flex-row items-center gap-4 justify-center hover:bg-green-600 hover:text-white"
          >
            Shop Now
          </Link>
        </motion.div>
        <div className="new-image flex flex-col gap-4 items-center justify-center w-full h-[calc(50vh)] absolute sm:relative">
          <img
            src="/images/intro.png"
            alt="company image"
            className="image w-full h-[calc(50vh)] object-cover"
            style={{ objectPosition: "top" }}
          />
        </div>
      </motion.div>

      <div className="learn-more grid lg:grid-cols-2 md:grid-cols-3 w-[calc(95vw)] gap-4 p-4 grid-cols-1 relative">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="company-image"
        >
          <img
            src="/images/storeLogo-removebg-preview.png"
            alt="company image"
            className="image lg:w-full lg:h-[calc(65vh)] md:w-[calc(40vh)] md:h-[calc(40vh)] lg:rounded-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          className="company-desc flex flex-col justify-center items-start gap-6 lg:col-span-1 md:col-span-2 z-20"
        >
          <h2 className="learn capitalize font-bold font-body text-2xl sm:text-4xl tracking-wider text-gray-700">
            learn more about c-techs
          </h2>
          <p className="desc font-beauty font-semibold text-gray-500 tracking-wide sm:text-base text-sm">
            HP Envy 6055e All-in-One Printer The HP Envy 6055e is an all-in-one
            printer that offers printing, scanning, and copying capabilities. It
            features wireless connectivity, high-quality prints, and easy setup,
            making it ideal for home offices.
          </p>
          <Link
            href="/about"
            className="more  bg-white shadow-md w-full px-6 py-3 uppercase font-bold font-beauty
         text-green-600 tracking-wide rounded-md flex flex-row items-center gap-4 justify-center hover:bg-green-600 hover:text-white"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      <div className="integrity-cards grid grid-cols-1 place-items-center gap-4 w-full h-max md:grid-cols-3 md:w-[calc(80vw)]">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="card flex flex-col gap-2 justify-center items-center w-11/12 bg-blue-50 rounded-lg shadow-lg px-2 py-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="orange"
            className="icon size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <h1 className="uppercase font-body font-semibold tracking-wider text-gray-700 ">
            fast delivery
          </h1>
          <p className="capitalize font-beauty text-gray-600 flex justify-center items-center tracking-wide text-sm sm:text-base">
            We ensure that what you ordered arrives at the desired destination
            in time and in the utmost desired state.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="card flex flex-col gap-2 justify-center items-center w-11/12 bg-blue-50 rounded-lg shadow-lg px-2 py-5 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="green"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <h1 className="uppercase font-body font-semibold tracking-wider text-gray-700">
            affordable prices
          </h1>
          <p className="capitalize font-beauty text-gray-600 flex justify-center items-center tracking-wide text-sm sm:text-base">
            We ensure that what you ordered arrives at the desired destination
            in time and in the utmost desired state.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="card flex flex-col gap-2 justify-center items-center w-11/12 bg-blue-50 rounded-lg shadow-lg px-2 py-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="blue"
            className="icon size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <h1 className="uppercase font-body font-semibold tracking-wider text-gray-700">
            quality products
          </h1>
          <p className="capitalize font-beauty text-gray-600 flex justify-center items-center tracking-wide text-sm sm:text-base">
            We ensure that what you ordered arrives at the desired destination
            in time and in the utmost desired state.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
        }}
        className="client-reviews w-[calc(95vw)] h-max flex flex-col"
      >
        <div className="sub-heading w-full h-max flex flex-col justify-start p-4 capitalize font-semibold font-body text-2xl tracking-wide text-gray-700">
          <h1>Client reviews</h1>
        </div>
        <div className="the-reviews w-full h-max grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="review w-full grid grid-cols-2 gap-8 h-[calc(35vh)] bg-blue-50 place-items-center rounded-lg shadow-lg p-5">
            <div className="client-info flex flex-col gap-4 w-full">
              <img
                src="https://images.pexels.com/photos/11093561/pexels-photo-11093561.jpeg"
                alt="client-profile-image"
                className="image w-10/12 h-[calc(20vh)] rounded-lg shadow-lg object-cover"
              />
              <p className="name capitalize font-bold font-body tracking-wide text-gray-600 sm:text-xl text-base pl-5">
                Michael Boston
              </p>
            </div>
            <div className="client-rating w-full text-gray-500 font-bold tracking-wide font-beauty flex flex-col gap-5">
              <div className="rating">
                <Rating
                  name="rating"
                  value={4}
                  readOnly
                  precision={0.5}
                  size="medium" // Available sizes: small, medium, large
                />
              </div>
              <div className="review-msg w-full h-full text-gray-500 font-bold tracking-wide font-beauty flex flex-col gap-5 text-sm sm:text-base">
                <p className="font-thin h-1/2 overflow-hidden">
                  The customer service was fantastic! My questions were answered
                  promptly, and they even helped me choose the best product for
                  my needs. I'll definitely shop here again!
                </p>
              </div>
            </div>
          </div>
          <div className="review w-full grid grid-cols-2 gap-8 h-[calc(35vh)] bg-blue-50 place-items-center rounded-lg shadow-lg p-5">
            <div className="client-info flex flex-col gap-4 w-full">
              <img
                src="https://images.pexels.com/photos/30446434/pexels-photo-30446434/free-photo-of-profile-of-a-thoughtful-man-outdoors.jpeg"
                alt="client-profile-image"
                className="image w-10/12 h-[calc(20vh)] rounded-lg shadow-lg object-cover"
              />
              <p className="name capitalize font-bold font-body tracking-wide text-gray-600 sm:text-xl text-base pl-5">
                Jack Burrow
              </p>
            </div>
            <div className="client-rating w-full text-gray-500 font-bold tracking-wide font-beauty flex flex-col gap-5">
              <div className="rating">
                <Rating
                  name="rating"
                  value={4}
                  readOnly
                  precision={0.5}
                  size="medium" // Available sizes: small, medium, large
                />
              </div>
              <div className="review-msg w-full text-gray-500 font-bold tracking-wide font-beauty flex flex-col gap-5 text-sm sm:text-base">
                <p className="font-thin">
                  I was amazed by how quickly my order arrived! The packaging
                  was secure, and the product was exactly as described. Highly
                  recommend this store!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
