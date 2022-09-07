// import React, { useState, useEffect } from 'react'
import React from 'react'
import { FaCreativeCommonsNd, FaPowerOff, FaRegLightbulb, FaFan } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";

const Upper = () => {

  //button initial state
  // const [first, setfirst] = useState()
  // const [second, setsecond] = useState()
  // const [third, setthird] = useState()
  // const [fourth, setfourth] = useState()

  //fetch from esp8266 data;

  // useEffect(() => {
  //   console.log("Ready...");
  // }, [])

  // function AC(){
  //     console.log("Clicked")
      
  // }






  return (
    <div className="First-container1 grid-container ">

      {/* ===================ITEM ONE========================== */}
      <div className="display-flex space-center prevent-select effect ">
        <div className="item item1 glass">
          <div className="main-button">
            <div className="power-icon">
              <FaCreativeCommonsNd />
            </div>
            <div className="power-icon color-white">
              <FaPowerOff />
            </div>
          </div>
          <div className="main-button color-white">Air Conditioner</div>
        </div>
      </div>

      {/* ===================ITEM TWO========================== */}
      <div className="display-flex space-center prevent-select effect">
        <div className="item item2 glass">
          <div className="main-button">
            <div className="power-icon">
              <FaRegLightbulb />
            </div>
            <div className="power-icon">
              <FaPowerOff />
            </div>
          </div>
          <div className="main-button color-white">Bedroom Light</div>
        </div>
      </div>

      {/* ===================ITEM THREE========================== */}
      <div className="display-flex space-center prevent-select effect">
        <div className="item item2 glass">
          <div className="main-button">
            <div className="power-icon">
              <FaFan />
            </div>
            <div className="power-icon">
              <FaPowerOff />
            </div>
          </div>
          <div className="main-button color-white">Living Room Fan</div>
        </div>
      </div>

      {/* ===================ITEM FOUR========================== */}
      <div className="display-flex space-center prevent-select effect">
        <div className="item item2 glass">
          <div className="main-button">
            <div className="power-icon">
              <HiLightBulb />
            </div>
            <div className="power-icon">
              <FaPowerOff />
            </div>
          </div>
          <div className="main-button color-white">Main Light</div>
        </div>
      </div>
    </div>
  )
}

export default Upper