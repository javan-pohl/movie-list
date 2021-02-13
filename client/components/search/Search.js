import React from 'react';


const Search = (props) => {
  console.log('in Search');
  // function handleChange(event) {
  //   props.onChange(event.target.value)
  // }
  return (
    <div id="search" className="centered flex-parent flex-wrap-no flex-align-center flex-center">
      <div >
        <div id="search-title" className="center-text">
          Enter the name of a film or tv show:
        </div>
        <div id="search-field" className="center-text">
          <input value={props.searchTerm} type="text" placeholder="Search.." onChange={(e) => props.onChange(e)}/>
        </div>
      </div>
    </div>
  )
}

export default Search;