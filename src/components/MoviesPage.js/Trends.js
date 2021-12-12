import React from 'react'
import './MoviesPage.css'
import { useContext } from 'react'

import { MovieLink } from '../../Contexts/MovieLink'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RingLoader } from 'react-spinners'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { useQuery } from 'react-query'
import { baseUrl } from '../../api'

function TrendsPage() {
  const { setLink, setId } = useContext(MovieLink)
  const { theme } = useContext(ThemeContext);
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true;
  const fetchMovies = async () => {
    let result = await fetch(`${baseUrl}/movies/all/movies/pure`);
    const res = await result.json();
    res.sort((a, b) => b.likes.length - a.likes.length)
    return res
  }

  let ref = document.querySelector('body').scrollWidth
  let moviesOnClientScreen = (ref - 100) / 300;
  let moviesLimit = Math.floor(moviesOnClientScreen) * 2;
  if (moviesLimit < 1) {
    moviesLimit = 1;
  }
  const { isLoading, data, isFetching } = useQuery(['movies'], () => fetchMovies(), {
    keepPreviousData: true,
    cacheTime: 10000,
  })
  return (
    <div className="moviespagecontainer">
      {
        isFetching ? <div className='fetchoverlay'> <RingLoader size={200} color={'lightgrey'} speedMultiplier={1.5} /></div>
          : ''
      }
      {isLoading ? (
        <div className='fetchoverlay'> <RingLoader size={200} color={'lightgrey'} speedMultiplier={1.5} /></div>
      ) : (
        <div className="moviespageholdertrends" style={{ boxShadow: isDark ? '' : 'none' }}>
          <h1 className="trendspageheader">#highest rated</h1>
          <MoviesContainer className="paginationandmovies">
            {data &&
              data.slice(0, moviesLimit).map((movie) => (
                <section key={movie._id} style={{ marginLeft: '50px' }}>
                  <div className="cardholder">
                    <img
                      style={{ width: '250px', height: '300px' }}
                      className="cardimg"
                      src={movie.imageUrl}
                      alt=""
                    />
                    <div
                      className="moviebuttons"
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <Link to={'/movies/' + movie._id}>
                        {' '}
                        <button
                          onClick={() => {
                            setLink('/movies/' + movie._id)
                            setId(movie._id)
                          }}
                          className="detailsbuttonn"
                          style={{ marginLeft: '10px' }}
                        >
                          Details
                        </button>

                      </Link>

                    </div>
                  </div>
                </section>
              ))}
          </MoviesContainer>

        </div>
      )}
    </div>
  )
}

const MoviesContainer = styled.div`
  ::-webkit-scrollbar {
    width: 13px;
  }
  ::-webkit-scrollbar-track {
    background: #141414;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(40, 40, 40);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2b2b2b;
  }
`
export default TrendsPage