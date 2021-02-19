import axios from 'axios';
import React, { useState, Fragment } from 'react';
// import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Login from './Login.js';
import Search from './Search.js';
import MovieList from './MovieList.js';
import SelectedMovie from './SelectedMovie.js';

function App() {
  const [user, setUser] = useState({});
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
    console.log('user: ', user);
    setUser(user);
    setLoggedIn(true);
  }

  function handleLogin(response) {
    // console.log(response.Es)
    sendUser(response.Es)
    createUser(response.Es);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSave(movie) {
    console.log('movie saved');
    // console.log(movie);
    sendMovie(movie);
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

  function sendUser(user) {
    axios({
      method: 'post',
      url: '/createUser',
      data: user
    })
    .then(data => console.log('sendUser success: ', data))
    .catch(err => console.log('sendUser error: ', err))
  }

  function sendMovie(movieInfo) {
    // console.log('in send movie, user: ', user);
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
