import { useState } from 'react';
import DirectAccess from './DirectAccess';
import ChatMenu from './MessageComponents/ChatMenu';

const MessageMenu = () => {
  const [userObject, setUserObject] = useState("");

  const handleDataFromDirectAccess = function(data) {
    setUserObject(data)
  }

  return (
    <div id="Message-Menu">
      <DirectAccess sendDataToParent={handleDataFromDirectAccess} userObject={userObject} setUserObject={setUserObject} />
      <ChatMenu userObject={userObject} />
    </div>
  );
};

export default MessageMenu;
