import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Search from './Search.js';
import MovieList from './MovieList.js';



function App() {
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [exactMovie, setExactMovie] = useState('');
  const [receivedMovies, setReceivedMovies] = useState(false);

  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
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

  // const renderMovieList = () => {
  //   return (
  //     <MovieList
  //       receivedMovies={receivedMovies}
  //       movies={movies}
  //     />
  //   )
  // }

  // const renderSearch = () => {
  //   return (
  //     <Search
  //       value={searchTerm}
  //       onChange={handleSearchChange}
  //       onSubmit={handleSearchSubmit}
  //     />
  //   )
  // }

  const renderPage = () => {
    if (receivedMovies) {
      return (
        <MovieList
        movieList={movies}
        receivedMovies={receivedMovies}
        movies={movies}
      />
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
    <div className="app">
      {renderPage()}
    </div>
  )
};

export default App;
