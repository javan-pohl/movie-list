import React, { useState, Fragment } from 'react'
// import Flip from '@material-ui/core/Fade'
import Fade from 'react-reveal/Fade'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
            <Grid
              container
              spacing={0}
              align="center"
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item>
                <IconButton onClick={() => onSave()}>
                  <StarBorderIcon fontSize="large" />
                </IconButton>
              </Grid>

              <Grid item>
                <Button style={{ backgroundColor: 'grey', marginTop: '40%' }}>
                  Summary
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Movies
