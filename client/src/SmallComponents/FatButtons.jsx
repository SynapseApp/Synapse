import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../Contexts/userContext';

const FatButtons = (props) => {
  const user = useContext(UserContext);
  function handleConnect() {
    const _id = user._id; // Replace with the userOne ID
    const _id2 = props._id2; // Replace with the userTwo ID

    fetch('http://localhost:3000/connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: _id,
        id2: _id2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error creating connection:', error);
      });
    console.log(user);
  }
  return (
    <div>
      <button className="fat-btn" onClick={handleConnect}>
        <b>{props.text}</b>
      </button>
    </div>
  );
};

FatButtons.propTypes = {
  text: PropTypes.object.isRequired,
  _id2: PropTypes.string.isRequired,
};

export default FatButtons;
