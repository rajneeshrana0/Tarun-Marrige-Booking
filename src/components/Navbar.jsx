import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import Slider from "./Slider"; // Import Slider component
import logo from "../assets/logo light.png";
import hoverLogo from "../assets/logo dark.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for navbar hover
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Mobile menu state

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const searchBarRef = useRef(null); // Ref for search bar
  const menuRef = useRef(null); // Ref for mobile menu

  // Get the current location (current route)
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Close menu if clicked outside
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside); // Detect clicks outside search bar and menu
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch categories and collections from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://tarun-marrige-booking.onrender.com/api/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://tarun-marrige-booking.onrender.com/api/collections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCategories();
    fetchCollections();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Reset hover state
  };

  return (
    <>
      <div className="relative w-full overflow-x-hidden">
        {/* Only render the Slider on the Home page (path === "/") */}
        {location.pathname === "/" ? (
          <div className="">
            <Slider />
          </div>
        ) : (
          <div className="h-0"></div> // Add a class with no height on non-home pages to avoid empty space
        )}

        {/* Navbar */}
        <div
          className={`${isScrolled || location.pathname !== "/"
            ? "bg-white shadow-md text-black"
            : "bg-transparent text-white"
            } fixed top-0 left-0 w-full z-50 transition-colors duration-200 hover:bg-white hover:text-black`}
          onMouseEnter={handleMouseEnter} // Handle mouse enter
          onMouseLeave={handleMouseLeave} // Handle mouse leave
        >
          {/* Only show the search bar when search is clicked */}
          {!showSearchBar && (
            <>
              {/* Hamburger menu (Mobile) */}
              <div className="absolute left-5 top-5 md:hidden">
                <FontAwesomeIcon
                  icon={faBars}
                  className={`text-2xl mt-1 cursor-pointer ${showMenu || location.pathname !== "/"
                    ? "text-black"
                    : isHovered
                      ? "text-black"
                      : isScrolled
                        ? "text-black"
                        : "text-white"
                    }`} // Change to black if menu is open or on other pages
                  onClick={toggleMenu}
                  onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
                  onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
                />
              </div>

              {/* Navbar content (links and logo) */}
              <div
                className={`h-[80px] flex justify-between items-center px-10 ${showMenu ? "hidden" : "" // Hide navbar content when menu is open
                  }`}
              >
                <div className="flex text-center">
                  <Link to={"/"}>
                    <img
                      src={
                        location.pathname === "/"
                          ? isScrolled || isHovered
                            ? hoverLogo
                            : logo
                          : hoverLogo
                      }
                      alt="Logo"
                      className="h-16 w-16 mx-auto transition-opacity duration-300"
                    />
                  </Link>
                </div>
                {/* Links for desktop */}
                <ul className="md:flex gap-10 items-center hidden">
                  <li>
                    <Link
                      to="/"
                      className="hover:border-b-2 hover:border-black font-corm"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      to="/about"
                      className="hover:border-b-2 hover:border-black font-corm"
                    >
                      About
                    </Link>
                    <div className="absolute left-0 top-full bg-white shadow-lg hidden group-hover:block">
                      <ul className="p-5">
                        <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                          <Link to="#founder">Founder</Link>
                        </li>
                        <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                          <Link to="#legacy">Legacy</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="relative group">
                    <Link
                      to=""
                      className="hover:border-b-2 hover:border-black font-corm"
                    >
                      Book Now
                    </Link>
                    {/* Dynamic Shop Dropdown with Categories and Collections */}
                    <div className="fixed border border-t-2 mt-6 inset-0 top-[50px] w-full h-96 bg-white shadow-lg hidden group-hover:flex p-5 gap-10 z-50">
                      {/* Categories Column */}
                      <div className="flex-grow ">
                        <h3 className="text-lg text-center font-semibold mb-3 font-corm">
                          Video Booking Services
                        </h3>
                        <div className="font-corm font-semibold">
                          <ul>
                            {categories.map((category) => (
                              <li
                                key={category.id}
                                className="hover:bg-gray-100 px-3 py-2 text-center"
                              >
                                <Link to={`/category/${category._id}`}>
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Collections Column */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold mb-3 font-corm">
                          Album Printing Services
                        </h3>
                        <div className="font-corm font-semibold">
                          <ul>
                            {collections.map((collection) => (
                              <li
                                key={collection.id}
                                className="hover:bg-gray-100 px-3 py-2"
                              >
                                <Link to={`/collection/${collection._id}`}>
                                  {collection.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className="hover:border-b-2 hover:border-black font-corm"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="hover:border-b-2 hover:border-black font-corm flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l1.4-6H6.6M7 13l1 5h8l1-5M5 6h14l-1.4 6H7.6L5 6z"
                        />
                      </svg>
                      Cart
                    </Link>
                  </li>

                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-start z-50"
            ref={menuRef}
          >
            <div className="bg-white w-64 h-full p-5">
              <FontAwesomeIcon
                icon={faTimes}
                className="text-2xl cursor-pointer ml-[170px] mt-2 text-black "
                onClick={toggleMenu}
              />
              <div className="flex justify-between items-center text-xl font-bold font-corm">
                <h1 className="mt-10">Menu</h1>
              </div>
              <ul className="mt-5">
                <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                  <Link to="/about" onClick={toggleMenu}>
                    About
                  </Link>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                  <Link to="" onClick={toggleMenu}>
                    Book Us
                  </Link>
                  {/* Add Categories under Shop in the Mobile Menu */}
                  <ul className="ml-4 mt-2">
                    <li className="font-bold text-lg">Categories:</li>
                    {categories.map((category) => (
                      <li
                        key={category._id}
                        className="hover:bg-gray-200 px-3 py-1 font-corm"
                      >
                        <Link
                          to={`/category/${category._id}`}
                          onClick={toggleMenu}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                    <li className="font-bold text-lg mt-4">Collections:</li>
                    {collections.map((collection) => (
                      <li
                        key={collection._id}
                        className="hover:bg-gray-200 px-3 py-1 font-corm"
                      >
                        <Link
                          to={`/collection/${collection._id}`}
                          onClick={toggleMenu}
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="hover:bg-gray-100 px-3 py-2 font-corm">
                  <Link to="/contact" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="hover:border-b-2 hover:border-black font-corm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l1.4-6H6.6M7 13l1 5h8l1-5M5 6h14l-1.4 6H7.6L5 6z"
                      />
                    </svg>
                    Cart
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
