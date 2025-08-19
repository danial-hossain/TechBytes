import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

// Full laptop dataset
const laptops = [
  {
    id: 1,
    name: "HP Pavilion 15",
    price: 27900,
    oldPrice: 30270,
    img: require("../../assets/laptops/hp_pavilion.jpg"),
    status: "In Stock",
    code: "12651",
    brand: "Chuwi",
    features: [
      "Model: Chuwi HeroBook Pro",
      "Intel Celeron Processor N4020 (4M Cache, 1.10 GHz up to 2.80 GHz)",
      "8GB LPDDR4 RAM",
      "256GB SSD",
      "14.1 Inch (1920 x 1080) IPS Anti-Glare Display",
    ],
  },
  {
    id: 2,
    name: "Dell Inspiron 14",
    price: 68000,
    oldPrice: 72000,
    img: require("../../assets/laptops/dell_inspiron.jpg"),
    status: "In Stock",
    code: "14523",
    brand: "Dell",
    features: [
      "Intel i5-1135G7 Processor",
      "8GB DDR4 RAM",
      "512GB SSD",
      "14 Inch FHD Display",
      "Intel Iris Xe Graphics",
    ],
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: 120000,
    oldPrice: 130000,
    img: require("../../assets/laptops/macbook_air.jpg"),
    status: "In Stock",
    code: "18732",
    brand: "Apple",
    features: [
      "Apple M2 Chip",
      "8GB Unified Memory",
      "256GB SSD",
      "13.6 Inch Retina Display",
      "Integrated GPU",
    ],
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1",
    price: 95000,
    oldPrice: 102000,
    img: require("../../assets/laptops/thinkpad_x1.jpg"),
    status: "Out of Stock",
    code: "19482",
    brand: "Lenovo",
    features: [
      "Intel i7-1165G7 Processor",
      "16GB DDR4 RAM",
      "1TB SSD",
      "14 Inch FHD Display",
      "Intel Iris Xe Graphics",
    ],
  },
];

const LaptopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const laptop = laptops.find((l) => l.id === parseInt(id));

  if (!laptop) return <p>Laptop not found</p>;

  return (
    <div className="laptop-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="laptop-detail-card">
        <div className="laptop-image">
          <img src={laptop.img} alt={laptop.name} />
        </div>

        <div className="laptop-info">
          <h2>{laptop.name}</h2>

          <div className="price-row">
            <span className="price">{laptop.price.toLocaleString()}৳</span>
            <span className="old-price">{laptop.oldPrice.toLocaleString()}৳</span>
          </div>

          <p><strong>Status:</strong> {laptop.status}</p>
          <p><strong>Product Code:</strong> {laptop.code}</p>
          <p><strong>Brand:</strong> {laptop.brand}</p>

          <h3>Key Features:</h3>
          <ul>
            {laptop.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <button className="buy-btn" disabled={laptop.status === "Out of Stock"}>
            {laptop.status === "Out of Stock" ? "Unavailable" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetail;
