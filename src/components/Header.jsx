"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [exData, setEx] = useState();
  const [userInfo, setInfo] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const response = await checkAuthStatus();
      setIsAuthenticated(response.authenticated);
      setEx(response.user);
    };

    fetchAuthStatus();

    if (isAuthenticated) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.username);
    }
  }, [userInfo]);

  const getUser = async () => {
    const { email } = exData;
    const response = await axios.get("http://localhost:3000/api/users/find", {
      params: { email },
    });
    const foundUser = await response.data;
    setInfo(foundUser);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [exData]);

  return (
    <div className="main-header">
      <div className="logo"></div>
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

        {isAuthenticated ? (
          <Link href="/cart" className="link">
            Cart
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="profile">
        {isAuthenticated ? (
          <Link href={`/profile/${name}`} className="link">
            <FaRegUser />, Welcome {name}
          </Link>
        ) : (
          <Link href="/sign" className="link">
            Sign Up / Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
