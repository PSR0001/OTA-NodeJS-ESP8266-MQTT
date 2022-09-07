import React from "react";
import { Link } from "react-router-dom";
import {BiQr} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
const Navbar = () => {
  return (
    <div>
      <nav className="display-flex space-between main-inner border-down ">
       <div className="nav-icon background-white"><Link to="/user"><CgProfile /></Link></div>
       <h3><Link to="/">IoT-App</Link></h3>
       <div className="nav-icon"><Link to="/qr"><BiQr/></Link></div>
      </nav>

    </div>
  );
};

export default Navbar;
