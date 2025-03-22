import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/message") // Updated port
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("Error fetching message:", err.response?.data || err.message));
  }, []);

  return (
    <div className="App">
      <h1>{message || "Loading message..."}</h1>
    </div>
  );
};

export default App;
