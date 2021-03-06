import React from 'react'
import Movie from './Movie'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

function MovieMural({ movieList, onSave, onSummaryClick }) {
  let windowWidth = window.innerWidth
  let movies = movieList.map((movie, index) => {
    if (movie.poster_path) {
      return (
        <Movie
          key={index}
          movie={movie}
          onSave={() => onSave({ movie, index })}
          onSummaryClick={() => onSummaryClick(movie.id)}
          windowWidth={windowWidth}
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

export default MovieMural
