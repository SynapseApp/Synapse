import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';
import { IsSearchingProvider } from '../../Contexts/IsSearchingContext';
import socket from '../../socket';
import { useEffect, useContext } from 'react';
import UserContext from '../../Contexts/userContext';

const Index = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    socket.connect();
    socket.auth = { user };
    // Remove the event listener on component unmount
    return () => socket.disconnect();
  });
  return (
    <div id="Home">
      <IsSearchingProvider>
        <LeftBar />
        <MessageMenu />
      </IsSearchingProvider>
    </div>
  );
};

export default Index;
