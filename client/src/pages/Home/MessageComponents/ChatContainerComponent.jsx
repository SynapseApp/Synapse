import { faFaceLaugh, faImage, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../Contexts/userContext';

const ChatContainerComponent = ({ userObject }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    searchMessages();
  }, [userObject]);

  const searchMessages = async function () {
    const response = await fetch('http://localhost:3000/message/getMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: currentUser._id,
        id2: userObject._id,
      }),
    });
    const data = await response.json();
    setMessages(data);
  };

  console.log(messages);

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
      <form className="message-form">
        <input className="message-input" placeholder="Type a message..." />
        <div className="input-icons">
          <FontAwesomeIcon className="msg-icon" icon={faImage} />
          <FontAwesomeIcon className="msg-icon" icon={faFaceLaugh} />
          <FontAwesomeIcon className="msg-icon" icon={faRightLong} />
        </div>
      </form>
    </div>
  );
};

ChatContainerComponent.propTypes = {
  userObject: PropTypes.object.isRequired,
};

export default ChatContainerComponent;
