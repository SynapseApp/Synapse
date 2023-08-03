import DirectAccess from "./DirectAccess";
import ChatMenu from "./MessageComponents/ChatMenu";

const MessageMenu = () => {
  return (
    <div id="Message-Menu">
      <DirectAccess />
      <ChatMenu />
    </div>
  );
};

export default MessageMenu;
