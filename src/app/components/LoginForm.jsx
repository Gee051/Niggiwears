"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Incorrect Email or Password");
        return;
      }

      router.replace("/");
      toast.success("Login successful")
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-[#0c1a24] min-h-screen flex flex-col justify-center items-center relative">
      <div className=" text-white w-[350px] sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 md:p-8 sm:mx-3 flex flex-col rounded-lg border-magent relative bg-transparent border-2 border-magenta shadow-magenta overflow-hidden ">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="input-box">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <label className="input-label" htmlFor="">
              Email
            </label>
            <span className="icon">
              <HiOutlineMail />
            </span>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <label className="input-label" htmlFor="">
              Password
            </label>
            <span className="icon">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  onClick={togglePasswordVisibility}
                  className=" cursor-pointer"
                />
              ) : (
                <AiOutlineEye
                  onClick={togglePasswordVisibility}
                  className=" cursor-pointer "
                />
              )}
            </span>
          </div>
          <button
            type="submit"
            className={`bg-magenta text-white py-2 px-4  hover:bg-magenta transition  mb-4 relative w-full h-12 border-2 border-magenta bg-transparent rounded-full font-semibold text-lg cursor-pointer overflow-hidden duration-500 ease-in-out transform hover:text-white ${
              !email || !password ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Login
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-magenta to-transparent transition duration-500 ease-in-out transform scale-y-0 hover:scale-y-100"></span>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">{error}</div>
          )}

          <p className="text-sm text-center text-gray-400">
            Don`t have an account?
            <Link href={"/register"} className="text-magenta hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
position="bottom-center"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
}