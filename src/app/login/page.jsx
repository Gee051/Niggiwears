"use client"
import { useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  // State for login form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-opacity-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg m-3shadow-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={160}
            height={100}
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Log in to Your Account
          </h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-magenta focus:border-magenta sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-magenta focus:border-magenta sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-magenta focus:ring-magenta border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-magenta hover:text-magenta-dark"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-magenta hover:bg-magenta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-magenta"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
