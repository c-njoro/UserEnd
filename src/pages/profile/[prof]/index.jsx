import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";

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
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const userUrl = process.env.NEXT_PUBLIC_USERS_URL;
    const wholeUser = await checkAuthStatus();
    const { email } = wholeUser;
    const response = await axios.get(`${userUrl}/find`, {
      params: { email },
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    const foundUser = await response.data;
    setInfo(foundUser);

    if (foundUser.profilePicture) {
      setProfile(foundUser.profilePicture);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!userInfo) {
    if (loading) {
      return (
        <>
          <Loading />
        </>
      );
    }
    return <div>No User</div>;
  }

  return (
    <div className="main-profile-container">
      <div className="inner-container">
        <div className="details-side">
          <div className="user-name">
            <h1>
              Hello, {"   "}
              {userInfo.username}
            </h1>
          </div>
          <div className="profile-picture">
            <img
              src={`${profile}`}
              alt="Profile Picture"
              width="200"
              height="200"
              className="image"
            />
          </div>

          <div className="more-about">
            <p className="full-name">{userInfo.name}</p>
            <p className="email">{userInfo.email}</p>
          </div>
        </div>

        <div className="actions">
          <div className="my-orders">
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
            <Link href="/orders" className="link">
              {" "}
              My Orders
            </Link>
          </div>
          <div className="role">
            {userInfo.role === "admin" ? (
              <div className="role-show">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" icon size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
                <Link href="/manager" className="link">
                  {" "}
                  Manager
                </Link>
              </div>
            ) : (
              <div className="role-show">
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
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
                <Link href="/product" className="link">
                  Back to shop
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="danger-zone">
          <div className="logout">
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
          </div>
          <div className="delete">
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>

            <button>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
