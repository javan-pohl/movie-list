export function getMPAA({ release_dates }) {
  const dates = release_dates.results
  let rating = 'NR'

  dates.every(val => {
    if (val.iso_3166_1 === 'US') {
      rating = val.release_dates[0].certification
      return false
    }
    return true
  })
  return rating
}
