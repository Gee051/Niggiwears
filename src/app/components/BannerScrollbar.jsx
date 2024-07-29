import React from "react";
import { motion } from 'framer-motion';

const BannerScrollbar = ({ currentSlide, totalSlides }) => {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="relative w-1/3 h-[4px] bg-gray-300 rounded-full overflow-hidden"
        >
          {currentSlide === index && (
            <motion.div
              className="absolute top-0 left-0 h-full bg-magenta rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BannerScrollbar;
