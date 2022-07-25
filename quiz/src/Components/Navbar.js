import React from "react";
import { RiPagesLine } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import Logo from "../Images/Logo.png";

function Navbar() {
    return (
        <nav>
            <div className="nav">
            <div className="logo">
                <img src={Logo} alt="logo" className="nav-img" />
            </div>
            <div className="nav-end">
                <div>
                <button className="nav-button">
                    <div className="button-content">
                        <RiPagesLine />
                        <p> get reports</p>
                    </div>
                </button>
                </div>
                
                <div className="info-icon">
                    <BsInfoCircleFill />
                </div>
            </div>
            
            </div>
            <div className="line"></div>
        </nav>
        
    );
}

export default Navbar;
