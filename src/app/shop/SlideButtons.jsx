import { useSwiper } from "swiper/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const SlideNavButton = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute inset-0 flex items-center justify-between p-3 ">
      <div
        className="text-magenta text-2xl p-2 bg-white bg-opacity-50 rounded-full shadow-lg cursor-pointer "
        onClick={() => swiper.slidePrev()}
      >
        <FaChevronLeft className="pointer-events-none text-2xl" />
      </div>
      <div
        className="text-magenta text-2xl p-2 bg-white bg-opacity-50 r rounded-full shadow-lg cursor-pointer"
        onClick={() => swiper.slideNext()}
      >
        <FaChevronRight className="pointer-events-none text-2xl" />
      </div>
    </div>
  );
};

export default function SlideNavButtons() {
  return <SlideNavButton />;
}
