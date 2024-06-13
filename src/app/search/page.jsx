"use client";
import React, { useMemo, useState } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import paginationItems from "../components/NiggiLinks/paginationItems.json";  
import Link from "next/link";
import Image from "next/image";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggProducts, setSuggProducts]  = useState([]);
  const [selectedTrendingSearch, setSelectedTrendingSearch] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(12);
  const productsPerPage = 15;

  const shuffledProducts = useMemo(() => {
    const shuffled = [...paginationItems.slice(0, 9)];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);
   

  const handleSearch = () => {
    let filtered;
    if (searchQuery) {
      // Use the original paginationItems for filtering when there's a search query
      filtered = paginationItems.filter((item) => {
        const loweredQuery = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(loweredQuery) ||
          item.description.toLowerCase().includes(loweredQuery) ||
          item.brand.toLowerCase().includes(loweredQuery) ||
          item.category.toLowerCase().includes(loweredQuery) ||
          item.price.includes(loweredQuery) ||
          item.main_des.toLowerCase().includes(loweredQuery) ||
          item.sex.toLowerCase().includes(loweredQuery)
        );
      });
    } else {
      // Use the shuffledProducts when there's no search query
      filtered = shuffledProducts;
    }
  
    // If the filtered results are empty, set filtered products to shuffled list
    setFilteredProducts(filtered.length > 0 ? filtered : shuffledProducts);
    setDisplayedProducts(productsPerPage);
  };
  
  


  const handleTrendingSearchClick = (trendingSearchItem) => {
    setSearchQuery(trendingSearchItem.toLowerCase());
    handleSearch();
    setSelectedTrendingSearch(trendingSearchItem); 
  };

  const handleShowMore = () => {
    setDisplayedProducts((prevCount) => prevCount + productsPerPage);
  };


  return (
    <div className="z-40">
      <div className="flex flex-row-2 md:w-800px lg:w-600px bg-slate-100">
        <button className="h-full w-[10%] text-lg text-primeColor flex items-center gap-2 justify-center px-6 rounded-xl mt-3 m-3 p-4 bg-white border-black border-[3px] md:hidden">
          <Link href="/"> 
            <FaArrowLeft className="w-6 h-6 flex text-center " />
          </Link>
        </button>
        <div className="relative w-[90%] text-lg text-primeColor flex items-center gap-2 justify-between px-6 rounded-xl mt-3 m-3 bg-white border-black border-[3px] ">
          <input
            className="w-full h-full focus:outline-none p-3 text-lg placeholder-text-xl"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch();
            }}
            value={searchQuery}
            placeholder="Search for your products here"
          />  
          <button onClick={handleSearch}>
            <FaSearch className="w-5 h-5 hover:scale-110 hover:text-magenta hover:transition cursor-pointer bg-white" />
          </button>
        </div>
        <button className="h-full w-[10%] text-lg text-primeColor  items-center gap-2 justify-between px-6 rounded-xl mt-3 m-3 p-4 hover:bg-magenta hover:scale-105 bg-white border-black border-[3px] md:inline hidden">
          <Link href="/"> Go Back
          </Link>
        </button>
      </div>
      <div className="w-full md:flex flex-row">
        <div className="md:w-1/4 w-full md:justify-center mt-4 m-3">
          <h1 className="font-bold text-3xl text-black">Trending Search</h1>
          <ul className="text-xl gap-3 mt-2 mr-2  text-gray-400 duration-300 cursor-pointer font-sans font-bold">
            <li
             className={`hover:text-magenta px-4 py-2 ${
              selectedTrendingSearch === "Shoes" && "text-magenta"
            }`}
            onClick={() => handleTrendingSearchClick("Shoes")}
          >
            Shoes
          </li>
          <li
             className={`hover:text-magenta px-4 py-2 ${
              selectedTrendingSearch === "Bratop" && "text-magenta"
            }`}
            onClick={() => handleTrendingSearchClick("Bratop")}
          >
            Bratops
          </li>
          <li
            className={`hover:text-magenta px-4 py-2 ${
              selectedTrendingSearch === "Baggy trouser" && "text-magenta"
            }`}
            onClick={() => handleTrendingSearchClick("Baggy trouser")}
          >
            Baggy trousers
          </li>
          <li
             className={`hover:text-magenta px-4 py-2 ${
              selectedTrendingSearch === "Short" && "text-magenta"
            }`}
            onClick={() => handleTrendingSearchClick("Short")}
          >
            Shorts
          </li>
          <li
             className={`hover:text-magenta px-4 py-2 ${
              selectedTrendingSearch === "Shirt" && "text-magenta"
            }`}
            onClick={() => handleTrendingSearchClick("Shirt")}
          >
            Shirts
          </li>
            
          </ul>
        </div>

        {!searchQuery && shuffledProducts.length > 0 && (
        <div className="md:w-3/4 w-full m-4 ml-2 md:mr-0">
          <h1 className="font-bold flex text-3xl my-4 mt-4 md:mt-0">
            Check This Out
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
            {shuffledProducts.slice(0, displayedProducts).map((item) => (
              <Link href={`/shop/${item.id}`} key={item.id}>
                
                  <div className="text-black flex items-center mt-6 mb-3">
                    <div className="mr-4">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        width={150}
                        height={80}
                        className="w-28 h-24"
                      />
                    </div>
                    <div>
                      <h1 className="text-base font-bold">{item.title}</h1>
                      <p className="text-base font-bold">{item.price}</p>
                    </div>
                  </div>
                
              </Link>
            ))}
            {shuffledProducts.length > displayedProducts && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-magenta text-white px-4 py-2 rounded-full hover:scale-105"
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      )}

        {searchQuery && filteredProducts.length > 0 && (
        <div className="md:w-3/4 w-full m-4 ml-2 md:mr-0">
          <h1 className="font-bold flex justify-center text-3xl my-4 mt-4 md:mt-0">
            Suggested Products
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
            {filteredProducts.slice(0, displayedProducts).map((item) => (
              <Link href={`/shop/${item.id}`} key={item.id}>
                <div className="text-black flex items-center mt-6 mb-3">
                  <div className="mr-4">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={150}
                      height={80}
                      className="w-28 h-24"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-bold">{item.title}</h1>
                    <p className="text-base font-bold">{item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
            {filteredProducts.length > displayedProducts && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-magenta text-white px-4 py-2 rounded-full hover:scale-105"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
    </div>
  </div>
  
  
  )}
   
    </div>
    </div>
  );
};

export default Search;
