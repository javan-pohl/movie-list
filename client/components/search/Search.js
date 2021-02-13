import React from 'react';


const Search = () => {
  console.log('in Search');
  return (
    <div id="search" className="centered flex-parent flex-wrap-no flex-align-center flex-center">
      <div >
        <div id="search-title" className="center-text">
          Enter the name of a film or tv show:
        </div>
        <div id="search-field" className="center-text">
          <input type="text" placeholder="Search.."/>
        </div>
      </div>
    </div>
  )
}

export default Search;