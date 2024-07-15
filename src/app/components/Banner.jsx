"use client"
import React, { useState } from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

SwiperCore.use([Pagination, Autoplay]);

const slides = [
  {
    image: '/assets/clothlogo.avif',
    heading: 'Elevate Your Wardrobe',
    text: 'Explore NiggiWears exclusive collection of high-quality, branded apparel with fashion that speaks of excellence and sophistication.'
  },
  {
    image: '/assets/cloth2.jpg',
    heading: 'Quality Redefined',
    text: 'NiggiWears redefines quality in every stitch exhibiting durability, and unmatched elegance.',
  },
  {
    image: '/assets/shoe2.webp',
    heading: 'Discover Iconic Brands',
    text: 'Uncover the world of iconic brands at NiggiWears.'
  },
  {
    image: '/assets/home1.webp',
    heading: 'Join the Elite',
    text: 'Join the elite league of fashion enthusiasts. Shop at NiggiWears for branded attire that reflects your discerning taste and style.',
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay  
      onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="bg-black">
            <Image
              height={200}
              width={350}
              src={slide.image}
              alt={`Image ${index + 1}`}
              className="opacity-25 bg-center w-full h-[550px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[700px]"
            />
            <div className="absolute left-0 top-0 h-full w-3/4 flex flex-col justify-center items-center text-white mt-6">
              {currentSlide === index && (
                <>
                  <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:px-8 px-4 md:text-6xl font-bold mb-4"
                  >
                    {slide.heading}
                  </motion.h1>
                  <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg px-9 md:text-xl mb-6"
                  >
                    {slide.text}
                  </motion.p>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    <Link href="/shop">
                      <button className="bg-magenta hover:bg-magenta text-white font-semibold py-2 px-4 rounded-full hover:scale-105 transition cursor-pointer w-[150px] h-[50px]">
                        Shop Now
                      </button>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
