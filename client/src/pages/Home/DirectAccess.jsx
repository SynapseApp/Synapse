import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SearchedProfile from './SearchComponents/searchedProfile';

const DirectAccess = () => {
  const [placeholderValue, setPlaceholderValue] = useState('Search Here');
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    const target = event.target;
    setInputValue(target.value);
  }

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
      <SearchedProfile />
    </div>
  );
};

export default DirectAccess;
