import React from 'react'
import Movies from './MoviesM'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const MovieList = ({
  receivedMovies,
  movieList,
  savedMovies,
  onSave,
  onSummaryClick
}) => {
  // console.log('movieList: ', savedMovies)

  let movies = movieList.map((movie, index) => {
    if (movie.poster_path) {
      return (
        <Movies
          key={index}
          movie={movie}
          time={index * 100}
          onSave={() => onSave({ movie, index })}
          onClick={() => onSummaryClick(movie.id)}
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
