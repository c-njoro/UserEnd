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
    <div className="main-header-container bg-blue-50 flex flex-row justify-between w-screen h-[calc(12vh)] items-center  relative rounded-lg shadow-lg">
      <div className="logo  p-0 w-1/5 min-w-52">
        <img
          src="/images/storeLogo-removebg-preview.png"
          alt="c-techs logo"
          className="image w-full object-cover"
        />
      </div>
      <div className="links hidden md:flex flex-row gap-4 items-center font-body pr-8">
        <Link
          href="/"
          className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
        >
          About
        </Link>

        <Link
          href="/product"
          className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
        >
          Products
        </Link>

        {userInfo.loggedIn ? (
          <Link
            href="/cart"
            className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
          >
            Cart
          </Link>
        ) : (
          ""
        )}

        {userInfo.loggedIn ? (
          <Link
            href={`/profile/${userInfo.userData.username}`}
            className="link-profile flex items-center justify-center bg-blue-50 px-4 py-1 shadow rounded-full"
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

      <div
        className="drop-down md:hidden cursor-pointer mr-8 flex justify-center"
        onClick={toggleDrop}
      >
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

      <div
        className="drop-down-menu hide absolute right-8 top-[calc(12vh)] z-10"
        id="menu"
      >
        <div className="links-container sm:w-[calc(30vw)] h-max flex flex-col gap-4 px-8 justify-center items-end bg-blue-50 rounded-md w-[calc(50vw)]">
          <Link
            href="/"
            className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
            onClick={closeIt}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
            onClick={closeIt}
          >
            About
          </Link>

          <Link
            href="/product"
            className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
            onClick={closeIt}
          >
            Products
          </Link>

          {userInfo.loggedIn ? (
            <Link
              href="/cart"
              className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full"
              onClick={closeIt}
            >
              Cart
            </Link>
          ) : (
            ""
          )}

          {userInfo.loggedIn ? (
            <Link
              href={`/profile/${userInfo.userData.name}`}
              className="link-profile flex items-center justify-center bg-blue-50 px-4 py-1 shadow rounded-full mb-5"
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
            <Link
              href="/sign"
              className="link-profile flex items-center justify-center bg-blue-50 px-4 py-1 shadow rounded-full mb-5"
              onClick={closeIt}
            >
              Login / SignUp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
