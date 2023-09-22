"use client"
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../Niggidesigns/Flex";
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const productData = useSelector((state) => state.niggi.productData);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  // const navigate = useNavigate();
  const ref = useRef();
  const toggleDropdown = () => {
    setShow(!show);

  };

  
  

  return(
    <div className="w-full bg-[#d1d1cb] relative">
       <div className="max-w-container mx-auto">
         <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
         <div
            onClick={toggleDropdown}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor responsive-unseen "
          >
            <HiMenuAlt2 className="w-5 h-5 font-semibold" />
            <p className="text-lg font-bold">Shop by Category</p>
        
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 z-50  w-auto bg-gray-800 text-[#767676]  border-[1px] rounded-lg h-auto p-4 pb-6 "
              >
                <li className="shopLink">
                  Clothing
                </li>
                <li className="shopLink">
                  Footwears
                </li>
                <li className="shopLink">
                  Accessories
                </li>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-lg text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl mt-3 mb-0 ">
            <input
              className="flex-1 h-full focus:outline-none p-3 text-lg placeholder:text-lg border-magenta "
              type="text"
            
              placeholder="Search here"
            />
            <button>
            <FaSearch className="w-5 h-5 hover:scale-110 hover:text-magenta hover:transition cursor-pointer " />
              </button>
            </div>
            <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative p-4">
             <div   onClick={() => setShowUser(!showUser)} className="flex">
               <FaUser className="text-xl " />
               <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 -left-20  z-50  w-auto bg-gray-800 text-[#767676]  border-[1px] rounded-lg h-auto p-4 pb-6 responsive-user"
              >
                <Link href="/login">
                  <li className="shopLink">
                    Login
                  </li>
                </Link>
                <Link href="/signup">
                  <li className="shopLink">
                   Sign Up
                  </li>
                </Link>
                <li className="shopLink">
                  Sign Out
                </li>
            
              </motion.ul>
            )}
            <Link href="/cart">
              <div className="relative ">
                <FaShoppingCart className="text-2xl" />
                <span className="w-5 h-5 bg-magenta text-white font-black rounded-full absolute left-4 bottom-4 text-xs flex items-center text-center justify-center ">
                   {productData.length} 
                </span>
              </div>
            </Link>
          </div>
          </Flex>
          </div>
          </div>
  )


}

  export default HeaderBottom;

