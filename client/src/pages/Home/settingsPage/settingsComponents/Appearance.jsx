import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Appearance = () => {
  const dropDownOptions = [
    'WireFrame', 'FrameWire'
  ];
  const dropDownDefaultOption = dropDownOptions[0];
  
  return (
    <div className='settings-appearance'>
        <h3 className='appearance-h3'>Appearance</h3>    
        <div className='toggle-dark-mode-div'>
            <h6>Dark Mode:</h6>
            <FontAwesomeIcon className='appearance-icon' icon={faToggleOn} />
        </div> 
        <div className='change-theme'>
          <h6>Theme: </h6>
          <Dropdown className='theme-dropdown' options={dropDownOptions} value={dropDownDefaultOption} />
        </div> 
    </div>
  )
}

export default Appearance
