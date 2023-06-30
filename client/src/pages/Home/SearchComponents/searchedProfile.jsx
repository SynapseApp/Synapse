import UserProfile from './userProfile';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../../Contexts/userContext';

const SearchedProfile = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);

  const user = useContext(UserContext);

  const handleShowProfile = function (index) {
    setSelectedChatIndex(index);
    setShowUserProfile(!showUserProfile);
  };

  const [strangersSearchedResult, setStrangersSearchedResult] = useState([]);
  const [connectionsSearchedResult, setConnectionsSearchedResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/connection/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user._id,
        searchTerm: 'Richard',
      }),
    });
    const data = await response.json();

    const connectionDataPromises = data.connections.map(async (connection) => {
      const otherUserId = connection.userOne === user._id ? connection.userTwo : connection.userOne;
      const userResponse = await fetch(`http://localhost:3000/user/${otherUserId}`);
      const userData = await userResponse.json();
      return {
        userData,
      };
    });

    const connectionUserData = await Promise.all(connectionDataPromises);

    const connectionsWithUserData = connectionUserData.map(({ userData }) => ({
      userData,
    }));

    setConnectionsSearchedResult(connectionsWithUserData);
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
      const truncatedDisplayName = truncateText(strangersSearchedResult[i].displayName, 18) || '';
      const pictureUrl = 'https://example.com/random-image.png'; // Use a random image URL

      renderedChats.push(
        <div key={i}>
          <div className="render-chat">
            <div className="chat" id={`${i}_chatStranger`} onClick={() => handleShowProfile(i)}>
              <img src={pictureUrl} alt="Profile" />
              <div className="chat-text" onClick={removeHiddenChatMenu}>
                <p className="contact-name">{truncatedDisplayName}</p>
                <p>@{strangersSearchedResult[i].username}</p>
              </div>
            </div>
            {showUserProfile && selectedChatIndex === i && (
              <UserProfile
                id={`${i}_userStranger`} // Rename the prop to a different name, e.g., 'id' or 'profileKey'
                userId2={strangersSearchedResult[i]._id}
                displayName={truncatedDisplayName}
                user={strangersSearchedResult[i].username}
                picture={pictureUrl}
                status="disconnected" // Set status as "friend"
                description="Hardcoded description" // Use a hardcoded value for description
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
      const truncatedDisplayName = truncateText(connectionsSearchedResult[i].userData.data.user.displayName, 18) || '';
      const pictureUrl = 'https://example.com/random-image.png'; // Use a random image URL

      renderedChats.push(
        <div key={i}>
          <div className="render-chat">
            <div className="chat" id={`${i}_chatConnection`} onClick={() => handleShowProfile(i)}>
              <img src={pictureUrl} alt="Profile" />
              <div className="chat-text" onClick={removeHiddenChatMenu}>
                <p className="contact-name">{truncatedDisplayName}</p>
                <p>{connectionsSearchedResult[i]?.userData.data.user.username}</p>
              </div>
            </div>
            {showUserProfile && selectedChatIndex === i && (
              <UserProfile
                id={`${i}_userConnection`} // Rename the prop to a different name, e.g., 'id' or 'profileKey'
                userId2={connectionsSearchedResult[i].userData.data.user._id}
                displayName={truncatedDisplayName}
                user={connectionsSearchedResult[i].userData.data.user.username}
                picture={pictureUrl}
                status="connected" // Set status as "friend"
                description="Hardcoded description" // Use a hardcoded value for description
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

  return <div>{renderedChats}</div>;
};

export default SearchedProfile;
