"use client"
import React from 'react'
import Banner from './components/Banner'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { shuffle } from 'lodash'; 
import 'swiper/css';
import 'swiper/css/navigation';
// import { paginationItems } from './components/NiggiLinks/page';
import paginationItems from "./components/NiggiLinks/paginationItems.json";
import Image from 'next/image';
import SlideButtons from './components/SlideButton';


SwiperCore.use([Navigation ]);



const Page = () => {

  const [slidesPerView, setSlidesPerView] = useState(5);

  const imageIdArrays = [
    ['Track4', 'Hoddie4', 'Hoddie2'],
    ['Shoes1', 'Slides1', 'Shoes3', 'Slides2'],
    ['vest3','shorts4']
 
  ];
  
  const filteredItemsArrays = imageIdArrays.map(imageIds => {
    return paginationItems.filter(item => imageIds.includes(item.id));
  });


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 480) {
        setSlidesPerView(2); 
      } else if (screenWidth < 768) {
        setSlidesPerView(3); 
      } else if (screenWidth < 1024) {
        setSlidesPerView(4); 
      } else {
        setSlidesPerView(5); 
      }
    };


    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shuffledCloth = shuffle(paginationItems);

  return (
    <div>
      <Banner/>
      <div className='mb-16 pt-9'>
        <h1 className='px-7 text-4xl mb-3 mt-2 font-bold'>Top picks for you</h1>
        <Swiper
          navigation={false}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          className='py-3 '
        >
          {shuffledCloth.slice(0, 15).map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/shop/${item.id}`}>
               
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={500}
                    height={150}
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-contain p-2 rounded-3xl cover bg-white cursor-pointer"
                  />
                  <p className="text-center text-lg font-bold mt-2">{item.title}</p>
                
              </Link>
            
            </SwiperSlide>
          ))}
          <div className="hidden sm:block " >
              <SlideButtons />
          </div>
        </Swiper>
      </div>
        
      <div className='m-3 p-3'>
      
  <h1 className='px-4 sm:px-7 text-2xl md:text-4xl mb-3 mt-2 font-bold'>Branded Styles</h1>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
    {filteredItemsArrays[0].map((item, index) => (
      <div key={item.id}> 
        <Link href={`/shop/${item.id}`}>
          <div className="border p-2">
            <Image src={item.images[0]} alt={`Image ${index + 1}`} width={500} height={380} className="w-full" />
            <p className="text-center text-xl font-bold mt-2">{item.title}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

<div className='mt-6'>
  <h1 className='px-4 sm:px-7 text-2xl md:text-4xl mb-3 mt-2 flex justify-center items-center font-bold'>What`s New? Let`s Explore</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 justify-center p-2">
    {filteredItemsArrays[2].map((item, index) => (
      <div key={item.id}> 
        <Link href={`/shop/${item.id}`}>
          <div className="border p-2">
            <Image src={item.images[0]} alt={`Image ${index + 1}`} width={500} height={380} className="w-full" />
            <p className="text-center text-xl font-bold mt-2">{item.title}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>


<div className='mt-3'>
  <h1 className='px-4 sm:px-7 text-2xl md:text-4xl mb-3 mt-2 font-bold'>Fashion In Footwears</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center p-2">
    {filteredItemsArrays[1].map((item, index) => (
      <div key={item.id}> 
        <Link href={`/shop/${item.id}`}>
          <div className="border p-2">
            <Image src={item.images[0]} alt={`Image ${index + 1}`} width={500} height={380} className="w-full" />
            <p className="text-center text-lg font-bold mt-2">{item.title}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

      
 
    </div>
    
  )
}

export default Page;



