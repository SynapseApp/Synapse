import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';
import { IsSearchingProvider } from '../../Contexts/IsSearchingContext';

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
