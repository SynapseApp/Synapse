import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';
<<<<<<< HEAD
import Settings from './settingsPage/settings';
=======
import { IsSearchingProvider } from '../../Contexts/IsSearchingContext';
>>>>>>> 8e8aa1bfa596ce5939500fa8c87eaaf395ac90d9

const index = () => {
  return (
    <div id="Home">
      <IsSearchingProvider>
        <LeftBar />
        <MessageMenu />
      </IsSearchingProvider>
    </div>
  );
};

export default index;
