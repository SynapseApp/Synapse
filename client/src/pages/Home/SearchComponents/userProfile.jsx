import FatButtons from '../../../SmallComponents/FatButtons';
import { faBan, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const disconnectItem = (
  <span>
    <FontAwesomeIcon icon={faBan} /> Disconnect
  </span>
);
const connectItem = (
  <span>
    <FontAwesomeIcon icon={faNetworkWired} /> Connect
  </span>
);

const UserProfile = (props) => {
  return (
    <>
      <div id="user-profile">
        <div className="user-profile-upper">
          <div className="user-profile-upper-left">
            <img className="user-profile-pic" src={props.picture} alt="User Profile" />
          </div>
          <div className="user-profile-upper-right">
            <FatButtons status={props.status} text={props.status === 'connected' ? disconnectItem : connectItem} _id2={props.userId2} />
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
  picture: PropTypes.string.isRequired,
  userId2: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default UserProfile;

// import FatButtons from '../../SmallComponents/FatButtons';
// import { faBan, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const disconnectItem = (
//   <span>
//     <FontAwesomeIcon icon={faBan} /> Disconnect
//   </span>
// );
// const connectItem = (
//   <span>
//     <FontAwesomeIcon icon={faNetworkWired} /> Connect
//   </span>
// );

// const UserProfile = (props) => {
//   return (
//     <>
//       <div id="user-profile">
//         <div className="user-profile-upper">
//           <div className="user-profile-upper-left">
//             <img className="user-profile-pic" src={props.picture}></img>
//           </div>
//           <div className="user-profile-upper-right">
//             <FatButtons key={props.key} text={props.status === 'friend' ? disconnectItem : connectItem} />
//           </div>
//         </div>
//         <h4>{props.user}</h4>
//         <p>{props.id}</p>
//         <div className="user-profile-description">
//           <h5>Description</h5>
//           <p>{props.description}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserProfile;
