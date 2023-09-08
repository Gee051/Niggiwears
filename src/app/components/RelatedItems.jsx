import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ImCart } from 'react-icons/im';
import { GoHeart } from 'react-icons/go';
import Image from 'next/image';

const RelatedItems = ({ relatedItems, currentItemId }) => {
  const [hoveredWearIndex, setHoveredWearIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // Define your mobile breakpoint here
    };

    // Initial setup and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='p-3 m-3'>
      <h2 className='font-bold text-2xl'>You may also like</h2>
      <div className={`grid ${isMobileView ? 'grid-cols-2' : 'grid-cols-4'} gap-5 p-4`}>
        {relatedItems.map((relatedItem, index) => (
          relatedItem.id !== currentItemId && (
            <Link href={`/shop/${relatedItem.id}`} key={relatedItem.id}>
              <div
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
                  <p className="text-gray-600 text-lg">{relatedItem.description}</p>
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
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
