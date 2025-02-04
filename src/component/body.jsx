import React, { useState } from "react";
import "../App.css";
import RestaurantCard from "./Restaurantcards";
import restaurants from "../utilis/mockdata";

const Body = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("reset");
  const [searchText, setSearchText] = useState("");

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };
  


  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownActive(false); // Close dropdown after selection
  };

  // Filter restaurants based on search text and selected filter
  const getFilteredRestaurants = () => {
    // First apply search filter
    let filtered = restaurants.filter((restaurant) =>
      restaurant.title.toLowerCase().includes(searchText.toLowerCase()) ||
      restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase())
    );
`` 
    // Then apply category filter
    switch (selectedFilter) {
      case "Top Rated":
        return filtered.filter(restaurant => restaurant.rating >= 4.5);
      case "Most Seller":
        return filtered.sort((a, b) => b.sales - a.sales);
      case "Nearby":
        return filtered.sort((a, b) => a.distance - b.distance);
      case "reset":
        return filtered;
      default:
        return filtered;
    }
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <div className="main">
      <div className="search">
        <input 
          type="search" 
          placeholder="Search restaurants..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        
        <div className="dropdown">
          <button
            className={`dropbtn ${isDropdownActive ? 'active' : ''}`}
            onClick={toggleDropdown}
          >
            {selectedFilter === 'reset' ? 'Filter' : selectedFilter}
          </button>

          {isDropdownActive && (
            <div className="dropdown-content">
              <button 
                className={selectedFilter === "Top Rated" ? "active" : ""}
                onClick={() => handleFilterChange("Top Rated")}
              >
                Top Rated
              </button>
              <button 
                className={selectedFilter === "Most Seller" ? "active" : ""}
                onClick={() => handleFilterChange("Most Seller")}
              >
                Most Seller
              </button>
              <button 
                className={selectedFilter === "Nearby" ? "active" : ""}
                onClick={() => handleFilterChange("Nearby")}
              >
                Nearby
              </button>
              <button 
                className={selectedFilter === "reset" ? "active" : ""}
                onClick={() => handleFilterChange("reset")}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredRestaurants.length === 0 ? (
        <div className="no-results">
          No restaurants found matching your criteria
        </div>
      ) : (
        <div className="restaurantcard">
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard 
              key={restaurant.id || index} 
              {...restaurant} 
              imageKey={index % 9} // Assuming you have 9 images
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;



// import React, { useState, useEffect, useCallback } from "react";
// import "../App.css";
// import RestaurantCard from "./Restaurantcards";
// import restaurants from "../utilis/mockdata";


// const Body = () => {
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [isDropdownActive, setIsDropdownActive] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("reset");
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Reset visible count when filters or search change
//   useEffect(() => {
//     setVisibleCount(6);
//   }, [searchText, selectedFilter]);

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//       document.documentElement.offsetHeight ||
//       loading
//     ) {
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setVisibleCount((prev) => prev + 6);
//       setLoading(false);
//     }, 1000);
//   }, [loading]);

//   // Add scroll event listener
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const toggleDropdown = () => {
//     setIsDropdownActive(!isDropdownActive);
//   };

//   const handleFilterChange = (filter) => {
//     setSelectedFilter(filter);
//     setIsDropdownActive(false);
//   };

//   const getFilteredRestaurants = () => {
//     let filtered = restaurants.filter((restaurant) =>
//       restaurant.title.toLowerCase().includes(searchText.toLowerCase()) ||
//       restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase())
//     );

//     switch (selectedFilter) {
//       case "Top Rated":
//         return filtered.filter(restaurant => restaurant.rating >= 4.5);
//       case "Most Seller":
//         return [...filtered].sort((a, b) => b.sales - a.sales);
//       case "Nearby":
//         return [...filtered].sort((a, b) => a.distance - b.distance);
//       case "reset":
//         return filtered;
//       default:
//         return filtered;
//     }
//   };

//   const filteredRestaurants = getFilteredRestaurants();
//   const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);
//   const hasMore = visibleRestaurants.length < filteredRestaurants.length;

//   return (
//     <div className="main">
//       <div className="search">
//         <input 
//           type="search" 
//           placeholder="Search restaurants..." 
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="search-input"
//         />
        
//         <div className="dropdown">
//           <button
//             className={`dropbtn ${isDropdownActive ? 'active' : ''}`}
//             onClick={toggleDropdown}
//           >
//             {selectedFilter === 'reset' ? 'Filter' : selectedFilter}
//           </button>

//           {isDropdownActive && (
//             <div className="dropdown-content">
//               {/* ... dropdown buttons same as before ... */}
//             </div>
//           )}
//         </div>
//       </div>

//       {visibleRestaurants.length === 0 ? (
//         <div className="no-results">
//           No restaurants found matching your criteria
//         </div>
//       ) : (
//         <>
//           <div className="restaurantcard">
//             {visibleRestaurants.map((restaurant, index) => (
//               <RestaurantCard 
//                 key={restaurant.id || index} 
//                 {...restaurant} 
//                 imageKey={index % 9}
//               />
//             ))}
//           </div>

//           {hasMore && (
//             <div className="load-more-container">
//               <button 
//                 className="load-more-btn"
//                 onClick={() => setVisibleCount(prev => prev + 6)}
//                 disabled={loading}
//               >
//                 {loading ? 'Loading...' : 'Load More'}
//               </button>
//             </div>
//           )}

//           {loading && <div className="loading-spinner">Loading more restaurants...</div>}
//         </>
//       )}
//       <footer>
//         <footer/>
//       </footer>
//     </div>
   
//   );
// };



// export default Body;