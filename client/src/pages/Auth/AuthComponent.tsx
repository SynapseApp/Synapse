import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faG } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "../../assets/InputGroup";
import { useState } from "react";

export default function AuthComponent() {
  const [method, setMethod] = useState("Login");

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (method === "login") {
      // Login the user
    } else {
      // Register the user
    }
  }

  return (
    <>
      <form id="Login-Component" className="">
        <h6>
          {method === "Login"
            ? "Login To Your Account"
            : "Register A New Account"}
        </h6>

        <button
          id="Google-Auth-Button"
          className="gradient-box glow-effect-border"
        >
          <FontAwesomeIcon icon={faG} size="xl" />
          Sign Up With Goggle
        </button>

        <InputGroup type="email" placeholder="Email" />
        <InputGroup type="password" placeholder="Password" />
        {method === "Login" && (
          <p className="gradient-border">Forgot Password?</p>
        )}
        <button id="Submit-Button" className="gradient-btn glow-effect">
          Continue
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>

        <p
          className="gradient-border"
          onClick={() => {
            if (method === "Login") setMethod("Register");
            else setMethod("Login");
          }}
        >
          Dont have a account? <b>Sign Up</b>
        </p>
      </form>
    </>
  );
}
