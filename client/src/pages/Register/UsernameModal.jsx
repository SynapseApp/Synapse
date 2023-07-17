import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const UsernameModal = () => {
  return (
    <>
    <form>
    <div className='username-modal'>
        <div className='modal-pfp-div'>
            <input className='modal-pfp-input' type='image' placeholder='Select Or Drop an Image'></input>
        </div>
        <input className='display-name-input' placeholder='Enter your Display Name'/>
        <div className='username-div'>
            <span className='username-input' role='textbox' contentEditable>Enter Username</span>
            <span>#{Math.floor((Math.random() * 9999) + 1000)}</span>
        </div>
        <button id='modal-submit' type='submit' className='gradient-btn glow-effect'>Continue
            <FontAwesomeIcon id="modal-submit-icon" icon={faArrowRight} size="xl" style={{color: "#0000000"}} />
        </button>

    </div>
    </form>
    </>
  )
}

export default UsernameModal
