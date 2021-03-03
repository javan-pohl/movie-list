import axios from 'axios'
import React, { useState, Fragment } from 'react'
// import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Login from './Login.js'
import Search from './Search.js'
import NavBar from './NavBar.js'
import MovieList from './MovieList.js'
import MovieMural from './MovieMural.js'
import SelectedMovie from './SelectedMovie.js'

function App() {
  const [user, setUser] = useState({})
  const [movies, setMovies] = useState([])
  const [myList, setMyList] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showMovie, setShowMovie] = useState(false)
  const [showMyList, setShowMyList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')
  const [receivedMovies, setReceivedMovies] = useState(false)

  function createUser({ QS, SQ, jI, nt, sd, kR }) {
    let user = {}
    user['firstName'] = QS
    user['lastName'] = SQ
    user['picUrl'] = jI
    user['email'] = nt
    user['displayName'] = sd
    user['googleId'] = kR
    console.log('user: ', user)
    setUser(user)
    setLoggedIn(true)
  }

  function handleLogin(response) {
    sendUser(response.Hs)
    createUser(response.Hs)
  }
  function handleMyListClick() {
    console.log('showmylist: ', showMyList)
    setShowMyList(showMyList ? false : true)
  }

  function handleSave(obj) {
    obj.movie.saved ? localUnsave(obj.index) : localSave(obj.index)
  }

  function localSave(i) {
    let newList = movies.slice()
    let newMyList = myList.slice()
    newList[i].saved = true
    newMyList.push(newList[i])
    sendMovie(movies[i])
    setMyList(newMyList)
  }
  async function localUnsave(i) {
    let newList = movies.slice()
    let id = newList[i].id
    let newMyList = myList.filter(movie => movie.id != id)
    newList[i].saved = false
    removeMovie(movies[i])
    await setMyList(newMyList)
    handleIfSaved(newList)
  }

  function handleSearchChange(event) {
    console.log('searchchange event: ', event)
    console.log('searchchange event.target.value : ', event.target.value)
    setSearchTerm(event.target.value)
  }
  async function handleSearchSubmit(e) {
    e.preventDefault()
    // console.log('e: ', e)
    let unspaced = searchTerm.replaceAll(' ', '%20')
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`
    let movieList = await getMovies(sample_query)
    handleIfSaved(movieList)
    // await setMoviesState(movieList)
  }

  async function handleIfSaved(movieList) {
    let newList = movieList.map((movie, index) => {
      movie.saved = myList.reduce((accum, savedMovie) => {
        if (movie.id == savedMovie.id) {
          accum = true
        }
        return accum
      }, false)
      return movie
    })
    console.log('handleifSaved newList: ', newList)
    console.log('handleifSaved: myList: ', myList)
    // setShowMyList(false)
    await setMoviesState(newList)
  }

  /////////////////////////////////////
  function getList() {
    axios
      .get(`/list/${user.googleId}`)
      .then(data => {
        console.log('raw data from db: ', data)
        let movies = []
        data.data.forEach(val => movies.push(val))
      })
      .catch(err => console.log('getList error: ', err))
  }

  async function getMovies(searchTerm) {
    return await axios
      .get(searchTerm)
      .then(data => {
        return data.data.results
      })
      .catch(err => console.log('get error: ', err))
  }

  function sendMovie(movieInfo) {
    axios({
      method: 'post',
      url: '/saveMovie',
      data: {
        googleId: user.googleId,
        movie: movieInfo
      }
    })
      .then(data => console.log('sendUser success: ', data))
      .catch(err => console.log('sendUser error: ', err))
  }

  function removeMovie(movieInfo) {
    axios({
      method: 'post',
      url: '/deleteMovie',
      data: {
        googleId: user.googleId,
        movie: movieInfo
      }
    })
      .then(data => console.log('deleteUser success: ', data))
      .catch(err => console.log('deleteUser error: ', err))
  }

  function sendUser(user) {
    axios({
      method: 'post',
      url: '/createUser',
      data: user
    })
      .then(data => {
        let movies = []
        data.data.forEach(movie => {
          let obj = {}
          obj['id'] = movie.MOVIEID
          obj['title'] = movie.TITLE
          obj['saved'] = true
          obj['poster_path'] = movie.POSTER
          obj['vote_average'] = movie.SCORE
          obj['overview'] = movie.DESC_BODY
          movies.push(obj)
        })
        setMyList(movies)
      })
      .catch(err => console.log('sendUser error: ', err))
  }

  async function setMoviesState(movies) {
    await setMovies(movies)
    await setReceivedMovies(true)
    return
  }

  const renderPage = () => {
    let movieList
    movieList = showMyList ? myList : movies
    console.log('renderpage, showmylist', showMyList)
    console.log('myList; ', myList)
    console.log('movieList: ', movieList)
    if (loggedIn) {
      if (receivedMovies) {
        return (
          <React.Fragment>
            <NavBar
              receivedMovies={receivedMovies}
              showList={showMyList}
              value={searchTerm}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              handleMyListClick={handleMyListClick}
            />
            <div className="app">
              <MovieMural
                key={showMyList}
                savedMovies={myList}
                movieList={movieList}
                receivedMovies={receivedMovies}
                onSave={movie => handleSave(movie)}
              />
            </div>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <NavBar
              receivedMovies={receivedMovies}
              showList={showMyList}
              value={searchTerm}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              handleMyListClick={handleMyListClick}
            />
            <div className="app">
              <Search
                value={searchTerm}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          <Login handleLogin={handleLogin} />
        </React.Fragment>
      )
    }
  }

  return <React.Fragment>{renderPage()}</React.Fragment>
}

export default App
