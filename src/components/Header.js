import React from "react";
import "../assets/styles/header.css"
import icon from "../assets/images/icon.gif"

const Header=()=>{

    return(
        <div className="headerContainer">
            <div className="headerWrapper">
                <div className="logoWrapper">
                    <img src={icon} />
                </div>
                <h1>My Budget App</h1>
            </div>
        </div>
    )
}

export default Header