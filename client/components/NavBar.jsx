import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import LinkMUI from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  arrow: {
    paddingTop: '4px'

  },
  title: {
    flexGrow: 2,
    display: 'block',
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  titleText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: '0 2px 0 5px',
    height: '100%',
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '7'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}))

function NavBar({ currentPage, onChange, onSubmit, handleMyListClick, searchTerm }) {
  const classes = useStyles()
  function MyListLink() {
    if (currentPage != '/myList') {
      return (
        <Typography className={classes.title} variant="h6" noWrap>
          <LinkMUI
            style={{ color: 'white', textDecoration: 'none', cursor: 'pointer'}}
            onClick={() => handleMyListClick()}
            to={'/myList'}
          >
            {'My List'}
          </LinkMUI>
        </Typography>
      )
    }
  }
  function NavSearch() {
    if (currentPage != '/search' && currentPage != '/login') {
      return (
        <form autoComplete="off" onSubmit={e => onSubmit(e)} noValidate>
          <div className={classes.search}>
            <div className={classes.searchIcon} >
              <SearchIcon onClick={e => onSubmit(e)} />
            </div>
            <InputBase
              onChange={e => onChange(e)}
              value={searchTerm}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </form>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {MyListLink()}
          {NavSearch()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
