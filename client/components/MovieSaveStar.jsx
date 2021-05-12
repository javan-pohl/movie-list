import React from 'react'
import StarIcon from '@material-ui/icons/Star'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

function MovieSaveStar({ saved, onSave }) {
  const showStar = () =>
    saved ? (
      <StarIcon fontSize="large" style={{ color: 'yellow' }} />
    ) : (
      <StarBorderIcon fontSize="large" />
    )
  return <IconButton onClick={() => onSave()}>{showStar()}</IconButton>
}

export default MovieSaveStar
