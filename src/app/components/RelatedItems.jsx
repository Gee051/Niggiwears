import { useState, useEffect } from 'react';
import { ImCart } from 'react-icons/im';
import { GoHeart } from 'react-icons/go';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SlideButtons from './SlideButton';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';


SwiperCore.use([Navigation, Pagination]);

const RelatedItems = ({ relatedItems, currentItemId }) => {
  const [hoveredWearIndex, setHoveredWearIndex] = useState(null);
  const [swiperSlides, setSwiperSlides] = useState(4);

  useEffect(() => {
    const handleResize = () => {
  

      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setSwiperSlides(4);
      } else if (screenWidth >= 768) {
        setSwiperSlides(3); 
      } else if (screenWidth >= 450) {
        setSwiperSlides(2); 
      } else  {
        setSwiperSlides(1); 
      }
    };
    

   
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='p-3 m-3'>
      <h2 className='font-bold text-3xl'>You may also like</h2>
      
      <Swiper
      
        slidesPerView={swiperSlides}
        spaceBetween={20} 
        navigation={false}
        pagination={{ clickable: true }} 
        className='py-3'
      >
        {relatedItems.map((relatedItem, index) => (
          relatedItem.id !== currentItemId && (
            
            <SwiperSlide key={relatedItem.id}>
              <Link href={`/shop/${relatedItem.id}`}
                className="border rounded-lg p-4 m-4 shadow-md flex flex-col justify-between image-container relative"
                onMouseEnter={() => setHoveredWearIndex(index)}
                onMouseLeave={() => setHoveredWearIndex(null)}
              >
                <div className="border-b pb-2">
                  <Image
                    src={relatedItem.images[0]}
                    alt={relatedItem.title}
                    width={150}
                    height={200}
                    className="object-contain w-64 h-72 cursor-pointer rounded-t-lg"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold mb-1 hover:text-magenta">
                    {relatedItem.title}
                  </h3>
                  
                  <p className="text-[#286f6b] text-lg">₦{relatedItem.price}</p>
                </div>
                <div
                  className={`absolute top-0 right-0 mt-2 mr-2 flex flex-col items-center space-y-2 icon-container ${
                    hoveredWearIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}
                  style={{
                    transform: `translateX(${hoveredWearIndex === index ? '0' : '100%'})`,
                    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                  }}
                >
                  <button className="p-2 bg-white shadow-md rounded hover:bg-magenta">
                    <ImCart />
                  </button>
                  <button className="p-2 bg-white shadow-md rounded hover:bg-magenta">
                    <GoHeart />
                  </button>
                </div>
              </Link>
             
             
            </SwiperSlide>
          )
          ))}
          <div className="hidden sm:block " >
              <SlideButtons />
              </div>
         
      </Swiper>
    </div>
  );
};

export default RelatedItems;
