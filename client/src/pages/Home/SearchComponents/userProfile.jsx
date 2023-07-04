import FatButtons from '../../../SmallComponents/FatButtons';
import PropTypes from 'prop-types';

const UserProfile = (props) => {
  const connectButtonText = (
    <span>
      <span className="material-symbols-outlined">conversion_path</span> Connect
    </span>
  );
  const disconnectButtonText = (
    <span>
      <span className="material-symbols-outlined">conversion_path_off</span> <b>Disonnect</b>
    </span>
  );

  return (
    <>
      <div id="user-profile">
        <div className="user-profile-upper">
          <div className="user-profile-upper-left">
            <img className="user-profile-pic" src={props.picture} alt='profile picture' />
          </div>
          <div className="user-profile-upper-right">
            <FatButtons status={props.status} text={props.status === 'connected' ? disconnectButtonText : connectButtonText} _id2={props.userId2} setConnectionStatus={props.setConnectionStatus} setDummyState={props.setDummyState} />
          </div>
        </div>
        <h4>{props.user}</h4>
        <p>{props.displayName}</p>
        <div className="user-profile-description">
          <h5>Description</h5>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
};
UserProfile.propTypes = {
  setDummyState: PropTypes.func.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  userId2: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default UserProfile;
