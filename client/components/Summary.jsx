import React, { useState, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import styles from './Summary.module.css'
import { getMPAA } from './functions/Functions'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#33eb91',
      main: '#33eb91',
      dark: '#33eb91',
      contrastText: '#000'
    }
  }
})

const Summary = ({ movie }) => {
  console.log('movie: ', movie)
  const MPAA = getMPAA(movie)
  const genres = movie.genres.map(obj => obj.name).join(', ')
  const runtime = movie.runtime
  const runtimeStr = `${Math.floor(runtime / 60)}hr ${runtime % 60}m`

  const poster_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  const backdrop_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  const backdrop_style = {
    backgroundImage: `linear-gradient(rgb(0,0,0,0.85),
    rgb(0,0,0,0.85)), url(${backdrop_url})`,
    backgroundSize: 'cover'
  }
  function CircularProgressWithLabel(val) {
    return (
      <ThemeProvider theme={theme}>
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={val}
            color="secondary"
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
            >{`${val}%`}</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    )
  }
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
        <div className={styles.ratingsBar}>{CircularProgressWithLabel(movie.vote_average * 10)}</div>
        <div className={styles.overview}>summary body</div>
      </div>
    </div>
  )
}

export default Summary
