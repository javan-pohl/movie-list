import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './Summary.module.css'

const Summary = ({ movie }) => {
  console.log('movie: ', movie)
  const poster_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  const backdrop_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const backdrop_style = {
    background: `url(${backdrop_url})`,
    backgroundSize: "cover"
  }


  return (
    <div className={styles.summary} style={backdrop_style}>
      <div className={styles.summaryImgSection}>
        <img className={styles.summaryImg} src={poster_url} />
      </div>
      <div className={styles.summaryBody}>
        <h1>{movie.original_title}&nbsp;({movie.release_date.slice(0,4)})</h1>
        summary body
      </div>
    </div>
  )
}

export default Summary
