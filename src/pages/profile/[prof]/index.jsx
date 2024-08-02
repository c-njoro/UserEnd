import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/check-auth");
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
};

export default function Profile() {
  const [userInfo, setInfo] = useState();
  const [profile, setProfile] = useState("/images/profile.webp");

  const getUser = async () => {
    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;
    const response = await axios.get("http://localhost:3000/api/users/find", {
      params: { email },
    });
    const foundUser = await response.data;
    setInfo(foundUser);

    if (foundUser.profilePicture) {
      setProfile(`http://localhost:3000/uploader/${foundUser.profilePicture}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {}, [userInfo]);

  if (!userInfo) {
    return <div>No User</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <br />
      <img src={`${profile}`} alt="Profile Picture" width="200" height="200" />
      <br />
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
      <br />

      {userInfo.role === "admin" ? (
        <Link href="/manager">Manager</Link>
      ) : (
        <Link href="/product">Back to shop</Link>
      )}

      <br />

      <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
    </div>
  );
}
