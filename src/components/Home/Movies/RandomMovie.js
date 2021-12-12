import React, { useEffect } from "react";
import styled from "styled-components";
import RandomLoadingMovie from './RandomLoadingMovie'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../../Contexts/SearchContext";
import { MovieLink } from "../../../Contexts/MovieLink";
import { baseUrl } from "../../../api";
import { Transition } from 'react-transition-group'
const defaultStyle = {
    transition: `opacity ${600}ms ease-in-out`,
    transition: `transform ${100}ms ease-in-out`,
}
const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transform: 'translateX(-400px)' },
    exited: { opacity: 1, transform: 'translateX(0px)' },
};

function RandomMovie() {
    const [something, setSomething] = useState(false)
    const [step, setStep] = useState(1);
    const { randomMovie, randomMovieLoading, isRandom, setIsRandom, setRandomMovieLoading, setRandomMovie } = useContext(SearchContext);
    let movie;
    if (randomMovie) {
        movie = randomMovie[0]
    }
    const { setLink, setId } = useContext(MovieLink);
    const movielinkstring = '/movies/' + movie?._id;
    const detailsHandler = () => {
        setLink(movielinkstring);
        setId(movie._id);
    }
    const date = movie?.updatedAt.slice(0, 10).split('-').reverse().join('.');
    useEffect(() => {
        if (isRandom || step === 1) {
            fetch(`${baseUrl}/movies/random`)
                .then((res) => res.json())
                .then((res) => {
                    setRandomMovie(res);
                    setRandomMovieLoading(false)
                    setSomething(false)
                })
                .catch((err) => {
                    console.log(err);
                });

        }
        return () => {
            setRandomMovieLoading(true)
        }
    }, [step])

    const RandomMovieHandler = () => {
        setIsRandom(true)
        setStep(prevstate => prevstate + 1)
    }

    return (
        <div className="randomholder" >
            <h3
                style={{
                    textShadow: "none",
                    color: "lightgrey",
                    fontFamily: "Josefin Sans, sans-serif",
                    letterSpacing: "0.7px",
                    fontWeight: "bold",
                    width: '920px',
                    padding: '0 0 40px 0',
                    fontSize: '25px'
                }} >Random movie:
                <hr
                    style={{
                        height: "1px",
                        border: "none",
                        color: "grey",
                        background: "grey",
                        marginTop: "10px",
                        width: "100%",

                    }} />
            </h3>
            {randomMovieLoading ?
                <RandomLoadingMovie />
                :
                <Content>
                    <img src={movie?.imageUrl} alt="" />
                    <Transition
                        in={something}
                        timeout={0}
                    >
                        {exiting => (<div className='randommovieinfoholder' style={{
                            ...defaultStyle,
                            ...transitionStyles[exiting]
                        }}>
                            <span className='randomtitle'>{movie?.title}</span>
                            <p className='randodmescription'>
                                {movie?.description}
                            </p>
                            <hr
                                style={{
                                    height: "2px",
                                    border: "none",
                                    color: "white",
                                    background: "grey",
                                    width: "100%",
                                    marginBottom: "5px",
                                    marginTop: "25px",

                                }} />
                            <p className='randodmescription' style={{ marginTop: '10px' }}>
                                Last updated: {date}
                            </p>
                            <div style={{ dispaly: 'flex' }}>
                                <Link to={movielinkstring}> <button className='detailsbutton4' onClick={detailsHandler}>Details</button></Link>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClick={() => {
                                        RandomMovieHandler();
                                        setSomething(prevstate => !prevstate)
                                    }} className='nextbutton'>Next</button>
                                    <button onClick={() => { setIsRandom(false) }} className='nextbutton' style={{ background: '#d6251a' }}>Close</button>
                                </div>
                            </div>
                        </div>
                        )}
                    </Transition>
                </Content>

            }
        </div>
    );
}
const Content = styled.div`
  z-index: 7;
  color: white;
  position: relative;
  width:950px;
  height:240px;
  display:flex;
  img {
    transition: all 0.4s ease-in-out;
    position:absolute;
    object-fit:cover;
    border-radius: 20px;
    width:350px;
    height:240px;
    z-index:1;
  }



  

   img:hover {
    transform: scale(1.2);
    margin: 0 30px;
    box-shadow: 5px 2px 50px 2px grey;

  }
`;
export default RandomMovie;