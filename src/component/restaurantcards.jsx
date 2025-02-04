import React from "react";
import "../App.css";
import images from "../utilis/images";

const RestaurantCard = ({ title, restaurantName, rating, sales, distance, createdAt, imageKey }) => {
  return (
    <div className="restaurant-card">
      <img 
        className="card-image" 
        src={images[imageKey]} 
        alt={title} 
      />
      <div className="card-content">
        <div className="card-title">
          <h2>{title}</h2>
        </div>
        <div className="restaurant-name">
          <h3>{restaurantName}</h3>
        </div>
        <div className="rating">
          ⭐ {rating}
        </div>
        <div className="sales">
          <p>Sales: {sales}</p>
        </div>
        <div className="distance">
          <p>Distance: {distance} km</p>
        </div>
        <div className="createdAt">
          <p>Added on: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;