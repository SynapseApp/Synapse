import DirectAccess from './DirectAccess';
import ChatMenu from './MessageComponents/ChatMenu';

const MessageMenu = () => {
  return (
    <div id="message-menu">
      <DirectAccess />
      <ChatMenu />
    </div>
  );
};

export default MessageMenu;
