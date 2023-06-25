import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import ChatMenu from "./ChatMenu";

const Search = () => {
  const [placeholderValue, setPlaceholderValue] = useState("Search Here");
  const [inputValue, setInputValue] = useState("");

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  const userChats = [
    {
      friend: "Aditya",
      message: "hello",
      picture:
        "https://www.dreshare.com/wp-content/uploads/2021/02/Dhar-Mann-and-his-father-Baljit-Singh-Mann.jpg",
    },
    {
      friend: "Jalail Login Page",
      message: "real based player",
      picture:
        "https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-12/Lionel%20Messi%20-%20World%20Cup%20Final%202022%20penalty%20celebration%20vs%20France%20-%20181222-16x9.jpg?itok=_U5r3wZ4",
    },
    {
      friend: "Ank",
      message: "ankirduwa",
      picture:
        "data:image/jpeg;base64,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",
    },
    {
      friend: "Ahmedabad",
      message: "fortnite",
      picture:
        "https://www.elconfidencialdigital.com/asset/zoomcrop,1280,720,center,center/media/elconfidencialdigital/images/2017/06/08/ECDIMA20170608_0005_1.jpg",
    },
  ];

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const printChats = function () {
    const renderedChats = [];

    for (let i = 0; i < userChats.length; i++) {
      userChats[i].friend = truncateText(userChats[i].friend, 18);
      userChats[i].message = truncateText(userChats[i].message, 20);

      // This Should be a standalone component
    //   Used tailwind classes to style basic stuffs
      renderedChats.push(
        <div className="contact items-center flex gap-2 md-2:flex-row rounded-md overflow-hidden p-2" key={i}>
          <div className=" w-12 aspect-square rounded-full contact__img">
            <img src={userChats[i].picture} alt="Profile" className="w-[35px] aspect-square rounded-3xl" />
          </div>

          <div className="text-left w-full" onClick={removeHiddenChatMenu}>
            <p className="contact__name font-medium">{userChats[i].friend}</p>
            <p className="contact__message">{userChats[i].message}</p>
          </div>
        </div>
      );
    }

    return renderedChats;
  };

  function removeHiddenChatMenu(user: any): void {
    const element = document.querySelector<HTMLElement>(".chat-menu");
    if (element) {
      element.classList.remove("hidden");
    }
  }

  const renderedChats = printChats();

  return (
    <div id="search-component" className=" overflow-y-scroll">
      <div id="synapse-header">
        <h3>Synapse</h3>
      </div>
      <form>
        <FontAwesomeIcon id="search-icon" icon={faMagnifyingGlass} size="xl" />
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

      {/* Wrapped theim in a div */}
      <div className="mt-5 flex flex-col gap-5 px-3 chats">{renderedChats}</div>
    </div>
  );
};

export default Search;
