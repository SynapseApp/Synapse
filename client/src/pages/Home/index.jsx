import LeftBar from './LeftBar';
import '../pages-styles.scss';
import MessageMenu from './MessageMenu';

const index = () => {
  return (
    <div id="Home">
      <LeftBar />
      <MessageMenu />
    </div>
  );
};

export default index;
