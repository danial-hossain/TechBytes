import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

// Laptop data
const laptops = [
  {
    id: 1,
    name: "HP Pavilion 15",
    price: 750,
    img: require("../../assets/laptops/hp_pavilion.jpg"),
  },
  {
    id: 2,
    name: "Dell Inspiron 14",
    price: 680,
    img: require("../../assets/laptops/dell_inspiron.jpg"),
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: 1200,
    img: require("../../assets/laptops/macbook_air.jpg"),
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1",
    price: 950,
    img: require("../../assets/laptops/thinkpad_x1.jpg"),
  },
];

const LaptopList = () => {
  const navigate = useNavigate();

  return (
    <div className="laptop-list-container">
      <h2>Our Laptops</h2>
      <div className="laptop-grid">
        {laptops.map((laptop) => (
          <div
            key={laptop.id}
            className="laptop-card"
            onClick={() => navigate(`/laptop/${laptop.id}`)}
          >
            <img src={laptop.img} alt={laptop.name} />
            <h3>{laptop.name}</h3>
            <p>${laptop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopList;
