import React, { useState, Fragment } from 'react'
// import Fade from '@material-ui/core/Fade'
import Flip from 'react-reveal/Flip'

import Fade from 'react-reveal/Fade'

const Movies = ({ movie, onSave, time }) => {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <Fade  delay={time} duration={1000}>
      <div
        className="movie movie-shadow flex-parent flex-column"
        key={movie.id}
      >
        <div className="flex-parent flex-row flex-align-center">
          <img
            src={poster_url}
            className="movie-poster float-left margin-bottom-15px"
          ></img>
          <div className="margin-left-15px">
            <button
              type="button"
              className="save-button"
              onClick={() => onSave()}
            >
              Save to List
            </button>
          </div>
        </div>
        <div className="movie-title-row flex-parent flex-row">
          <div className="movie-title-header">Title:</div>
          <div className="movie-title margin-left-15px ">{movie.title}</div>
        </div>
        <div className="movie-score-row flex-parent flex-row">
          <div className="movie-score-header">Score:</div>
          <div className="movie-score margin-left-15px">
            {movie.vote_average}
          </div>
        </div>
        <div className="movie-desc-row flex-parent flex-row">
          <div className="movie-desc-header">Desc:</div>
          <div className="movie-desc margin-left-15px">{movie.overview}</div>
        </div>
      </div>
    </Fade>
  )
}

export default Movies
