import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';
import Settings from './settingsPage/settings';

const index = () => {
  return (
    <div id="home">
      <LeftBar />
      <MessageMenu />
    </div>
  );
};

export default index;
