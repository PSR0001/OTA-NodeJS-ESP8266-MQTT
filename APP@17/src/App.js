import React from "react";
import Qrapp from './components/Qr';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Footer from "./components/Footer";
import Message from "./components/Message";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Setting from "./components/Setting";

function App() {
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
            <Route exact path="/message">
              <Message />
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
