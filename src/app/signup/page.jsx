"use client"
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // Check if passwords match immediately
    if (password !== confirmPasswordValue) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const submitHandler =  async (e) => {
    e.preventDefault();

 
    if (!name || !email || !password || !confirmPassword) {
      return;
    }


    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }


    setPasswordMatchError("");

    try {

      const { data } = await axios.post('/api/register', {
        name, email, password
      })

      console.log(data);

    } catch(error) {
      console.log(error);
    }
    

  };

  return (
    <div
      className="bg-cover min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url('/assets/cloth1.jpg')` }}
    >
      <div className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 md:p-8 sm:mx-3 flex flex-col rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange} 
              className="w-full p-2 border rounded-md"
              placeholder="Re-enter your password"
            />
            {passwordMatchError && (
              <p className="text-red-500 text-sm">{passwordMatchError}</p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-4 ${
              !name || !email || !password || !confirmPassword || password !== confirmPassword
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="hover:text-magenta hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
