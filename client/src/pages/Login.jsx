import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService(email, password);
      
      // save token to local storage
      const token = response.data.token
      localStorage.setItem("token", token);

      // Decode token payload to get roles
      const payload = jwtDecode(token);
      const roles = payload.roles || [];
      console.log("Payload", payload);
      console.log("Roles:",roles);
      
      //Navigate based on role
      if (roles.includes("ROLE_ADMIN")) navigate("/admin");
      else if (roles.includes("ROLE_EMPLOYEE")) navigate("/employee");
      else alert("No valid role found");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Login to HRMS
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
