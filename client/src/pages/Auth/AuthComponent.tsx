import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faG } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../assets/InputGroup';
import { useState } from 'react';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// import MoreInfo from './MoreInfo';

export default function AuthComponent() {
  // const [takingMoreInfo, setTakingMoreInfo] = useState(false);
  const [method, setMethod] = useState('Login');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueUsername, setValueUsername] = useState('');

  const navigate = useNavigate();
  let formData: { username: string; password: string; email?: string };

  if (method === 'Login') {
    if (valueEmail === '') {
      formData = {
        username: valueUsername,
        password: valuePassword,
      };
    } else if (valueUsername === '') {
      formData = {
        username: valueEmail,
        password: valuePassword,
      };
    }
  } else {
    formData = {
      username: valueUsername,
      email: valueEmail,
      password: valuePassword,
    };
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (method === 'Login') {
      console.log(formData);

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies in the request
      });

      console.log(response.status);

      if (response.status === 200) {
        navigate('/home');
      }
    } else {
      console.log(formData);

      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies in the request
      });

      console.log(response.status);

      if (response.status === 200) {
        navigate('/home');
      }
    }
  }

  return (
    <>
      {/* <div id="MoreInfo-Parent" className={takingMoreInfo ? 'flex' : 'hidden'}>
        <MoreInfo />
      </div> */}
      <form id="Login-Component" onSubmit={handleSubmit}>
        <h6>{method === 'Login' ? 'Login To Your Account' : 'Register A New Account'}</h6>

        <button id="Google-Auth-Button" className="gradient-box glow-effect-border">
          <FontAwesomeIcon icon={faG} size="xl" />
          {method} With Google
        </button>

        {method !== 'Login' && <InputGroup type="text" placeholder="Username" name="username" setValueInput={setValueUsername} />}
        <InputGroup type={method === 'Login' ? 'username' : 'email'} placeholder={method === 'Login' ? 'Email or username' : 'Email'} name={method === 'Login' ? 'username' : 'email'} setValueInput={setValueEmail} />
        <InputGroup type="password" placeholder="Password" name="password" setValueInput={setValuePassword} />
        {method === 'Login' && <p className="gradient-border">Forgot Password?</p>}
        <button id="Submit-Button" className="gradient-btn glow-effect">
          Continue
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>

        <p
          onClick={() => {
            if (method === 'Login') setMethod('Sign up');
            else setMethod('Login');
          }}
        >
          {method === 'Login' ? "Don't have an account? " : 'Already have an account? '}
          <b className="gradient-border">{method === 'Login' ? 'Sign up' : 'Login'}</b>
        </p>
      </form>
    </>
  );
}
