import { faBars, faBell, faGear, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const changeRoute = function(finalPath) {
    Navigate(finalPath)
}

const LeftBar = () => {
    return (
        <>
            <div id="left-bar">
                <FontAwesomeIcon id='icon' icon={faUser} size="2xl" />
                <FontAwesomeIcon id='icon' icon={faMessage} size='2xl' />
                <FontAwesomeIcon id='icon' icon={faBell} size='2xl' />
                <FontAwesomeIcon id="icon" icon={faBars} size='2xl' />
                <FontAwesomeIcon id='icon' icon={faGear} size='2xl' onClick={changeRoute("settings")}/>
            </div>
        </>
    )
}

export default LeftBar
