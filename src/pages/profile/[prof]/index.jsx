import Link from "next/link";
import { useUserInfoProvider } from "../../../components/GlobalState";

export default function Profile() {
  const { userInfo } = useUserInfoProvider();

  if (!userInfo) {
    return <div>No User</div>;
  }

  return (
    <div className="main-profile-container bg-blue-100 flex  flex-col gap-4  w-screen min-h-screen  p-4;">
      <div className="inner-container  flex flex-col gap-4">
        <div className="details-side bg-inherit">
          <div className="user-name font-light text-gray-600 text-xl my-4 font-beauty">
            <h1>
              Hello, {"   "}
              {userInfo.userData.username}
            </h1>
          </div>
          <div className="profile-picture w-11/12 max-w-80">
            <img
              src={
                userInfo.userData.profilePicture
                  ? `${userInfo.userData.profilePicture}`
                  : "/images/profile.webp"
              }
              alt="Profile Picture"
              width="200"
              height="200"
              className="image w-full rounded-md shadow-xl mb-4 object-cover max-h-60"
            />
          </div>

          <div className="more-about font-beauty">
            <p className="full-name capitalize font-semibold text-xl text-gray-800 m-2">
              {userInfo.userData.name}
            </p>
            <p className="email font-semibold text-sm text-gray-700 m-2">
              {userInfo.userData.email}
            </p>
          </div>
        </div>

        <div className="actions font-body">
          <div className="my-orders flex flex-row items-center gap-4 bg-white w-max min-w-40 px-4 py-2 rounded-full shadow-md my-2 hover:bg-gray-50">
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
            <Link
              href="/orders"
              className="link font-bold text-sm hover:text-green-400"
            >
              {" "}
              My Orders
            </Link>
          </div>
          <div className="role flex flex-row items-center gap-4 bg-white w-max px-4 py-2 rounded-full shadow-md my-2 min-w-40 hover:bg-gray-50">
            {userInfo.userData.role === "admin" ? (
              <div className="role-show flex flex-row gap-4 items-center hover:text-green-400">
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
                <Link
                  target="_blank"
                  href="/admin"
                  className="link font-bold text-sm;"
                >
                  {" "}
                  Manager
                </Link>
              </div>
            ) : (
              <div className="role-show flex flex-row gap-4 items-center hover:text-green-400">
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
                <Link href="/product" className="link font-bold text-sm;">
                  Back to shop
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="danger-zone font-body  border-t-2 border-gray-300">
          <div className="logout flex flex-row items-center gap-4 bg-white w-max px-4 py-2 rounded-full shadow-md my-2 min-w-40 text-orange-500 font-semibold text-sm">
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
          <div className="delete flex flex-row items-center gap-4 bg-white w-max px-4 py-2 rounded-full shadow-md my-2 min-w-40 text-red-600 font-semibold text-sm">
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
