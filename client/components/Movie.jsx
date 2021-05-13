import React, { useState, Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MovieSaveStar from './MovieSaveStar'
import styles from './Movie.module.css'

function Movie({ movie, onClick, onSave }) {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <Grid item>
      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div>
              <img src={poster_url} className={styles.moviePoster}></img>
            </div>
          </div>
          <div className={styles.flipCardBack}>
            <Grid
              container
              spacing={0}
              align="center"
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item>
                <MovieSaveStar saved={movie.saved} onSave={onSave} />
              </Grid>

              <Grid item>
                <Button
                  onClick={() => onClick()}
                  style={{ backgroundColor: 'grey', marginTop: '40%' }}
                >
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

export default Movie
