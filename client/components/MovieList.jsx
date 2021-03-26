import React, { useState, Fragment } from 'react'
import {
  HashRouter,
  Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Movies from './Movies'

const MovieList = ({ receivedMovies, movieList, onSave }) => {
  let initial = 1000
  let movies = movieList.map((movie, index) => {
    return (
      <Movies
        movie={movie}
        key={index}
        onSave={() => onSave({ movie })}
        time={index < 3 ? index * 500 : 0}
      />
    )
  })
  return (
    <Grid
      container
      spacing={2}
      align="center"
      alignItems="center"
      justify="center"
      direction="column"
      style={{ backgroundColor: 'teal' }}
    >
      {movies}
    </Grid>
  )
}

export default MovieList
