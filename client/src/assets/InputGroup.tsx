import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './assets-styles.scss';
import { faCheckCircle, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
import { validateInput } from '../modules/methods';

interface PropInterface {
  type: string;
  placeholder: string;
  name: string;
  setValueInput: any;
}

export default function InputGroup({ type, placeholder, name, setValueInput }: PropInterface) {
  const [value, setValue] = useState('');
  const [inputIsValid, setInputIsValid] = useState(false);

  async function handleInput(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    setValue(target.value);

    setValueInput(target.value);

    // const validatedData = validateInput(target.value, type);
    setInputIsValid(true);
  }

  return (
    <>
      <div className="InputGroup">
        <input type={type} placeholder={placeholder} value={value} name={name} onInput={handleInput} />
        <div className="indicator">
          <FontAwesomeIcon icon={inputIsValid ? faCheckCircle : faCircleExclamation} size="lg" className={`icon-${inputIsValid ? 'success' : 'danger'}`} />
        </div>
      </div>
    </>
  );
}
