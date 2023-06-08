import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faG } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../assets/InputGroup';
import { useState } from 'react';
import { FormEvent } from 'react';

export default function AuthComponent() {
  const [method, setMethod] = useState('Login');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (method === 'Login') {
      //login user
    } else {
      // Register the user
    }
  }

  return (
    <>
      <form id="Login-Component" className="" onSubmit={handleSubmit}>
        <h6>{method === 'Login' ? 'Login To Your Account' : 'Register A New Account'}</h6>

        <button id="Google-Auth-Button" className="gradient-box glow-effect-border">
          <FontAwesomeIcon icon={faG} size="xl" />
          {method} With Google
        </button>

        <InputGroup type="email" placeholder="Email" setValueInput={setValueEmail} />
        <InputGroup type="password" placeholder="Password" setValueInput={setValuePassword} />
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
          {method === 'Login' ? 'Already have an account? ' : 'Create an account '}
          <b className="gradient-border">{method === 'Login' ? 'Sign up' : 'Login'}</b>
        </p>
      </form>
    </>
  );
}
