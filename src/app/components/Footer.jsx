import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-8 md:flex md:justify-between md:items-center border-b z-30">
        <div className="mb-4 md:w-1/2 lg:w-1/3">
          <Image src="/assets/logo.png" alt="Niggiwears" width={200} height={50} className='h-full' />
          <p>
            Wanna look affordably good? Get your wears now!
          </p>
          <p>What are you waiting for? Niggiwears is here for you</p>
        </div>
        <div className="mb-4 md:w-1/2 lg:w-2/3 md:flex md:flex-col md:items-end">
          <div className="p-3">
            <p className="font-bold flex items-center justify-end">NEW TO NIGGIWEARS?</p>
            <p className='text-right flex items-center justify-end'>Subscribe to our newsletter to get updates on our latest offers!</p>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            />
            <button className=" px-4 py-2 bg-magenta text-white rounded-lg hover:scale-105 hover:transition cursor-pointer">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-base">Email: otuaghagrace@gmail.com</p>
            <p className="text-base">Phone: 08160006700</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2 font-bold text-2xl">
              <Link href="/"><FiTwitter className='hover:scale-105 hover:transition cursor-pointer hover:text-magenta' /></Link>
              <Link href="/"><FiFacebook className='hover:scale-105 hover:transition cursor-pointer hover:text-magenta' /></Link>
              <Link href="/"><FiInstagram className='hover:scale-105 hover:transition cursor-pointer hover:text-magenta' /></Link>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/cloth">CLOTHING</Link></li>
              <li><Link href="/foot">FOOTWEARS</Link></li>
              <li><Link href="/access">ACCESSORIES</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Niggiwears. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
