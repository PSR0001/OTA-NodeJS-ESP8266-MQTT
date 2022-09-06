
import React from 'react'
import Qrapp from './components/Qr';
import './App.css'
// using ract router DOM
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

function App() {


  return (
    <>
     {/* <Router>
      <Navbar title="React App" mode= {mode} toggleMode = {toggleMode}/>
      <Alert alert= {alert} />

      <Switch>
      {/*  always use exact keyword !!important*/}
    {/* <Route exact path="/about">
      <About />
    </Route>
    <Route exact path="/">
    <div className="container">
    <Textarea heading = {'Enter Your Text Here'} mode= {mode}/>
    </div>
    </Route>
  </Switch> */}
   {/* </Router> */}
   <h2>REact App</h2>
   <div className='QRcode'>
   <Qrapp/>
   </div>
    </>
  );
}

export default App;
