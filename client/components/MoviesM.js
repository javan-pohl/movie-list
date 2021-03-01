import React, { useState, Fragment } from 'react'
// import Flip from '@material-ui/core/Fade'
import Fade from 'react-reveal/Fade'
import Grid from '@material-ui/core/Grid'

const Movies = ({ movie, onSave, time }) => {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <Grid item>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div>
              <img src={poster_url} className="movie-poster"></img>
            </div>
          </div>
          <div className="flip-card-back">
            <div>
              <img src={poster_url} className="movie-poster"></img>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Movies
