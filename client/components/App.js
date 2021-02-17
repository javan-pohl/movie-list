import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
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

  function handleMovieSelect(movie) {
    console.log(movie);
    alert(movie.index);
    setSelectedMovie(movies[movie.index]);
    handleShowMovie();
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  function handleShowMovie() {
    showMovie ? setShowMovie(false) : setShowMovie(true);
  }

  function handleHideMovie() {
    setShowMovie(false);
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
    if (receivedMovies) {
      return (
        <React.Fragment>

          <SelectedMovie
            movie={selectedMovie}
            display={showMovie}
            onClick={handleShowMovie}
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
  }

  return (
    <div className="app" onClick={handleHideMovie}>
      {renderPage()}
    </div>
  )
};

export default App;
