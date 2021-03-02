import React, { useState, Fragment } from 'react'
import Movies from './MoviesM.js'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const MovieList = ({ receivedMovies, movieList, savedMovies, onSave }) => {
  console.log('movieList: ', savedMovies)

  let movies = movieList.map((movie, index) => {
    if (movie.poster_path) {
      return (
        <Movies
          saved={savedMovies.reduce( (accumulator, savedMovie) => {
            if (savedMovie.id == movie.id) {
              console.log('movie match')
              accumulator = true
            }
            return accumulator
          }, false)}
          movie={movie}
          key={index}
          onSave={() => onSave({ movie })}
          time={index * 100}
        />
      )
    }
  })
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={1}
        align="center"
        alignItems="center"
        justify="center"
        direction="row"
        style={{ marginTop: '5%' }}
      >
        {movies}
      </Grid>
    </Container>
  )
}

export default MovieList
