import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './Summary.module.css'

const Summary = ({ movie }) => {
  console.log('movie: ', movie)
  const poster_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  const backdrop_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const backdrop_style = {
    backgroundImage: `linear-gradient(rgb(0,0,0,0.6),
      rgb(0,0,0,0.6)), url(${backdrop_url})`,
    backgroundSize: 'cover'

    // '&::before': {
    //   content: `''`,
    //   position: 'absolute',
    //   top: '0px',
    //   right: '0px',
    //   bottom: '0px',
    //   left: '0px',
    //   backgroundColor: 'rgba(0, 0 , 0, 0.9)'
    // }
  }

  return (
    <div className={styles.summary} style={backdrop_style}>
      {/* // <div className={styles.summary} > */}
      <div className={styles.summaryImgSection}>
        <img className={styles.summaryImg} src={poster_url} />
      </div>
      <div className={styles.summaryBody}>
        <h1>
          {movie.original_title}&nbsp;({movie.release_date.slice(0, 4)})
        </h1>
        summary body
      </div>
      <div
        style={{ position: 'absolute', WebkitFilter: 'blur(10px) saturate(2)' }}
      />
    </div>
  )
}

export default Summary
