import { useContext, useState, useEffect } from 'react';
import UserContext from '../../Contexts/userContext';

import PropTypes from 'prop-types';
import socket from '../../socket';

const NormalChats = ({ setSelectedUser, selectedUser }) => {
  // State to store the chat connections
  const [connectionsArr, setConnectionsArr] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState({});
  // const [friendOnlineRerenderTriggeer, setFriendOnlineRerenderTriggeer] = useState(false);

  // Access the user data from the UserContext
  const user = useContext(UserContext);

  // Fetch the user's chat connections when the component mounts
  useEffect(() => {
    searchConnections();
  }, []);

  // Listen for connection errors and handle them
  useEffect(() => {
    socket.on('connect_error', (err) => {
      if (err.message === 'User Does Not Exist') {
        console.log(err);
      }
    });

    // Remove the event listener on component unmount
    return () => socket.off('connect_error');
  }, []);

  // Function to fetch the user's chat connections from the server
  const searchConnections = async function () {
    const response = await fetch('http://localhost:3000/connection/searchConnections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user._id,
      }),
    });
    const data = await response.json();
    setConnectionsArr(data);
  };

  // Function to truncate text if it exceeds a certain length
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  useEffect(() => {
    socket.connect();
    socket.emit('user_connected');
    // setFriendOnlineRerenderTriggeer(!friendOnlineRerenderTriggeer);
    socket.auth = { selectedUser, user, selectedConnection };
    // Remove the event listener on component unmount
    return () => socket.disconnect();
  });
  // useEffect(() => {
  //   socket.emit('user_connected');
  //   // Remove the event listener on component unmount
  //   return () => socket.off('user_connected');
  // }, [friendOnlineRerenderTriggeer]);

  // Function to handle a click on a chat connection
  const handleClick = function ({ clickedOnUser, connection }) {
    // Update the selected user in the parent component
    setSelectedConnection(connection);
    setSelectedUser(clickedOnUser);
  };

  // Function to remove the 'hidden' class from a chat menu (not shown in this snippet)
  function removeHiddenChatMenu() {
    const element = document.querySelector('.chat-menu');
    if (element) {
      element.classList.remove('hidden');
    }
  }

  // Function to render the chat connections
  const printChats = function () {
    const renderedChats = [];

    // Check if there are no connections found
    if (!connectionsArr || connectionsArr.length === 0) {
      return (
        <div>
          <p>No connections found</p>
        </div>
      );
    }

    // Iterate through the chat connections and create chat elements
    for (let i = 0; i < connectionsArr.length; i++) {
      const tmpArr = [];

      // Determine the connected user based on the current user
      for (let i = 0; i < connectionsArr.length; i++) {
        if (user._id === connectionsArr[i].userOne._id) {
          tmpArr.push(connectionsArr[i].userTwo);
        } else if (user._id === connectionsArr[i].userTwo._id) {
          tmpArr.push(connectionsArr[i].userOne);
        }
      }

      // Create a chat element with the user information and click event
      renderedChats.push(
        <div
          className="chat"
          onClick={() => {
            handleClick({ clickedOnUser: tmpArr[i], connection: connectionsArr[i] });
          }}
          key={i}
        >
          <img src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623" alt="Profile" />
          <div className="chat-text" onClick={removeHiddenChatMenu}>
            <p className="contact-name">{truncateText(tmpArr[i].displayName, 18)}</p>
            <p>{tmpArr[i].isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      );
    }

    return renderedChats;
  };

  // Call the function to render the chat connections
  const renderedChats = printChats();

  // Render the chat connections
  return <div>{renderedChats}</div>;
};

// Define the PropTypes for the component
NormalChats.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
};

export default NormalChats;
