import React from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';


const Search = ({value, onChange, onSubmit}) => {
  console.log('in Search');
  return (
    <div id="search" className="centered flex-parent flex-wrap-no flex-align-center flex-center">
      <div>

        <form className="center-text" onSubmit={(e) => onSubmit(e)} >

          <label>
          Enter the name of a film or tv show:
            <br></br>

            <input
              value={value}
              onChange={(e) => onChange(e)}
              type="text"
              name="name"
            />
          </label>

          <Link to={`/movies/`}><input type="submit" value="Submit" /></Link>
        </form>
      </div>
    </div>
  )
}

export default Search;
