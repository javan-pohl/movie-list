import axios from 'axios'

export async function getMovie(searchTerm) {
  return await axios
    .get(searchTerm)
    .then(data => {
      return data.data
    })
    .catch(err => console.log('get error: ', err))
}

export async function getMovies(searchTerm) {
  return await axios
    .get(searchTerm)
    .then(data => {
      return data.data.results
    })
    .catch(err => console.log('get error: ', err))
}

export function removeMovie(googleId, movieInfo) {
  axios({
    method: 'delete',
    url: '/deleteMovie',
    data: {
      googleId: googleId,
      movie: movieInfo
    }
  })
    // .then(data => console.log('deleteUser success: ', data))
    .catch(err => console.log('deleteUser error: ', err))
}

export function sendMovie(googleId, movieInfo) {
  axios({
    method: 'post',
    url: '/saveMovie',
    data: {
      googleId: googleId,
      movie: movieInfo
    }
  })
    // .then(data => console.log('sendUser success: ', data))
    .catch(err => console.log('sendUser error: ', err))
}

export function sendMyUser(user) {
  return axios({
    method: 'post',
    url: '/createUser',
    data: user
  })
    .then(data => {
      let movies = []
      data.data.forEach(movie => {
        let obj = {}
        obj['id'] = movie.MOVIEID
        obj['title'] = movie.TITLE
        obj['saved'] = true
        obj['poster_path'] = movie.POSTER
        obj['vote_average'] = movie.SCORE
        obj['overview'] = movie.DESC_BODY
        movies.push(obj)
      })
      // setMyList(movies)
      return movies
    })
    .catch(err => console.log('sendUser error: ', err))
}

