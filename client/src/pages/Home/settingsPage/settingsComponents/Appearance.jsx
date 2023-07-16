import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'

const Appearance = () => {
  return (
    <div className='settings-appearance'>
        <h3 className='appearance-h3'>Appearance</h3>    
        <div className='toggle-dark-mode-div'>
            <h6>Dark Mode:</h6>
            <FontAwesomeIcon className='appearance-icon' icon={faToggleOn} />        
        </div>  
    </div>
  )
}

export default Appearance
