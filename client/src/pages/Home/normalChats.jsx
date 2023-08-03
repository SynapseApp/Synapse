// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from 'react';
import UserContext from '../../Contexts/userContext';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '../../socket';

const NormalChats = ({ setSelectedUser }) => {
  const [connectionsArr, setConnectionsArr] = useState([]);
  // const [userSelected, setUserSelected] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    searchConnections();
  }, []);

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

    const tmpArr = [];

    for (let i = 0; i < data.length; i++) {
      tmpArr.push(data[i].userTwo);
    }
    setConnectionsArr(tmpArr);
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  const handleClick = function (clickedOnUser) {
    // setUserSelected(true);
    setSelectedUser(clickedOnUser);
    socket.auth = { clickedOnUser };
    console.log(clickedOnUser);
    socket.connect();
  };

  useEffect(() => {
    socket.on('connect_error', (err) => {
      if (err.message === 'User Does Not Exist') {
        console.log(err);
      }
    });

    // Remove event listener on component unmount
    return () => socket.off('connect_error');
  }, [socket]);

  const printChats = function () {
    const renderedChats = [];

    if (!connectionsArr) {
      return (
        <div>
          <p>No connections found</p>
        </div>
      );
    }

    for (let i = 0; i < connectionsArr.length; i++) {
      renderedChats.push(
        <div
          className="chat"
          onClick={() => {
            handleClick(connectionsArr[i]);
          }}
          key={i}
        >
          <img src="https://media.discordapp.net/attachments/1111323966691352629/1133682113699381288/20230726_141636.jpg?width=295&height=623" alt="Profile" />
          <div className="chat-text" onClick={removeHiddenChatMenu}>
            <p className="contact-name">{truncateText(connectionsArr[i].displayName, 18)}</p>
            <p>default text</p>
          </div>
        </div>
      );
    }

    return renderedChats;
  };

  function removeHiddenChatMenu() {
    const element = document.querySelector < HTMLElement > '.chat-menu';
    if (element) {
      element.classList.remove('hidden');
    }
  }

  const renderedChats = printChats();

  return <div>{renderedChats}</div>;
};

NormalChats.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
};

export default NormalChats;
