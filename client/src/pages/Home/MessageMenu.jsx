import { useState } from 'react';
import DirectAccess from './DirectAccess';
import ChatMenu from './MessageComponents/ChatMenu';

const MessageMenu = () => {
  const [userObject, setUserObject] = useState('');

  return (
    <div id="Message-Menu">
      <DirectAccess setUserObject={setUserObject} />
      <ChatMenu userObject={userObject} />
    </div>
  );
};

export default MessageMenu;
