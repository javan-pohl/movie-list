import React, { useState, Fragment } from 'react';
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
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
    console.log('in App renderPage')
    if (!receivedMovies) {
      return (
        <Link to='/Search'>
          <Search />
        </Link>
      )
    }
  }

  // render() {
    return (
      <div className="app">
        {renderPage()}
      </div>
      )
  // }
};

export default App;