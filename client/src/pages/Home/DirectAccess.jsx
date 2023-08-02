import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SearchedProfile from './SearchComponents/searchedProfile';
import NormalChats from './normalChats';
import { useContext } from 'react';
import IsSearchingContext from '../../Contexts/IsSearchingContext';
import PropTypes from 'prop-types';

const DirectAccess = ({ setUserObject }) => {
  const [placeholderValue, setPlaceholderValue] = useState('Search Here');
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState(0); // Key to force remount of SearchedProfile component

  const { isSearching, setIsSearching } = useContext(IsSearchingContext);

  // Define a function to receive data from the ChatMenu component
  const handleDataFromNormalChats = function (data) {
    // Update the state with the received data
    setUserObject(data);
    console.log('clicked on user:', data.user.displayName);
  };

  function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setIsSearching(true);
    setSearchKey((prevKey) => prevKey + 1); // Update the key to force remount of SearchedProfile component
  };

  return (
    <div id="Search-Component">
      <div id="Synapse-Header">
        <h3>Synapse</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} size="xl" onClick={handleSubmit} />
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
        />
      </form>
      {isSearching ? <SearchedProfile searchTerm={inputValue} key={searchKey} /> : <NormalChats sendDataToParent={handleDataFromNormalChats} />}
    </div>
  );
};

DirectAccess.propTypes = {
  setUserObject: PropTypes.func.isRequired,
};

export default DirectAccess;
