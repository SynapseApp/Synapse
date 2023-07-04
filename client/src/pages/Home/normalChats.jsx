// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useContext, useState } from "react";
// import UserContext from "../../../Contexts/userContext";

const NormalChats = () => {
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
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
      friend: "Ahmedabad",
      message: "fortnite",
      picture:
        "https://www.elconfidencialdigital.com/asset/zoomcrop,1280,720,center,center/media/elconfidencialdigital/images/2017/06/08/ECDIMA20170608_0005_1.jpg",
    },
  ];

  //   const user = useContext(UserContext);
  //   console.log(user);

  function truncateText(text, maxLength) {
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

      renderedChats.push(
        <div className="chat" key={i}>
          <img src={userChats[i].picture} alt="Profile" />
          <div className="chat-text" onClick={removeHiddenChatMenu}>
            <p className="contact-name">{userChats[i].friend}</p>
            <p>{userChats[i].message}</p>
          </div>
        </div>
      );
    }

    return renderedChats;
  };

  function removeHiddenChatMenu() {
    const element = document.querySelector < HTMLElement > ".chat-menu";
    if (element) {
      element.classList.remove("hidden");
    }
  }

  const renderedChats = printChats();

  return <div>{renderedChats}</div>;
};

export default NormalChats;
