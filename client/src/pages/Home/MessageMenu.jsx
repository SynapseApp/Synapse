import { useState } from 'react';
import DirectAccess from './DirectAccess';
import ChatMenu from './MessageComponents/ChatMenu';

const MessageMenu = () => {
  const [selectedUser, setSelectedUser] = useState({});

  return (
    <div id="Message-Menu">
      <DirectAccess setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatMenu selectedUser={selectedUser} />
    </div>
  );
};

export default MessageMenu;
