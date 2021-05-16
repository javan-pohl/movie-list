// import React, { Fragment } from 'react'
// import { Fragment } from 'react'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MovieSaveStar from './MovieSaveStar'
import styles from './Movie.module.css'

function Movie({ movie, onSummaryClick, onSave }) {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <Grid item>
      <div className={styles.flipCard} onClick={() => console.log('movie poster clicked')}>
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
                  onClick={() => onSummaryClick()}
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
