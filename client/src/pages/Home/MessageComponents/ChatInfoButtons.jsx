import {
  faMagnifyingGlass,
  faPhone,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatInfoButtons = () => {
  return (
    <>
      <div className="chat-info-functions">
        <FontAwesomeIcon className="chat-info-icon" icon={faUser} />
        <p className="chat-info-btn-text">Profile</p>
      </div>
      <div className="chat-info-functions">
        <FontAwesomeIcon className="chat-info-icon" icon={faPhone} />
        <p className="chat-info-btn-text">Voice Call</p>
      </div>
      <div className="chat-info-functions">
        <FontAwesomeIcon className="chat-info-icon" icon={faVideo} />
        <p className="chat-info-btn-text">Video Call</p>
      </div>
      <div className="chat-info-functions">
        <FontAwesomeIcon className="chat-info-icon" icon={faMagnifyingGlass} />
        <input placeholder="Search in Chat"></input>
      </div>
    </>
  );
};

export default ChatInfoButtons;
