import axios from "axios";
import bcrypt from "bcryptjs";
import Link from "next/link";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profPic, setProfPic] = useState();
  const [uploadedProfile, setUploadedProfile] = useState("");
  const [newId, setId] = useState("");
  const imageRef = useRef();
  const [userForm, setUserForm] = useState("user-form");
  const [profileForm, setProfileForm] = useState("form-hide");

  //logics
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
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const hashedPass = bcrypt.hashSync(formData.password, 10);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_USERS_URL}`, {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: hashedPass,
        dateOfBirth: formData.dob,
        profilePicture: "",
      });
      toast.success(`${formData.username} Account Created!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(res.data);
      setId(res.data._id);
      setFormData({
        name: "",
        email: "",
        username: "",
        dob: "",
        password: "",
      });
      setProfileForm("profile-form");
      setUserForm("form-hide");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Email already registered");
        } else if (error.response.status === 400) {
          setErrorMessage("Missing information");
        } else {
          setErrorMessage("Unable Create Account");
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
      const completeUser = await axios.put(
        `${process.env.NEXT_PUBLIC_USERS_URL}/update/${newId}`,
        {
          profilePicture: uploadedProfile,
        }
      );
      console.log(completeUser);
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
      setUserForm("user-form");
      setProfileForm("form-hide");
      router.push("/api/auth/signin");
    } catch (error) {
      console.log("Could not add profile picture", error.message);
    }
  };

  useEffect(() => {
    if (!newId) {
      console.log("No User");
      return;
    }
    addTheProfile();
  }, [uploadedProfile]);

  return (
    <>
      <div className={userForm}>
        <div>
          <h4>Already Have An Account? </h4>
          <Link href="/api/auth/signin">Log In</Link>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <label htmlFor="name">
            <p>Full Name</p>{" "}
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="username">
            {" "}
            <p>User Name</p>{" "}
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="dob">
            <p> DOB: (optional)</p>{" "}
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email">
            <p>Email</p>{" "}
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            <p>Password</p>{" "}
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <br />
          <input type="submit" value="SignUp" onClick={handleSubmit} />
        </form>
      </div>

      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>

      <form method="post" onSubmit={setUserProfile} className={profileForm}>
        <label htmlFor="profilePicture">
          <p>Profile Picture: </p>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={onUpload}
            ref={imageRef}
          />
        </label>
        <input type="submit" value="Set Picture" />
        <Link href="/api/auth/signin">Skip</Link>
      </form>
    </>
  );
};
export default UserForm;
