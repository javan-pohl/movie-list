import axios from 'axios'
import { apiKey } from '../../../keys/Tmdb'

export async function getMovie(id) {
  // let searchTerm = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  let searchTerm = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=release_dates`
  return await axios
    .get(searchTerm)
    .then(data => {
      console.log('getMovie movie: ', data)
      return data.data
    })
    .catch(err => console.log('get error: ', err))
}

export async function getMovies(unspaced) {
  let page = 1
  let adult = false
  let searchTerm = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${unspaced}&page=${page}&include_adult=${adult}`
  return await axios
    .get(searchTerm)
    .then(data => {
      console.log('search data: ', data)
      return data.data.results
    })
    .catch(err => console.log('get error: ', err))
}

export function getMPAA(id) {
  let searchTerm = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`
  axios
    .get(searchTerm)
    .then(data => {
      console.log('mpaa api data: ', data)

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
  // console.log('sendMovie, googleId: ', googleId)
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
  // console.log('sendMyUser, user: ', user)
  return axios({
    method: 'post',
    url: '/createUser',
    data: user
  })
    .then(data => {
      // console.log('sendMyUser data: ', data)
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
      console.log('sendMyUser movies: ', movies)
      return movies
    })
    .catch(err => console.log('sendUser error: ', err))
}

