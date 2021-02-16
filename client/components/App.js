import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Search from './search/Search.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [receivedMovies, setReceivedMovies] = useState(false);
  const [movies, setMovies] = useState([]);

  const renderPage = () => {
    return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
              return (
                <Redirect to="/search" />
              )
          }}
        />
        <Route path="/search">
          <Search
              value={searchTerm}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
          />
        </Route>
      </Switch>
    </HashRouter>
    )
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    let unspaced = searchTerm.replaceAll(' ', '%20');
    console.log('unspace: ', unspaced);
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`;
    let movieList = await getMovies(sample_query);
    console.log('movieList: ', movieList);
    await setMoviesState(movieList);
  }

  async function getMovies(searchTerm) {
    return await axios.get(searchTerm)
      .then(data => {
        console.log('get results: ', data.data.results);
        return data.data.results
      })
      .catch(err => console.log('get error: ', err));
  }

  async function setMoviesState(movies) {
    await setMovies(movies);
    await setReceivedMovies(true);
    return
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
};

export default App;
