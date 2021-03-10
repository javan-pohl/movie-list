import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
// import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Login from './Login.js'
import Search from './Search.js'
// import NavBar from './NavBar.js'
import NavBar from './NavBarMob.js'
import MovieList from './MovieList.js'
import MovieMural from './MovieMural.js'
import SelectedMovie from './SelectedMovie.js'
import {
  HashRouter,
  useHistory,
  Redirect,
  Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

function App() {
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
        // alert('PUSH')
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)
          // alert('POP')

          // Handle forward event
        } else {
          setLocationKeys(keys => [location.key, ...keys])
          setShowMyList(false)
          // Handle back event
        }
      }
    })
  }, [locationKeys])

  function createUser({ QS, SQ, jI, nt, sd, kR }) {
    let user = {}
    user['firstName'] = QS
    user['lastName'] = SQ
    user['displayName'] = sd
    user['googleId'] = kR
    user['picUrl'] = jI
    user['email'] = nt
    setUser(user)
    setLoggedIn(true)
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
    let movie = movies.find(movie => movie.id == i.id)
    // let newList = movies.filter(movie => movie.id != i.id)
    let newMyList = myList.filter(movie => movie.id != i.id)
    removeMovie(i.id)
    await setMyList(newMyList)
    handleIfSaved(movies, newMyList)
  }

  function handleLogin(response) {
    // history.push("/login")
    sendUser(response.Hs)
    createUser(response.Hs)
  }
  async function handleGetMovie(id) {
    alert('this feature is not yet functional')
    let query = `https://api.themoviedb.org/3/movie/${id}?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US`
    let movieInfo = await getMovie(query)
  }
  async function handleIfSaved(movieList, newMyList) {
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
  function handleMyListClick() {
    setShowMyList(showMyList ? false : true)
  }
  function handleSave(obj) {
    obj.movie.saved ? localUnsave(obj.movie) : localSave(obj.index)
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value)
  }
  async function handleSearchSubmit(e) {
    e.preventDefault()
    let unspaced = searchTerm.replaceAll(' ', '%20')
    history.push(`/results/${unspaced}`)
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`
    let movieList = await getMovies(sample_query)
    handleIfSaved(movieList)
    setShowMyList(false)
  }
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
  async function getMovie(searchTerm) {
    return await axios
      .get(searchTerm)
      .then(data => {
        return data.data
      })
      .catch(err => console.log('get error: ', err))
  }
  async function getMovies(searchTerm) {
    return await axios
      .get(searchTerm)
      .then(data => {
        return data.data.results
      })
      .catch(err => console.log('get error: ', err))
  }
  function removeMovie(movieInfo) {
    axios({
      method: 'delete',
      url: '/deleteMovie',
      data: {
        googleId: user.googleId,
        movie: movieInfo
      }
    })
      .then(data => console.log('deleteUser success: ', data))
      .catch(err => console.log('deleteUser error: ', err))
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
      // .then(data => console.log('sendUser success: ', data))
      .catch(err => console.log('sendUser error: ', err))
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
    if (loggedIn) {
      return (
        <Switch>
          <Route path="/results">
            <NavBar
              myList={myList}
              value={searchTerm}
              showList={false}
              receivedMovies={receivedMovies}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              handleMyListClick={handleMyListClick}
            />
            <div className="app">
              <MovieMural
                key={true}
                savedMovies={myList}
                movieList={movies}
                receivedMovies={true}
                onSave={movie => handleSave(movie)}
                onSummaryClick={id => handleGetMovie(id)}
              />
            </div>
          </Route>
          <Route path="/myList">
            <NavBar
              myList={myList}
              value={searchTerm}
              showList={true}
              receivedMovies={receivedMovies}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              handleMyListClick={handleMyListClick}
            />
            <div className="app">
              <MovieMural
                key={true}
                savedMovies={myList}
                movieList={myList}
                receivedMovies={true}
                onSave={movie => handleSave(movie)}
                onSummaryClick={id => handleGetMovie(id)}
              />
            </div>
          </Route>
          <Route path="/login">
            <Redirect to="/search" />
          </Route>
          <Route path="/search">
            <NavBar
              myList={myList}
              value={searchTerm}
              showList={showMyList}
              receivedMovies={receivedMovies}
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

    // let movieList, url
    // movieList = showMyList ? myList : movies
    // if (showMyList) {
    //   movieList = myList
    //   url = `/mylist`
    // } else {
    //   movieList = movies
    //   url = `/results/${searchTerm}`
    // }
    // if (loggedIn) {
    //   if (receivedMovies) {
    //     return (
    //       <React.Fragment>
    //         <Redirect to={url} />
    //         <NavBar
    //           myList={myList}
    //           value={searchTerm}
    //           showList={showMyList}
    //           receivedMovies={receivedMovies}
    //           onChange={handleSearchChange}
    //           onSubmit={handleSearchSubmit}
    //           handleMyListClick={handleMyListClick}
    //         />
    // <div className="app">
    //   <MovieMural
    //     key={showMyList}
    //     savedMovies={myList}
    //     movieList={movieList}
    //     receivedMovies={receivedMovies}
    //     onSave={movie => handleSave(movie)}
    //     onSummaryClick={id => handleGetMovie(id)}
    //   />
    // </div>
    //       </React.Fragment>
    //     )
    //   } else {
    //     return (
    //       <React.Fragment>
    //         <Redirect to="/search" />
    // ;<NavBar
    //   myList={myList}
    //   value={searchTerm}
    //   showList={showMyList}
    //   receivedMovies={receivedMovies}
    //   onChange={handleSearchChange}
    //   onSubmit={handleSearchSubmit}
    //   handleMyListClick={handleMyListClick}
    // />
    // <div className="app">
    //   <Search
    //     value={searchTerm}
    //     onChange={handleSearchChange}
    //     onSubmit={handleSearchSubmit}
    //   />
    // </div>
    //       </React.Fragment>
    //     )
    //   }
    // } else {
    //   return (
    //     <React.Fragment>
    //       <Redirect to="/login" />
    //       <Login handleLogin={handleLogin} />
    //     </React.Fragment>
    //   )
    // }
  }

  return <React.Fragment>{renderPage()}</React.Fragment>
}

export default App
