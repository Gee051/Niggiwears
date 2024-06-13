"use client";
import { useState, useEffect, useRef } from "react";
import paginationItems from "../components/NiggiLinks/paginationItems";
import { ImCart } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/niggiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { addToFav } from "../redux/niggiFavSlice";



const Shop = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [hoveredWearIndex, setHoveredWearIndex] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(6);
  


  // const toggleSidebar = () => {
  //   setSidenav(!sidenav); 
  // };

  useEffect(() => {
    const handleResponsiveMenu = () => {
      if (window.innerWidth < 768) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
  
    const handleResponsiveSwiper = () => {
      if (window.innerWidth < 390) {
        setSlidesPerView(3);
      } else if(window.innerWidth < 480){
        setSlidesPerView(4);
      }else if(window.innerWidth < 600){
        setSlidesPerView(5);
      }
      else  {
        setSlidesPerView(6);
      }
    };
  

    handleResponsiveMenu();
    handleResponsiveSwiper();
  
   
    window.addEventListener("resize", handleResponsiveMenu);
    window.addEventListener("resize", handleResponsiveSwiper);
  
    return () => {
      window.removeEventListener("resize", handleResponsiveMenu);
      window.removeEventListener("resize", handleResponsiveSwiper);
    };
  }, []);
  

  

  const handleSortByClick = (sortOption) => {
    setSortBy(sortOption);
  };




  const filteredProducts = paginationItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || item.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  

  if (sortBy === "lowToHigh") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.price.replace(",", "")) -
        parseFloat(b.price.replace(",", ""))
    );
  } else if (sortBy === "highToLow") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.price.replace(",", "")) -
        parseFloat(a.price.replace(",", ""))
    );
  }

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 mb-4">
        <h1 className="text-5xl py-3 font-extrabold responsive-text">
          All Products
        </h1>
        {/* Dropdown for selecting products per page */}
        <div class="flex items-center ">
          <label
            for="productsPerPage"
            class="mr-2 p-2 font-bold responsive-label"
          >
            Products per Page:
          </label>
          <select
            id="productsPerPage"
            name="productsPerPage"
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
            class="p-2 border border-gray-300 rounded-md responsive-select"
          >
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="18">18</option>
            <option value="30">30</option>
            <option value="60">60</option>
          </select>
        </div>
      </div>

      {!showMenu && (
  <div className="w-full  font-bold text-lg gap-3">
    <h2 className="px-2">Filter By:</h2>
    <Swiper
      spaceBetween={20} 
      slidesPerView={slidesPerView} 
    >
      {/* All */}
      
      <SwiperSlide>
        <button className="px-2" onClick={() => setSelectedCategory("All")}>All</button>
      </SwiperSlide>

      {/* Clothing */}
      <SwiperSlide>
        <button onClick={() => setSelectedCategory("clothing")}>Clothing</button>
      </SwiperSlide>

      {/* Footwear */}
      <SwiperSlide>
        <button   className="pl-3" onClick={() => setSelectedCategory("footwear")}>Footwear</button>
      </SwiperSlide>

      {/* Accessories */}
      <SwiperSlide>
        <button   className="pl-3" onClick={() => setSelectedCategory("accessories")}>Accessories</button>
      </SwiperSlide>

      {/* Nike */}
      <SwiperSlide>
        <button  className="pl-7" onClick={() => setSelectedBrand("nike")}>Nike</button>
      </SwiperSlide>

      {/* Adidas */}
      <SwiperSlide>
        <button  className="pl-3" onClick={() => setSelectedBrand("adidas")}>Adidas</button>
      </SwiperSlide>

      {/* Puma */}
      <SwiperSlide>
        <button className="pl-3" onClick={() => setSelectedBrand("puma")}>Puma</button>
      </SwiperSlide>

      {/* Price Low to High */}
      <SwiperSlide>
        <button className="pl-3"  onClick={() => handleSortByClick("lowToHigh")}>Price Low to High</button>
      </SwiperSlide>

      {/* Price High to Low */}
      <SwiperSlide>
        <button  className="pl-3" onClick={() => handleSortByClick("highToLow")}>Price High to Low</button>
      </SwiperSlide>
      
    </Swiper>
  </div>
)}


   

      <div className=" w-full h-full container m-3 px-4 p-3 flex gap-10">
        {/* Sidebar */}



      {showMenu && (
        <div className="w-1/4">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <ul>
              <li>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`shopBy ${
                    selectedCategory === "All" ? "font-bold" : ""
                  }`}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory("clothing")}
                  className={`shopBy ${
                    selectedCategory === "clothing" ? "font-bold" : ""
                  }`}
                >
                  Clothing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory("footwear")}
                  className={`shopBy ${
                    selectedCategory === "footwear" ? "font-bold" : ""
                  }`}
                >
                  Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory("accessories")}
                  className={`shopBy ${
                    selectedCategory === "accessories" ? "font-bold" : ""
                  }`}
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold ">Shop by Brand</h2>
            <ul>
              <li>
                <button
                  onClick={() => setSelectedBrand("All")}
                  className={`shopBy ${
                    selectedBrand === "All" ? "font-bold" : ""
                  }`}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedBrand("nike")}
                  className={`shopBy ${
                    selectedBrand === "nike" ? "font-bold" : ""
                  }`}
                >
                  Nike
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedBrand("adidas")}
                  className={`shopBy ${
                    selectedBrand === "adidas" ? "font-bold" : ""
                  }`}
                >
                  Adidas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedBrand("puma")}
                  className={`shopBy ${
                    selectedBrand === "puma" ? "font-bold" : ""
                  }`}
                >
                  Puma
                </button>
              </li>
            </ul>
          </div>

          <div className="my-6">
            <h2 className="text-2xl font-bold">Sort by Price</h2>
            <ul>
              <li>
                <button
                  onClick={() => handleSortByClick("lowToHigh")}
                  className={`shopBy ${
                    sortBy === "lowToHigh" ? "font-bold" : ""
                  }`}
                >
                  Low to High
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSortByClick("highToLow")}
                  className={`shopBy ${
                    sortBy === "highToLow" ? "font-bold" : ""
                  }`}
                >
                  High to Low
                </button>
              </li>
            </ul>
          </div>
        </div>
          )}

        {/* Product Listing */}

        <div className=" w-full flex flex-wrap ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2   xl:grid-cols-4 lg:grid-cols-3 gap-4">
        {filteredProducts.slice(0, productsPerPage).map((product, index) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 m-4 shadow-md flex flex-col justify-between image-container relative"
              onMouseEnter={() => setHoveredWearIndex(index)}
              onMouseLeave={() => setHoveredWearIndex(null)}
            >
              <Link href={`shop/${product.id}`}>
                <div className="border-b pb-2">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={550}
                    height={160}
                    className="object-contain w-[400px] h-72 cursor-pointer rounded-t-lg"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold mb-1 hover:text-magenta">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{product.description}</p>
                  <p className="text-[#286f6b] text-lg">₦{product.price}</p>
                </div>
              </Link>
              <div
                className={`absolute top-0 right-0 mt-2 mr-2 flex flex-col items-center space-y-2 icon-container ${
                  hoveredWearIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
                style={{
                  transform: `translateX(${
                    hoveredWearIndex === index ? "0" : "100%"
                  })`,
                  transition:
                    "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                }}
              >
                <button
                  className={`p-2 bg-white shadow-md rounded hover:bg-magenta`}
                   onClick={() => 
                    dispatch(
                      addToCart({
                        id:product.id,
                        title:product.title,
                        category:product.category,
                        brand:product.brand,
                        images:product.images,
                        price: product.price,
                        quantity:1,
                        description:product.description,
                        main_des:product.main_des
                      })
                      ) 
                    }
                  // disabled={addedItems.includes(product.id)}
                  // title={
                  //   addedItems.includes(product.id)
                  //     ? "Item already in cart"
                  //     : "Add to Cart"
                  // }
                >
                  <ImCart />
                </button>
                  <button className="p-2 bg-white shadow-md rounded hover:bg-magenta" 
                    onClick={() => 
                      dispatch(
                        addToFav({
                          id:product.id,
                          title:product.title,
                          category:product.category,
                          brand:product.brand,
                          images:product.images,
                          price: product.price,
                          quantity:1,
                          description:product.description,
                          main_des:product.main_des
                        })
                        )
                      }>
                  <GoHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>


    </div>
  );
};

export default Shop;
