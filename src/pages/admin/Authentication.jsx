// components/withAuth.js
import { useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({
      username: "",
      password: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const adminName = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
      const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      if (
        credentials.username === adminName &&
        credentials.password === adminPass
      ) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid credentials");
      }
    };

    if (!isAuthenticated) {
      return (
        <div>
          <h1>Login to access this page</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                autoComplete="off"
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                autoComplete="off"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
