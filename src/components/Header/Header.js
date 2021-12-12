import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../Contexts/SearchContext";
import { useNavigate, useLocation } from "react-router";
import { baseUrl } from "../../api";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  let isDark = theme === "dark" ? true : theme === "light" ? false : true;
  const { search, setSearch, setSearchMovies, setAreSearchMoviesLoading, setIsRandom } =
    useContext(SearchContext);

  const searchHandler = (event) => {
    let newValue = event.target.value.trim().toLowerCase();
    if (newValue !== '' && newValue.length > search) {

      setIsRandom(false)
    }
    if (location.pathname !== '/') {
      navigate('/')
    }
    setSearch(newValue);
    setAreSearchMoviesLoading(true);
  };
  useEffect(() => {
    if (search !== '') {
      fetch(`${baseUrl}/movies/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({ search }),
      })
        .then((res) => res.json())
        .then((res) => {
          setSearchMovies(res);
          setAreSearchMoviesLoading(false);
        })
        .catch((err) => console.log(err));
    }

  }, [search]);

  return (
    <Container style={{ background: isDark ? "black" : "#a6a6a6" }}>
      <Logo>
        <a href="/">
          <img src="./img/redlogo.png" alt="logo" />
        </a>
      </Logo>
      <Menu>
        <p>
          {" "}
          <Link to="/" style={{ color: isDark ? "" : "black" }}>
            <span>Home</span>
          </Link>
        </p>
        <p>
          {" "}
          <Link to="/movies" style={{ color: isDark ? "" : "black" }}>
            Movies
          </Link>
        </p>
        <p>
          {" "}
          <Link to="/movies/series" style={{ color: isDark ? "" : "black" }}>
            Series
          </Link>
        </p>
        <p>
          {" "}
          <Link to="/movies/trends" style={{ color: isDark ? "" : "black" }}>
            Trends
          </Link>
        </p>
        <p>
          {" "}
          <Link to="/playlist" style={{ color: isDark ? "" : "black" }}>
            Playlist
          </Link>
        </p>
      </Menu>
      <Searchbar>
        <input
          onChange={searchHandler}
          type="search"
          placeholder=" search"
          style={{ border: isDark ? "" : "1px solid black", color: "black" }}
        ></input>
      </Searchbar>

      <Profile />
    </Container>
  );
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
`;

const Menu = styled.div`
  transition: all 0.4s ease-in-out;
  @media screen and (max-width: 720px) {
    margin-left: 70px;
  }
  @media screen and (max-width: 625px) {
    margin-left: 60px;
  }
  @media screen and (max-width: 580px) {
    display: none;
  }
  margin-left: 5%;
  display: flex;
  align-items: center;
  p {
    font-weight: 600;
    letter-spacing:0.6px;
    a {
      font-family: "Poppins", sans-serif;
      color: lightgrey;
      margin: 15px;
      span {
        font-weight: 600;
      }
    }
  }
  flex: 3;
`;
const Logo = styled.div`
  @media screen and (max-width: 1000px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 720px) {
    display: none;
  }
  @media screen and (max-width: 580px) {
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
`;
const Searchbar = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
  align-items: center;
  width: 180px;
  display: flex;
  flex: 1.5;
  input {
    padding: 3px;
    outline: none;
    border: none;
    height: 23px;
    font-size: 15px;
    width: 150px;
    background-color: lightgrey;
  }
`;

export default Header;
