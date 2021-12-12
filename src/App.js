import React from 'react'
import GuestHeader from './components/Header/GuestHeader'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Sidebar from './components/Sidebar'
import { MovieLink } from './Contexts/MovieLink'
import { SearchContextProvider } from './Contexts/SearchContext'
import { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './Contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ModalContextProvider } from './Contexts/ModalContext'
import Modal from './Modal'
import Registration from './components/AuthForms/Registration'
import Login from './components/AuthForms/Login'
import LoginContextProvider from './Contexts/LoginContext'
import ThemeContextProvider from './Contexts/ThemeContext'
import Profile from './components/AuthForms/Profile'
import MovieDetails from './components/Home/Movies/MovieDetails'
import MoviesPage from './components/MoviesPage.js/MoviesPage'
import SeriesPage from './components/MoviesPage.js/SeriesPage'
import TrendsPage from './components/MoviesPage.js/Trends'
import NotAuthenticated from './components/Home/NotAuthenticated'
const queryClient = new QueryClient()
function App() {
  const { link } = useContext(MovieLink)
  const { isAuthenticated, setAuthentication } = useContext(AuthContext)

  const [isRegister, setIsRegister] = useState(false)

  const registerFormTrigger = () => {
    setIsRegister((prevstate) => !prevstate)
  }
  const closeRegister = () => {
    setIsRegister(false)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

        <SearchContextProvider>
          <ThemeContextProvider>
            <ModalContextProvider>
              <LoginContextProvider>
                {isAuthenticated ? <Header /> : <GuestHeader />}

                <Modal closeRegister={closeRegister}>
                  {!isRegister ? (
                    <Login registerTrigger={registerFormTrigger} />
                  ) : (
                    <Registration
                      loginTrigger={registerFormTrigger}
                      authorization={setAuthentication}
                    />
                  )}
                </Modal>

                <Sidebar />

                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path={link} element={<MovieDetails />} />
                  <Route exact path="/movies" element={<MoviesPage />} />
                  <Route exact path="/movies/series" element={<SeriesPage />} />
                  <Route exact path="/movies/trends" element={<TrendsPage />} />
                  <Route
                    exact
                    path="/profile"
                    element={
                      isAuthenticated ? (
                        <Profile />
                      ) : (
                        <NotAuthenticated />
                      )
                    } />
                </Routes>
              </LoginContextProvider>
            </ModalContextProvider>
          </ThemeContextProvider>
        </SearchContextProvider>
      </div>
      {/*       <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>

  )
}

export default App
