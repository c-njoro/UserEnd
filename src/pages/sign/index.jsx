import axios from "axios";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    username: "",
  });
  const [profPic, setProfPic] = useState();
  const [uploadedProfile, setUploadedProfile] = useState("");
  const [newId, setId] = useState("");
  const imageRef = useRef();
  const [loginForm, setLoginForm] = useState("login-form");
  const [signUpForm, setSignUpForm] = useState("form-hide");
  const [profileForm, setProfileForm] = useState("form-hide");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //page navigation logics

  const logToSign = () => {
    setLoginForm("form-hide");
    setSignUpForm("signup-form");
  };

  const signToLogin = () => {
    setLoginForm("login-form");
    setSignUpForm("form-hide");
  };

  const signToProfile = () => {
    setProfileForm("profile-form");
    setSignUpForm("form-hide");
  };

  const profileToLogin = () => {
    setProfileForm("form-hide");
    setLoginForm("login-form");
  };

  //login logics
  const onLoginClick = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });

      if (result?.error) {
        setMessage("Wrong Credentials");
        console.log("error login in");
      } else {
        window.location.replace("/?redirected=true");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  //sign up logics
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const onUpload = (e) => {
    const value = e.target.files[0];
    setProfPic(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPass = bcrypt.hashSync(formData.password, 10);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/signUser`,
        {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: hashedPass,
          dateOfBirth: formData.dob,
          profilePicture: "",
        }
      );
      toast.success(`${formData.username} Account Created!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.success(
        `Use your set password and email to login to your account now.`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.log(res.data);
      setId(res.data._id);
      setFormData({
        name: "",
        email: "",
        username: "",
        dob: "",
        password: "",
      });
      signToLogin();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(`Email alredy registered`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error.response.status === 400) {
          toast.error(`You are missing some data`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error.response.status === 422) {
          toast.error(`The username already exists`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(`Error occured while creating acc`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  const setUserProfile = async (e) => {
    e.preventDefault();

    if (profPic) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_PROFILE_UPLOAD_URL}`,
          {
            profilePicture: profPic,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUploadedProfile(
          `${process.env.NEXT_PUBLIC_PROFILE_UPLOADER_URL}/${response.data.filename}`
        );
      } catch (error) {
        console.log("Could not upload profile picture", error);
      }
    }
  };

  const addTheProfile = async () => {
    try {
      console.log(newId);
      const completeUser = await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updateUser/${newId}`,
        {
          profilePicture: uploadedProfile,
        },
        {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      toast.success("Profile photo Uploaded!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setId("");
      setUploadedProfile("");
      imageRef.current.value = "";
      setProfPic();
      profileToLogin();
    } catch (error) {
      console.log("Could not add profile picture", error.message);
    }
  };

  useEffect(() => {
    if (!newId) {
      console.log("User to update profile not present");
      return;
    }
    addTheProfile();
  }, [uploadedProfile]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="main-sign-container bg-blue-100 flex flex-col w-screen h-[calc(88vh)]">
      <div className="whole-container flex flex-col justify-center items-center w-full h-screen">
        <div className={`${loginForm} lf`}>
          <div className="has-acc-page sub-container  bg-blue-50 shadow-lg lg:w-[calc(50vw)] h-max p-6 sm:p-10 md:p-16 rounded-2xl flex flex-col gap-6 justify-center items-center md:w-[calc(70vw)] sm:w-[calc(80vw)] w-[calc(100vw)] ">
            <h4 className="sub-heading text-2xl text-gray-600 capitalize font-body font-semibold tracking-widest">
              Sign In
            </h4>
            <form
              method="post"
              onSubmit={onLoginClick}
              className="form flex flex-col gap-2 w-full h-max justify-center items-center;"
            >
              <label
                htmlFor="login-email"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Email
                </p>
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <label
                htmlFor="login-password"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Password
                </p>
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>
              <br />
              <input
                type="submit"
                value="Login"
                className="submit-btn flex flex-row justify-center items-center bg-white text-gray-500 font-beauty font-bold tracking-wider py-2 px-6 w-full h-max shadow-md rounded-full cursor-pointer"
              />
            </form>
            <button
              onClick={logToSign}
              className="other-btn bg-transparent border-2 border-white px-4 py-2 rounded-full font-bold font-body text-sm
           text-gray-500 shadow-lg flex flex-row gap-2 items-center justify-center capitalize"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <p>New Account</p>
            </button>
            <div className="h-max flex flex-row justify-center items-center">
              <p className="font-body tracking-wider text-red-500 capitalize">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className={`${signUpForm} lf`}>
          <div className="no-acc-page sub-container  bg-blue-50 shadow-lg lg:w-[calc(50vw)] h-max p-6 sm:p-10 md:p-16 rounded-2xl flex flex-col gap-6 justify-center items-center md:w-[calc(70vw)] sm:w-[calc(80vw)] w-[calc(100vw)]">
            <h4 className="sub-heading text-2xl text-gray-600 capitalize font-body font-semibold tracking-widest">
              Sign Up
            </h4>
            <form
              method="post"
              onSubmit={handleSubmit}
              className="form flex flex-col gap-2 w-full h-max justify-center items-center;"
            >
              <label
                htmlFor="name"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Full Name
                </p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <label
                htmlFor="username"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  User Name
                </p>{" "}
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <label
                htmlFor="dob"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  {" "}
                  DOB: (optional)
                </p>{" "}
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <label
                htmlFor="email"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Email
                </p>{" "}
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <label
                htmlFor="password"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Password
                </p>{" "}
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>

              <br />
              <input
                type="submit"
                value="SignUp"
                onClick={handleSubmit}
                className="submit-btn flex flex-col justify-center items-center bg-white text-gray-500 font-beauty font-bold tracking-wider py-2 px-6 w-full h-max shadow-md rounded-full cursor-pointer"
              />
            </form>
            <button
              onClick={signToLogin}
              className="other-btn bg-transparent border-2 border-white px-4 py-2 rounded-full font-bold font-body text-sm
           text-gray-500 shadow-lg flex flex-row gap-2 items-center justify-center capitalize"
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
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>{" "}
              <p>Back to login</p>
            </button>
          </div>
        </div>

        <div className={`${profileForm} lf`}>
          <div className="set-profile-form sub-container  bg-blue-50 shadow-lg lg:w-[calc(50vw)] h-max p-6 sm:p-10 md:p-16 rounded-2xl flex flex-col gap-6 justify-center items-center md:w-[calc(70vw)] sm:w-[calc(80vw)] w-[calc(100vw)]">
            <h4 className="sub-heading text-2xl text-gray-600 capitalize font-body font-semibold tracking-widest">
              Set Profile Picture
            </h4>
            <form
              method="post"
              onSubmit={setUserProfile}
              className="form flex flex-col gap-2 w-full h-max justify-center items-center;"
            >
              <label
                htmlFor="profilePicture"
                className="label-input grid grid-cols-3 w-full"
              >
                <p className="label col-span-1 font-beauty font-semibold text-gray-600 flex justify-start items-center">
                  Upload Photo
                </p>
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  onChange={onUpload}
                  ref={imageRef}
                  className="input col-span-2 w-full h-9 bg-blue-100 rounded-full pl-4 font-beauty text-sm text-gray-700 tracking-wider pr-2 shadow-md"
                />
              </label>
              <input
                type="submit"
                value="Set Picture"
                className="submit-btn bg-white text-gray-500 font-beauty font-bold tracking-wider py-2 px-6 w-max h-max shadow-md rounded-full cursor-pointer"
              />
            </form>
            <button
              onClick={profileToLogin}
              className="other-btn bg-transparent border-2 border-white px-4 py-2 rounded-full font-bold font-body text-sm
           text-gray-500 shadow-lg flex flex-row gap-2 items-center justify-center capitalize"
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
                  d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                />
              </svg>

              <p>Skip</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
