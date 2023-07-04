import { faCircleInfo, faPhone, faVideo, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Chat from "./Chat";
// import React from "react";
import ChatContainerComponent from './ChatContainerComponent';
import ChatInfoButtons from './ChatInfoButtons';

const ChatMenu = () => {
  let userChats = {
    friend: 'Aditya',
    message: 'hello',
    status: 'Online',
    picture:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSDw8VFRUVFRcVFxUVFQ8VFRcXFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFQ8PFS0dFR0tLS0tLS0tLS0tKy0tLS0tLS0tLTctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS03LS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERQRLB0fAhMQKBof/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAZEQEBAQADAAAAAAAAAAAAAAAAEQEhMUH/2gAMAwEAAhEDEQA/AOoKRxDu0FAQi4AmqlAURQBFEDui6AAAAAAAACgLQEWGAFQF6hNECggKAAQAAoKACBT3+lAABBQEFBUFAQ0UQ0lQwFEKCiYAuIaCqmgC1AA0RQUQBRABUANVKUFEUAEoiggKIoFEAWEAUEURMF1ARQgp5EUApEBYAACUFAA0icLQFQBRKAKhQAAFQgi0AEVFAEwFAWggoCCwBBQEKpgJAUEFAEWACKCCKAgoCCgoimCIqKKmi/pCClAQEUCBoAAAAAAABQAoAAAAAAAAAGgAAGogVYqoAoaAERcIgFgAAAigAFAAAIAAQgAAAAAAAAJ0CoKCgiKgKsvw0wq1FVNXWuEMZq6iaoAyBAALeQgAi0AAAAAAACAAaCYNYC1kUAQAFEBQBAAAwAKAAIoIoAAAAAAAEAAKAwrXwC1APIAQBUUBKtRQRQBFARABVAEDEigCFBQQFAAAAABlV6UFoAAAAEABUBQBBBQEKopCgIAAgqCigIAAAAAoCGgqAoAAIoAigIAABQAAAAAAAIoIAAAAAAABgCqiiIKAAAAAIFCgAAAAAKAqIEAAAAAAAAABdDEARQUAggAAAoAAAAFVAUoUEFRAUFwJEaSruAijIIKCFUADUXgIT6BBSIKHCgCAAtL9gCFAFqXsANICh5SAyLPBEFGpx7yfkDW9IhAZVOGqgBCgeAAD/9k=',
  };

  function removeHiddenClass() {
    const element = document.querySelector('.chat-info');
    if (element) {
      element.classList.remove('hidden');
      document.querySelector(".chat-menu").style.width = "82%"
    }
  }
  function addHiddenClass() {
    const element = document.querySelector('.chat-info');
    if (element) {
      element.classList.add('hidden');
      document.querySelector(".chat-menu").style.width = "100%"
      
    }
  }

  return (
    <>
    <div className="chat-menu">
      <div className="chat-nav">
        <div className="chat-left">
          <img className="user-picture" src={userChats.picture}></img>
          <div className="user-info">
            <h6 className="user-username">{userChats.friend}</h6>
            <p className="user-status">{userChats.status}</p>
          </div>
        </div>
        <div className="chat-right">
          <FontAwesomeIcon className="user-icon" size="lg" icon={faPhone} />
          <FontAwesomeIcon className="user-icon" size="lg" icon={faVideo} />
          <FontAwesomeIcon className="user-icon info-icon" size="lg" icon={faCircleInfo} onClick={removeHiddenClass} />
        </div>
      </div>
      <div className="component-div">
        <ChatContainerComponent />
      </div>
    </div>
    <div className="chat-info hidden">
        <FontAwesomeIcon className="x-icon" icon={faX} onClick={addHiddenClass} />
        <img className="chat-info-pic" src={userChats.picture} />
        <h2 className="chat-info-header">{userChats.friend}</h2>
        <ChatInfoButtons />
      </div>

    </>
    
  );
};

export default ChatMenu;
