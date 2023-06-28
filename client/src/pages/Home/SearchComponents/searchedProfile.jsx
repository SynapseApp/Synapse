import UserProfile from './userProfile';
import { useState } from 'react';
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
  // const [connectionsSearchedResult, setConnectionsSearchedResult] = useState([]);

  (async () => {
    const response = await fetch('http://localhost:3000/connection/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user._id,
        searchTerm: 'Richard',
        // Additional data to send in the request body
      }),
    });
    const data = await response.json();
    // setConnectionsSearchedResult(data.connections);
    setStrangersSearchedResult(data.strangers);
  })();

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const printChats = function () {
    const renderedChats = [];

    for (let i = 0; i < strangersSearchedResult.length; i++) {
      const truncatedFriend = truncateText(strangersSearchedResult[i].displayName, 18) || '';
      const truncatedMessage = ''; // No message available for strangers
      const pictureUrl = 'https://example.com/random-image.png'; // Use a random image URL

      renderedChats.push(
        <div key={i}>
          <div className="render-chat">
            <div className="chat" id={`${i}_chat`}>
              <img src={pictureUrl} onClick={() => handleShowProfile(i)} alt="Profile" />
              <div className="chat-text" onClick={removeHiddenChatMenu}>
                <p className="contact-name">{truncatedFriend}</p>
                <p>{truncatedMessage}</p>
              </div>
            </div>
            {showUserProfile && selectedChatIndex === i && (
              <UserProfile
                id={`${i}_user`} // Rename the prop to a different name, e.g., 'id' or 'profileKey'
                connections={truncatedFriend}
                user={strangersSearchedResult[i].username}
                picture={pictureUrl}
                status="friend" // Set status as "friend"
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

  const renderedChats = printChats();

  return <div>{renderedChats}</div>;
};

export default SearchedProfile;
