import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faG } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "../../assets/InputGroup";
import { useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type AuthComponentProps = {
  setAuthenticated: (value: boolean) => void;
};

export default function AuthComponent({
  setAuthenticated,
}: AuthComponentProps) {
  const [method, setMethod] = useState("Login"); // State variable for selected authentication method
  const [valueEmail, setValueEmail] = useState(""); // State variable for email input value
  const [valuePassword, setValuePassword] = useState(""); // State variable for password input value
  const [valueUsername, setValueUsername] = useState(""); // State variable for username input value

  const navigate = useNavigate(); // Function for programmatic navigation

  let formData: { username: string; password: string; email?: string }; // Form data object

  if (method === "Login") {
    // Construct form data for login method
    if (valueEmail === "") {
      formData = {
        username: valueUsername,
        password: valuePassword,
      };
    } else if (valueUsername === "") {
      formData = {
        username: valueEmail,
        password: valuePassword,
      };
    }
  } else {
    // Construct form data for register method
    formData = {
      username: valueUsername,
      email: valueEmail,
      password: valuePassword,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (method === "Login") {
      // Handle login form submission
      console.log(formData);

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      console.log(response.status);

      if (response.status === 200) {
        // Authentication successful
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/home"); // Redirect to /home after a small delay
        }, 500);
      }
    } else {
      // Handle register form submission
      console.log(formData);

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      console.log(response.status);

      if (response.status === 200) {
        // Registration successful
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/home"); // Redirect to /home after a small delay
        }, 500);
      }
    }
  }

  return (
    <>
      {/* MoreInfo component */}
      {/* <div id="MoreInfo-Parent" className={takingMoreInfo ? 'flex' : 'hidden'}>
        <MoreInfo />
      </div> */}
      <form id="Login-Component" onSubmit={handleSubmit}>
        <h6>
          {method === "Login"
            ? "Login To Your Account"
            : "Register A New Account"}
        </h6>

        {/* Google authentication button */}
        <a
          id="Google-Auth-Button"
          className="gradient-box glow-effect-border"
          href="http://localhost:3000/login/federated/google"
        >
          <FontAwesomeIcon icon={faG} size="xl" />
          {method} With Google
        </a>

        {/* Username input (only for register method) */}
        {method !== "Login" && (
          <InputGroup
            type="text"
            placeholder="Username"
            name="username"
            setValueInput={setValueUsername}
          />
        )}

        {/* Email or username input */}
        <InputGroup
          type={method === "Login" ? "username" : "email"}
          placeholder={method === "Login" ? "Email or username" : "Email"}
          name={method === "Login" ? "username" : "email"}
          setValueInput={setValueEmail}
        />

        {/* Password input */}
        <InputGroup
          type="password"
          placeholder="Password"
          name="password"
          setValueInput={setValuePassword}
        />

        {/* Forgot Password link (only for login method) */}
        {method === "Login" && (
          <p className="gradient-border">Forgot Password?</p>
        )}

        {/* Submit button */}
        <button id="Submit-Button" className="gradient-btn glow-effect">
          Continue
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>

        {/* Toggle between login and register methods */}
        <p
          onClick={() => {
            if (method === "Login") setMethod("Sign up");
            else setMethod("Login");
          }}
        >
          {method === "Login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <b className="gradient-border">
            {method === "Login" ? "Sign up" : "Login"}
          </b>
        </p>
      </form>
    </>
  );
}
