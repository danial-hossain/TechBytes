import React, { useState } from "react";
import "./style.css";

const ReportPage = () => {
  const [opinion, setOpinion] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🔥 handleSubmit fired:", opinion); // <-- ADD THIS

  try {
    const res = await fetch("http://localhost:5001/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opinion }),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (res.ok) {
      setMessage(data.message);
      setIsError(false);
      setOpinion(""); // clear textarea
    } else {
      setMessage(data.error || data.message || "Something went wrong");
      setIsError(true);
    }
  } catch (err) {
    console.error("Network error:", err);
    setMessage("Failed to connect to server");
    setIsError(true);
  }
};


  return (
    <div className="report-container">
      <h2>Give Your Opinion</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
          placeholder="Write your opinion..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      {message && (
        <p className={`message ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReportPage;
