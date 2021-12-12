import React from 'react'
import './Menu.css'
import AddMovieForm from './AddMovieForm'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { useContext, useState, useEffect } from 'react'
import { MdOutlineFeedback, MdArrowBackIos } from 'react-icons/md'
import { RiLogoutBoxRLine, RiAddCircleFill } from 'react-icons/ri'
import { GiFlexibleLamp } from 'react-icons/gi'
import { css } from "@emotion/react";
import { LoginContext } from '../../Contexts/LoginContext'
import BarLoader from "react-spinners/BarLoader";
import { baseUrl } from '../../api'
function Menu({ isOpen, logout }) {
  const { error, setErrorFunc, isLoading, setIsLoadingFunc } =
    useContext(LoginContext);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false)
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false)
  const { theme, toggleOn } = useContext(ThemeContext)
  const firstbar = css`
  transition: none;
  position: absolute;
  top: -1px;
  width: 100%;
  opacity: ${isLoading};
`;
  if (!isEmailFormOpen) {
    setErrorFunc(false)
  }
  if (!isOpen && isEmailFormOpen) {
    setIsEmailFormOpen(false)
  }
  useEffect(() => {
    const form = document.getElementById('feedbackform')
    !isEmailFormOpen && form.reset()
  })
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true

  const emailSendHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const message = formData.get('message')
    if (email === "" || message === "") {
      return setErrorFunc('All fields are required!')
    }
    setIsLoadingFunc(1)
    fetch(`${baseUrl}/api/users/sendemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message })
    })
      .then(res => res.json())
      .then(res => {
        setErrorFunc('Sent')
        setTimeout(() => {
          setIsEmailFormOpen(false)
          setIsLoadingFunc(0)
        }, 800);


      })
      .catch(err => {
        setErrorFunc('Attempt failed...')
        setIsLoadingFunc(0)
      })
  }

  return (
    <div
      className={isDark ? 'container' : 'containerlight'}
      style={{ display: isOpen ? '' : 'none' }}
    >
      <ul
        className="menuholder"
        style={{
          background: isDark ? '' : '#d6d6d6',
          boxShadow: !isDark ? ' 1px 1px 8px 1px rgb(0, 0, 0)' : '',
          overflow: isMovieFormOpen ? '' : 'hidden',
        }}
      >
        <div
          style={{
            opacity: isMovieFormOpen ? '0' : '1',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Link to="/profile">
            <li className={isEmailFormOpen ? 'outro' : ''}>
              <img className="img" src={JSON.parse(localStorage.getItem('user')).profilePic !== "" ?
                JSON.parse(localStorage.getItem('user')).profilePic : "img/user2.png"
              } alt="" />
              <div className="textholder">
                <span className={isDark ? 'primarytext' : 'primarytextlight'}>
                  {JSON.parse(localStorage.getItem('user')).name &&
                    JSON.parse(localStorage.getItem('user')).name !== ''
                    ? JSON.parse(localStorage.getItem('user'))?.name
                    : JSON.parse(localStorage.getItem('user'))?.username}
                </span>
                <span className={isDark ? 'secondarytext' : 'secondarylight'}>
                  Check your profile
                </span>
              </div>
            </li>
          </Link>
          <div
            className={isEmailFormOpen ? 'outro' : ''}
            style={{
              display: 'flex',
              justifyContent: 'center',
              transition: ' all 0.3s ease-in-out',
            }}
          >
            <hr
              style={{
                height: isDark ? '2px' : '1px',
                border: 'none',
                color: 'white',
                background: '#333',
                marginTop: '5px',
                width: '95%',
                marginBottom: '5px',
              }}
            />
          </div>
          <li
            className={
              isEmailFormOpen ? 'feedbackholder outro' : 'feedbackholder'
            }
            onClick={() => {
              setIsEmailFormOpen(true)
            }}
          >
            <MdOutlineFeedback
              className={
                isDark ? 'primarytext feedback' : 'primarytextlight feedback'
              }
            />
            <div className="textholder">
              <span className={isDark ? 'primarytext' : 'primarytextlight'}>
                Send me your feedback
              </span>
              <span
                style={{ fontSize: '12px' }}
                className={isDark ? 'secondarytext' : 'secondarylight'}
              >
                Tell me your opinion about the site.
              </span>
            </div>
          </li>
          <div
            className={isEmailFormOpen ? 'outro' : ''}
            style={{
              display: 'flex',
              justifyContent: 'center',
              transition: ' all 0.3s ease-in-out',
            }}
          >
            <hr
              style={{
                height: isDark ? '2px' : '1px',
                border: 'none',
                color: 'white',
                background: '#333',
                marginTop: '5px',
                width: '95%',
                marginBottom: '5px',
              }}
            />
          </div>
          <li
            onClick={() => {
              setIsMovieFormOpen(true)
            }}
            className={isEmailFormOpen ? 'outro' : ''}
          >
            <RiAddCircleFill
              className={
                isDark ? 'primarytext feedback' : 'primarytextlight feedback'
              }
            />
            <span
              className={
                isDark ? 'primarytext logout' : 'primarytextlight logout'
              }
            >
              Add movie
            </span>
          </li>
          <li onClick={toggleOn} className={isEmailFormOpen ? 'outro' : ''}>
            <GiFlexibleLamp
              className={
                isDark ? 'primarytext feedback' : 'primarytextlight feedback'
              }
            />
            <span
              className={
                isDark ? 'primarytext logout' : 'primarytextlight logout'
              }
            >
              Switch theme
            </span>
          </li>
          <li onClick={logout} className={isEmailFormOpen ? 'outro' : ''}>
            <RiLogoutBoxRLine
              className={
                isDark ? 'primarytext feedback' : 'primarytextlight feedback'
              }
            />
            <span
              className={
                isDark ? 'primarytext logout' : 'primarytextlight logout'
              }
            >
              Sign out
            </span>
          </li>
          <div
            className={
              isEmailFormOpen
                ? 'secondarymenucontainerentry'
                : 'secondarymenucontainer'
            }
            style={{
              background: isDark ? '' : '#d6d6d6',
              boxShadow: !isDark ? ' 1px 1px 8px 1px rgb(0, 0, 0)' : '',
              display: isMovieFormOpen ? 'none' : '',
            }}
          >
            <BarLoader
              css={firstbar}
              size={25}
              color={isDark ? "white" : "#c024cf"}
              loading={true}
            />
            <ul>
              <form id="feedbackform" onSubmit={emailSendHandler} className="emailform">
                <h2 className={isDark ? 'primarytext' : 'primarytextlight'}>
                  Send your feedback
                </h2>
                <input
                  maxLength="40"
                  id="email"
                  type="email"
                  name='email'
                  placeholder="Please enter your email"
                  style={{
                    background: isDark ? '' : '#f2f2f2',
                    color: isDark ? '' : '#292929',
                  }}
                />

                <textarea
                  name='message'
                  maxLength="100"
                  id="textarea"
                  placeholder="Maximum 100 characters"
                  style={{
                    background: isDark ? '' : '#f2f2f2',
                    color: isDark ? '' : '#292929',
                  }}
                ></textarea>
                <span className={error === 'Sent' ? 'emailerrorgreen' : 'emailerrorred'} style={{ opacity: !error ? '0' : '' }} >{error}</span>
                <button
                  id="submitbutton"
                  style={{ border: isDark ? '' : 'none' }}
                >
                  Send
                </button>
                <div
                  onClick={() => {
                    setIsEmailFormOpen(false)
                  }}
                  className={isDark ? 'backbutton' : 'backbutton hoverbutton'}
                >
                  <MdArrowBackIos
                    style={{
                      marginLeft: '5px',
                      color: isDark ? '' : '#0a0a0a',
                    }}
                  />
                </div>
              </form>
            </ul>
          </div>
        </div>
        <AddMovieForm
          isDark={isDark}
          isMovieFormOpen={isMovieFormOpen}
          setIsMovieFormOpen={setIsMovieFormOpen}
          isOpen={isOpen}
          setIsEmailFormOpen={setIsEmailFormOpen}
        />
      </ul>
    </div>
  )
}
export default Menu
