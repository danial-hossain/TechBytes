import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

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
    specification: {
      Processor: {
        "Processor Brand": "Intel",
        "Processor Model": "Celeron N4020",
        "Processor Frequency": "1.10 GHz up to 2.80 GHz",
        "Processor Core": 2,
        "Processor Thread": 2,
        "CPU Cache": "4MB"
      },
      Display: {
        "Display Size": "14.1 Inch",
        "Display Type": "IPS",
        "Display Resolution": "1920 x 1080"
      },
      Memory: { RAM: "8GB", "RAM Type": "LPDDR4" },
      Storage: { "Storage Capacity": "256GB", "Storage Upgrade": "Up to 512GB" }
    },
    description: "Chuwi HeroBook Pro Intel Celeron N4020 14.1 inch Full HD Laptop with Windows 11. Glare-proof screen, night mode & color setting reduce eye strain.",
    reviews: [{ rating: 5, comment: "Best FHD laptop in budget." }]
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
    specification: {
      Processor: {
        "Processor Brand": "Intel",
        "Processor Model": "i5-1135G7",
        "Processor Frequency": "2.4 GHz up to 4.2 GHz",
        "Processor Core": 4,
        "Processor Thread": 8,
        "CPU Cache": "8MB"
      },
      Display: {
        "Display Size": "14 Inch",
        "Display Type": "FHD IPS",
        "Display Resolution": "1920 x 1080"
      },
      Memory: { RAM: "8GB", "RAM Type": "DDR4" },
      Storage: { "Storage Capacity": "512GB SSD", "Storage Upgrade": "Up to 1TB" }
    },
    description: "Dell Inspiron 14 with Intel i5, 8GB RAM, 512GB SSD. Perfect for work and study.",
    reviews: [{ rating: 4, comment: "Good performance but battery life average." }]
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
    specification: {
      Processor: {
        "Processor Brand": "Apple",
        "Processor Model": "M2",
        "Processor Frequency": "8-Core CPU",
        "Processor Core": 8,
        "Processor Thread": 8,
        "CPU Cache": "N/A"
      },
      Display: {
        "Display Size": "13.6 Inch",
        "Display Type": "Retina",
        "Display Resolution": "2560 x 1664"
      },
      Memory: { RAM: "8GB Unified", "RAM Type": "Unified Memory" },
      Storage: { "Storage Capacity": "256GB SSD", "Storage Upgrade": "N/A" }
    },
    description: "Apple MacBook Air M2 13.6 inch Retina, lightweight and powerful for professional work.",
    reviews: [{ rating: 5, comment: "Super fast and silent. Love it!" }]
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
    specification: {
      Processor: {
        "Processor Brand": "Intel",
        "Processor Model": "i7-1165G7",
        "Processor Frequency": "2.8 GHz up to 4.7 GHz",
        "Processor Core": 4,
        "Processor Thread": 8,
        "CPU Cache": "12MB"
      },
      Display: {
        "Display Size": "14 Inch",
        "Display Type": "FHD IPS",
        "Display Resolution": "1920 x 1080"
      },
      Memory: { RAM: "16GB", "RAM Type": "DDR4" },
      Storage: { "Storage Capacity": "1TB SSD", "Storage Upgrade": "Up to 2TB" }
    },
    description: "Lenovo ThinkPad X1 Carbon with Intel i7, 16GB RAM, 1TB SSD. Premium business laptop.",
    reviews: [{ rating: 5, comment: "Excellent build quality, perfect for professionals." }]
  }
];

const LaptopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Specification");

  const laptop = laptops.find(l => l.id === parseInt(id));
  if (!laptop) return <p>Laptop not found</p>;

  const renderTabContent = () => {
    if(activeTab === "Specification") {
      return Object.keys(laptop.specification).map(section => (
        <div key={section} className="spec-section">
          <h4>{section}</h4>
          <table>
            <tbody>
              {Object.entries(laptop.specification[section]).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ));
    } else if(activeTab === "Description") {
      return <p>{laptop.description}</p>;
    } else if(activeTab === "Reviews") {
      return laptop.reviews.map((r, index) => (
        <div key={index}>
          <p>Rating: {"⭐".repeat(r.rating)}</p>
          <p>{r.comment}</p>
        </div>
      ));
    }
  };

  return (
    <div className="laptop-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

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
            {laptop.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button className="buy-btn" disabled={laptop.status === "Out of Stock"}>
            {laptop.status === "Out of Stock" ? "Unavailable" : "Buy Now"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button className={activeTab==="Specification"?"active":""} onClick={()=>setActiveTab("Specification")}>Specification</button>
        <button className={activeTab==="Description"?"active":""} onClick={()=>setActiveTab("Description")}>Description</button>
        <button className={activeTab==="Reviews"?"active":""} onClick={()=>setActiveTab("Reviews")}>Reviews ({laptop.reviews.length})</button>
      </div>
      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default LaptopDetail;
