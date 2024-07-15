"use client";

import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    fullname: false,
    email: false,
    message: false,
  });

  const handleFocus = (field) => {
    setInputFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setInputFocus((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
      toast.success(`${fullname}, thanks for contacting us `);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname" className="font-bold text-lg">Full Name</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="Nigii Grace"
            className={`shadow-md px-3 py-2 border border-slate-300 placeholder-transition ${inputFocus.fullname || fullname ? 'input-focus' : ''}`}
            onFocus={() => handleFocus('fullname')}
            onBlur={() => handleBlur('fullname')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-lg">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="niggi@gmail.com"
            className={`shadow-md px-3 py-2 border border-slate-300 placeholder-transition ${inputFocus.email || email ? 'input-focus' : ''}`}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-bold text-lg">Your Message</label>
          <textarea 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className={`h-32 shadow-md px-3 py-2 border border-slate-300 placeholder-transition ${inputFocus.message || message ? 'input-focus' : ''}`}
            id="message"
            placeholder="Drop a message for us....."
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
          ></textarea>
        </div>

        <button className="bg-magenta p-3 text-white font-bold rounded-xl" type="submit">
          Send
        </button>
      </form>

      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e, index) => (
            <div key={index} className={`${
              success ? "text-green-800" : "text-red-600"
            } px-5 py-2 text-lg `}>
              {e}
            </div>
          ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
