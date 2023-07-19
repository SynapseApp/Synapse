import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';
import { IsSearchingProvider } from '../../Contexts/IsSearchingContext';
import Settings from './settingsPage/settings';

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
