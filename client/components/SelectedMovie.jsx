import React, { useState, Fragment } from 'react';

const SelectedMovie = ({movie, display}) => {
  console.log('in selected Movie, display', display)
  let displayClass;
  display ? displayClass = "movie-popup" : displayClass = "movie-popup display-false";
  return (
    <div className={displayClass}>

    </div>
  )
}
export default SelectedMovie;