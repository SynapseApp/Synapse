
import { faBars, faBell, faGear, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import IsSearchingContext from '../../Contexts/IsSearchingContext';
=======
import { faBars, faBell, faGear, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import IsSearchingContext from '../../Contexts/IsSearchingContext';


const changeRoute = function(finalPath) {
    Navigate(finalPath)
}

const LeftBar = () => {
  const { setIsSearching } = useContext(IsSearchingContext);
  const handleClick = () => {
    setIsSearching(false); // Update the isSearching state
    // Other logic or actions
  };
  return (
    <>
      <div id="Left-Bar">
        <FontAwesomeIcon id="icon" icon={faUser} size="lg" />
        <FontAwesomeIcon id="icon" icon={faMessage} size="lg" onClick={handleClick} />
        <FontAwesomeIcon id="icon" icon={faBell} size="lg" />
        <FontAwesomeIcon id="icon" icon={faBars} size="lg" />
        <FontAwesomeIcon id="icon" icon={faGear} size="lg" />
      </div>
    </>
  );
};

export default LeftBar;
