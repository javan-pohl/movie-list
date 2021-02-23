import React, { useState, Fragment } from 'react';
import SmallSearch from './SmallSearch.js';

const NavBar = ({value, onChange, onSubmit, handleMyListClick}) => {
  return (
    <div className="nav-bar inline-block">
      <div className="nav-inner">
        <SmallSearch
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        <div className="my-list-button inline-block float-right" onClick={() => handleMyListClick()}>
          My List
        </div>
      </div>
    </div>
  )
}
export default NavBar;
