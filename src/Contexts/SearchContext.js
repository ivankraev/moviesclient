import React from 'react'
import { useState } from 'react'

export const SearchContext = React.createContext()
export function SearchContextProvider({ children }) {
  const [search, setSearch] = useState('')
  const [searchMovies, setSearchMovies] = useState([])
  const [areSearchMoviesLoading, setAreSearchMoviesLoading] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [randomMovie, setRandomMovie] = useState()
  const [randomMovieLoading, setRandomMovieLoading] = useState(true)
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true)
  const [featuredMovie, setFeaturedMovie] = useState()
  const searchInfo = {
    search,
    setSearch,
    searchMovies,
    setSearchMovies,
    areSearchMoviesLoading,
    setAreSearchMoviesLoading,
    isRandom,
    setIsRandom,
    randomMovie,
    setRandomMovie,
    randomMovieLoading,
    setRandomMovieLoading,
    isFeaturedLoading,
    setIsFeaturedLoading,
    featuredMovie,
     setFeaturedMovie,
  }

  return (
    <SearchContext.Provider value={searchInfo}>
      {children}
    </SearchContext.Provider>
  )
}
