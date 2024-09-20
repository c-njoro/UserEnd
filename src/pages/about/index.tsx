import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="main-about-container">
      <div className="vision">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="image-side"
        >
          <img
            src="/images/topbg.webp"
            alt="company aesthetic home"
            className="image"
          />
        </motion.div>

        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="detail-side"
        >
          <h1>our vision: professional energy for you</h1>
          <p>
            The Logitech MX Master 3 is an advanced wireless mouse with a
            comfortable ergonomic design, customizable buttons, and ultra-fast
            scrolling. It offers precise control and long battery life, suitable
            for professionals.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="core-values"
      >
        <h1>our core values</h1>
        <p>
          The Logitech MX Master 3 is an advanced wireless mouse with a
          comfortable ergonomic design, customizable buttons, and ultra-fast
          scrolling. It offers precise control and long battery life, suitable
          for professionals.The Logitech MX Master 3 is an advanced wireless
          mouse with a comfortable ergonomic design, customizable buttons, and
          ultra-fast scrolling. It offers precise control and long battery life,
          suitable for professionals.
        </p>
      </motion.div>

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

      <div className="professional-workers">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="detail-side"
        >
          <h1>professional customer care and delivery personnel</h1>

          <p>
            our customer care group professionaly handles customer needs and
            helps you make best choices. Our delivery people are polite and
            punctual too.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="image-side"
        >
          <img src="/images/home.png" alt="end image" />
        </motion.div>
      </div>
    </div>
  );
}
