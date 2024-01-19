"use client";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { resetCart } from "../redux/niggiSlice";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import FavList from "../components/Favourite";
import { resetFav } from "../redux/niggiFavSlice";



const Fav = () => {
  const dispatch = useDispatch();
  const favData = useSelector((state) => state.favourites.favData);
  const isCartEmpty = favData.length === 0;



  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {isCartEmpty ? (
        <div className=" font-bold p-3 m-3 ">
          <h2 className=" text-5xl flex items-center justify-center">
             List is Empty
          </h2>
          <Link
            href="/shop"
            className="mb-7 m-3 flex items-center gap-1 text-black hover:text-magenta duration-200 text-xl pt-4"
          >
            <span>
              <HiOutlineArrowLeft />
            </span>
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <FavList />
          </div>

        </div>
      )}

      {!isCartEmpty && (
        <button
          onClick={() => {
            dispatch(resetFav());
            toast.error("Your Favourite List is Empty");
          }}
          className="bg-red-500 text-white m-4 h-12 px-5 hover:scale-105 hover:transition rounded-md mb-16 text-lg"
        >
          Reset Favourite
        </button>
      )}

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

export default Fav;
