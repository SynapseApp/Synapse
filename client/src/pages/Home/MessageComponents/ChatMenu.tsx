import { faCircleInfo, faFaceLaugh, faImage, faPaperPlane, faPhone, faRightLong, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chat from './Chat'
import React from 'react'
import ChatContainerComponent from './ChatContainerComponent'

const ChatMenu = () => {
    let userChats = {
        friend: "Aditya",
        message: "hello",
        status: "Online",
        picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSDw8VFRUVFRcVFxUVFQ8VFRcXFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFQ8PFS0dFR0tLS0tLS0tLS0tKy0tLS0tLS0tLTctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS03LS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERQRLB0fAhMQKBof/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAZEQEBAQADAAAAAAAAAAAAAAAAEQEhMUH/2gAMAwEAAhEDEQA/AOoKRxDu0FAQi4AmqlAURQBFEDui6AAAAAAAACgLQEWGAFQF6hNECggKAAQAAoKACBT3+lAABBQEFBUFAQ0UQ0lQwFEKCiYAuIaCqmgC1AA0RQUQBRABUANVKUFEUAEoiggKIoFEAWEAUEURMF1ARQgp5EUApEBYAACUFAA0icLQFQBRKAKhQAAFQgi0AEVFAEwFAWggoCCwBBQEKpgJAUEFAEWACKCCKAgoCCgoimCIqKKmi/pCClAQEUCBoAAAAAAABQAoAAAAAAAAAGgAAGogVYqoAoaAERcIgFgAAAigAFAAAIAAQgAAAAAAAAJ0CoKCgiKgKsvw0wq1FVNXWuEMZq6iaoAyBAALeQgAi0AAAAAAACAAaCYNYC1kUAQAFEBQBAAAwAKAAIoIoAAAAAAAEAAKAwrXwC1APIAQBUUBKtRQRQBFARABVAEDEigCFBQQFAAAAABlV6UFoAAAAEABUBQBBBQEKopCgIAAgqCigIAAAAAoCGgqAoAAIoAigIAABQAAAAAAAIoIAAAAAAABgCqiiIKAAAAAIFCgAAAAAKAqIEAAAAAAAAABdDEARQUAggAAAoAAAAFVAUoUEFRAUFwJEaSruAijIIKCFUADUXgIT6BBSIKHCgCAAtL9gCFAFqXsANICh5SAyLPBEFGpx7yfkDW9IhAZVOGqgBCgeAAD/9k="
    }

    return (
        <div className='chat-menu'>

            <div className='chat-nav'>
                <div className='chat-left'>
                    <img className='user-picture' src={userChats.picture}></img>
                    <div className='user-info'>
                        <h6 className='user-username'>{userChats.friend}</h6>
                        <p className='user-status'>{userChats.status}</p>
                    </div>
                </div>
                <div className='chat-right'>
                    <FontAwesomeIcon className='user-icon' size='2xl' icon={faPhone} />
                    <FontAwesomeIcon className='user-icon' size='2xl' icon={faVideo} />
                    <FontAwesomeIcon className='user-icon info-icon' size='2xl' icon={faCircleInfo} />
                </div>
            </div>

            <div className='component-div'>
                <ChatContainerComponent />
            </div>

        </div >
    )
}

export default ChatMenu
