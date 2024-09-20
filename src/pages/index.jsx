import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

export default function Home({ products }) {
  const [initialProducts, setProducts] = useState([]);

  useEffect(() => {
    setProducts(products);
  }, []);

  return (
    <div className="main-home-container">
      <div className="topper">
        <div className="overlay"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="info"
        >
          <h1 className="off">10% OFF</h1>
          <h3 className="every">On everything</h3>
          <p>Shop Technology here at C-Techs</p>
          <Link href="/product" className="shop">
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

      <div className="top-products">
        <div className="sub-heading">
          <h1 className="sub">top products</h1>
        </div>
        <div className="top-cards">
          {initialProducts.length > 0 ? (
            <div className="the-cards">
              {initialProducts.slice(0, 4).map((pr) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  key={pr._id}
                  className="card"
                >
                  <div className="image-holder">
                    {pr.images.length > 0 ? (
                      <img
                        src={`${pr.images[0].url}`}
                        alt="Product Picture"
                        className="image"
                      />
                    ) : (
                      <img
                        src="/images/noImage.webp"
                        alt="Product Picture"
                        className="image"
                      />
                    )}
                  </div>
                  <motion.Link
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 100,
                    }}
                    href={`/product/${pr._id}`}
                    className="details"
                  >
                    <p className="name">{pr.name}</p>
                    <p className="price-strike">
                      {(pr.price + pr.price * 0.1).toFixed(2)}
                    </p>
                    <p className="price">Ksh. {pr.price}</p>
                  </motion.Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div>No Top Products</div>
          )}
        </div>
        <div className="sub-heading">
          <Link href="/product" className="link">
            View All
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
        className="new-arrival"
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
          className="shop-new"
        >
          <h1 className="head">Shop New Arrivals</h1>
          <Link href="/product" className="now">
            Shop Now
          </Link>
        </motion.div>
        <div className="new-image">
          <img src="/images/intro.png" alt="company image" className="image" />
        </div>
      </motion.div>

      <div className="learn-more">
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
            className="image"
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
          className="company-desc"
        >
          <h2 className="learn">learn more about c-techs</h2>
          <p className="desc">
            HP Envy 6055e All-in-One Printer The HP Envy 6055e is an all-in-one
            printer that offers printing, scanning, and copying capabilities. It
            features wireless connectivity, high-quality prints, and easy setup,
            making it ideal for home offices.
          </p>
          <Link href="/about" className="more">
            Learn More
          </Link>
        </motion.div>
      </div>

      <div className="integrity-cards">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <h1>fast delivery</h1>
          <p>
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
          className="card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <h1>affordable prices</h1>
          <p>
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
          className="card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="icon size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <h1>quality products</h1>
          <p>
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
        className="client-reviews"
      >
        <div className="sub-heading">
          <h1>Client reviews</h1>
        </div>
        <div className="the-reviews">
          <div className="review">
            <div className="client-info">
              <img
                src="/images/profile.webp"
                alt="client-profile-image"
                className="image"
              />
              <p className="name">Client name</p>
            </div>
            <div className="client-rating">
              <div className="rating">
                <ReactStars
                  count={5}
                  value={4}
                  activeColor="#ffd700"
                  edit={false} // Prevents user from changing the rating
                  classNames="stars"
                />
              </div>
              <div className="review-msg">
                <p>
                  This company gives 5 star customer follow up and warranty
                  services
                </p>

                <button className="btn">view client</button>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="client-info">
              <img
                src="/images/profile.webp"
                alt="client-profile-image"
                className="image"
              />
              <p className="name">Client name</p>
            </div>
            <div className="client-rating">
              <div className="rating">
                <ReactStars
                  count={5}
                  value={4}
                  activeColor="#ffd700"
                  edit={false} // Prevents user from changing the rating
                  classNames="stars"
                />
              </div>
              <div className="review-msg">
                <p>
                  This company gives 5 star customer follow up and warranty
                  services
                </p>

                <button className="btn">view client</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export async function getServerSideProps() {
  const productsUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
  const res = await fetch(`${productsUrl}`, {
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
