"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const imageVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const headingVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};


export default function About() {
  return (
    <div className="container mx-auto p-4">
        <motion.h1
        className="text-5xl text-center border-b-[3px] border-magenta p-2 font-bold"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariant}
        transition={{ duration: 0.5 }}
      >About Us</motion.h1>
      
      <div className="mt-4 text-center md:text-left md:flex md:justify-between">
      <motion.div
          className="md:w-1/2 md:mr-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariant}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-black text-lg md:text-2xl ">
            <span className="text-2xl md:text-4xl font-bold">Niggiwears</span> is a fast-rising e-commerce company that deals with the resale of quality products from different brands at affordable prices. Our goal is to give everyone a chance to have high-quality and branded clothing, regardless of their financial capability. We have contracts with brands from around the world, so you can shop at your taste. Whatever brand you want, Wherever you are, Niggiwears got you covered.
          </h4>
          <div className="mt-4">
            <Link className="hover:text-magenta underline text-xl font-bold" href="/shop">Shop now</Link>
          </div>
          </motion.div>
          <motion.div
          className="mt-4 md:w-1/2 md:ml-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariant}
          transition={{ duration: 0.5 }}
        >
        
        
          <Image src="/assets/reg.jpg" alt="About Us" width={600} height={800} />
          </motion.div>
      </div>
    </div>
  );
}
