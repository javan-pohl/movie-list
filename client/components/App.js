import axios from 'axios';
import React, { useState, Fragment } from 'react';
// import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Login from './Login.js';
import Search from './Search.js';
import NavBar from './NavBar.js';
import MovieList from './MovieList.js';
import SelectedMovie from './SelectedMovie.js';

function App() {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [receivedMovies, setReceivedMovies] = useState(false);

  function createUser({bT, dR, fI, kt, sd, wR}) {
    let user = {};
    user["firstName"] = bT;
    user["lastName"] = dR;
    user["picUrl"] = fI;
    user["email"] = kt;
    user["displayName"] = sd;
    user["googleId"] = wR;
    console.log('user: ', user);
    setUser(user);
    setLoggedIn(true);
  }

  function handleLogin(response) {
    sendUser(response.Es)
    createUser(response.Es);
  }
  function handleMyListClick() {
    // console.log('showmylist: ', showMyList)
    setShowMyList(showMyList ? false : true);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSave(movie) {
    // let temp = myList;
    // temp.push(movie);
    // setMyList(temp);
    sendMovie(movie);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    let unspaced = searchTerm.replaceAll(' ', '%20');
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`;
    let movieList = await getMovies(sample_query);
    setShowMyList(false);
    await setMoviesState(movieList);
  }

  /////////////////////////////////////
  function getList() {
    axios.get(`/list/${user.googleId}`)
    .then(data => {
      let movies = [];
      data.data.forEach(val => movies.push(val));
      console.log('getList client movies: ', movies);
    })
    .catch(err => console.log('getList error: ', err));
  }

  async function getMovies(searchTerm) {
    return await axios.get(searchTerm)
      .then(data => {
        console.log('get movies: ', data.data.results)
        return data.data.results
      })
      .catch(err => console.log('get error: ', err));
  }

  function sendMovie(movieInfo) {
    console.log('sendMovie, movieInfo.movie: ', movieInfo.movie);
    axios({
      method: 'post',
      url: '/saveMovie',
      data: {
        googleId: user.googleId,
        movie: movieInfo.movie
      }
    })
    .then(data => console.log('sendUser success: ', data))
    .catch(err => console.log('sendUser error: ', err))
  }

  function sendUser(user) {
    axios({
      method: 'post',
      url: '/createUser',
      data: user
    })
    .then(data => {
      let movies = [];
      data.data.forEach(movie => {
        let obj = {};
        // obj
        obj["title"] = movie.TITLE;
        obj["poster_path"] = movie.POSTER;
        obj["vote_average"] = movie.SCORE;
        obj["overview"] = movie.DESC_BODY;
        movies.push(obj)
        ////////////////////////////////////////
        // console.log('getList client movies: ', movie);
      });
      // console.log('getList client movies: ', movies)
      setMyList(movies);
    })
    .catch(err => console.log('sendUser error: ', err))
  }


  async function setMoviesState(movies) {
    // console.log(movies);
    await setMovies(movies);
    await setReceivedMovies(true);
    return
  }

  const renderPage = () => {
    let movieList;
    movieList = showMyList ? myList : movies;
    // console.log('movieList: ', movieList);
    if(loggedIn) {
      if (receivedMovies) {
        return (
          <React.Fragment>
            <NavBar
              value={searchTerm}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              handleMyListClick={handleMyListClick}
            />
            <MovieList
              movieList={movieList}
              receivedMovies={receivedMovies}
              onSave={(movie) => handleSave(movie)}
            />
          </React.Fragment>
        )
      } else {
        return (
          <Search
          value={searchTerm}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        )
      }
    } else {
      return (
        <React.Fragment>
          <Login
            handleLogin={handleLogin}
          />
        </React.Fragment>
      )
    }
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
};

export default App;
