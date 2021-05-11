import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './Summary.module.css'
import { getMPAA } from './functions/Functions'

const Summary = ({ movie }) => {
  const MPAA = getMPAA(movie)
  const poster_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  const backdrop_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  const backdrop_style = {
    backgroundImage: `linear-gradient(rgb(0,0,0,0.85),
    rgb(0,0,0,0.85)), url(${backdrop_url})`,
    backgroundSize: 'cover'
  }
  const genres = movie.genres.map(obj => obj.name).join(', ')
  const runtime = movie.runtime
  const runtimeStr = `${Math.floor(runtime / 60)}hr ${runtime % 60}m`
  console.log('runtimeStr: ', runtimeStr)
  console.log('Summary genres: ', genres)
  console.log('movie: ', movie)
  console.log('MPAA: ', MPAA)
  const renderInfo = () => (
    <div className={styles.info}>
      <span className={styles.MPAA}>{MPAA}</span>
      <span className={styles.infoInner}>
        {movie.release_date}
        &nbsp;&#8226;&nbsp;
        {genres}
        &nbsp;&#8226;&nbsp;
        {runtimeStr}
      </span>
    </div>
  )
  return (
    <div className={styles.summary} style={backdrop_style}>
      <div className={styles.summaryImgSection}>
        <img className={styles.summaryImg} src={poster_url} />
      </div>
      <div className={styles.body}>
        <h1>
          {movie.original_title}&nbsp;
          <span className={styles.headingDate}>
            ({movie.release_date.slice(0, 4)})
          </span>
        </h1>
        {renderInfo()}
        <div className={styles.overview}>summary body</div>
      </div>
    </div>
  )
}

export default Summary
