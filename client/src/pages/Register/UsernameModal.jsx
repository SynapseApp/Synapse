import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const UsernameModal = () => {
  return (
    <>
    <form>
    <div className='username-modal'>
        <div className='modal-pfp-div'>
        <label for="file-upload" class="modal-pfp-label">
          Set a Profile Picture 
        </label>
        <input id="file-upload" className="modal-pfp-input" type="file"/>

        </div>
        <input className='display-name-input' placeholder='Enter your Display Name'/>
        <div className='username-div'>
            <span className='username-input' role='textbox' contentEditable>Enter Username</span>
            <span>#{Math.floor((Math.random() * 9999) + 1000)}</span>
        </div>
          <button id='modal-submit' type='submit' className='gradient-btn glow-effect'>Continue
              <FontAwesomeIcon id="modal-submit-icon" icon={faArrowRight} size="xl" />
          </button>
    </div>
    </form>
    </>
  )
}

export default UsernameModal
