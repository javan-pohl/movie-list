import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './Summary.module.css'

const Summary = ({ movie }) => {
  console.log('movie: ', movie)
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`

  return (
    <div className={styles.summary} >
      <div className={styles.summaryImg}><img src={poster_url} /></div>
      <div className={styles.summaryBody}>summary body</div>
    </div>
  )
}

export default Summary
