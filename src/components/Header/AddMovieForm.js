import React from "react";
import "./Menu.css";
import "./AddMovie.css";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { moviePost } from "../../MovieService";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import { LoginContext } from "../../Contexts/LoginContext";
export default function AddMovieForm({
  isDark,
  isMovieFormOpen,
  setIsMovieFormOpen,
  isOpen,
  setIsEmailFormOpen,
}) {
  const { error, setErrorFunc, isLoading, setIsLoadingFunc } =
    useContext(LoginContext);
  const firstbar = css`
    transition: none;
    position: absolute;
    opacity: 1;
    top: -1px;
    width: 100%;
    opacity: ${isLoading};
  `;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!isOpen || !isMovieFormOpen) {
      setIsMovieFormOpen(false);
      const form = document.getElementById("form");
      form.reset();
    }
  });
  const submitMovieHandler = (e) => {
    e.preventDefault();
    moviePost(e, setErrorFunc, setData, setIsLoadingFunc);
  };

  if (error) {
    setTimeout(() => {
      setErrorFunc(false);
    }, 3000);
  }
  if (error === "Added succesfully") {
    setTimeout(() => {
      setIsMovieFormOpen(false);
    }, 800);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <div
      className="movieformcontainer"
      style={{
        transform: isMovieFormOpen ? "translateY(0px)" : "",
        opacity: isMovieFormOpen ? "1" : "",
        overflow: "hidden",
        background: isDark ? "" : "#d6d6d6",
        boxShadow: !isDark ? " 1px 1px 8px 1px rgb(0, 0, 0)" : "",
      }}
    >
      <BarLoader
        css={firstbar}
        size={25}
        color={isDark ? "white" : "#c024cf"}
        loading={true}
      />
      <ul className="formholder">
        <form
          onSubmit={submitMovieHandler}
          id="form"
          action=""
          className="addmovieform"
        >
          <h2
            className="secondarytext2"
            style={{ color: isDark ? "" : "#0a0a0a" }}
          >
            Add movie
          </h2>
          <h2 className={isDark ? "secondarytext1" : "secondarytext1light"}>
            Add your favourite movie to the collection
          </h2>
          <input
            style={{
              background: isDark ? "" : "#f2f2f2",
              color: isDark ? "" : "#292929",
            }}
            maxLength="40"
            id="title"
            type="text"
            placeholder="Title"
            name="title"
          />
          <textarea
            style={{
              background: isDark ? "" : "#f2f2f2",
              color: isDark ? "" : "#292929",
            }}
            name="description"
            maxLength="230"
            className="textarea"
            placeholder="Description"
          />
          <select
            id="options"
            name="isSeries"
            style={{
              background: isDark ? "" : "#f2f2f2",
              color: isDark ? "" : "#292929",
            }}
          >
            <option value="Movie">Movies</option>
            <option value="Series">Series</option>
          </select>
          <input
            style={{
              background: isDark ? "" : "#f2f2f2",
              color: isDark ? "" : "#292929",
            }}
            id="imageUrl"
            type="text"
            name="imageUrl"
            placeholder="Image url"
          />
          <span
            className="error"
            style={{
              transition: "all 0.3s ease-in-out",
              color: error === "Added succesfully" ? "green" : "red",
              opacity: error ? "" : "0",
            }}
          >
            {error ? error : ""}
          </span>
          <div id="buttonsholder" className="buttonsholder">
            <button
              className="submitbutton"
              style={{
                opacity: isLoading === 0 ? "" : "0.6",
                cursor: isLoading === 0 ? "" : "auto",
              }}
            >
              Add
            </button>
          </div>
        </form>
      </ul>
      <div
        id="exitbuttons"
        style={{ color: isDark ? "" : "#0a0a0a" }}
        onClick={() => {
          setIsMovieFormOpen(false);
        }}
      >
        <MdKeyboardArrowUp />
      </div>
      <span
        onClick={() => {
          setIsMovieFormOpen(false);
          setIsEmailFormOpen(true);
        }}
        style={{
          color: "white",
          position: "absolute",
          fontSize: "12px",
          bottom: "25px",
          cursor: "pointer",
          color: isDark ? "white" : "black",
          fontWeight: "bold",
          opacity: "0.8",
        }}
      >
        Do you have any suggestions?
      </span>
    </div>
  );
}
