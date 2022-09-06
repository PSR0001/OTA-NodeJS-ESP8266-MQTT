import React from "react";
import { FaCreativeCommonsNd, FaPowerOff,FaRegLightbulb,FaFan } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
const Home = () => {
  return (
    <div>
      <div className="First-container1 grid-container ">

{/* ===================ITEM ONE========================== */}
        <div className="display-flex space-center prevent-select">
          <div className="item item1">
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
        <div className="display-flex space-center prevent-select">
          <div className="item item2">
            <div className="main-button">
              <div className="power-icon">
                <FaRegLightbulb/>
              </div>
              <div className="power-icon">
                <FaPowerOff />
              </div>
            </div>
            <div className="main-button color-white">Bedroom Light</div>
          </div>
        </div>

{/* ===================ITEM THREE========================== */}
        <div className="display-flex space-center prevent-select">
          <div className="item item2">
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
        <div className="display-flex space-center prevent-select">
          <div className="item item2">
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
      {/* <hr /> */}
      
      <div className="First-container1"></div>
    </div>
  );
};

export default Home;
