import { useSwiper } from "swiper/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";



const SlideButton = () => {
  const swiper = useSwiper();


  return (
    <div className="absolute inset-0 z-30 flex items-center justify-between top-40 h-16 p-3 ">
      <div
        className="text-magenta text-2xl p-2 bg-white bg-opacity-50  shadow-lg cursor-pointer rounded-full "
        onClick={() => swiper.slidePrev()}
      >
        <FaChevronLeft className="pointer-events-none text-2xl" />
      </div>
      <div
        className="text-magenta text-2xl p-2 bg-white bg-opacity-50 shadow-lg cursor-pointer rounded-full"
        onClick={() => swiper.slideNext()}
      >
        <FaChevronRight className="pointer-events-none text-2xl" />
      </div>
    </div>
  );
};

export default function SlideButtons() {
  return <SlideButton />;
}

