import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Login Clicked");
    console.log("Form Data:", formData);

    try {

      setLoading(true);

      const response = await loginUser(formData);

      console.log("API Response:", response);

      if (!response.token) {
        throw new Error("Token not received");
      }

     login(response.token);

localStorage.setItem(
  "token",
  response.token
);
localStorage.setItem(
  "role",
  response.role
);

localStorage.setItem(
  "role",
  response.role || "SUPER_ADMIN"
);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log("FULL ERROR:", error);
      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          School Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg mb-4"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg mb-2"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="text-right mb-4">
            <span
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;