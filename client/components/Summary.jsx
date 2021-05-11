import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './Summary.module.css'
import { getMPAA } from './functions/Functions'

const Summary = ({ movie }) => {
  console.log('movie: ', movie)
  const MPAA = getMPAA(movie)
  console.log('MPAA: ', MPAA)
  const poster_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  const backdrop_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const backdrop_style = {
    backgroundImage: `linear-gradient(rgb(0,0,0,0.85),
      rgb(0,0,0,0.85)), url(${backdrop_url})`,
    backgroundSize: 'cover'
  }

  return (
    <div className={styles.summary} style={backdrop_style}>
      <div className={styles.summaryImgSection}>
        <img className={styles.summaryImg} src={poster_url} />
      </div>
      <div className={styles.summaryBody}>
        <h1>
          {movie.original_title}&nbsp;<span className={styles.headingDate}>({movie.release_date.slice(0, 4)})</span>
        </h1>
        <div className={styles.info}></div>
        summary body
      </div>

    </div>
  )
}

export default Summary
