import { faFaceLaugh, faImage, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../Contexts/userContext';

const ChatContainerComponent = ({ selectedUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');

  const currentUser = useContext(UserContext);

  useEffect(() => {
    socket.on('new_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, selectedUser]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    searchMessages();
    console.log('yo');
  }, [socket, selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (textInputValue !== '' && selectedUser) {
      const data = {
        sender: currentUser._id,
        receiver: selectedUser._id,
        messageContent: textInputValue,
      };
      socket.emit('private_message', data);
      setTextInputValue('');
    }
  };
  const searchMessages = async function () {
    const response = await fetch('http://localhost:3000/message/getMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: currentUser._id,
        id2: selectedUser._id,
      }),
    });
    const data = await response.json();
    setMessages(data);
  };

  const printMessages = function () {
    const renderedMessages = [];

    for (let i = 0; i < messages.length; i++) {
      const messageClassName = messages[i].sender === currentUser._id ? 'my-msg' : 'receiving-msg';
      const renderedMessage = (
        <div className={messageClassName} key={i}>
          <div className="msg-div">
            <p>{messages[i].messageContent}</p>
          </div>
        </div>
      );

      renderedMessages.push(renderedMessage);
    }
    return renderedMessages;
  };

  return (
    <div className="chat-container">
      <div className="chat-content">{printMessages()}</div>
      <form className="message-form" onSubmit={sendMessage}>
        <input className="message-input" placeholder="Type a message..." value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)} />
        <div className="input-icons">
          <FontAwesomeIcon className="msg-icon" icon={faImage} />
          <FontAwesomeIcon className="msg-icon" icon={faFaceLaugh} />
          <button>
            <FontAwesomeIcon className="msg-icon" icon={faRightLong} />
          </button>
        </div>
      </form>
    </div>
  );
};

ChatContainerComponent.propTypes = {
  socket: PropTypes.object.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

export default ChatContainerComponent;
