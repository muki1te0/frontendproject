import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/userSlice";
import "../SignLog.css";
import NavBar from "./NavBar";

const SignLog = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = () => {
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user to localStorage (temporary)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Log the user in
    dispatch(login({ username, email }));
    navigate("/");
  };

  const handleLogin = () => {
    const { username, password } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      dispatch(login({ username: user.username, email: user.email }));
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignup();
    } else {
      handleLogin();
    }
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="pt-16 flex items-center justify-center">
        <div className="bg-white shadow-md p-8 rounded-md w-96">
          <div className="flex justify-between mb-4">
            <button
              className={`font-semibold text-lg ${
                isSignUp ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`font-semibold text-lg ${
                !isSignUp ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Log In
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border rounded"
              required
            />
            {isSignUp && (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-2 border rounded"
                required
              />
            )}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="text-center mt-4">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Log In
                </button>
              </span>
            ) : (
              <span>
                Need an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLog;
