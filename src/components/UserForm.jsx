import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const dotenv = require("dotenv");

dotenv.config();

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
    const apiKey = "fe7ca7611a034352aa4008d2ea7a3ca1";
    const email = formData.email;
    console.log(email);

    // try {
    //   const verificationData = await axios.get(
    //     `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`
    //   );
    //   console.log(verificationData.data);
    //   return;
    // } catch (error) {
    //   console.log("Error verifying", error);
    //   return;
    // }

    try {
      const hashedPass = bcrypt.hashSync(formData.password, 10);
      const res = await axios.post("http://localhost:3000/api/users", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: hashedPass,
        dateOfBirth: formData.dob,
        profilePicture: "",
      });
      setSuccessMessage(`${formData.name}'s account created successfully`);
      console.log(res.data);
      setId(res.data._id);
      setFormData({
        name: "",
        email: "",
        username: "",
        dob: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("User already exists");
        } else if (error.response.status === 400) {
          setErrorMessage("Missing information");
        } else if (error.response.status === 401) {
          setErrorMessage("The Email Entered is Invalid");
        } else {
          setErrorMessage("Unable to add user");
        }
      }
    }
  };

  const setUserProfile = async (e) => {
    e.preventDefault();

    if (profPic) {
      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          {
            profilePicture: profPic,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUploadedProfile(response.data.filename);
      } catch (error) {
        console.log("Could not upload profile picture", error);
      }
    }
  };

  const addTheProfile = async () => {
    try {
      const completeUser = await axios.put(
        `http://localhost:3000/api/users/updateUser/${newId}`,
        {
          profilePicture: uploadedProfile,
        }
      );
      console.log(completeUser);

      setId("");
      setUploadedProfile("");
      imageRef.current.value = "";
      setProfPic();
    } catch (error) {
      console.log("Could not add profile picture", error.message);
    }
  };

  useEffect(() => {
    console.log("Changed Succesfully");
    console.log(uploadedProfile);
    console.log(newId);
    if (!newId) {
      console.log("No User");
      return;
    }
    console.log("User id: ", newId);
    addTheProfile();
  }, [uploadedProfile]);

  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="form">
        <h1>ADD USER</h1>
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
        <input type="submit" value="Create User" />
      </form>

      <p style={{ color: "red" }}>{errorMessage}</p>
      <p style={{ color: "green" }}>{successMessage}</p>

      <form method="post" onSubmit={setUserProfile}>
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
      </form>
    </>
  );
};
export default UserForm;
