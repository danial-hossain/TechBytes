import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const electronics = [
  {
    id: 1,
    name: "Samsung Galaxy S23",
    price: 999,
    description: "Latest Samsung flagship phone with AMOLED display.",
    img: require("../../assets/electronics/samsung_s23.jpg"),
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    description: "Noise cancelling wireless headphones.",
    img: require("../../assets/electronics/sony_headphones.jpg"),
  },
  {
    id: 3,
    name: "iPad Pro 12.9",
    price: 1099,
    description: "Powerful tablet with M2 chip and Liquid Retina display.",
    img: require("../../assets/electronics/ipad_pro.jpg"),
  },
  {
    id: 4,
    name: "Canon EOS R7 Camera",
    price: 1399,
    description: "High-performance APS-C mirrorless camera.",
    img: require("../../assets/electronics/canon_r7.jpg"),
  },
];

const Electronicdetails = () => {
  const { id } = useParams();
  const item = electronics.find((e) => e.id === parseInt(id));

  if (!item) return <h2>Product not found!</h2>;

  return (
    <div className="electronics-detail-container">
      <img src={item.img} alt={item.name} />
      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
    </div>
  );
};

export default Electronicdetails;
