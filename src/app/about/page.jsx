import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl text-center border-b-[3px] border-magenta p-2 font-bold">About Us</h1>
      <div className="mt-4 text-center md:text-left md:flex md:justify-between">
        <div className="md:w-1/2 md:mr-4">
          <h4 className="text-black text-lg md:text-2xl ">
            <span className="text-2xl md:text-4xl font-bold">Niggiwears</span> is a fast-rising e-commerce company that deals with the resale of quality products from different brands at affordable prices. Our goal is to give everyone a chance to have high-quality and branded clothing, regardless of their financial capability. We have contracts with brands from around the world, so you can shop at your taste. Whatever brand you want, Wherever you are, Niggiwears got you covered.
          </h4>
          <div className="mt-4">
            <Link className="hover:text-magenta underline text-xl font-bold" href="/shop">Shop now</Link>
          </div>
        </div>
        <div className="mt-4 md:w-1/2 md:ml-4">
        
        
          <Image src="/assets/reg.jpg" alt="About Us" width={600} height={800} />
        </div>
      </div>
    </div>
  );
}
