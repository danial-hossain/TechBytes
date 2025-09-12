import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import "./style.css";

const HelpCenter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/help/submit", { email, message });
      alert(res.data.message);
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Try again later.");
    }
  };

  return (
    <div>
      <Header />
      <main className="help-center container">
        <h2>Help Center</h2>
        <p>We’re here to help! Send us your query below:</p>
        <form className="help-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />

          <button type="submit" className="help-btn">Send</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
