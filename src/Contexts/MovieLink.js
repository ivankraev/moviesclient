import React from 'react'
import { useState } from 'react'
export const MovieLink = React.createContext()
export function MovieLinkProvider({ children }) {
  const [link, setLink] = useState(false)
  const [id, setId] = useState(false)
  const movieLinkManipulator = {
    link,
    setLink,
    id,
    setId
  }
  return (
    <MovieLink.Provider value={movieLinkManipulator}>
      {children}
    </MovieLink.Provider>
  )
}
