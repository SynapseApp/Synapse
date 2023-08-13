import { faCircleInfo, faPhone, faVideo, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Chat from "./Chat";
// import React from "react";
import ChatContainerComponent from './ChatContainerComponent';
import ChatInfoButtons from './ChatInfoButtons';
import PropTypes from 'prop-types';
import socket from '../../../socket';
import { useEffect, useState } from 'react';

const ChatMenu = ({ selectedUser, setSelectedUser, selectedConnection }) => {
  const [lastSeenString, setLastSeenString] = useState('');
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
  function getOfflineDuration() {
    const lastOnlineTime = new Date(selectedUser.lastOnlineTimestamp);
    const currentTime = new Date();
    const offlineDuration = currentTime - lastOnlineTime;
    // Calculate duration in a human-readable format (e.g., hours, minutes)
    if (offlineDuration < 60000) {
      // Less than 1 minute
      setLastSeenString('Last seen just now');
    } else if (offlineDuration < 3600000) {
      // Less than 1 hour
      const minutesAgo = Math.floor(offlineDuration / 60000);
      setLastSeenString(`Last seen ${minutesAgo} minutes ago`);
    } else if (lastOnlineTime.toDateString() === currentTime.toDateString()) {
      // Same day
      const hoursAgo = Math.floor(offlineDuration / 3600000);
      setLastSeenString(`Last seen ${hoursAgo} hours ago`);
    } else if (lastOnlineTime.getDate() === currentTime.getDate() - 1) {
      // Yesterday
      setLastSeenString(`Last seen yesterday at ${lastOnlineTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`);
    } else if (lastOnlineTime.getFullYear() === currentTime.getFullYear()) {
      // Same year
      setLastSeenString(`Last seen ${lastOnlineTime.toLocaleDateString([], { weekday: 'long' })} at ${lastOnlineTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`);
    } else {
      setLastSeenString(lastOnlineTime.toLocaleString()); // Default to full date and time
    }
  }
  useEffect(() => {
    socket.on('user_status_changed', ({ isOnline }) => {
      setSelectedUser((prevUser) => ({
        ...prevUser,
        isOnline,
        lastOnlineTimestamp: Date.now(), // Set to null when online, and actual timestamp when offline
      }));
      // Update the user status in your connectionsArr state
    });
    // Remove the event listener on component unmount
    return () => socket.off('user_status_changed');
  }, []);
  useEffect(() => {
    getOfflineDuration();
    // Remove the event listener on component unmount
  }, [selectedUser]);
  return (
    <>
      <div className="chat-menu">
        <div className="chat-nav">
          <div className="chat-left">
            <img className="user-picture" src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623"></img>
            <div className="user-info">
              <h6 className="user-username">{selectedUser === undefined ? 'undefined' : selectedUser.displayName}</h6>
              <p className="user-status">{selectedUser === undefined ? 'undefined' : selectedUser.id}</p>
              <p>{selectedUser.isOnline ? 'Online' : `${lastSeenString}`}</p>{' '}
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
