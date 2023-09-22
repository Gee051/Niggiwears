"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useLocation } from "react-router-dom";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { navBarList } from "@/app/components/NiggiLinks/page";
import Flex from "../Niggidesigns/Flex";


const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);



  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


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
<div className={`w-full h-20 border-b-[1px] sticky top-0 border-b-gray-200 gap-2 px-4 shadow-lg z-50 ${
      scrolling ? "bg-white text-black" : "bg-gray-600 text-white"
    }`}
  >
          <nav className="h-full px-4 max-w-container mx-auto relative">
            <Flex className="flex items-center justify-between h-full">
            <Link href="/">
                <div>
               <Image className=" object-cover" src="/assets/logo.png" width={150} height={90}   alt="Niggiwears" />
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
                      {navBarList.map(({ _id, title, link}) => (
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
                    {navBarList.map(({ _id, title, link}) => (
                        <li
                          className="font-normal hover:font-bold font-serif items-center text-2xl text-gray-300 hover:underline underline-offset-[4px] decoration-[1px] hover:text-magenta md:border-r-[2px] border-magenta hoverEffect last:border-r-0"
                          key={_id}
                        >
                          <Link
                            href={link}
                            
                            onClick={() => setSidenav(false)}
                          >
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
                        <span className="text-lg hover:text-magenta">{category ? "-" : "+"}</span>
                      </h1>
                      {category && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-lg font-bold flex flex-col gap-1"
                        >
                          <li className="niggiLinks">Clothings</li>
                          <li className="niggiLinks">Footwear</li>
                          <li className="niggiLinks">Accessories</li>
                        </motion.ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <h1
                        onClick={() => setBrand(!brand)}
                        className="flex justify-between text-xl cursor-pointer items-center font-titleFont mb-2"
                      >
                        Shop by Brand
                        <span className="text-lg hover:text-magenta">{brand ? "-" : "+"}</span>
                      </h1>
                      {brand && (
                        <motion.ul
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-lg font-bold flex flex-col gap-1"
                        >
                         <Link href="/shop?brand=nike">
                          <li className="niggiLinks">Nike</li>
                          </Link>
                          <li className="niggiLinks">Puma</li>
                          <li className="niggiLinks">Adidas</li>
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
        </Flex>
      </nav>
    </div>
  );
};

export default Header;






