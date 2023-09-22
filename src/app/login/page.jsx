"use client"
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsInvalid(false); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsInvalid(false); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsInvalid(true); 
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        // Handle authentication error here (you can use state to display an error message)
        console.error("Authentication error:", result.error);
      } else {
        // Authentication successful, you can handle the redirect or other actions here
        console.log("Authentication successful");
        // Redirect the user to a protected page
        // router.push("/dashboard"); // Make sure to import the router or use Next.js' useRouter hook
      }
    } catch (error) {
      console.error("An error occurred during authentication:", error);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <div className="bg-cover min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url('/assets/cloth1.jpg')` }}>
      <div className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 md:p-8 sm:mx-3 flex flex-col rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <div className={`mb-4 ${isInvalid ? 'border-red-500' : ''}`}>
            
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-2 border rounded-md ${isInvalid ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={`mb-4 ${isInvalid ? 'border-red-500' : ''}`}>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full p-2 border rounded-md ${isInvalid ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-4 ${isInvalid ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isInvalid}
          >
            Login
          </button>
        </form>
        <div className="flex justify-center">
          <hr className="border-gray-300 border w-full mr-2" />
          <span className="text-gray-500">OR</span>
          <hr className="border-gray-300 border w-full ml-2" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-4 mb-2"
        >
          Sign in with Google
        </button>
        <p className="text-sm flex justify-center text-gray-600">
          Don`t have an account yet?{" "}
          <Link href="/signup" className="hover:text-magenta hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
