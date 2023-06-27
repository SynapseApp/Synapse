import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import UserContext from '../../../Contexts/userContext';

const Search = () => {
  const [placeholderValue, setPlaceholderValue] = useState('Search Here');
  const [inputValue, setInputValue] = useState('');

  const user = useContext(UserContext);
  console.log(user);

  function handleChange(event) {
    const target = event.target;
    setInputValue(target.value);
  }

  // function truncateText(text, maxLength) {
  //   if (text.length > maxLength) {
  //     return text.substring(0, maxLength) + '...';
  //   }
  //   return text;
  // }

  // const printChats = function () {
  //   const renderedChats = [];

  //   for (let i = 0; i < userChats.length; i++) {
  //     userChats[i].friend = truncateText(userChats[i].friend, 18);
  //     userChats[i].message = truncateText(userChats[i].message, 20);

  //     renderedChats.push(
  //       <div className="chat" key={i}>
  //         <img src={userChats[i].picture} alt="Profile" />
  //         <div className="chat-text" onClick={removeHiddenChatMenu}>
  //           <p className="contact-name">{userChats[i].friend}</p>
  //           <p>{userChats[i].message}</p>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return renderedChats;
  // };

  // function removeHiddenChatMenu(user) {
  //   const element = document.querySelector < HTMLElement > '.chat-menu';
  //   if (element) {
  //     element.classList.remove('hidden');
  //   }
  // }

  // const renderedChats = printChats();

  return (
    <div id="search-component">
      <div id="synapse-header">
        <h3>Synapse</h3>
      </div>
      <form>
        <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} size="xl" />
        <input
          className={inputValue !== '' ? 'input-text-left' : ''}
          id="query"
          type="text"
          onChange={handleChange}
          value={inputValue}
          onFocus={() => {
            setPlaceholderValue('');
          }}
          onBlur={() => setPlaceholderValue('Search Here')}
          placeholder={placeholderValue}
        ></input>
      </form>
      {/* {renderedChats} */}
    </div>
  );
};

export default Search;
