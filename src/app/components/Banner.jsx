"use client"
import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

SwiperCore.use([Pagination, Autoplay]);

const slides = [
  {
    image: '/assets/clothlogo.avif',
    heading: 'Slide 1 Heading',
    text: 'This is the text for slide 1.',
  },
  {
    image: '/assets/cloth2.jpg',
    heading: 'Slide 2 Heading',
    text: 'This is the text for slide 2.',
  },
  {
    image: '/assets/shoe2.webp',
    heading: 'Slide 3 Heading',
    text: 'This is the text for slide 3.',
  },
  {
    image: '/assets/home1.webp',
    heading: 'Slide 4 Heading',
    text: 'This is the text for slide 4.',
  },
];

const Banner = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="bg-black">
            <img
            src={slide.image}
            alt={`Image ${index + 1}`}
            className="opacity-25 bg-center w-full h-[550px] sm:h-[450px] md[500px] lg:h-[550px] xl:h-[700px]"
            />
            <div className="absolute left-0 top-0 h-full w-1/2 flex flex-col justify-center items-center text-white mt-6">
              <h1 className="text-4xl p-4 md:text-6xl font-bold mb-4">{slide.heading}</h1>
              <p className="text-lg p-2 md:text-xl mb-6">{slide.text}</p>
              <button className="bg-magenta hover:bg-magenta text-white font-semibold py-2 px-4 rounded-full ">
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
