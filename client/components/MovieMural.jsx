import React from 'react'
import Movie from './Movie'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

function MovieMural({
  receivedMovie,
  movieList,
  savedMovie,
  onSave,
  onSummaryClick
}) {
  // console.log('movieList: ', savedMovie)

  let movies = movieList.map((movie, index) => {
    if (movie.poster_path) {
      return (
        <Movie
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

export default MovieMural
