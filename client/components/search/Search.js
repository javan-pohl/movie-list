import React from 'react';


const Search = ({value, onChange, onSubmit}) => {
  console.log('in Search');
  // function handleChange(event) {
  //   props.onChange(event.target.value)
  // }
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

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Search;

{/* <div id="search" className="centered flex-parent flex-wrap-no flex-align-center flex-center">
<div >
  <div id="search-title" className="center-text">
    Enter the name of a film or tv show:
  </div>
  <div id="search-field" className="center-text">
    <input value={props.searchTerm} type="text" placeholder="Search.." onChange={(e) => props.onChange(e)}/>
  </div>
</div>
</div> */}