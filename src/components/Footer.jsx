import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="main-footer-container">
      <div className="newsletter">
        <div className="prompt">
          <p>Subscribe to our</p>
          <h2>newsletter</h2>
        </div>
        <div className="form">
          <form>
            <input
              type="email"
              required
              className="email"
              placeholder="Enter your email address..."
            />
            <input type="submit" value="submit" className="submit" />
          </form>
        </div>
      </div>

      <div className="information">
        <div className="company part">
          <h1>C-Techs</h1>
          <p>
            It features wireless connectivity, high-quality prints, and easy
            setup, making it ideal for home offices.
          </p>
          <div className="socials">
            <h5>
              <FiFacebook />
            </h5>
            <h5>
              <FaInstagram />
            </h5>
            <h5>
              <FaTiktok />
            </h5>
            <h5>
              <FaLinkedinIn />
            </h5>
          </div>
        </div>

        <div className="more part">
          <h1>Information</h1>
          <p>Our company</p>
          <p>About us</p>
          <p>Blog</p>
        </div>

        <div className="helpful-links part">
          <h1>Helpful links</h1>
          <p>Services</p>
          <p>support</p>
          <p>Terms and conditions</p>
        </div>

        <div className="navigation part">
          <h1>Navigation</h1>
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/product">Products</Link>
          </p>
          <p>
            <Link href="/about">About Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
