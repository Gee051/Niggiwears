"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
// import { navBarList } from "@/app/components/NiggiLinks/page";
import Flex from "../Niggidesigns/Flex";
import { AiFillHeart } from "react-icons/ai";
import { FaCaretDown, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import navBarList from "../Niggilinks/navBarList.json";
// import paginationItems from "../Niggilinks/paginationItems.json";
import { useRouter } from "next/navigation";

const Header = () => {
  const productData = useSelector((state) => state.niggi.productData);
  const favData = useSelector((state) => state.favourites.favData);
  const [scrolling, setScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const toggleDropdown = () => {
    setShow(!show);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.classList.contains("dropdown-open")) {
      setShowUser(false);
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showUser, show]);

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 768) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div
      className={`w-full h-20 border-b-[1px] sticky top-0 border-b-gray-00 gap-2 px-4 shadow-lg z-50 ${
        scrolling ? "bg-white text-black" : "bg-neutral-800 text-white"
      }`}
    >
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link href="/">
            <div>
              <Image
                className=" object-cover"
                src="/assets/logo.png"
                width={150}
                height={90}
                alt="Niggiwears"
              />
            </div>
          </Link>
          <div>
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <ul className="flex space-x-4">
                  {navBarList.map(({ _id, title, link }) => (
                    <Link
                      key={_id}
                      className="flex font-normal font-serif hover:font-bold w-20 h-6 justify-center items-center px-12 text-base hover:underline underline-offset-[4px] decoration-[1px] hover:text-magenta md:border-r-[2px] border-magenta hoverEffect last:border-r-0"
                      href={link}
                    >
                      <li>{title}</li>
                    </Link>
                  ))}
                </ul>
              </motion.ul>
            )}
            <FiMenu
              onClick={() => setSidenav(!sidenav)}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />

            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <Link href="/">
                      <Image
                        className="object-cover"
                        width={180}
                        height={70}
                        src="/assets/logo.png"
                        alt="Niggiwears"
                      />
                    </Link>
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map(({ _id, title, link }) => (
                        <li
                          className="font-normal hover:font-bold font-serif items-center text-2xl text-gray-300 hover:underline underline-offset-[4px] decoration-[1px] hover:text-magenta md:border-r-[2px] border-magenta hoverEffect last:border-r-0"
                          key={_id}
                        >
                          <Link href={link} onClick={() => setSidenav(false)}>
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <h1
                        onClick={() => setCategory(!category)}
                        className="flex justify-between text-xl cursor-pointer items-center font-titleFont mb-2"
                      >
                        Shop by Category{" "}
                        <span className="text-lg hover:text-magenta">
                          {category ? "-" : "+"}
                        </span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-lg font-bold flex flex-col gap-1"
                        >
                          <li className="shopLink">
                            <Link
                              href="/shop"
                              onClick={() => setSidenav(false)}
                            >
                              Clothing
                            </Link>{" "}
                          </li>
                          <li className="shopLink">
                            <Link
                              href="/shop"
                              onClick={() => setSidenav(false)}
                            >
                              Footwears
                            </Link>{" "}
                          </li>
                          <li className="shopLink">
                            <Link
                              href="/shop"
                              onClick={() => setSidenav(false)}
                            >
                              Accessories
                            </Link>{" "}
                          </li>
                        </motion.ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <h1
                        onClick={() => setBrand(!brand)}
                        className="flex justify-between text-xl cursor-pointer items-center font-titleFont mb-2"
                      >
                        Shop by Brand
                        <span className="text-lg hover:text-magenta">
                          {brand ? "-" : "+"}
                        </span>
                      </h1>
                      {brand && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-lg font-bold flex flex-col gap-1"
                        >
                          <li className="niggiLinks">
                            {" "}
                            <Link
                              href="/shop?brand=nike"
                              onClick={() => setSidenav(false)}
                            >
                              Nike
                            </Link>
                          </li>
                          <li className="niggiLinks">
                            {" "}
                            <Link
                              href="/shop?brand=puma"
                              onClick={() => setSidenav(false)}
                            >
                              Puma
                            </Link>
                          </li>
                          <li className="niggiLinks">
                            {" "}
                            <Link
                              href="/shop?brand=adidas"
                              onClick={() => setSidenav(false)}
                            >
                              Adidas
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </div>
                  </div>
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-24 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                  >
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )}
          </div>
          <div className="flex gap-6 mb-2 lg:mt-0 items-center pr-6 cursor-pointer relative p-4 mr-4">
            <Link href="/search">
              <FaSearch className="md:text-xl sm:text-xs hover:scale-110" />
            </Link>

            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 -right-10 z-40 w-auto bg-gray-800 text-[#767676] border-[1px] rounded-lg h-auto p-4 pb-6 responsive-user"
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
                <AiFillHeart className="md:text-xl sm:text-xs hover:scale-110" />
                <span className="w-4 h-4 bg-magenta text-white font-black rounded-full absolute left-3 bottom-3 text-xs flex items-center text-center justify-center p-1  ">
                  {favData.length}
                </span>
              </div>
            </Link>
            <Link href="/cart">
              <div className="relative ">
                <FaShoppingCart className="md:text-xl sm:text-xs hover:scale-110" />
                <span className="w-4 h-4 bg-magenta text-white font-black rounded-full absolute left-3 bottom-3 text-xs flex items-center text-center justify-center ">
                  {productData.length}
                </span>
              </div>
            </Link>
            <div
              onClick={() => setShowUser(!showUser)}
              className="flex md:mr-3"
            >
              <FaUser className="md:text-xl sm:text-xs hover:scale-110" />
              <FaCaretDown />
            </div>
          </div>
        </Flex>
      </nav>

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

export default Header;
