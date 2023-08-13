import { faCircleInfo, faPhone, faVideo, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Chat from "./Chat";
// import React from "react";
import ChatContainerComponent from './ChatContainerComponent';
import ChatInfoButtons from './ChatInfoButtons';
import PropTypes from 'prop-types';
import socket from '../../../socket';
import { useEffect } from 'react';

const ChatMenu = ({ selectedUser, setSelectedUser, selectedConnection }) => {
  function removeHiddenClass() {
    const element = document.querySelector('.chat-info');
    if (element) {
      element.classList.remove('hidden');
      document.querySelector('.chat-menu').style.width = '82%';
    }
  }
  function addHiddenClass() {
    const element = document.querySelector('.chat-info');
    if (element) {
      element.classList.add('hidden');
      document.querySelector('.chat-menu').style.width = '100%';
    }
  }
  useEffect(() => {
    socket.on('user_status_changed', ({ isOnline }) => {
      setSelectedUser((prevUser) => ({
        ...prevUser, // Copy all existing properties
        isOnline: isOnline, // Update isOnline property
      }));
      // Update the user status in your connectionsArr state
    });
    // Remove the event listener on component unmount
    return () => socket.off('user_status_changed');
  }, []);
  return (
    <>
      <div className="chat-menu">
        <div className="chat-nav">
          <div className="chat-left">
            <img className="user-picture" src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623"></img>
            <div className="user-info">
              <h6 className="user-username">{selectedUser === undefined ? 'undefined' : selectedUser.displayName}</h6>
              <p className="user-status">{selectedUser === undefined ? 'undefined' : selectedUser.id}</p>
              <p>{selectedUser?.isOnline ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="chat-right">
            <FontAwesomeIcon className="user-icon" size="lg" icon={faPhone} />
            <FontAwesomeIcon className="user-icon" size="lg" icon={faVideo} />
            <FontAwesomeIcon className="user-icon info-icon" size="lg" icon={faCircleInfo} onClick={removeHiddenClass} />
          </div>
        </div>
        <div className="component-div">
          <ChatContainerComponent selectedUser={selectedUser} socket={socket} selectedConnection={selectedConnection} />
        </div>
      </div>
      <div className="chat-info hidden">
        <FontAwesomeIcon className="x-icon" icon={faX} onClick={addHiddenClass} />
        <img className="chat-info-pic" src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623" />
        <h2 className="chat-info-header">{selectedUser === undefined ? 'undefined' : selectedUser.displayName}</h2>
        <ChatInfoButtons />
      </div>
    </>
  );
};

ChatMenu.propTypes = {
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
  selectedConnection: PropTypes.object,
};

export default ChatMenu;
