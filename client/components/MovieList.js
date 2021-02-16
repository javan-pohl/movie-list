import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Movies from './Movies.js';

const MovieList = ({receivedMovies, movieList}) => {
  let movies = movieList.map(movie => {
    return (
      <Movies movie={movie} key={movie.id}/>
    )
  })
  console.log(movies);
  return (
    <div className="movie-list flex-parent flex-column">
      {movies}
    </div>
  )
}

export default MovieList;