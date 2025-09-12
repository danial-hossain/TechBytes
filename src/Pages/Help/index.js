// Copyright 2024 Google LLC
// Licensed under the Apache License, Version 2.0

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css";

const HelpCenter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Here you could call your backend API
    console.log("Help request submitted:", { email, message });

    alert("Your message has been sent! We’ll get back to you soon.");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      {/* ✅ Inherits Header */}
      <Header />

      <main className="help-center container">
        <h2 className="help-title">Help Center</h2>
        <p className="help-subtitle">We’re here to help! Please send us your query.</p>

        <form className="help-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Message</label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            required
          />

          <button type="submit" className="help-btn">Send</button>
        </form>
      </main>

      {/* ✅ Inherits Footer */}
      <Footer />
    </div>
  );
};

export default HelpCenter;
