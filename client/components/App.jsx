import axios from 'axios'
import React, { useState, useEffect, Fragment, Suspense } from 'react'
import { useHistory, Redirect, Route, Switch } from 'react-router-dom'
import loadable from "@loadable/component"
import Login from './Login'
import Search from './Search'
import NavBar from './NavBar'
import Summary from './Summary'
import MovieMural from './MovieMural'
// const Search = React.lazy(() => import('./Search'))
// const NavBar = React.lazy(() => import('./NavBar'))
// const Summary = React.lazy(() => import('./Summary'))
// const MovieMural = React.lazy(() => import('./MovieMural'))

import {
  getMPAA,
  getMovie,
  getMovies,
  handleGetMovie,
  removeMovie,
  sendMovie,
  sendMyUser
} from './functions/ApiFunctions'
// import { useCookies } from 'react-cookie'
// import { AliensFull as Aliens, User } from './testData/TestData'

function App() {
  // const [cookies, setCookie] = useCookies(['user'])
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])
  const [myList, setMyList] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [movieInfo, setMovieInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [receivedMovies, setReceivedMovies] = useState(false)
  const [locationKeys, setLocationKeys] = useState([])
  // const [showOneMovie, setShowOneMovie] = useState(false)
  // const [selectedMovie, setSelectedMovie] = useState('')
  // const [showMyList, setShowMyList] = useState(false)
  // const [pageNum, setPageNum] = useState(1)
  // const [showMovie, setShowMovie] = useState(false)

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
          // setShowMyList(false)
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
    sendUser(response.profileObj)
    createUser(response.profileObj)
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
    let SearchTerm = searchTerm.replaceAll('%', '')
    let unspaced = SearchTerm.replaceAll(' ', '%20')
    let movieList = await getMovies(unspaced)
    isMovieSaved(movieList)
    // setShowMyList(false)
    history.push(`/results/${unspaced}`)
  }
  async function handleSummaryClick(id) {
    let movie = await getMovie(id)
    setMovieInfo(movie)
    history.push(`/summary/${id}`)
  }
  async function isMovieSaved(movieList, newMyList) {
    let list = newMyList || myList
    let newList = movieList.map((movie, index) => {
      movie.saved = list.reduce((accum, savedMovie) => {
        if (movie.id == savedMovie.id) {
          accum = true
        }
        return accum
      }, false)
      return movie
    })
    setMoviesState(newList)
  }
  function saveMovie(i) {
    let newList = movies.slice()
    let newMyList = myList.slice()
    newList[i].saved = true
    newMyList.push(newList[i])
    sendMovie(user.googleId, movies[i])
    setMyList(newMyList)
  }
  async function unsaveMovie(i) {
    let movie = movies.find(movie => movie.id == i.id)
    let newMyList = myList.filter(movie => movie.id != i.id)
    removeMovie(user.googleId, i.id)
    await setMyList(newMyList)
    isMovieSaved(movies, newMyList)
  }
  async function sendUser(user) {
    let movies = await sendMyUser(user)
    setMyList(movies)
  }
  async function setMoviesState(movies) {
    await setMovies(movies)
    await setReceivedMovies(true)
    return
  }
  const renderMural = thisList => {
    return (
      <div className="app">
        <MovieMural
          key={true}
          savedMovies={myList}
          movieList={thisList}
          receivedMovies={true}
          onSave={movie => handleSaveClick(movie)}
          onSummaryClick={id => handleSummaryClick(id)}
        />
      </div>
    )
  }
  const renderNav = showListProp => {
    return (
      <NavBar
        // myList={myList}
        // showList={showListProp}
        currentPage={history.location.pathname}
        receivedMovies={receivedMovies}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        handleMyListClick={handleMyListClick}
      />
    )
  }
  const renderPage = () => {
    if (loggedIn) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
        {renderNav()}
          <Switch>
            <Route path="/results">
              {renderMural(movies)}
            </Route>
            <Route path="/myList">
              {renderMural(myList)}
            </Route>
            <Route path="/summary">
              <Summary movie={movieInfo}></Summary>
            </Route>
            <Route path="/login">
              <Redirect to="/search" />
            </Route>
            <Route path="/search">
              <div className="app">
                <Search
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>
            </Route>
          </Switch>
        </Suspense>
      )
    } else {
      return (
        <Switch>
          <Route path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <Redirect to="/login" />
              <Login handleLogin={handleLogin} />
              {/* <Redirect to="/summary" />
              <Summary movie={Aliens}></Summary> */}
              {/* <Redirect to="/myList">
              {renderNav(true)}
              {renderMural(myList)}
            </Redirect> */}
            </Suspense>
          </Route>
        </Switch>
      )
    }
  }

  return <React.Fragment>{renderPage()}</React.Fragment>
}

export default App
