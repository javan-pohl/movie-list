import React, { useState, Fragment } from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';



const MovieList = ({receivedMovies, movieList}) => {
  let movies = movieList.map(movie => {
    return <div className="movie">
      {movie.title}
    </div>
  })
  console.log(movies);
  return (
    <div className="movie-list">
      This is movie list
    </div>
  )
}

export default MovieList;