import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { ThemeContext } from "../../Contexts/ThemeContext";
function GuestProfile() {
  const { modalStateHandler } = useContext(ModalContext);
  const { theme, toggleOn } = useContext(ThemeContext);
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true;
  return (
    <Container>
      <Toggle onClick={toggleOn} style={{ border: isDark ? '' : '1px solid grey', boxShadow: isDark ? 'none' : '1px 0px 15px 1px #404040' }}>
        <i className="fas fa-moon toggle-icon"></i>
        <i className="fas fa-sun toggle-icon"></i>
        <div
          className="toggle-ball"
          style={theme === "light" ? { transform: "translateX(-20px)" } : {}}
        ></div>
      </Toggle>
      <p onClick={modalStateHandler} style={{ color: isDark ? '' : 'black', boxShadow: isDark ? '1px 0px 8px 1px grey' : '1px 0px 15px 1px #404040' }}>Sign in</p>
    </Container>
  );
}
const Container = styled.div`
transition: all 0.5s ease-in-out;
justify-content:space-around;
&:hover{
  cursor:pointer;
}
p{
  border-radius:50px;
  transition: all 0.2s ease-in-out;
  &:hover{
    border:1px solid #696969;
  }
  text-align:center;
  font-family: "Poppins", sans-serif;
  font-size:10px;
  color:#bababa;
  font-weight:bold;
  letter-spacing:1.4px;
  border:1px solid #404040;
  padding:6px;
}
  @media screen and (max-width: 800px) {
    justify-content: flex-end;
    margin-right: 20px;
  }
 
  flex: 1.5;
  align-items: center;
  display: flex;
`;

const Toggle = styled.div`
left:17%;
  @media screen and (max-width: 580px) {
    display: none;
  }
  @media screen and (max-width: 800px) {

    margin-right:35%;
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

export default GuestProfile;
