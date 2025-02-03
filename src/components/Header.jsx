"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserInfoProvider } from "./GlobalState";

const Header = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoProvider();
  const [menuClass, setMenuClass] = useState("hide");

  const toggleDrop = () => {
    if (menuClass === "hide") {
      setMenuClass("menu-show");
    } else {
      setMenuClass("hide");
    }
  };

  useEffect(() => {
    // Set menu to hide on route change
    setMenuClass("hide");
  }, [router.asPath]);

  return (
    <div className="bg-blue-50 w-screen h-max flex flex-col">
      <div className="bg-blue-50 flex flex-row justify-between p-4 items-center w-[calc(100vw)] h-[calc(10vh)] fixed z-10">
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
      </div>

      <div className={`${menuClass}`}>
        <div
          className="w-screen h-[calc(100vh)]  grid lg:grid-cols-2 grid-cols-1 text-foreground bg-blue-50"
          id="menu"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-8 relative">
            <Link
              href="/"
              className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full w-full"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full w-full"
            >
              About
            </Link>

            <Link
              href="/product"
              className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full w-full"
            >
              Products
            </Link>

            {userInfo.loggedIn ? (
              <Link
                href="/cart"
                className="link text-gray-950 bg-blue-50 px-4 py-1 shadow rounded-full w-full"
              >
                Cart
              </Link>
            ) : (
              ""
            )}

            {userInfo.loggedIn ? (
              <Link
                href={`/profile/${userInfo.userData.username}`}
                className="link-profile flex items-center justify-center bg-blue-50 px-4 py-1 shadow rounded-full w-full"
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
        </div>
      </div>
    </div>
  );
};

export default Header;
