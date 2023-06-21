import { useState } from "react";
import Local from "./Local";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faF, faT, faG } from "@fortawesome/free-solid-svg-icons";

type AuthComponentProps = {
  setAuthenticated: (value: boolean) => void;
};

export default function Auth({ setAuthenticated }: AuthComponentProps) {
  const [activePage, setActivePage] = useState(["Auth", ""]);

  function fade_to_Local(passed_page: any) {
    document.getElementById("Auth")?.classList.add("fade-out-r-l");

    setTimeout(() => {
      setActivePage(passed_page);
      document.getElementById("Auth")?.classList.remove("fade-out-r-l");
    }, 475 /*fade-out-r-l*/);
  }

  return (
    <>
      <div
        id="Auth-Local"
        className={activePage[0] === "Local" ? "flex" : "hidden"}
      >
        <Local
          setAuthenticated={setAuthenticated}
          setActivePage={setActivePage}
          method={activePage[1]}
        />
      </div>
      <div
        id="Auth"
        className={`${activePage[0] === "Auth" ? "flex" : "hidden"}`}
      >
        <div className="row">
          <div className="Local-Auths">
            <button
              className="gradient-box glow-effect-border"
              onClick={() => fade_to_Local(["Local", "Login"])}
            >
              Login
            </button>
            <button
              className="gradient-box glow-effect-border"
              onClick={() => fade_to_Local(["Local", "Sign Up"])}
            >
              Sign Up
            </button>
          </div>

          <div className="Provided-Auths">
            <button
              id="Google-Auth-Button"
              className="gradient-box glow-effect-border"
            >
              <FontAwesomeIcon icon={faGoogle} size="xl" />
              Sign Up With Google
            </button>
            <button
              id="Google-Auth-Button"
              className="gradient-box glow-effect-border"
            >
              <FontAwesomeIcon icon={faFacebook} size="xl" />
              Sign Up With FaceBook
            </button>
            <button
              id="Google-Auth-Button"
              className="gradient-box glow-effect-border"
            >
              <FontAwesomeIcon icon={faTwitter} size="xl" />
              Sign Up With Twitter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
