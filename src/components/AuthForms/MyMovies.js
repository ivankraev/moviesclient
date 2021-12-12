import React from 'react'
import styled from 'styled-components'
import './Profile.css'
import { useState, useContext } from 'react'
import { useMyMoviesFetch } from '../../MovieService'
import { MovieLink } from '../../Contexts/MovieLink'
import { Link } from "react-router-dom";
import { baseUrl } from '../../api'
export default function MyMovies({ isMovies }) {
  const { setLink, setId } = useContext(MovieLink);
  const [myMovies, setMyMovies] = useState(false)
  useMyMoviesFetch(setMyMovies)
  const deleteHandler = (movie) => {
    fetch(`${baseUrl}/movies/${movie._id}/delete`, {
      method: "DELETE",
      headers: {
        ownerid: movie.ownerId,
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
      .then((res) => window.location.reload())
      .catch((err) => {
        console.log(err);
        return;
      });

  };
  return (
    <Movies
      className="moviescontainer"
      style={{
        transform: isMovies ? '' : 'translateY(-700px)',
        opacity: isMovies ? '1' : '0',
      }}
    >
      {myMovies && myMovies.length > 0 ? (
        myMovies.map((movie) => (
          <section key={movie._id}>
            <div className='cardholder'>
              <img className="cardimg" src={movie.imageUrl} alt="" />
              <div className="moviebuttons">
                <Link to={'/movies/' + movie._id}> <button onClick={() => { setLink('/movies/' + movie._id); setId(movie._id) }} className="profileeditmovie">Details</button></Link>
                <button onClick={() => deleteHandler(movie)} className="profiledeletemovie">Delete</button>
              </div>
            </div>
          </section>
        ))
      ) : (
        <h1 style={{ color: 'lightgrey', opacity: '0.8', fontSize: '25px', marginTop: '20px',width:'100%',textAlign:'center' }}>Empty</h1>
      )}
    </Movies>
  )
}

const Movies = styled.div`

  transition: all 0.4s ease-in-out;
  position: absolute;
  top: 0;
  ::-webkit-scrollbar {
    width: 13px;
  }
  ::-webkit-scrollbar-track {
    background: #636363;
    border-radius: 0px 10px 10px 0;
  }
  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 0px 10px 10px 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #3b3b3b;
  }
`
