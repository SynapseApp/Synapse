// import { useState } from "react";
// import InputGroup from "../../assets/InputGroup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// export default function MoreInfo() {
//   const [username, setUsername] = useState("");

//   function takeImgInput() {
//     const input = document.getElementById("img-input") as HTMLInputElement;
//     input.click();
//   }

//   return (
//     <>
//       <form id="MoreInfo">
//         <h6>Your Profile Details</h6>
//         <div className="pfp" onClick={takeImgInput}></div>
//         <input type="file" id="img-input" name="img" accept="image/*" />
//         <InputGroup
//           type="text"
//           placeholder="Username"
//           setValueInput={setUsername}
//         />
//         <button id="Submit-Button" className="gradient-btn glow-effect">
//           Continue
//           <FontAwesomeIcon icon={faArrowRight} size="xl" />
//         </button>
//       </form>
//     </>
//   );
// }
