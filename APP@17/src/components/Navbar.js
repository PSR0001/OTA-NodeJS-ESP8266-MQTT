import React from "react";
import {BiQr, BiQrScan} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
const Navbar = () => {
  return (
    <div>
      <nav className="display-flex space-between main-inner border-down">
       <div className="nav-icon background-white"><CgProfile /></div>
       <h3>IoT-App</h3>
       <div className="nav-icon"><BiQr/></div>
      </nav>

    </div>
  );
};

export default Navbar;
