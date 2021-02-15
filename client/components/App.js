import React, { useState, Fragment } from 'react';
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import Search from './search/Search.js';

// import '/.index.css';

// from the App page, we will initially direct clients to the login page
// or I suppose, check to see if they're logged in?
// hmm ... maybe I should focus on on the movie list part first?
  // THEN add login?

// search page...

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn = false;
//       searchTerm = '';
//       receivedResults = false;
//     }
//   }

// }

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [receivedMovies, setReceivedMovies] = useState(false);
  const [movies, setMovies] = useState([]);

  const renderPage = () => {
    if (!receivedMovies) {
      return (
        <Route path='/Search'>
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        </Route>
      )
    } else {
      return (
        <Route path='/'>

        </Route>
      )
    }
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    let unspaced = searchTerm.replaceAll(' ', '%20');
    console.log('unspace: ', unspaced);
    let sample_query = `https://api.themoviedb.org/3/search/movie?api_key=69068131cf6aae96cd5fba4cafd706d8&language=en-US&query=${unspaced}&page=1&include_adult=false`;
    let movieList = await getMovies(sample_query);
    console.log('movieList: ', movieList);
    await setMoviesState(movieList);
  }

  async function getMovies(searchTerm) {
    return await axios.get(searchTerm)
      .then(data => {
        console.log('get results: ', data.data.results);
        return data.data.results
      })
      .catch(err => console.log('get error: ', err));
  }

  async function setMoviesState(movies) {
    await setMovies(movies);
    await setReceivedMovies(true);
    return
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
};

export default App;
