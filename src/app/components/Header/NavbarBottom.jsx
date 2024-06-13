"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../Niggidesigns/Flex";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { AiFillHeart } from "react-icons/ai";
import paginationItems from "../NiggiLinks/paginationItems";
import { useRouter } from "next/navigation";

const HeaderBottom = () => {
  const productData = useSelector((state) => state.niggi.productData);
  const favData = useSelector((state) => state.favourites.favData);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const router = useRouter();



    const handleSearch = (e) => {
      router.push(`/searchResult?q=${searchQuery}`);
    };

  const { data: session } = useSession();
  const toggleDropdown = () => {
    setShow(!show);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.classList.contains("dropdown-open")) {
      setShowUser(false);
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  
    const filtered = paginationItems.filter((item) => {
      const loweredQuery = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(loweredQuery) ||
        item.description.toLowerCase().includes(loweredQuery) ||
        item.brand.toLowerCase().includes(loweredQuery) ||
        item.category.toLowerCase().includes(loweredQuery) ||
        item.price.includes(loweredQuery) ||
        item.main_des.includes(loweredQuery) ||
        item.sex.toLowerCase().includes(loweredQuery) 
      );
    });
    setFilteredProducts(filtered);
  
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchQuery, showUser, show]);

  return (
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
                <li className="shopLink"><Link href="/shop">Clothing</Link> </li>
                <li className="shopLink"><Link href="/shop">Footwears</Link> </li>
                <li className="shopLink"><Link href="/shop">Accessories</Link> </li>
             
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-lg text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl mt-3 mb-0 ">
            <input
              className="flex-1 h-full focus:outline-none p-3 text-lg placeholder:text-lg border-magenta "
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search  for your products here"
            />
            <button onClick={handleSearch}>
            
            
            
              <FaSearch className="w-5 h-5 hover:scale-110 hover:text-magenta hover:transition cursor-pointer" />
              {/* </Link> */}
              {searchQuery && filteredProducts.length > 0 && (
                <div
                  className={`w-full mx-auto h-56 bg-white top-16 absolute left-0 z-40 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer p-2 rounded-xl`}
                >
                  {filteredProducts.map((item) => (
                    <Link href={`shop/${item.id}`} key={item.id}>
                      <div
                        onClick={() => {
                          setShowSearchBar(true);
                          setSearchQuery("");
                        }}
                        className="max-w-[600px] h-12 bg-gray-100 mb-3 flex items-center gap-3 p-2 rounded-full"
                      >
                        <div className="flex flex-col gap-1 font-bold">
                          <h1 className="text-base">{item.title}</h1>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </button>
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative p-4">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser className="text-xl " />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 -left-20 z-40 w-auto bg-gray-800 text-[#767676] border-[1px] rounded-lg h-auto p-4 pb-6 responsive-user"
              >
                {session ? (
                  <>
                    <li className="text-gray-400 px-2 py-1 font-bold text-2xl border-b-gray-400 border-b-[1px] ">
                      {session.user.name}{" "}
                      <span className="text-base pb-2 ">
                        {session.user.email}
                      </span>
                    </li>

                    <li className="shopLink">
                      <button
                        onClick={async () => {
                          await signOut();
                          toast.success("Sign Out Successful");
                        }}
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <li className="shopLink">Login</li>
                    </Link>
                    <Link href="/register">
                      <li className="shopLink">Sign Up</li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
            <Link href="/fav">
              <div className="relative ">
                <AiFillHeart className="text-2xl" />
                <span className="w-4 h-4 bg-magenta text-white font-black rounded-full absolute left-4 bottom-4 text-xs flex items-center text-center justify-center p-1  ">
                  {favData.length}
                </span>
              </div>
            </Link>
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
    </div>
  );
};

export default HeaderBottom;
