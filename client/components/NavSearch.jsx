import React from 'react';
import { HashRouter, Router, Route, Switch, Redirect, Link} from 'react-router-dom';


const NavSearch = ({value, onChange, onSubmit}) => {
  console.log('in Search');
  return (
    <div id="small-search" className="small-search inline-block">
      <div>

        <form className="center-text inline-block" onSubmit={(e) => onSubmit(e)} >

          <label>
          Search:
            <input
              value={value}
              onChange={(e) => onChange(e)}
              type="text"
              name="name"
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default NavSearch;
