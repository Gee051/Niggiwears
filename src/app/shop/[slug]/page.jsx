"use client"
import React, { useState } from "react";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { paginationItems } from "@/app/components/NiggiLinks/page";
import "swiper/css/pagination";
import SlideNavButtons from "../SlideButtons";
import SwiperCore from "swiper/core";
import RelatedItems from "@/app/components/RelatedItems";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/niggiSlice";
import { ToastContainer, toast } from 'react-toastify';


function fetchProducts(params) {
  const wears = paginationItems.find((clothing) => clothing.id === params.slug);
  return wears;
}

function findRelateditems(itemType) {
  return paginationItems.filter((clothing) => clothing.id.startsWith(itemType));
}

SwiperCore.use([Navigation, Pagination]);

export default function Page({ params }) {
  const dispatch = useDispatch()
  const wears = fetchProducts(params);
  const itemType = wears.id.replace(/[0-9]/g, "");
  const relatedItems = findRelateditems(itemType, wears.id);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);
  const isClothingOrAccessories = wears.category === "clothing" || wears.category === "accessories";
  const isFootwear = wears.category === "footwear";

 
  

  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? "" : size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    dispatch(
      addToCart({
        id: wears.id,
        title: wears.title,
        category: wears.category, 
        brand: wears.brand, 
        images: wears.images, 
        price: wears.price, 
        quantity: 1,
        description: wears.description, 
        main_des: wears.main_des, 
        size: selectedSize, // Include the selected size in the cart item
      })
    ) & toast.success(`${wears.title} is added `);

  
    setShowSizeError(false);
    
  };

  return (
    <div className="container mx-auto p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={false}
            pagination={{ clickable: true }}
          >
            {wears.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={400}
                    height={350}
                    className="h-[600px] w-full object-contain cursor-pointer"
                  />
                  <div className="hidden sm:block" >
                    <SlideNavButtons />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 p-4">
          <h1 className="text-2xl md:text-4xl py-3 font-semibold hover:text-magenta">
            {wears.title}
          </h1>
          <p className="text-sm md:text-xl font-medium py-3">
            {wears.description}
          </p>
          <Image
            src="/assets/fivestar.png"
            width={100}
            height={200}
            alt="rating"
          />
          <h2 className="text-black font-bold text-xl md:text-3xl py-2">
            ₦{wears.price}
          </h2>
          <hr className="my-2 md:my-4 border-t-2 border-gray-300" />

          <div className="flex items-center space-x-4 md:space-x-2 p-3">
            <div className="text-base md:text-xl font-semibold">Size:</div>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
    {isClothingOrAccessories && (
      <>
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
            selectedSize === "XS" ? "bg-magenta" : ""
          }`}
          onClick={() => handleSizeClick("XS")}
        >
          XS
        </button>
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
            selectedSize === "S" ? "bg-magenta" : ""
          }`}
          onClick={() => handleSizeClick("S")}
        >
          S
        </button>
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
            selectedSize === "M" ? "bg-magenta" : ""
          }`}
          onClick={() => handleSizeClick("M")}
        >
          M
        </button>
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
            selectedSize === "L" ? "bg-magenta" : ""
          }`}
          onClick={() => handleSizeClick("L")}
        >
          L
        </button>
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
            selectedSize === "XL" ? "bg-magenta" : ""
          }`}
          onClick={() => handleSizeClick("XL")}
        >
          XL
        </button>
      </>
    )}
    {isFootwear && (
      <>
        {Array.from({ length: 16 }, (_, index) => (
          <button
            key={index}
            className={`border px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 hover:transition ${
              selectedSize === (28 + index).toString() ? "bg-magenta" : ""
            }`}
            onClick={() => handleSizeClick((28 + index).toString())}
          >
            {28 + index}
          </button>
        ))}
      </>
    )}
  </div>
          </div>
          {showSizeError && (
            <p className="text-red-500 text-base font-extrabold">
              Please choose a size.
            </p>
          )}

          <div className="flex items-center space-x-4 mt-4 md:mt-6 p-3">
            <button
              className="border-2 bg-magenta rounded-md px-6 py-3 text-black text-base md:text-xl font-bold hover:scale-105 hover:transition cursor-pointer"
              onClick= {handleAddToCart}>
              Add to Cart
            </button>
            <button className="border px-3 py-1 md:px-4 md:py-2 rounded-md cursor-pointer bg-magenta h-10 md:h-14 hover:scale-105 hover:transition ">
              <GoHeart />
            </button>
          </div>

          <div className="mt-6 md:mt-8 border-t-2 pt-6 md:pt-8">
            <h4 className="text-lg md:text-2xl font-semibold py-2 md:py-3">
              Description
            </h4>
            <p className="text-lg md:text-xl leading-loose">{wears.main_des}</p>
          </div>
        </div>
      </div>
 

      <div className="related-items-container mt-6 md:mt-8">
        <RelatedItems relatedItems={relatedItems} currentItemId={wears.id} />
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
}
