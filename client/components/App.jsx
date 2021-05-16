import React, { useState, useEffect, Fragment, Suspense } from 'react'
import { useHistory, Redirect, Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import Login from './Login'

const MovieMural = loadable(() => import('./MovieMural'))
const Search = loadable(() => import('./Search'))
const NavBar = loadable(() => import('./NavBar'))
const Summary = loadable(() => import('./Summary'))

import {
  getMPAA,
  getMovie,
  getMovies,
  handleGetMovie,
  removeMovie,
  sendMovie,
  sendMyUser
} from './functions/ApiFunctions'

function App() {
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])
  const [userMovies, setUserMovies] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [movieInfo, setMovieInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationKeys, setLocationKeys] = useState([])

  let history = useHistory()

  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key])
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)
          // Handle forward event
        } else {
          setLocationKeys(keys => [location.key, ...keys])
          // Handle back event
        }
      }
    })
  }, [locationKeys])

  function createUser(user) {
    // my user info (for keeping me logged in to test things):
    // user = User
    setUser(user)
    setLoggedIn(true)
  }
  function handleLogin(response) {
    // fires on success or failure of the Oauth 2.0 login
    sendUserGetList(response.profileObj)
    createUser(response.profileObj)
  }
  function handleLoginClick() {
    Search.preload()
    NavBar.preload()
    Summary.preload()
    MovieMural.preload()
  }
  function handleMyListClick() {
    history.push('/myList')
  }
  function handleSaveClick(obj) {
    obj.movie.saved ? unsaveMovie(obj.movie) : saveMovie(obj.index)
  }
  function handleSearchChange(event) {
    setSearchTerm(event.target.value)
  }
  async function handleSearchSubmit(e) {
    e.preventDefault()
    if (searchTerm) {
      let SearchTerm = searchTerm.replaceAll('%', '')
      let unspaced = SearchTerm.replaceAll(' ', '%20')
      let movieList = await getMovies(unspaced)
      updateMovieList(movieList)
      history.push(`/results/${unspaced}`)
    }
  }
  async function handleSummaryClick(id) {
    let movie = await getMovie(id)
    setMovieInfo(movie)
    history.push(`/summary/${id}`)
  }
  function saveMovie(i) {
    let newList = movies.slice()
    let newMyList = userMovies.slice()
    newList[i].saved = true
    newMyList.push(newList[i])
    sendMovie(user.googleId, movies[i])
    setUserMovies(newMyList)
  }
  async function setMovieList(movies) {
    // as stated in updateMovieList, I split this logic out to get the feature to work
    await setMovies(movies)
    return
  }
  async function unsaveMovie(i) {
    let movie = movies.find(movie => movie.id == i.id)
    let newMyList = userMovies.filter(movie => movie.id != i.id)
    removeMovie(user.googleId, i.id)
    await setUserMovies(newMyList)
    updateMovieList(movies, newMyList)
  }
  async function sendUserGetList(user) {
    let movies = await sendMyUser(user)
    setUserMovies(movies)
  }
  async function updateMovieList(movieList, newMyList) {
    let list = newMyList || userMovies
    let newList = movieList.map((movie, index) => {
      movie.saved = list.reduce((accum, savedMovie) => {
        if (movie.id == savedMovie.id) {
          accum = true
        }
        return accum
      }, false)
      return movie
    })
    // I set this as a function to ensure that it was all running before continuing
    // MovieMural does not load properly without doing so
    setMovieList(newList)
  }
  function renderMural(thisList) {
    return (
      <div className="app">
        <MovieMural
          movieList={thisList}
          onSave={movie => handleSaveClick(movie)}
          onSummaryClick={id => handleSummaryClick(id)}
        />
      </div>
    )
  }
  function renderNav() {
    return (
      <NavBar
        currentPage={history.location.pathname}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        handleMyListClick={handleMyListClick}
      />
    )
  }
  function renderPage() {
    if (loggedIn) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          {renderNav()}
          <Switch>
            <Route path="/results">{renderMural(movies)}</Route>
            <Route path="/myList">{renderMural(userMovies)}</Route>
            <Route path="/summary">
              <Summary movie={movieInfo}></Summary>
            </Route>
            <Route path="/login">
              <Redirect to="/search" />
            </Route>
            <Route path="/search">
              <Search
                value={searchTerm}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </Route>
          </Switch>
        </Suspense>
      )
    } else {
      return (
        <Switch>
          <Route path="/">
            <Redirect to="/login" />
            <Login handleLogin={handleLogin} onClick={handleLoginClick} />
          </Route>
        </Switch>
      )
    }
  }

  return <React.Fragment>{renderPage()}</React.Fragment>
}

export default App
