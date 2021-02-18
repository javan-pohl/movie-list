import React, { useState, Fragment } from 'react';
// import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Login from './Login.js';
import Search from './Search.js';
import MovieList from './MovieList.js';
import SelectedMovie from './SelectedMovie.js';

function App() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [receivedMovies, setReceivedMovies] = useState(false);

  // function handleMovieSelect(movie) {
  //   console.log(movies[movie.index]);
  //   setSelectedMovie(movies[movie.index]);
  //   alternateShowMovie();
  // }

  function createUser({bT, dR, fI, kt, sd, wR}) {
    let user = {};
    user["firstName"] = bT;
    user["lastName"] = dR;
    user["picUrl"] = fI;
    user["email"] = kt;
    user["displayName"] = sd;
    user["googleId"] = wR;
    console.log('user test, firstName: ', user)

  }

  function handleLogin(response) {
    console.log(response.Es)
    createUser(response.Es);
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  // function handleShowMovie() {
  //   console.log('show movie')
  //   setShowMovie(true);
  // }

  // function handleHideMovie() {
  //   console.log('hide movie')
  //   setShowMovie(false);
  // }

  // function alternateShowMovie() {
  //   // console.log('hide movie')
  //   showMovie ? setShowMovie(false) : setShowMovie(true);
  // }

  function handleSave(movie) {
    console.log('movie saved');
    console.log(movie);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    let unspaced = searchTerm.replaceAll(' ', '%20');
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`;
    let movieList = await getMovies(sample_query);
    await setMoviesState(movieList);
  }

  async function getMovies(searchTerm) {
    return await axios.get(searchTerm)
      .then(data => {
        return data.data.results
      })
      .catch(err => console.log('get error: ', err));
  }

  async function setMoviesState(movies) {
    console.log(movies);
    await setMovies(movies);
    await setReceivedMovies(true);
    return
  }

  const renderPage = () => {
    if(loggedIn) {
      if (receivedMovies) {
        return (
          <React.Fragment>

            <MovieList
              movieList={movies}
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
        <Login
          handleLogin={handleLogin}
        />
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
