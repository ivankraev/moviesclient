import React from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useState, useContext } from 'react'
import { SearchContext } from '../../../Contexts/SearchContext'
import ListMovie from './ListMovie'
import { useLatestMoviesFetch } from '../../../MovieService'
import LoadingMovie from './LoadingMovie'
let counter = 0
let LAST_ADDED_MOVIES_LENGTH // get from database
export default function RecentlyAdded() {
  const { isRandom, setIsRandom } = useContext(SearchContext)
  const [areRecentMoviesLoading, setAreRecentMoviesLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  useLatestMoviesFetch(setAreRecentMoviesLoading, setMovies, setError)

  LAST_ADDED_MOVIES_LENGTH = movies.length
  let ref = document.querySelector('body').scrollWidth
  let moviesOnClientScreen = (ref - 50) / 270
  const [translate, setTranslate] = useState(0)
  const arrowHandler = () => {
    counter += 1
    setTranslate((prevstate) => prevstate + 300)
    if (
      counter >
      LAST_ADDED_MOVIES_LENGTH - Math.ceil(moviesOnClientScreen - 1)
    ) {
      counter = 0
      setTranslate(0)
    }
  }

  const leftArrowHandler = () => {
    setTranslate((prevstate) => prevstate - 300)
    translate <= 0 && setTranslate(0)
    counter--
    if (counter < 0) counter = 0
  }

  return (
    <div>
      <div className="uploadcontainer">
        <h1 style={{ padding: '20px 0px 30px 30px' }}>Latest Uploads</h1>
        {!isRandom ? (
          <button
            onClick={() => {
              setIsRandom(true)
            }}
            className="randombutton"
          >
            Pick one
          </button>
        ) : (
          ''
        )}
      </div>
      {areRecentMoviesLoading ? (
        <Container>
          <LoadingMovie />
          <LoadingMovie />
          <LoadingMovie />
          <LoadingMovie />
          <LoadingMovie />
          <LoadingMovie />
          <LoadingMovie />
        </Container>
      ) : (
        <List>
          <div
            style={{
              transform: `translateX(-${translate}px)`,
              transition: 'all 0.4s ease-in-out',
            }}
          >
            <Container>
              {error ? (
                <h1
                  style={{
                    color: error ? 'red' : '',
                    textShadow: error ? 'none' : '',
                    fontSize: '22px',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                  }}
                >
                  {error}
                </h1>
              ) : (
                movies.map((movie) => (
                  <ListMovie key={movie?._id} movie={movie} />
                ))
              )}
            </Container>
          </div>
          {movies.length === 0 ? (
            ''
          ) : (
            <>
              <i onClick={arrowHandler}>
                <MdKeyboardArrowRight />
              </i>
              <div>
                <i
                  onClick={leftArrowHandler}
                  style={{ left: 50, width: '100px' }}
                >
                  <MdKeyboardArrowLeft />
                </i>
              </div>
            </>
          )}
        </List>
      )}
    </div>
  )
}

const Container = styled.div`
  @media screen and (max-width: 414px) {
    margin-left: 80px;
  }
  @media screen and (max-width: 1400px) {
    margin-left: 80px;
  }

  position: relative;
  margin-left: 5.8%;
  display: flex;
`
const List = styled.div`
  &:hover {
    opacity: 1;
  }
  transition: all 0.8s ease-in-out;
  z-index: 3;
  position: relative;

  i {
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 720px) {
      font-size: 70px;
      margin-top: 30px;
    }
    position: absolute;
    font-size: 120px;

    top: 40px;
    bottom: 40px;
    right: 0;
    opacity: 0.5;
    color: lightgrey;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`
