import React, { useState, Fragment } from 'react'
import Movies from './MoviesM.js'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const MovieList = ({ receivedMovies, movieList, onSave }) => {
  let initial = 1000
  let movies = movieList.map((movie, index) => {
    if (movie.poster_path) {
      return (
        <Movies
          movie={movie}
          key={index}
          onSave={() => onSave({ movie })}
          time={index * 100}
        />
      )
    }
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
      <Container maxWidth="sm">
        <Grid
          container
          spacing={5}
          align="center"
          alignItems="center"
          justify="center"
          direction="row"
        >
          {movies}
        </Grid>
      </Container>
    </Grid>
  )
}

export default MovieList
