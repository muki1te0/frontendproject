import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/userSlice";
import "../SignLog.css";
import NavBar from "./NavBar";

const SignLog = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (formData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }
    if (isSignUp && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, and one number.";
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const user = { ...formData, isAdmin };
      if (isSignUp) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const matchedUser = users.find(
          (u) =>
            u.username === formData.username &&
            u.password === formData.password
        );
        if (!matchedUser) {
          alert("Invalid credentials!");
          return;
        }
        user.isAdmin = matchedUser.isAdmin;
      }

      dispatch(login(user));
      navigate(user.isAdmin ? "/admin" : "/");
    }
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
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-2 border rounded"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            )}

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-2 border rounded"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="mr-2"
              />
              <label className="text-gray-700">Are you an Admin?</label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignLog;
