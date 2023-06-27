import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "../../assets/InputGroup";
import { useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Local({ setAuthenticated, setActivePage, method }) {
  const [valueEmail, setValueEmail] = useState(""); // State variable for email input value
  const [valuePassword, setValuePassword] = useState(""); // State variable for password input value
  const [valueUsername, setValueUsername] = useState(""); // State variable for username input value

  const navigate = useNavigate(); // Function for programmatic navigation

  let formData; // Form data object

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (method === "Login") {
      // Handle login form submission

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 200) {
        // Authentication successful
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/home"); // Redirect to /home after a small delay
        }, 500);
      }
    } else {
      // Handle register form submission
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 200) {
        // Registration successful
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/home"); // Redirect to /home after a small delay
        }, 500);
      }
    }
  }

  function fade_to_Auth() {
    document.getElementById("Local")?.classList.add("fade-out-r-l");
    document.getElementById("Local-Backward")?.classList.add("fade-out-r-l");

    setTimeout(() => {
      setActivePage(["Auth", ""]);
      document.getElementById("Local")?.classList.remove("fade-out-r-l");
      document
        .getElementById("Local-Backward")
        ?.classList.remove("fade-out-r-l");
    }, 475 /*fade-out-r-l*/);
  }

  return (
    <>
      <button id="Local-Backward" onClick={fade_to_Auth}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </button>
      <form id="Local" onSubmit={handleSubmit}>
        <h6>
          {method === "Login"
            ? "Login To Your Account"
            : "Register A New Account"}
        </h6>

        {/* Username input (only for register method) */}
        {method !== "Login" && (
          <InputGroup
            type="username"
            placeholder="Username"
            name="username"
            setValueInput={setValueUsername}
          />
        )}

        {/* Email or username input */}
        <InputGroup
          type={method === "Login" ? "email&username" : "email"}
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
        <button
          id="Submit-Button"
          type="submit"
          className="gradient-btn glow-effect"
          onClick={() => {
            console.log("first");
          }}
        >
          Continue
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>

        {/* Toggle between login and register methods */}
        <p
          onClick={() => {
            if (method === "Login") setActivePage(["Local", "Sign Up"]);
            else setActivePage(["Local", "Login"]);
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
