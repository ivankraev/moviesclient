import React from "react";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { css } from "@emotion/react";
import { LoginContext } from "../../Contexts/LoginContext";
import BarLoader from "react-spinners/BarLoader";
import { MdClose } from "react-icons/md";
import { baseUrl } from "../../api";
function Login({ loginTrigger, authorization }) {
  let modalStateManipulator = useContext(ModalContext);
  let LM = useContext(LoginContext);
  const form = document.getElementById("form2");
  if (form && !modalStateManipulator.isOpen) {
    form.reset();
    LM.setErrorFunc(false);
  }
  const firstbar = css`
    transition: none;
    position: absolute;
    opacity: ${LM.isLoading};
    top: -2px;
    width: 100%;
  `;
  const loginHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let username = formData.get("username");
    let repassword = formData.get("repassword");
    //TODO MOVE THIS INTO A HOOK
    if (username === "") {
      LM.setErrorFunc("Username is required!");
      return;
    }
    if (email === "") {
      LM.setErrorFunc("Email is required!");
      return;
    }
    if (password.length < 6) {
      LM.setErrorFunc("Password is too short!");
      return;
    }
    if (repassword !== password) {
      LM.setErrorFunc("Passwords dont match!");
      return;
    }
    LM.setIsLoadingFunc(1);
    //TODO MOVE THIS INTO USEFETCH HOOK
    await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res._id) {
          LM.setErrorFunc(res);
        } else {
          //TODO: PUT THIS LOGIC SOMEWHERE ELSE
          LM.setErrorFunc("Registration was succesful.");
          localStorage.setItem("user", JSON.stringify(res));
          setTimeout(() => {
            authorization();
            modalStateManipulator.modalStateHandler();
            LM.setErrorFunc(false);
          }, 1000);
        }
      })
      .catch((err) => {
        LM.setErrorFunc("Error connecting to server...");
      });
    LM.setIsLoadingFunc(0);
  };
  //TODO MOVE THIS INTO A HOOK
  useEffect(() => {
    if (LM.error && LM.error !== "Logged in.") {
      setTimeout(() => {
        LM.setErrorFunc(false);
      }, 4000);
    } else if (LM.error === "Logged in.") {
      LM.setIsLoadingFunc(1);
      setTimeout(() => {
        LM.setIsLoadingFunc(0);
      }, 1500);
    }
  }, [LM.error]);
  return (
    <Container>
      <Overlay
        onClick={() => {
          modalStateManipulator.modalStateHandler();
          LM.setErrorFunc(false);
        }}
      ></Overlay>
      <FormWrapper>
        <BarLoader css={firstbar} size={25} color={"white"} loading={true} />
        <section style={{ position: "absolute", top: "8%", padding: "0 5%" }}>
          <h1>Create account</h1>
          <h2 style={{ position: "static" }}>
            and get instant access to more cool features...
          </h2>
        </section>
        <div className="xbutton">
          <MdClose
            style={{
              position: "absolute",
              color: "white",
              top: "10px",
              right: "10px",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={() => {
              modalStateManipulator.modalStateHandler();
              LM.setErrorFunc(false);
            }}
          ></MdClose>
        </div>
        <main>
          <form id="form2" onSubmit={loginHandler}>
            <input
              onClick={() => LM.setErrorFunc(false)}
              style={{ padding: "5px" }}
              name="username"
              type="text"
              placeholder=" Username"
            ></input>
            <input
              onClick={() => LM.setErrorFunc(false)}
              style={{ padding: "5px" }}
              name="email"
              type="email"
              placeholder=" Email"
            ></input>
            <input
              onClick={() => LM.setErrorFunc(false)}
              style={{ padding: "5px" }}
              name="password"
              type="password"
              placeholder=" Password"
            ></input>
            <input
              onClick={() => LM.setErrorFunc(false)}
              style={{ padding: "5px" }}
              name="repassword"
              type="password"
              placeholder=" Repeat Password"
            ></input>
            <span
              style={{
                color:
                  LM.error !== "Registration was succesful." ? "red" : "green",
                textAlign: "center",
                fontSize: "13px",
                marginTop: "8px",
                fontWeight: "bold",
                opacity: LM.error ? "0.8" : "0",
                height: "10px",
              }}
            >
              {LM.error}
            </span>
            <input
              value="Register"
              style={{
                marginTop: "40px",
                cursor: LM.isLoading === 0 ? "pointer" : "auto",
                opacity: LM.isLoading === 0 ? "1" : "0.6",
                transition: "none",
                border: "1px solid #cccccc",
                height: "50px",
                padding: "10px",
                background: "rgb(4, 110, 32)",
                borderRadius: "22px",
                letterSpacing: "1.2px",
                color: "white",
                fontWeight: "bold",
              }}
              type="submit"
            ></input>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{
                  fontSize: "12px",
                  marginTop: "15px",
                  color: "#d4d4d4",
                }}
              >
                Already have an account?
              </h4>
              <p
                style={{
                  cursor: "pointer",
                  marginTop: "15px",
                  color: "rgb(2, 168, 44)",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "7px",
                }}
                onClick={() => {
                  loginTrigger();
                  LM.setErrorFunc(false);
                }}
              >
                Sign in
              </p>
            </div>
          </form>
        </main>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
`;
const FormWrapper = styled.div`
  transition: all 0.7s ease-in-out;
  main {
    transition: all 0.7s ease-in-out;
    @media screen and (max-height: 750px) {
      margin-bottom: 45px;
    }
  }
  p {
    &:hover {
      text-decoration: underline;
    }
  }
  overflow: hidden;
  box-shadow: 2px 2px 14px 2px grey;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    margin-bottom: 30px;
    text-align: center;
    color: white;
    height: 10px;
    transition: all 0.7s ease-in-out;
    @media screen and (max-height: 639px) {
      transform: scale(0.8);
    }
    @media screen and (max-height: 665px) {
      margin-top: -10px;
    }

    @media screen and (max-height: 620px) {
      opacity: 0;
    }
  }
  h2 {
    opacity: 0.8;
    max-width: 200px;
    background: #00ff00;
    background: -webkit-linear-gradient(to left, #00ff00 0%, #00ffff 81%);
    background: -moz-linear-gradient(to left, #00ff00 0%, #00ffff 81%);
    background: linear-gradient(to left, #00ff00 0%, #00ffff 81%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 12px;
    transition: all 0.7s ease-in-out;

    @media screen and (max-height: 670px) {
      display: none;
    }
  }
  h4 {
    @media screen and (max-width: 340px) {
      display: none;
    }
  }
  h5 {
    transition: all 0.7s ease-in-out;
  }

  form {
    span {
      transition: all 0.4s ease-in-out;
      @media screen and (max-width: 750px) {
        transform: scale(0.9);
      }
    }
    transition: all 0.7s ease-in-out;
    @media screen and (max-height: 650px) {
      margin-top: 40px;
    }
    margin-top: 100px;

    font-size: 23px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
      outline: none;
      transition: all 0.7s ease-in-out;
      border: 1px solid grey;
      color: lightgrey;
      background: rgba(0, 0, 0, 0.9);
      font-size: 19px;
      height: 45px;
      width: 230px;
      @media screen and (max-width: 950px) {
        transform: scale(0.9);
      }
    }
  }
  background: rgba(0, 0, 0, 0.9);
  font-family: "Poppins", sans-serif;
  border-radius: 20px;
  button {
    position: absolute;
    right: 15px;
    top: 13px;
    font-size: 17px;
    color: lightgrey;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 60%;
  @media screen and (max-width: 1500px) {
    width: 25%;
  }
  @media screen and (max-width: 1500px) {
    width: 26%;
  }
  @media screen and (max-width: 1100px) {
    width: 32%;
  }
  @media screen and (max-width: 900px) {
    width: 40%;
  }
  @media screen and (max-width: 650px) {
    width: 80%;
    height: 70%;
  }

  z-index: 9;
`;
const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
`;
export default Login;
