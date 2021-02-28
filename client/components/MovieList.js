import React, { useState, Fragment } from 'react'
import {
  HashRouter,
  Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import Movies from './Movies.js'
import Container from '@material-ui/core/Container'

// const MovieList = ({receivedMovies, movieList, onClick, onSave}) => {
const MovieList = ({ receivedMovies, movieList, onSave }) => {
  let initial=1000
  let movies = movieList.map((movie, index) => {
    return <Movies movie={movie} key={index} onSave={() => onSave({ movie })} time={index < 3 ? index * 500 : 0} />
  })
  // console.log(movies);
  return (
    <Container maxWidth="md">
      {movies}
    </Container>
  )
}
const MovieList2 = ({ receivedMovies, movieList, onSave }) => {
  let movies = movieList.map((movie, index) => {
    return <Movies movie={movie} key={index} onSave={() => onSave({ movie })} />
  })
  // console.log(movies);
  return (
    <div className="movie-list flex-parent flex-column flex-justify-start">
      {movies}
    </div>
  )
}
export default MovieList
