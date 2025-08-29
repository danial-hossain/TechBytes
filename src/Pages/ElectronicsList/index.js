import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// Electronics data
const electronics = [
  {
    id: 1,
    name: "Samsung Galaxy S23",
    price: 999,
    img: require("../../assets/electronics/samsung_s23.jpg"),
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    img: require("../../assets/electronics/sony_headphones.jpg"),
  },
  {
    id: 3,
    name: "iPad Pro 12.9",
    price: 1099,
    img: require("../../assets/electronics/ipad_pro.jpg"),
  },
  {
    id: 4,
    name: "Canon EOS R7 Camera",
    price: 1399,
    img: require("../../assets/electronics/canon_r7.jpg"),
  },
];

const ElectronicsList = () => {
  const navigate = useNavigate();

  return (
    <div className="electronics-list-container">
      <h2>Our Electronics</h2>
      <div className="electronics-grid">
        {electronics.map((item) => (
          <div
            key={item.id}
            className="electronics-card"
            onClick={() => navigate(`/electronics/${item.id}`)}
          >
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsList;
