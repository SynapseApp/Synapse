import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../Contexts/userContext';

const FatButtons = (props) => {
  const user = useContext(UserContext);

  async function handleConnect() {
    try {
      const _id = user._id; // Replace with the userOne ID
      const _id2 = props._id2; // Replace with the userTwo ID

      const response = await fetch('http://localhost:3000/connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
          id2: _id2,
        }),
      });

      if (response.ok) {
        props.setConnectionStatus('connected'); // Update the connection status
        props.setDummyState((prevState) => prevState + 1); // Increment the dummy state variable
        const data = await response.json();
        // Handle the response data here
        console.log(data);
      } else {
        throw new Error('Failed to create connection');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error creating connection:', error);
    }
    console.log(user);
  }

  async function handleDisconnect() {
    try {
      const _id = user._id; // Replace with the userOne ID
      const _id2 = props._id2; // Replace with the userTwo ID

      const response = await fetch(`http://localhost:3000/connection/${_id}/${_id2}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        props.setConnectionStatus('disconnected'); // Update the connection status
        props.setDummyState((prevState) => prevState + 1); // Increment the dummy state variable
        // Handle the response data here
        console.log(data);
        // Perform any necessary actions after successful disconnection
      } else {
        throw new Error('Failed to delete connection');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error deleting connection:', error);
    }
  }

  return (
    <div>
      <button className="fat-btn" onClick={props.status === 'connected' ? handleDisconnect : handleConnect}>
        <b>{props.text}</b>
      </button>
    </div>
  );
};

FatButtons.propTypes = {
  setDummyState: PropTypes.func.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  _id2: PropTypes.string.isRequired,
};

export default FatButtons;
