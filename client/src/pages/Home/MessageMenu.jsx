import { useState } from 'react';
import DirectAccess from './DirectAccess';
import ChatMenu from './MessageComponents/ChatMenu';

const MessageMenu = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedConnection, setSelectedConnection] = useState({});

  return (
    <div id="Message-Menu">
      <DirectAccess setSelectedUser={setSelectedUser} selectedUser={selectedUser} setSelectedConnection={setSelectedConnection} />
      <ChatMenu selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedConnection={selectedConnection} />
    </div>
  );
};

export default MessageMenu;
