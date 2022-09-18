// import React, { useState, useEffect } from 'react'
import React,{useState} from 'react'
import { FaCreativeCommonsNd, FaPowerOff, FaRegLightbulb, FaFan } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";

const Upper = () => {

  //button initial state
  const [first, setfirst] = useState(false)
  const [second, setsecond] = useState(false)
  const [third, setthird] = useState(false)
  const [fourth, setfourth] = useState(false)

  // function FETCH(data){
  //   fetch('http://192.168.43.73:8000/handelESP', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Success:', data);
  //       alert('Success:'+data)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

function AirC(){
  console.log("Air");
  // FETCH(true)
  
}
function Bedroom(){
  console.log("Bedroom");
}
function Fan(){
  console.log("Fan");
}
function Main(){
  console.log("main");
}





  return (
    <div className="First-container1 grid-container ">

      {/* ===================ITEM ONE========================== */}
      <div onClick={()=>{
        setfirst(true)
        AirC()
      }} className="display-flex space-center prevent-select effect ">
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
      <div onClick={Bedroom} className="display-flex space-center prevent-select effect">
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
      <div onClick={Fan} className="display-flex space-center prevent-select effect">
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
      <div onClick={Main} className="display-flex space-center prevent-select effect">
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