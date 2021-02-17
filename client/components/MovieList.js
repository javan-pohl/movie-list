import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import Movies from './Movies.js';

const MovieList = ({receivedMovies, movieList, onClick}) => {
  let movies = movieList.map((movie, index) => {
    return (
      <Movies movie={movie} key={index} onClick={() => onClick({index})}/>
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