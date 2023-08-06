import {
  faFaceLaugh,
  faImage,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../Contexts/userContext";

const ChatContainerComponent = ({ selectedUser, socket }) => {
  // State to store the messages in the chat
  const [messages, setMessages] = useState([]);

  // State to store the input value of the text message
  const [textInputValue, setTextInputValue] = useState("");

  // Get the current user data from the UserContext
  const currentUser = useContext(UserContext);

  // Attach 'new_message' event listener when the component mounts
  useEffect(() => {
    socket.on("new_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up by removing the 'new_message' event listener when the component unmounts
    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  // Connect or disconnect the socket based on selectedUser changes
  useEffect(() => {
    // Connect the socket if not already connected
    socket.connect();

    // Disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Fetch messages when the selected user changes or the socket changes
  useEffect(() => {
    searchMessages();
  }, [socket, selectedUser]);

  // Function to send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (textInputValue !== "" && selectedUser) {
      // Send the message to the server and update the messages state
      const response = await fetch("http://localhost:3000/message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: currentUser._id,
          receiver: selectedUser._id,
          messageContent: textInputValue,
        }),
      });
      const data = await response.json();
      socket.emit("private_message", data);
      setTextInputValue("");
    }
  };

  // Function to fetch messages between the current user and the selected user
  const searchMessages = async function () {
    const response = await fetch("http://localhost:3000/message/getMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentUser._id,
        id2: selectedUser._id,
      }),
    });
    const data = await response.json();
    setMessages(data);
  };

  // Function to render the chat messages
  const printMessages = function () {
    const renderedMessages = [];

    for (let i = 0; i < messages.length; i++) {
      // Determine the class for each message based on the sender
      const messageClassName =
        messages[i].sender === currentUser._id ? "my-msg" : "receiving-msg";

      // Create a message element with the message content
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

  // Render the chat container with the messages and message input
  return (
    <div className="chat-container">
      <div className="chat-content">{printMessages()}</div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          className="message-input"
          placeholder="Type a message..."
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
        />
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

// PropTypes for the component to define the required props
ChatContainerComponent.propTypes = {
  socket: PropTypes.object.isRequired,
  selectedUser: PropTypes.object.isRequired,
};

export default ChatContainerComponent;
