import React from "react";
//import { RiPagesLine } from "react-icons/ri";
import Logo from "../Images/Logo.png";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={Logo} alt="Centre of innovation" className="nav-img" /></a>
            </div>
        </nav>
        
    );
}

export default Navbar;
