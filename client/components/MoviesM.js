import React, { useState, Fragment } from 'react'
// import Flip from '@material-ui/core/Fade'
import Flip from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'
import Grid from '@material-ui/core/Grid'

const Movies = ({ movie, onSave, time }) => {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <Flip delay={time}>
      <Grid item>
        <div>
          <img src={poster_url} className="movie-poster"></img>
        </div>
      </Grid>
    </Flip>
  )
}

export default Movies
