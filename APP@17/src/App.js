// import React,{useEffect,useState} from "react";
import React from "react";
import Qrapp from './components/Qr';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Footer from "./components/Footer";
import Message from "./components/Message";
// import MSG from "./components/MSG"




import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Setting from "./components/Setting";
// import io from 'socket.io-client';

//const socket = io("http://localhost:8000");



function App() {

    
//   useEffect(() => {
//     socket.on('connect', () => {

//       setIsConnected(true);
//       // console.log("socket connected");
//     });

//     socket.on('disconnect', () => {
//       setIsConnected(false);
//       // console.log("not connected");
//     });

//     socket.on('hex', (msg) => {
//     // console.log(JSON.parse(msg));
//     setLastPong(new Date().toLocaleString() + '.');
//     setsmessage(msg);

//   });
 
// }, []);



  return (
    <>
      <Router>
        <div className="main">
        <Navbar />
        <Footer />
          <Switch>
            <Route exact path="/qr">
              <Qrapp />
            </Route>
            <Route exact path="/setting">
              <Setting />
            </Route>
            {/* <Route exact path="/msg">
              <MSG />
            </Route> */}
            <Route exact path="/message">
              <Message
              // isConnected = {isConnected}
              // lastPong = {lastPong}
              // smessage={smessage}
              />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
            <Route exact path="/">
              <div className="main-inner">
                <Home />
              </div>
            </Route>
          </Switch>
        
        </div>
      </Router>
    </>
  );
}

export default App;
