import { faCircleInfo, faPhone, faVideo, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Chat from "./Chat";
// import React from "react";
import ChatContainerComponent from './ChatContainerComponent';
import ChatInfoButtons from './ChatInfoButtons';
import PropTypes from 'prop-types';
import socket from '../../../socket';
import { useEffect, useState } from 'react';

const ChatMenu = ({ selectedUser, selectedConnection }) => {
  const [selectedUserStatus, setSelectedUserStatus] = useState(selectedUser.isOnline);
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
    socket.on('user_status_changed_chat_menu', ({ userId, isOnline }) => {
      console.log(selectedUser);
      if (userId === selectedUser._id) {
        setSelectedUserStatus(isOnline);
      }
    });
    return () => {
      socket.off('user_status_changed_chat_menu');
    };
  }, [selectedUser.isOnline]);

  useEffect(() => {
    setSelectedUserStatus(selectedUser.isOnline);
  }, [selectedUser]);
  return (
    <>
      <div className="chat-menu">
        <div className="chat-nav">
          <div className="chat-left">
            <div className="image_container">
              <img className="user-picture" src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623" />
              <div id={selectedUserStatus ? 'status_online' : `status_offline`}></div>
            </div>
            <div className="user-info">
              <h6 className="user-username">{selectedUser === undefined ? 'undefined' : selectedUser.displayName}</h6>
              <p className="user-status">{selectedUser === undefined ? 'undefined' : selectedUser.id}</p>
              <p></p>
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
