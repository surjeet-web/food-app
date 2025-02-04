import React, { useState } from "react";
import "../App.css";


  return (
    <div className="dropdown">
      <button 
        className="dropbtn"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        Filter
      </button>

      {isDropdownActive && (
        <div className="dropdown-content">
          <button  onClick={() => {} } >Top Rated</button>
          <button>Most Seller</button>
          <button>Nearby</button>
          <button>Newest</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
