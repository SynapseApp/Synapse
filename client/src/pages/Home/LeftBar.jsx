import {
  faBars,
  faBell,
  faGear,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftBar = () => {
  return (
    <>
      <div id="Left-Bar">
        <FontAwesomeIcon id="icon" icon={faUser} size="lg" />
        <FontAwesomeIcon id="icon" icon={faMessage} size="lg" />
        <FontAwesomeIcon id="icon" icon={faBell} size="lg" />
        <FontAwesomeIcon id="icon" icon={faBars} size="lg" />
        <FontAwesomeIcon id="icon" icon={faGear} size="lg" />
      </div>
    </>
  );
};

export default LeftBar;
