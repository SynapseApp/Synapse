import UserProfile from './userProfile';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../../Contexts/userContext';
import PropTypes from 'prop-types';

const SearchedProfile = (props) => {
  const [showConnectionProfile, setShowConnectionProfile] = useState(false);
  const [showStrangerProfile, setShowStrangerProfile] = useState(false);
  const [SelectedUserProfileShowKey, setSelectedUserProfileShowKey] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(''); // New state variable
  const [dummyState, setDummyState] = useState(0); // Dummy state variable

  const user = useContext(UserContext);

  const handleShowProfile = function (chatKey, section) {
    // Pass the chatKey to handleShowProfile
    setSelectedUserProfileShowKey(chatKey);

    if (section === 'connection') {
      setShowConnectionProfile(!showConnectionProfile);
      setShowStrangerProfile(false);
    } else if (section === 'stranger') {
      setShowStrangerProfile(!showStrangerProfile);
      setShowConnectionProfile(false);
    }
  };

  const [strangersSearchedResult, setStrangersSearchedResult] = useState([]);
  const [connectionsSearchedResult, setConnectionsSearchedResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Reload the component when connection status changes

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/connection/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user._id,
        searchTerm: props.searchTerm,
      }),
    });
    const data = await response.json();

    setConnectionsSearchedResult(data.connections);
    setStrangersSearchedResult(data.strangers);
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const printStrangerChats = function () {
    const renderedChats = [];

    for (let i = 0; i < strangersSearchedResult.length; i++) {
      const stranger = strangersSearchedResult[i];
      const truncatedDisplayName = truncateText(stranger.displayName, 18) || '';
      const pictureUrl = 'https://example.com/random-image.png';
      const chatKey = `stranger_${stranger._id}`;

      renderedChats.push(
        <div key={chatKey}>
          <div className="render-chat">
            <div className="chat" id={`${i}_chatStranger`} onClick={() => handleShowProfile(chatKey, 'stranger')}>
              <img src={pictureUrl} alt="Profile" />
              <div className="chat-text" onClick={removeHiddenChatMenu}>
                <p className="contact-name">{truncatedDisplayName}</p>
                <p>@{stranger.username}</p>
              </div>
            </div>
            {showStrangerProfile && SelectedUserProfileShowKey === chatKey && (
              <UserProfile
                key={`${chatKey}_profile`}
                id={`${i}_userStranger`}
                userId2={stranger._id}
                displayName={truncatedDisplayName}
                user={stranger.username}
                picture={pictureUrl}
                status="disconnected"
                description="Hardcoded description"
                setConnectionStatus={setConnectionStatus}
                setDummyState={setDummyState}
              />
            )}
          </div>
        </div>
      );
    }

    return renderedChats;
  };

  const printConnectionChats = function () {
    const renderedChats = [];

    for (let i = 0; i < connectionsSearchedResult.length; i++) {
      const connection = connectionsSearchedResult[i].userData;
      if (!connection) continue;

      const truncatedDisplayName = truncateText(connection.displayName, 18) || '';
      const pictureUrl = 'https://example.com/random-image.png';
      const chatKey = `connection_${connection._id}`;

      renderedChats.push(
        <div key={chatKey}>
          <div className="render-chat">
            <div className="chat" id={`${i}_chatConnection`} onClick={() => handleShowProfile(chatKey, 'connection')}>
              <img src={pictureUrl} alt="Profile" />
              <div className="chat-text" onClick={removeHiddenChatMenu}>
                <p className="contact-name">{truncatedDisplayName}</p>
                <p>{connection.username}</p>
              </div>
            </div>
            {showConnectionProfile && SelectedUserProfileShowKey === chatKey && (
              <UserProfile
                key={`${chatKey}_profile`}
                id={`${i}_userConnection`}
                userId2={connection._id}
                displayName={truncatedDisplayName}
                user={connection.username}
                picture={pictureUrl}
                status="connected"
                description="Hardcoded description"
                setConnectionStatus={setConnectionStatus}
                setDummyState={setDummyState}
              />
            )}
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

  const renderedStrangerChats = printStrangerChats();
  const renderedConnectionChats = printConnectionChats();
  const renderedChats = (
    <div>
      <h2>Connections</h2>
      {renderedConnectionChats}
      <h2>Strangers</h2>
      {renderedStrangerChats}
    </div>
  );

  useEffect(() => {
    // Effect to reload the component when connection status changes
    fetchData();
  }, [connectionStatus, dummyState]);

  return <div>{renderedChats}</div>;
};

SearchedProfile.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchedProfile;
