import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://mern-hello.onrender.com/api/message")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("Error fetching message:", err));
  }, []);  

  return (
    <div className="App">
      <h1>{message || "Loading message..."}</h1>
    </div>
  );
};

export default App;
