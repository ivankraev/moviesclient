import { useState, useEffect } from 'react'
import { baseUrl } from './api'

//GET ONE MOVIE
export const useSingleMovieFetch = (id, setMovie) => {
  useEffect(() => {
    fetch(`${baseUrl}/movies/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
}

//Get my movies
export const useMyMoviesFetch = (setMyMovies) => {
  useEffect(() => {
    fetch(
      `${baseUrl}/movies/${JSON.parse(localStorage.getItem('user'))._id
      }/ownmovies`,
      {
        method: 'GET',
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setMyMovies(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
}

//GET LAST MOVIES

export const useLatestMoviesFetch = (
  setAreRecentMoviesLoading,
  setMovies,
  setError,
) => {
  useEffect(() => {
    fetch(`${baseUrl}/movies/all/movies/latest`)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res)
        setAreRecentMoviesLoading(false)
      })
      .catch((err) => {
        setError("Sorry, couldn't fetch movies")
        setAreRecentMoviesLoading(false)
      })
  }, [])
}

export const useSearchMoviesFetch = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  useEffect(() => {
    fetch(`${baseUrl}/movies/all/movies/latest`)
      .then((res) => res.json())
      .then((res) => setMovies(res))
      .catch((err) => setError("Sorry, couldn't fetch movies"))
  }, [])
  return [error]
}

//GET ALL MOVIES

export const useAllMoviesFetch = (
  setAreRecentMoviesLoading,
  setMovies,
  setError,
) => {
  useEffect(() => {
    fetch(`${baseUrl}/movies/all/movies/movies`)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res)
        setAreRecentMoviesLoading(false)
      })
      .catch((err) => {
        setError("Sorry, couldn't fetch movies")
        setAreRecentMoviesLoading(false)
      })
  }, [])
}

//GET ALL SERIES

export const useAllSeriesFetch = (setAreSeriesLoading, setMovies, setError) => {
  useEffect(() => {
    fetch(`${baseUrl}/movies/all/movies/series`)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res)
        setAreSeriesLoading(false)
      })
      .catch((err) => {
        setError("Sorry, couldn't fetch movies")
        setAreSeriesLoading(false)
      })
  }, [])
}

//POST MOVIE
export const moviePost = (e, errorHandler, dataHandler, setIsLoadingFunc) => {
  const formData = new FormData(e.target)
  const title = formData.get('title')
  const description = formData.get('description')
  const imageUrl = formData.get('imageUrl')
  const isSeries = formData.get('isSeries')
  const ownerId = JSON.parse(localStorage.getItem('user'))._id
  if (title === '' || description === '' || imageUrl === '') {
    errorHandler('All fiends are required!')
    return
  }
  setIsLoadingFunc(1)
  const data = {
    title,
    description,
    imageUrl,
    isSeries,
    ownerId,
  }
  dataHandler(data)
  fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res._id) {
        errorHandler('This movie already exists.')
        setIsLoadingFunc(0)
        return
      }
      errorHandler('Added succesfully')
      setIsLoadingFunc(0)
    })
    .catch((err) => {
      errorHandler('Attempt failed...')
      setIsLoadingFunc(0)
    })
}

