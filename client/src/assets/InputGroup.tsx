import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets-styles.scss";
import {
  faCheckCircle,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { validateInput } from "../modules/methods";

interface PropInterface {
  type: string;
  placeholder: string;
}

export default function InputGroup({ type, placeholder }: PropInterface) {
  const [value, setValue] = useState("");
  const [inputIsValid, setInputIsValid] = useState(false);

  async function handleInput(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    await setValue(target.value);

    const validatedData = validateInput(target.value, type);
    setInputIsValid(validatedData.isValid);
  }

  return (
    <>
      <div className="InputGroup">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
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
    </>
  );
}
