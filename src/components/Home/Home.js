import styled from 'styled-components'
import Featured from './Featured'
import FeaturedLoading from './Movies/FeaturedLoading'
import RecentlyAdded from './Movies/recentlyAdded'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { baseUrl } from '../../api'
import { SearchContext } from '../../Contexts/SearchContext'
import Movies from './Movies/Movies.js'
import Series from './Movies/Series.js'
import './Home.css'
import RandomMovie from './Movies/RandomMovie'
import SearchMoviesSlider from './Movies/SearchMovies'

function Home() {
  const {
    searchMovies,
    search,
    isRandom,
    isFeaturedLoading,
    featuredMovie,
    setFeaturedMovie,
    setIsFeaturedLoading,
  } = useContext(SearchContext)
  const { theme } = useContext(ThemeContext)
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true
  let movieNotFound = search !== '' && searchMovies.length === 0
  let isNotSearching = searchMovies.length === 0 || search === ''
  useEffect(() => {
    if (!featuredMovie) {
      fetch(`${baseUrl}/movies/randomposter`)
        .then((res) => res.json())
        .then((res) => {
          setFeaturedMovie(res[0])
          setIsFeaturedLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [featuredMovie])
  return (
    <Container style={{ background: isDark ? '' : '#383838' }}>

      {isFeaturedLoading ? <FeaturedLoading /> : <Featured />}

      <div className={isDark ? 'cool' : 'coollight'}>
        {isRandom ? (
          <div className="randomholder" style={{ marginTop: '0' }}>
            <RandomMovie />
          </div>
        ) : null}
        {movieNotFound ? (
          <h1
            style={{
              textShadow: 'none',
              color: 'white',
              fontFamily: 'Josefin Sans, sans-serif',
              letterSpacing: '0.7px',
              fontWeight: 'bold',
            }}
          >
            Search result: 0 matches found.
            <hr
              style={{
                height: isDark ? '2px' : '1px',
                border: 'none',
                color: 'red',
                background: 'red',
                marginTop: '10px',
                width: '100%',
              }}
            />
          </h1>
        ) : !isNotSearching ? (
          <SearchMoviesSlider />
        ) : null}

        <RecentlyAdded />
        <Movies />
        <Series />
        <div style={{ height: '150px' }}></div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  transition: all 0.8s ease-in-out;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #141414;
  }
  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2b2b2b;
  }
  h1 {
    max-height: 98px;
    text-shadow: 2px 2px rgb(77, 177, 77);
    text-align: left;
    transition: all 0.8s ease-in-out;

    @media screen and (max-height: 720px) {
      opacity: 0.7;
    }
    @media screen and (max-width: 450px) {
      padding: 0px;
      margin-bottom: 30px;
      margin-top: 30px;
    }

    @media screen and (max-width: 850px) {
      text-align: center;
    }
    margin-left: 80px;
    color: #f0f0f0;
    font-family: 'Poppins', sans-serif;
    padding: 30px;
    opacity: 0.8;
    letter-spacing: 3.5px;
    font-size: 25px;
  }
`

export default Home
