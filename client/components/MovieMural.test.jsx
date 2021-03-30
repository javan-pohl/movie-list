import React from 'react'
import { render } from '@testing-library/react'
import MovieMural from './MovieMural.jsx'
// const MovieMural = require('./MovieMural.jsx')
let testMovies = require('./__testData__/testMovies')

// console.log('testMovies: ', testMovies);

describe('<MovieMural />', () => {
  it('renders without crashing', () => {
    render(
      <MovieMural
        key={true}
        savedMovies={myList}
        movieList={thisList}
        receivedMovies={true}
        onSave={movie => handleSaveClick(movie)}
        onSummaryClick={id => handleSummaryClick(id)}
      />
    )
  })
})
