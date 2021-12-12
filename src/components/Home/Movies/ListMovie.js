import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieLink } from "../../../Contexts/MovieLink";
function ListMovie({ movie }) {
  const { setLink, setId } = useContext(MovieLink);
  const movielinkstring = '/movies/' + movie?._id;
  const detailsHandler = () => {
    setLink(movielinkstring);
    setId(movie?._id);
  }
  return (
    <Content>
      <img src={movie?.imageUrl} alt="" />
      <span>{movie?.title}</span>
      <p>
        {movie?.description}
      </p>
      <Link to={movielinkstring}> <button onClick={detailsHandler}>Details</button></Link>
    </Content>
  );
}
const Content = styled.div`
  z-index: 7;
  color: white;
  margin-right: 20px;
  position: relative;
  img {
    transition: all 0.4s ease-in-out;
    width: 270px;
    height: 200px;
    object-fit:cover;
    border-radius: 20px;
  }
  span {
    overflow: hidden;
    max-width: 270px;
    max-height: 33px;
    letter-spacing: 0.1em;
    border-radius: 8px;
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.2),
    12px 12px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #333;
    padding: 2px 10px;
    font-size: 23px;
    font-weight: bold;
    position: absolute;
    top: 8%;
    left: 50px;
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }
  p {
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.2),
    12px 12px 20px 0 rgba(0, 0, 0, 0.19);
    font-family: "Roboto", sans-serif;
    border-radius: 8px;
    background-color: #333;
    padding: 9px 10px;
    line-height: 1.2em;
    letter-spacing: 0.1em;
    text-align: left;
    font-size: 14px;
    position: absolute;
    top: 30%;
    left: 50px;
    width: 230px;
    opacity: 0;
    transition: all 0.4s ease-in-out;
    max-height: 76px;
    overflow-x: hidden;
    overflow-y:scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #888; 
      border-radius: 10px;
      
    }
    ::-webkit-scrollbar-thumb {
      background: #f1f1f1; 
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: lightgrey; 
    }
    
  }
  button {
    padding: 10px;
    background-color: #4dbf00;
    color: #dbdbdb;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    left: 50px;
    opacity: 0;
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.2),
    12px 12px 20px 0 rgba(0, 0, 0, 0.19);
    font-weight:bold;
  }
  &:hover span,
  &:hover p {
    opacity: 0.9;
  }
  
  &:hover button{
    opacity:1;
  }
  &:hover img {
    transform: scale(1.2);
    margin: 0 30px;
    opacity: 0.9;
    box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.2),
    12px 12px 20px 0 rgba(0, 0, 0, 0.19);

  }
`;
export default ListMovie;
