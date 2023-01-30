import React from "react";
import "../assets/styles/header.css"
import icon from "../assets/images/icon.gif"
import leftArrow from "../assets/images/left-arrow.png"
import { useNavigate } from "react-router-dom";

const Header = ({ whichPage,navigateTo}) => {
    const navigate=useNavigate()

    var show = false
    if (whichPage !== "home") {
        show = true
    }
    return (
        <div className="headerContainer">
            <div className="headerWrapper">
                {
                    show === true && (
                        <div onClick={()=>navigate(navigateTo)} className="headerIconWrapper">
                            <img src={leftArrow} />
                        </div>
                    )
                }
                <div className="logoWrapper">
                    <img src={icon} />
                </div>
                <h1>My Budget App</h1>
            </div>
        </div>
    )
}

export default Header