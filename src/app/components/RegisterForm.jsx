"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [error, setError] =  useState(""); 
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (password !== confirmPasswordValue) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const submitHandler =  async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }


    setPasswordMatchError("");

    
    try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const { user } = await resUserExists.json();
        
        
        if (user) {
          setError("User already exists. Please login or sign up with a different email");
          return;
        }
  
        const res = await fetch('api/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
  
        if (res.ok) {
          const form = e.target;
          form.reset();
          router.push("/login");
          toast.success("Registration successful")
        } else {
          console.log("User registration failed.");
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    };

  return (
    <div
      className="bg-[#0c1a24] min-h-screen flex flex-col justify-center items-center relative">
      <div className=" text-white w-[350px] sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 p-6 md:p-8 sm:mx-3 flex flex-col rounded-lg border-magent relative bg-transparent border-2 border-magenta shadow-magenta overflow-hidden m-4 ">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="input-box">
              <input
               type="text"
               id="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="input"
               required
               
              />
              <label className='input-label' htmlFor="username">Name</label>
              <span className="icon">
                <FaUser  />
              </span>
            </div>
                <div className="input-box">
              <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
              <label className='input-label' htmlFor="">Email</label>
              <span className="icon">
                <HiOutlineMail />
              </span>
            </div>
            <div className="input-box">
            <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <label  className='input-label'htmlFor="">Password</label>
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
            <div className="input-box">
            <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} 
                className="input"
                required
              />
              <label  className='input-label'htmlFor=""> Confirm Password</label>
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
              {passwordMatchError && (
              <p className="text-red-500 text-sm">{passwordMatchError}</p>
            )}
            </div>
   
          <button
            type="submit"
            className={`bg-magenta text-white py-2 px-4  hover:bg-magenta transition  mb-4 relative w-full h-12 border-2 border-magenta bg-transparent rounded-full font-semibold text-lg cursor-pointer overflow-hidden duration-500 ease-in-out transform hover:text-white ${
              !name || !email || !isValidEmail || !password || !confirmPassword || password !== confirmPassword
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            Sign Up
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-magenta to-transparent transition duration-500 ease-in-out transform scale-y-0 hover:scale-y-100"></span>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">  {error}</div>
          )}
            
        <p className="text-sm text-center text-gray-400">
          Already have an account?
          <Link href={"/login"} className="text-magenta hover:underline">
            Login
          </Link>
        </p>
        </form>
      </div>
      <ToastContainer
position="bottom-center"
autoClose={1000}
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
};

export default Signup;
