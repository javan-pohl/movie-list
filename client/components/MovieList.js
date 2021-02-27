import React, { useState, Fragment } from "react";
import {
  HashRouter,
  Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import Movies from "./Movies.js";

// const MovieList = ({receivedMovies, movieList, onClick, onSave}) => {
const MovieList = ({ receivedMovies, movieList, onSave }) => {
  let movies = movieList.map((movie, index) => {
    return (
      <Movies movie={movie} key={index} onSave={() => onSave({ movie })} />
    );
  });
  // console.log(movies);
  return (
    <div className="movie-list flex-parent flex-column flex-justify-start">
      {movies}
    </div>
  );
};

export default MovieList;
