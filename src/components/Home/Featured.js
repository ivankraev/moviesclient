import React from 'react'
import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { SearchContext } from '../../Contexts/SearchContext'
function Featured() {
  const [transitionIn, setTransitionIn] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)
  const { featuredMovie } = useContext(SearchContext)
  const transitionStyles = {
    entering: { transform: 'translateX(-400px)' },
    entered: { opacity: '1', transform: 'translateX(0px)' },
    exited: { opacity: '0', transform: 'translateX(-400px)' },
  }
  const transitionStylesVideo = {
    entering: { opacity: '0', transform: 'translateY(-100%)' },
    entered: { opacity: '1', transform: 'translateY(0px)' },
    exited: { opacity: '0', transform: 'translateY(-100%)' },
  }
  useEffect(() => {
    setTransitionIn(true)
  }, [])
  return (
    <Container style={{ backgroundImage: `url(${featuredMovie?.imageUrl})` }}>
      <Transition in={openVideo} timeout={0}>
        {(exiting) => (
          <div
            className="videoholder"
            style={{
              ...transitionStylesVideo[exiting],
            }}
          >
            <span
              onClick={() => {
                setOpenVideo(false)
              }}
              className="closevideo"
            >
              <MdKeyboardArrowUp className='arrowupclose' />
            </span>
            <iframe
              className="videotrailer"
              src={featuredMovie?.trailerUrl}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Transition>
      <div className="featureholder">
        <Transition in={transitionIn} timeout={0}>
          {(exiting) => (
            <div
              className="featurecontainer"
              style={{
                ...transitionStyles[exiting],
              }}
            >
              {featuredMovie.imgtitle ? (
                <img className="imgtitle" src={featuredMovie?.imgtitle} />
              ) : (
                <h3 className="featuredheader">{featuredMovie?.title}</h3>
              )}
              <p className="posterdescription">{featuredMovie?.description}</p>
              <Button>
                {featuredMovie ? (
                  <button
                    onClick={() => {
                      setOpenVideo(true)
                    }}
                  >
                    PLAY TRAILER
                  </button>
                ) : (
                  ''
                )}
              </Button>
            </div>
          )}
        </Transition>
      </div>
    </Container>
  )
}
const Container = styled.div`
box-shadow: 1px 5px 30px -10px grey;
  position: relative;
  display: flex;
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
  height: 58vh;
  @media screen and (max-width: 1200px) {
    background-size: cover;
    background-position:center;
  }
  @media screen and (max-height: 750px) {
    background-size: cover;
    background-position:center;
  }
`

const Button = styled.div`
  transition: all 1s ease-in-out;
  button {
    opacity: 0.9;
    margin-top: 20px;
    position: absolute;
    font-weight: bold;
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: 10px 10px;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    letter-spacing: 0.04em;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
    &:hover {
      filter: brightness(1.4);
      background: #575757;
    }
    @media screen and (max-width: 300px) {
      display: none;
    }
  }

  display: flex;
  @media screen and (max-width: 450px) {
    justify-content: center;
  }
  @media screen and (max-height: 620px) {
    justify-content: center;
  }
  @media screen and (max-width: 550px) {
    justify-content: center;
  }
`

export default Featured
