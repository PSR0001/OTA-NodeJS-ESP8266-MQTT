import React from "react";
import Qrapp from './components/Qr';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import User from "./components/User";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="main">
        <Navbar />
          <Switch>
            <Route path="/qr">
              <Qrapp />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/">
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
