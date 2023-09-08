"use client";
import { useState, useEffect, useRef } from "react";
import { paginationItems } from "../components/NiggiLinks/page";
import { FiX } from "react-icons/fi";
import { BiSolidSortAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { ImCart } from "react-icons/im";
import { GoHeart } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/niggiSlice";
import { ToastContainer, toast } from 'react-toastify';


const Shop = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [hoveredWearIndex, setHoveredWearIndex] = useState(null);


  const toggleSidebar = () => {
    setSidenav(!sidenav); 
  };

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 768) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
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
            <option value="75">75</option>
            <option value="90">90</option>
          </select>
        </div>
      </div>


      {sidenav ? (
          <FiX 
            onClick={toggleSidebar}
            className="text-2xl font-bold inline-block md:hidden cursor-pointer"
          />
        ) : (
          <BiSolidSortAlt 
            onClick={toggleSidebar}
            className="text-2xl font-bold inline-block md:hidden cursor-pointer"
          />
        )}
     

      <div className=" w-full h-full container m-3 px-4 p-3 flex gap-10">
        {/* Sidebar */}

        {sidenav && (
          <div className=" absolute left-0 w-64 bg-black m-3 p-4 text-gray-200 bg-opacity-80 z-40 rounded">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] h-[30%] relative"
            >
              <div>
                <div>
                  <h2 className="text-lg font-bold">Shop by Category</h2>
                  <ul>
                    <li>
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className={`shopBy2 ${
                          selectedCategory === "All" ? "font-bold" : ""
                        }`}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedCategory("clothing")}
                        className={`shopBy2 ${
                          selectedCategory === "clothing" ? "font-bold" : ""
                        }`}
                      >
                        Clothing
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedCategory("footwear")}
                        className={`shopBy2 ${
                          selectedCategory === "footwear" ? "font-bold" : ""
                        }`}
                      >
                        Footwear
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedCategory("accessories")}
                        className={`shopBy2 ${
                          selectedCategory === "accessories" ? "font-bold" : ""
                        }`}
                      >
                        Accessories
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-bold ">Shop by Brand</h2>
                  <ul>
                    <li>
                      <button
                        onClick={() => setSelectedBrand("All")}
                        className={`shopBy2 ${
                          selectedBrand === "All" ? "font-bold" : ""
                        }`}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedBrand("nike")}
                        className={`shopBy2 ${
                          selectedBrand === "nike" ? "font-bold" : ""
                        }`}
                      >
                        Nike
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedBrand("adidas")}
                        className={`shopBy2 ${
                          selectedBrand === "adidas" ? "font-bold" : ""
                        }`}
                      >
                        Adidas
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setSelectedBrand("puma")}
                        className={`shopBy2 ${
                          selectedBrand === "puma" ? "font-bold" : ""
                        }`}
                      >
                        Puma
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="my-6">
                  <h2 className="text-lg font-bold">Sort by Price</h2>
                  <ul>
                    <li>
                      <button
                        onClick={() => handleSortByClick("lowToHigh")}
                        className={`shopBy2 ${
                          sortBy === "lowToHigh" ? "font-bold" : ""
                        }`}
                      >
                        Low to High
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSortByClick("highToLow")}
                        className={`shopBy2 ${
                          sortBy === "highToLow" ? "font-bold" : ""
                        }`}
                      >
                        High to Low
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
           
            </motion.div>
          </div>
        )}


      {showMenu && (
        <div className="w-72">
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

        <div className="w-full p-2 flex flex-wrap ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2   xl:grid-cols-4 lg:grid-cols-3 gap-4 ">
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
                    width={200}
                    height={150}
                    className="object-contain w-96 h-72 cursor-pointer rounded-t-lg"
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
                      ) & toast.success(`${product.title} is added `)
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
                <button className="p-2 bg-white shadow-md rounded hover:bg-magenta">
                  <GoHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
};

export default Shop;
