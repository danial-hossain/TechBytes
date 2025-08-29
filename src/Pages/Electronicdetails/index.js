import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const electronics = [
  {
    id: 1,
    name: "Samsung Galaxy S23",
    img: require("../../assets/electronics/samsung_s23.jpg"),
    price: 999,
    oldPrice: 1200,
    status: "In Stock",
    code: 129909,
    description: "Latest Samsung flagship phone with AMOLED display.",
    features: [
      "6.1-inch Dynamic AMOLED 2X display",
      "120Hz refresh rate",
      "Snapdragon 8 Gen 2 chip",
      "50MP triple camera system",
      "5G connectivity"
    ],
    specifications: {
      display: "6.1-inch AMOLED, 120Hz",
      processor: "Qualcomm Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "128GB / 256GB",
      battery: "3900mAh",
      os: "Android 13"
    },
    reviews: [
      { user: "Ayesha", rating: 5, comment: "Amazing phone, super fast and camera quality is stunning." },
      { user: "Rahim", rating: 4, comment: "Great device but battery life could be better." }
    ],
    
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    price: 349,
    description: "Noise cancelling wireless headphones.",
    img: require("../../assets/electronics/sony_headphones.jpg"),
    features: [
      "Active Noise Cancellation",
      "Up to 30 hours battery life",
      "Quick charging (3 mins = 3 hours)",
      "Touch controls",
      "Lightweight & comfortable fit"
    ],
    specifications: {
      Type: "Over-ear, Wireless",
      NoiseCancelling: "Yes (ANC)",
      Battery: "30 hours",
      Charging: "USB-C, Fast charging",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2"
    }
  },
  {
    id: 3,
    name: "iPad Pro 12.9",
    price: 1099,
    description: "Powerful tablet with M2 chip and Liquid Retina display.",
    img: require("../../assets/electronics/ipad_pro.jpg"),
    features: [
      "12.9-inch Liquid Retina XDR display",
      "Apple M2 chip",
      "Face ID security",
      "Apple Pencil 2 support",
      "5G and Wi-Fi 6E support"
    ],
    specifications: {
      Display: "12.9-inch Liquid Retina XDR",
      Processor: "Apple M2 chip",
      RAM: "8GB / 16GB",
      Storage: "128GB up to 2TB",
      Battery: "10 hours",
      OS: "iPadOS 16"
    }
  },
  {
    id: 4,
    name: "Canon EOS R7 Camera",
    price: 1399,
    description: "High-performance APS-C mirrorless camera.",
    img: require("../../assets/electronics/canon_r7.jpg"),
    features: [
      "32.5MP APS-C CMOS Sensor",
      "Dual Pixel CMOS AF II",
      "4K60p video recording",
      "In-body Image Stabilization",
      "High-speed continuous shooting"
    ],
    specifications: {
      Sensor: "32.5MP APS-C CMOS",
      Processor: "DIGIC X",
      Autofocus: "Dual Pixel CMOS AF II",
      ISO: "100-32000 (expandable)",
      Video: "4K up to 60fps",
      Connectivity: "Wi-Fi, Bluetooth"
    }
  },
];

const Electronicdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Specification");

  const item = electronics.find((e) => e.id === parseInt(id));
  if (!item) return <h2>Product not found!</h2>;

  const renderTabContent = () => {
    if (activeTab === "Specification" && item.specifications) {
      return (
        <table className="spec-table">
          <tbody>
            {Object.entries(item.specifications).map(([key, value]) => (
              <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "Description") {
      return <p>{item.description}</p>;
    }
  };

  return (
    <div className="electronics-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="electronics-detail-card">
        <div className="electronics-image">
          <img src={item.img} alt={item.name} />
        </div>

        <div className="electronics-info">
          <h2>{item.name}</h2>
          <div className="price-row">
            <span className="price">${item.price}</span>
            {item.oldPrice && (
              <span className="old-price">${item.oldPrice}</span>
            )}
          </div>
          {item.status && <p><strong>Status:</strong> {item.status}</p>}
          {item.code && <p><strong>Product Code:</strong> {item.code}</p>}
          {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}

          {item.features && (
            <>
              <h3>Key Features:</h3>
              <ul>
                {item.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}

          <button
            className="buy-btn"
            disabled={item.status === "Out of Stock"}
          >
            {item.status === "Out of Stock" ? "Unavailable" : "Buy Now"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button
          className={activeTab === "Specification" ? "active" : ""}
          onClick={() => setActiveTab("Specification")}
        >
          Specification
        </button>
        <button
          className={activeTab === "Description" ? "active" : ""}
          onClick={() => setActiveTab("Description")}
        >
          Description
        </button>
      </div>

      <div className="tabs-content">{renderTabContent()}</div>
    </div>
  );
};

export default Electronicdetails