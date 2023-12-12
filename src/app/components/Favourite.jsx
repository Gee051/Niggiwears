"use client"
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteFav } from "../redux/niggiFavSlice";
import { addToCart } from "../redux/niggiSlice";

const FavList = () => {
  const dispatch = useDispatch();
  const favData = useSelector((state) => state.favourites.favData);

  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between border-b">
        <h1 className="text-xl sm:text-3xl font-bold">My Favourite</h1>
        <span className="text-gray-600 text-lg mb-2 sm:mb-0">
          Number of Items: {favData.length}
        </span>
      </div>
      {favData.map((item) => (
        <div key={item.id} className="my-4 sm:my-7 p-2 sm:p-4 border gap-2 sm:gap-5 rounded-lg flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3">
            <Image
              src={item.images[0]}
              alt="image"
              width={250} 
              height={40}  
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="w-full sm:w-2/3 p-2 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold uppercase">{item.brand}</h2>
            <h4 className="text-md sm:text-lg font-semibold"> {item.title}</h4>
            <div className="mt-2">
              <span className="text-gray-600 font-bold text-md sm:text-lg">₦{item.price}</span>
            </div>
            <button
              className="bg-magenta text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full mt-2 sm:mt-4 hover:scale-105 hover:transition cursor-pointer"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    brand: item.brand,
                    images: item.images,
                    price: item.price,
                    quantity: 1,
                    description: item.description,
                    main_des: item.main_des,
                  })
                )
              }
            >
              Add to Cart
            </button>
          </div>
          <p className="text-gray-600 flex text-sm font-bold mt-2 sm:mt-0 items-end">
            Added on: {formattedDate}
          </p>
          <button
            className="hover:text-magenta hover:scale-105 hover:transition cursor-pointer text-xl sm:text-3xl flex items-start h-4 sm:h-5"
            onClick={() => {
              dispatch(deleteFav({ id: item.id }));
              toast.error(`${item.title} is removed`);
            }}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      ))}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
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

export default FavList;





