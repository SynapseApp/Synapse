import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets-styles.scss";
import {
  faCheckCircle,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { validateInput } from "../modules/methods";
// import { validateInput } from '../modules/methods';

/**
 * InputGroup component renders an input field with an indicator icon based on input validity.
 * It receives props for input type, placeholder, name, and a callback function to set the input value.
 * It maintains its own state for the input value and input validity.
 */
export default function InputGroup({ type, placeholder, name, setValueInput }) {
  const [value, setValue] = useState("");
  const [inputIsValid, setInputIsValid] = useState(false);
  const [feedback, setFeedback] = useState("");

  /**
   * Handle input change event.
   * Updates the input value state and calls the callback function to set the input value in the parent component.
   * Currently, input validation is commented out, because we are using the same input for both email and username validation so, need to update how we validate. or maybe no valiation on login. because then its upto the user.
   * Updates the input validity state.
   * @param event - Form input event
   */
  async function handleInput(event) {
    const target = event.target;

    setValue(target.value);

    setValueInput(target.value);

    const validatedData = validateInput(target.value, type);
    setInputIsValid(validatedData.isValid);
    setFeedback(validatedData.feedback);
  }

  return (
    <>
      <div className="InputGroup">
        <div className="row">
          <input
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            value={value}
            name={name}
            onInput={handleInput}
          />
          <div className="indicator">
            <FontAwesomeIcon
              icon={inputIsValid ? faCheckCircle : faCircleExclamation}
              size="lg"
              className={`icon-${inputIsValid ? "success" : "danger"}`}
            />
          </div>
        </div>
        <p
          className={`feedback ${inputIsValid ? "success" : "danger"} ${
            feedback === "" ? "hidden" : ""
          }`}
        >
          {feedback}
        </p>
      </div>
    </>
  );
}
