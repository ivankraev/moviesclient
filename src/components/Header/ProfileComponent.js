import React from "react";
import "./Profile.css";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useClickOutside } from "./ProfileHook";
function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useClickOutside(() => {
    setIsOpen(false);
  }, isOpen);

  console.log(isOpen);
  return (
    <div className="container">
      <img className="profilepic" src="img/download.png" alt="" />
      <div className="text">
        <div className="usernameholder">
          <span className="username">Ivan</span>
        </div>
      </div>
      <div className="triggerholder">
        <i
          ref={trigger}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AiFillCaretDown className="trigger" />
        </i>
      </div>
    </div>
  );
}

export default Profile;
