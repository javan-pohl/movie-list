import React, { useState, Fragment } from 'react';

const Movies = ({movie, onClick}) => {
  const poster_url = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
  return (
    <div className="movie flex-parent flex-column" key={movie.id} onClick={() => onClick()}>
       <img src={poster_url} className="movie-poster margin-bottom-15px"></img>
       <div className="movie-title-row flex-parent flex-row">
        <div className="movie-title-header">
          Title:
        </div>
        <div className="movie-title margin-left-15px ">
          {movie.title}
        </div>
       </div>
       <div className="movie-score-row flex-parent flex-row">
        <div className="movie-score-header">
          Score:
        </div>
        <div className="movie-score margin-left-15px">
          {movie.vote_average}
        </div>
       </div>
       <div className="movie-desc-row flex-parent flex-row">
        <div className="movie-desc-header">
          Desc:
        </div>
        <div className="movie-desc margin-left-15px">
          {movie.overview}
        </div>
       </div>
    </div>
  )
}

export default Movies;
