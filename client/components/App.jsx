import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import {
  HashRouter,
  useHistory,
  Redirect,
  Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Login from './Login'
import Search from './Search'
import NavBar from './NavBarMob'
import Summary from './Summary'
import MovieList from './MovieList'
import MovieMural from './MovieMural'
import SelectedMovie from './SelectedMovie'
import {
  getMovie,
  getMovies,
  handleGetMovie,
  removeMovie,
  sendMovie,
  sendMyUser
} from './functions/ApiFunctions'
import { useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies(['user'])
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])
  const [myList, setMyList] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showMovie, setShowMovie] = useState(false)
  const [movieInfo, setmovieInfo] = useState([])
  const [showMyList, setShowMyList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showOneMovie, setshowOneMovie] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState('')
  const [receivedMovies, setReceivedMovies] = useState(false)
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
          setShowMyList(false)
          // Handle back event
        }
      }
    })
  }, [locationKeys])

  // function createUser({ QS, SQ, jI, nt, sd, kR }) {
  function createUser(user) {
    // let user = {}
    // user['firstName'] = QS
    // user['lastName'] = SQ
    // user['displayName'] = sd
    // user['googleId'] = kR
    // user['picUrl'] = jI
    // user['email'] = nt
    setUser(user)
    setCookie('user', user, { path: '/' })
    setLoggedIn(true)
  }
  function localSave(i) {
    let newList = movies.slice()
    let newMyList = myList.slice()
    newList[i].saved = true
    newMyList.push(newList[i])
    sendMovie(user.googleId, movies[i])
    setMyList(newMyList)
  }
  async function localUnsave(i) {
    let movie = movies.find(movie => movie.id == i.id)
    let newMyList = myList.filter(movie => movie.id != i.id)
    removeMovie(user.googleId, i.id)
    await setMyList(newMyList)
    ifSaved(movies, newMyList)
  }
  function handleLogin(response) {
    // history.push("/login")
    // console.log(response)
    sendUser(response.profileObj)
    createUser(response.profileObj)
  }
  function handleMyListClick() {
    setShowMyList(showMyList ? false : true)
  }
  function handleSaveClick(obj) {
    obj.movie.saved ? localUnsave(obj.movie) : localSave(obj.index)
  }
  async function handleSummaryClick(id) {
    let movieInfo = await getMovie(id)
    history.push(`/summary/${id}`)
    // console.log(movieInfo)
  }
  async function handleSearchSubmit(e) {
    console.log('in handleSearchSubmit')
    e.preventDefault()
    let unspaced = searchTerm.replaceAll(' ', '%20')
    let movieList = await getMovies(unspaced)
    ifSaved(movieList)
    setShowMyList(false)
    history.push(`/results/${unspaced}`)
  }
  async function ifSaved(movieList, newMyList) {
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
  function searchChange(event) {
    setSearchTerm(event.target.value)
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
        myList={myList}
        value={searchTerm}
        showList={showListProp}
        receivedMovies={receivedMovies}
        onChange={searchChange}
        onSubmit={handleSearchSubmit}
        handleMyListClick={handleMyListClick}
      />
    )
  }
  const renderPage = () => {
    if (loggedIn) {
      return (
        <Switch>
          <Route path="/results">
            {renderNav(false)}
            {renderMural(movies)}
          </Route>
          <Route path="/myList">
            {renderNav(true)}
            {renderMural(myList)}
          </Route>
          <Route path="/summary">
            {renderNav(true)}
            <Summary></Summary>
          </Route>
          <Route path="/login">
            <Redirect to="/search" />
          </Route>
          <Route path="/search">
            {renderNav(showMyList)}
            <div className="app">
              <Search
                value={searchTerm}
                onChange={searchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path="/">
            <Redirect to="/login" />
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
      )
    }
  }

  return <React.Fragment>{renderPage()}</React.Fragment>
}

export default App
