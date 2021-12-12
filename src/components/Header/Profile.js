import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext, useState } from "react";
import { AuthContext } from '../../Contexts/AuthContext';
import { useClickOutside } from "./ProfileHook";
import Menu from "./Menu";
import "./Menu.css";
function Profile(props) {
  const { logout, username } = useContext(AuthContext)
  const { theme, toggleOn } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useClickOutside(() => {
    setIsOpen(false);
  }, isOpen);
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true;

  return (
    <Container  >
      <Toggle onClick={toggleOn} style={{ border: isDark ? '' : '1px solid grey', boxShadow: isDark ? 'none' : '1px 0px 15px 1px #404040' }}>
        <i className="fas fa-moon toggle-icon"></i>
        <i className="fas fa-sun toggle-icon"></i>
        <div
          className="toggle-ball"
          style={theme === "light" ? { transform: "translateX(-20px)" } : {}}
        ></div>
      </Toggle>
      <div ref={trigger} style={{ display: 'flex', position: 'relative' }}>
        <a style={{ cursor: 'pointer' }} onClick={() => {
          setIsOpen(!isOpen);
        }}>
          <img className='image'  src={JSON.parse(localStorage.getItem('user')).profilePic !== "" ?
          JSON.parse(localStorage.getItem('user')).profilePic : "img/user2.png"
        } alt="" style={{ boxShadow: isDark ? '1px 0px 5px 1px lightgrey' : '1px 0px 15px 1px #404040' }} />
        </a>
        <TextContainer style={{ color: isDark ? '' : '#0a0a0a' }}  >
          <span >{username}</span>
          <div onClick={() => {
            setIsOpen(!isOpen);
          }} style={{ cursor: 'pointer' }}>
            <i className="fas fa-caret-down " style={{ color: isDark ? '' : '#0a0a0a' }}></i>

          </div>

        </TextContainer>
        <Menu isOpen={isOpen} logout={logout} trigger={trigger} />
      </div>

    </Container>
  );
}

const Container = styled.div`
position:relative;
justify-content:space-around;
transition: all 0.4s ease-in-out;
  @media screen and (max-width: 940px) {
    justify-content: flex-end;
    margin-right: 40px;
  }
  flex: 1.7;
  align-items: center;
  display: flex;
  
`;
const TextContainer = styled.div`
span{
  font-weight:bold;
}
ul{
  z-index:1;
  a {
    text-align:center;
    width:90px;
    padding: 8px;
    margin-bottom: 2px;
    border: 1px solid lightgrey;
  }
  cursor: pointer;
  margin-top: 5px;
  color: white;
  font-size: 14px;
  position: relative;
  padding: 8px;
}

justify-content:space-between;
  @media screen and (max-width: 940px) {
    display: none;
  }
  font-family: "Poppins", sans-serif;
  margin: 10px;
  letter-spacing: 1px;
  color: lightgrey;
  i {
    margin-left: 5px;
  }
  a {
    color: lightgrey;
  }
  max-width:170px;
  overflow:hidden;
  display: flex;
  justify-content: flex-end;
`;
const Toggle = styled.div`
margin-right:20px;
  @media screen and (max-width: 610px) {
    display: none;
  }
  cursor: pointer;
  width: 40px;
  height: 20px;
  background-color: lightgrey;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  i {
    color: #9c7a00;
  }
  div {
    border:1px solid lightgrey;
    transition: all 0.3s ease-in-out;
    width: 18px;
    height: 18px;
    background-color: black;
    margin-top:0.5px;
    position: absolute;
    right: 1px;
    border-radius: 50%;
  }
`;

export default Profile;
