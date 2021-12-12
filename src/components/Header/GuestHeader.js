import React from 'react'
import styled from 'styled-components'
import GuestProfile from './GuestProfile'
import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import { SearchContext } from '../../Contexts/SearchContext'
import { baseUrl } from '../../api'
function GuestHeader() {
  const { theme } = useContext(ThemeContext)
  let isDark = theme === 'dark' ? true : theme === 'light' ? false : true
  const {
    search,
    setSearch,
    setSearchMovies,
    setAreSearchMoviesLoading,
    setIsRandom,
  } = useContext(SearchContext)
  const searchHandler = (event) => {
    let newValue = event.target.value.trim().toLowerCase()
    if (newValue !== '' && newValue.length > search) {
      setIsRandom(false)
    }
    setSearch(newValue)
    setAreSearchMoviesLoading(true)
  }
  useEffect(() => {
    if (search !== '') {
      fetch(`${baseUrl}/movies/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify({ search }),
      })
        .then((res) => res.json())
        .then((res) => {
          setSearchMovies(res)
          setAreSearchMoviesLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [search])

  return (
    <Container style={{ background: isDark ? 'black' : '#a6a6a6' }}>
      <Logo>
        <a href="/">
          <img src="./img/redlogo.png" alt="logo" />
        </a>
      </Logo>
      <Menu>
        <p>
          {' '}
          <Link to="/" style={{ color: isDark ? '' : 'black' }}>
            <span>Home</span>
          </Link>
        </p>
        <p>
          {' '}
          <Link to="/movies" style={{ color: isDark ? '' : 'black' }}>
            Movies
          </Link>
        </p>
        <p>
          {' '}
          <Link to="/movies/series" style={{ color: isDark ? '' : 'black' }}>
            Series
          </Link>
        </p>
        <p>
          {' '}
          <Link to="/movies/trends" style={{ color: isDark ? '' : 'black' }}>
            Trends
          </Link>
        </p>

      </Menu>
      <Searchbar>
        <form onChange={searchHandler}>
          <input
            style={{ border: isDark ? '' : '1px solid black', color: 'black' }}
            type="search"
            placeholder=" search"
            name="search"
          ></input>
        </form>
      </Searchbar>
      <GuestProfile />
    </Container>
  )
}

const Container = styled.div`
  transition: all 0.6s ease-in-out;
  @media screen and (max-width: 700px) {
    justify-content: space-between;
  }
  width: 100%;
  background: black;
  height: 70px;
  display: flex;
  align-items: center;
`

const Menu = styled.div`
  transition: all 0.4s ease-in-out;
  @media screen and (max-width: 720px) {
    margin-left: 70px;
  }
  @media screen and (max-width: 625px) {
    margin-left: 60px;
  }
  @media screen and (max-width: 540px) {
    display: none;
  }
  margin-left: 5%;
  display: flex;
  align-items: center;
  p {
    font-weight: 600;
    letter-spacing:0.6px;
    a {
      transition: all 0.6s ease-in-out;
      font-family: 'Poppins', sans-serif;
      color: white;
      margin: 15px;
      span {
        font-weight: 600;
      }
    }
  }
  flex: 3;
`
const Logo = styled.div`
  transition: all 0.6s ease-in-out;
  @media screen and (max-width: 1000px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 720px) {
    display: none;
  }
  @media screen and (max-width: 540px) {
    display: block;
    margin-left: 60px;
  }
  margin-left: 5%;
  width: 84px;
  a {
    flex: 1;
    img {
      width: 100%;
      filter:brightness(1.3)
      box-shadow: 1px 2px 15px 1px rgb(44, 44, 44);
    }
  }
`
const Searchbar = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
  align-items: center;
  width: 180px;
  display: flex;
  flex: 2;
  input {
    transition: all 4s ease-in-out;
    padding: 3px;
    outline: none;
    border: none;
    height: 23px;
    font-size: 15px;
    width: 150px;
    background-color: lightgrey;
  }
`

export default GuestHeader
