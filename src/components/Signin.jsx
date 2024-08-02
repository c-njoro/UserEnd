import React from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  return (
    <div className="sign">
      <form method="post" onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="email">
          <p>Email</p>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Signin;
