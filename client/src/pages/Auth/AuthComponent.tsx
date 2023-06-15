import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faG } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../assets/InputGroup';
import { useState } from 'react';
import { FormEvent } from 'react';

export default function AuthComponent() {
  const [method, setMethod] = useState('Login');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      email: valueEmail,
      password: valuePassword,
    };

    if (method === 'Login') {
      // Perform login request
      const response = await fetch('http://localhost:3000/login/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON payload
      });

      if (response.url) {
        // If response has a URL, it's a redirect response from the server
        window.location.href = response.url; // Redirect the page to the provided URL
      } else {
        // Otherwise, assume the response is JSON data
        const data = await response.json(); // Parse response as JSON
        window.location.href = data.redirectUrl; // Redirect the page to the provided redirect URL
      }
    } else {
      // Perform registration request
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON payload
      });

      const data = await response.json(); // Parse response as JSON
      window.location.href = data.redirectUrl; // Redirect the page to the provided redirect URL
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
          {method === 'Login' ? "Don't have an account? " : 'Already have an account? '}
          <b className="gradient-border">{method === 'Login' ? 'Sign up' : 'Login'}</b>
        </p>
      </form>
    </>
  );
}
