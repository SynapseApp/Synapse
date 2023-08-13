import FatButtons from "../../../SmallComponents/FatButtons";
import PropTypes from "prop-types";

const UserProfile = (props) => {
  const connectButtonText = (
    <>
      <span className="material-symbols-outlined">conversion_path</span>
      <b>Connect</b>
    </>
  );
  const disconnectButtonText = (
    <>
      <span className="material-symbols-outlined">conversion_path_off</span>
      <b>Disonnect</b>
    </>
  );

  return (
    <>
      <div id="user-profile" className="z-30">
        <div className="user-profile-upper">
          <div className="user-profile-upper-left">
            <img
              className="user-profile-pic"
              src={props.picture}
              alt="profile picture"
            />
          </div>
          <div className="user-profile-upper-right">
            <FatButtons
              status={props.status}
              text={
                props.status === "connected"
                  ? disconnectButtonText
                  : connectButtonText
              }
              _id2={props.userId2}
              setConnectionStatus={props.setConnectionStatus}
              setDummyState={props.setDummyState}
            />
          </div>
        </div>
        <h4>{props.displayName}</h4>
        <p>@{props.user}</p>
        <div className="user-profile-description">
          <h5>Description</h5>
          <p>{props.description}</p>
        </div>
      </div>
      <div
        className="block w-screen h-screen absolute bg-slate-900 opacity-30 top-0 left-0 z-20"
        onClick={() => {
          props.setShowProfile(false);
        }}
      ></div>
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
  setShowProfile: PropTypes.func.isRequired,
};

export default UserProfile;
