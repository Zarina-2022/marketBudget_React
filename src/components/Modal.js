import React from "react";
import "../assets/styles/modal.css"

const Modal = ({ title = "", 
                 content = "", 
                 cancelBtn="", 
                 cancelClick=()=>{}, 
                 confirmBtn="", 
                 confirmClick=()=>{},
                 hasConfirm = false  }) => {
    return (
        <div className="container">
            <div className="containerContent">
                <h1 className="title">{title}</h1>
                <p className="content">{content}</p>
                <div className="buttonWrapper">
                    <button className="btnCancel" onClick={cancelClick}>{cancelBtn}</button>
                    {
                        hasConfirm === true && (
                            <button className="btnConfirm" onClick={confirmClick}>{confirmBtn}</button>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Modal