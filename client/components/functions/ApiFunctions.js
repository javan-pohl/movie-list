import axios from 'axios'

export async function getMovie(id) {
  let searchTerm = `https://api.themoviedb.org/3/movie/${id}?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US`
  return await axios
    .get(searchTerm)
    .then(data => {
      return data.data
    })
    .catch(err => console.log('get error: ', err))
}

export async function getMovies(unspaced) {
  let searchTerm = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`
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
  console.log('sendMovie, googleId: ', googleId)
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
  console.log('sendMyUser, user: ', user)
  return axios({
    method: 'post',
    url: '/createUser',
    data: user
  })
    .then(data => {
      console.log('sendMyUser data: ', data)
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

