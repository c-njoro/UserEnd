"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useUserInfoProvider } from "./GlobalState";
const axios = require("axios");

const Header = () => {
  const { userInfo } = useUserInfoProvider();

  const checkWidth = () => {
    const menu = document.getElementById("menu");
    if (window.innerWidth > 768) {
      if (!menu.classList.contains("hide")) {
        menu.classList.add("hide");
      }
    }
  };

  const closeIt = () => {
    const menu = document.getElementById("menu");
    menu.classList.add("hide");
  };

  useEffect(() => {
    window.addEventListener("resize", checkWidth);

    return () => {
      window.addEventListener("resize", checkWidth);
    };
  }, []);

  const toggleDrop = () => {
    const menu = document.getElementById("menu");

    if (menu.classList.contains("hide")) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  };

  return (
    <div className="main-header-container">
      <div className="logo">
        <img
          src="/images/storeLogo-removebg-preview.png"
          alt="c-techs logo"
          className="image"
        />
      </div>
      <div className="links">
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/about" className="link">
          About
        </Link>

        <Link href="/product" className="link">
          Products
        </Link>

        {userInfo.loggedIn ? (
          <Link href="/cart" className="link">
            Cart
          </Link>
        ) : (
          ""
        )}

        {userInfo.loggedIn ? (
          <Link
            href={`/profile/${userInfo.userData.username}`}
            className="link-profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
        ) : (
          <Link href="/sign" className="link-sign">
            Login / SignUp
          </Link>
        )}
      </div>

      <div className="drop-down" onClick={toggleDrop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <div className="drop-down-menu hide" id="menu">
        <div className="links-container">
          <Link href="/" className="link" onClick={closeIt}>
            Home
          </Link>
          <Link href="/about" className="link" onClick={closeIt}>
            About
          </Link>

          <Link href="/product" className="link" onClick={closeIt}>
            Products
          </Link>

          {userInfo.loggedIn ? (
            <Link href="/cart" className="link" onClick={closeIt}>
              Cart
            </Link>
          ) : (
            ""
          )}

          {userInfo.loggedIn ? (
            <Link
              href={`/profile/${userInfo.userData.name}`}
              className="link-profile"
              onClick={closeIt}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          ) : (
            <Link href="/sign" className="link-profile" onClick={closeIt}>
              Login / SignUp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
