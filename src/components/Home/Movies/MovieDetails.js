import { useSingleMovieFetch } from '../../../MovieService'
import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { CgClose, CgNpm } from 'react-icons/cg'
import { FcLikePlaceholder } from 'react-icons/fc'
import { FcLike } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { MovieLink } from '../../../Contexts/MovieLink'
import { useQuery } from 'react-query'
import { baseUrl } from '../../../api'
import styled from 'styled-components'
import LoadingMovieDetails from './LoadingMovieDetails'
import moment from 'moment'
import './MovieDetails.css'
import './Comments.css'
function MovieDetails() {
  const [movie, setMovie] = useState()
  const [allUsers, setAllUsers] = useState([]);
  const [fakeFetch, setFakeFetch] = useState()
  const [areMovieDetailsLoading, setAreMovieDetailsLoading] = useState(true)
  const [creator, setCreator] = useState()
  const [movieComments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const { id } = useContext(MovieLink)
  const navigate = useNavigate()
  useSingleMovieFetch(id, setMovie)
  const commentref = useRef()
  const bottomofthepage = useRef()

  //FAKE FETCH WITH REFRESH PURPOSES
  const fakeFetchFunc = () => {
    if (movie) {
      fetch(`${baseUrl}/movies/${movie?._id}`)
        .then((res) => res.json())
        .then((res) => setFakeFetch(res))
    }

  }
  const { } = useQuery(['fakeFetch'], fakeFetchFunc, {
    refetchInterval: 50000,
  })

  // POST NEW COMMENT
  const submitCommentHandler = () => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      alert('Please sign in to post a comment.')
      return
    }
    const comment = commentref.current.value
    if (comment === '') {
      return
    }
    commentref.current.value = ''
    const userId = JSON.parse(localStorage.getItem('user'))._id
    const author =
      JSON.parse(localStorage.getItem('user')).name ||
      JSON.parse(localStorage.getItem('user')).username
    fetch(`${baseUrl}/movies/addcomment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, author, id, userId }),
    })
      .then((res) => res.json())
      .then((res) => {
        setComments(res.comments)
        bottomofthepage.current.scrollIntoView({ behavior: 'smooth' })
      })
  }

  //LOAD MOVIE  DETAILS
  useEffect(() => {
    if (movie) {
      fetch(`${baseUrl}/api/users/find/${movie.ownerId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.name !== '') {
            setCreator(res.name)
          } else {
            setCreator(res.username)
          }
          setAreMovieDetailsLoading(false)
          setComments(movie.comments)
          setLikes(movie.likes)
        })
        .catch((err) => console.log(err))
    }
  }, [movie])

  // DELETE MOVIE
  const deleteMovieHandler = () => {
    fetch(`${baseUrl}/movies/${movie._id}/delete`, {
      method: 'DELETE',
      headers: {
        ownerid: movie.ownerId,
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
      .then((res) => navigate('/'))
      .catch((err) => {
        console.log(err)
        return
      })
  }
  const removeCommentHandler = (commentId) => {
    fetch(
      `${baseUrl}/movies/${movie._id}/removecomment/${commentId}`,
      {
        method: 'DELETE',
      },
    )
      .then((res) => res.json())
      .then((res) => setComments(res.comments))
      .catch((err) => console.log(err))
  }

  //LIKE USER COMMENT
  const likeCommentHandler = (comment) => {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      alert('you have to sign in first...')
      return
    }
    const username = JSON.parse(localStorage.getItem('user')).username
    if (comment.likes?.includes(username)) {
      fetch(
        `${baseUrl}/movies/${movie._id}/unlike/${username}/${comment.id}`,
        {
          method: 'POST',
        },
      )
        .then((res) => res.json())
        .then((res) => setComments(res.comments))
        .catch((err) => console.log(err))
    } else {
      fetch(
        `${baseUrl}/movies/${movie._id}/like/${username}/${comment.id}`,
        {
          method: 'POST',
        },
      )
        .then((res) => res.json())
        .then((res) => setComments(res.comments))
        .catch((err) => console.log(err))
    }
  }

  // LIKE THE MOVIE
  const likeMovieHandler = () => {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      alert('you have to sign in first...')
      return
    }

    const username = JSON.parse(localStorage.getItem('user')).username

    if (isMovieLiked) {
      fetch(`${baseUrl}/movies/${movie._id}/dislike/${username}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => setLikes(res.likes))
        .catch((err) => console.log(err))
    } else {
      fetch(`${baseUrl}/movies/${movie._id}/like/${username}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => setLikes(res.likes))
        .catch((err) => console.log(err))
    }
  }

  //GET INFORMATION ABOUT THE USER RELATED TO THE MOVIE
  const isOwner =
    JSON.parse(localStorage.getItem('user'))?._id === movie?.ownerId &&
    JSON.parse(localStorage.getItem('user'))?._id !== undefined
  const date = movie?.createdAt.slice(0, 10).split('-').reverse().join('.')
  const userId = JSON.parse(localStorage.getItem('user'))?._id
  const username = JSON.parse(localStorage.getItem('user'))?.username
  const isMovieLiked = likes.includes(username)

  //GET RELATIVE TIME
  const getPassedTime = (timestamp) => {
    const formdate = moment(timestamp).fromNow().split(' ').slice(0, 2)
    const number = formdate[0]
    const label = formdate[1].slice(0, 2).startsWith('mi')
      ? ' min'
      : formdate[1].slice(0, 1)
    const finalformat = number + label
    return moment(timestamp).fromNow() === 'a few seconds ago'
      ? 'Just now'
      : moment(timestamp).fromNow() === 'a minute ago'
        ? '1min'
        : moment(timestamp).fromNow() === 'an hour ago'
          ? '1h'
          : finalformat
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/users`)
      .then(res => res.json())
      .then(res => setAllUsers(res))
  }, [])

  console.log()

  return (
    <main>
      <div className="container3">
        <div
          onClick={() => {
            navigate(-1)
          }}
          className="overlaydetails"
        ></div>
        {areMovieDetailsLoading ? (
          <LoadingMovieDetails />
        ) : (
          <div className="posterholder">
            <CgClose
              onClick={() => {
                navigate(-1)
              }}
              className="closebutton2"
            />
            <img src={movie?.imageUrl} alt="" className="poster" />
            <div className="descriptionholder">
              <div className="leftpart">
                <h1 className="detailstitle">{movie?.title}</h1>
                <p className="description2">{movie?.description}</p>
                <hr
                  style={{
                    height: '2px',
                    border: 'none',
                    color: 'white',
                    background: '#333',
                    width: '90%',
                  }}
                />

                {
                  <p
                    className="date"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i> Uploaded on {date ? date : ''}</i>
                    {isMovieLiked ? (
                      <FcLike
                        onClick={likeMovieHandler}
                        style={{
                          marginLeft: '30px',
                          fontSize: '30px',
                          cursor: 'pointer',
                        }}
                      />
                    ) : (
                      <FcLikePlaceholder
                        onClick={likeMovieHandler}
                        style={{
                          marginLeft: '30px',
                          fontSize: '30px',
                          cursor: 'pointer',
                        }}
                      />
                    )}
                    <span style={{ marginLeft: '7px' }}>{likes.length}</span>
                  </p>
                }
                <p
                  className="date"
                  style={{ marginTop: '-10px', marginBottom: '20px' }}
                >
                  {' '}
                  <i>by&nbsp;</i>
                  <b> {creator ? creator : ''}</b>
                  {isOwner ? (
                    <button
                      style={{
                        width: '80px',
                        fontWeight: 'bold',
                        marginLeft: '20px',
                      }}
                      onClick={deleteMovieHandler}
                      className="deletebutton"
                    >
                      Delete
                    </button>
                  ) : null}
                </p>

                <div className="commentsholder">
                  <CommentsHolder>
                    <div className="comments">
                      {movieComments.length > 0 ? (
                        movieComments.map((comment, i) => (
                          <div key={i} className="commentwithpicture">
                            <img
                              className="commentimg"
                              src={allUsers.length > 0 && allUsers.find(x => x._id === comment?.ownerId)?.profilePic !== ""
                                ? allUsers.find(x => x._id === comment?.ownerId)?.profilePic
                                : "/img/user2.png"
                              }
                            />
                            <div className="singlecommentholder">
                              <span className="authorname">
                                {allUsers.length > 0 && allUsers.find(x => x._id === comment?.ownerId)?.name !== ""
                                  ? allUsers.find(x => x._id === comment?.ownerId)?.name
                                  : allUsers.find(x => x._id === comment?.ownerId)?.username
                                }
                              </span>
                              <p className="singlecomment">
                                {comment?.comment}
                              </p>
                              {comment.likes?.length > 0 ? (
                                <div
                                  className={
                                    comment?.comment.length < 20
                                      ? 'likesidentificatoriconlowlength'
                                      : 'likesidentificatoricon'
                                  }
                                >
                                  <div className="blueiconholder">
                                    {' '}
                                    <AiFillLike className="actuallike" />
                                  </div>
                                  <span className="likescount">
                                    {comment.likes?.length}
                                  </span>
                                </div>
                              ) : (
                                ''
                              )}
                              <div className="minuteslikesholder">
                                <span className="timestamp">
                                  {getPassedTime(comment?.timestamp)}
                                </span>
                                <span
                                  onClick={() => likeCommentHandler(comment)}
                                  className="deletecomment"
                                  style={{
                                    color: comment.likes?.includes(username)
                                      ? '#2180b0'
                                      : '',
                                    opacity: comment.likes?.includes(username)
                                      ? '1'
                                      : '',
                                    filter: comment.likes?.includes(username)
                                      ? 'brightness(1.3)'
                                      : '',
                                  }}
                                >
                                  {comment.likes?.includes(username)
                                    ? 'Liked'
                                    : 'Like'}
                                </span>
                                {comment.ownerId === userId && userId ? (
                                  <span
                                    onClick={() => {
                                      removeCommentHandler(comment.id)
                                    }}
                                    className="deletecomment"
                                  >
                                    Remove
                                  </span>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h1
                          style={{
                            color: 'lightgrey',
                            opacity: '0.5',
                            fontSize: '25px',
                          }}
                        >
                          Add the first comment
                        </h1>
                      )}
                      <div ref={bottomofthepage}></div>
                    </div>

                  </CommentsHolder>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '20px',
                    width: '100%',
                    justifyContent: 'start',
                  }}
                >
                  <input
                    ref={commentref}
                    className="commentinput"
                    type="text"
                    placeholder="Add comment.."
                  />
                  <RiSendPlane2Fill
                    onClick={submitCommentHandler}
                    style={{
                      color: 'lightgrey',
                      fontSize: '25px',
                      marginLeft: '-35px',
                      cursor: 'pointer',
                      opacity: '0.8',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const CommentsHolder = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 11px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(0, 0, 0, 0.5);
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2b2b2b;
  }
`

export default MovieDetails
