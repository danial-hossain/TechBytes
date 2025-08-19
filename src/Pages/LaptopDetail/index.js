import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

// Laptop data (same as LaptopList)
const laptops = [
  {
    id: 1,
    name: "HP Pavilion 15",
    price: 750,
    img: require("../../assets/laptops/hp_pavilion.jpg"),
    config: "Intel i7, 16GB RAM, 512GB SSD, GTX 1650",
  },
  {
    id: 2,
    name: "Dell Inspiron 14",
    price: 680,
    img: require("../../assets/laptops/dell_inspiron.jpg"),
    config: "Intel i5, 8GB RAM, 256GB SSD, Integrated Graphics",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: 1200,
    img: require("../../assets/laptops/macbook_air.jpg"),
    config: "Apple M2, 8GB RAM, 256GB SSD, Integrated GPU",
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1",
    price: 950,
    img: require("../../assets/laptops/thinkpad_x1.jpg"),
    config: "Intel i7, 16GB RAM, 1TB SSD, Intel Iris Xe",
  },
];

const LaptopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const laptop = laptops.find((l) => l.id === parseInt(id));

  if (!laptop) {
    return <p>Laptop not found</p>;
  }

  return (
    <div className="laptop-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="laptop-detail-card">
        <img src={laptop.img} alt={laptop.name} />
        <div className="laptop-info">
          <h2>{laptop.name}</h2>
          <p className="price">${laptop.price}</p>
          <p className="config">{laptop.config}</p>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetail;
