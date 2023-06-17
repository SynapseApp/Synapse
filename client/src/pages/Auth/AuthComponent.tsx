import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faG } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "../../assets/InputGroup";
import { useState } from "react";
import { FormEvent } from "react";
import MoreInfo from "./MoreInfo";

export default function AuthComponent() {
  const [takingMoreInfo, setTakingMoreInfo] = useState(false);
  const [method, setMethod] = useState("Login");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      email: valueEmail,
      password: valuePassword,
    };

    if (method === "Login") {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
    } else {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      setTakingMoreInfo(true);
    }
  }

  return (
    <>
      <div id="MoreInfo-Parent" className={takingMoreInfo ? "flex" : "hidden"}>
        <MoreInfo />
      </div>
      <form
        id="Login-Component"
        className={takingMoreInfo ? "hidden" : "flex"}
        onSubmit={handleSubmit}
      >
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
          {method} With Google
        </button>

        <InputGroup
          type="email"
          placeholder="Email"
          setValueInput={setValueEmail}
        />
        <InputGroup
          type="password"
          placeholder="Password"
          setValueInput={setValuePassword}
        />
        {method === "Login" && (
          <p className="gradient-border">Forgot Password?</p>
        )}
        <button id="Submit-Button" className="gradient-btn glow-effect">
          Continue
          <FontAwesomeIcon icon={faArrowRight} size="xl" />
        </button>

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
