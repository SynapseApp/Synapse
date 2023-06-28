import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/userContext";

const Search = () => {
  const [placeholderValue, setPlaceholderValue] = useState("Search Here");
  const [inputValue, setInputValue] = useState("");

  const user = useContext(UserContext);
  console.log(user);

  function handleChange(event) {
    const target = event.target;
    setInputValue(target.value);
  }

  return (
    <div id="Search-Component">
      <div id="Synapse-Header">
        <div>Synapse</div>
      </div>
      <form>
        <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} size="lg" />
        <input
          className={inputValue !== "" ? "input-text-left" : ""}
          id="query"
          type="text"
          onChange={handleChange}
          value={inputValue}
          onFocus={() => {
            setPlaceholderValue("");
          }}
          onBlur={() => setPlaceholderValue("Search Here")}
          placeholder={placeholderValue}
        ></input>
      </form>
      {/* {renderedChats} */}
    </div>
  );
};

export default Search;
