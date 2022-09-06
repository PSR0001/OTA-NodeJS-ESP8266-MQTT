import React from "react";
// import Qrapp from './components/Qr';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

function App() {
  return (
    <>
      <div className="main">
        <Navbar />
        <div className="main-inner">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
