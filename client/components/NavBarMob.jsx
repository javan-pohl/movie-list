import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import LinkMUI from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SmallSearch from './SmallSearch'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  arrow: {
    paddingTop: '4px',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none'
    // }
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
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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

const NavBar = ({
  handleMyListClick,
  myList,
  onChange,
  onSubmit,
  receivedMovies,
  showList,
  value
}) => {
  const classes = useStyles()
  let linkName = ''
  let toLink = '/myList'
  if (showList) {
    toLink = receivedMovies ? '/results' : '/search'
  }
  if (myList.length > 0) {
    linkName = showList ? <ArrowBackIcon className={classes.arrow} /> : 'My List'
  }
  // const linkName = showList ? 'Back to Results' : 'My List'
  // console.log('onchange function: ', onChange)
  const renderListLink = () => {
    // if (receivedMovies) {
    return (
      <Typography className={classes.title} variant="h6" noWrap>
        <LinkMUI
          style={{ color: 'white', textDecoration: 'none' }}
          onClick={() => handleMyListClick()}
          component={Link}
          to={toLink}
        >
          {linkName}
        </LinkMUI>
      </Typography>
    )
    // }
  }
  const renderSearch = () => {
    if (receivedMovies) {
      return (
        <form autoComplete="off" onSubmit={e => onSubmit(e)} noValidate>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon onClick={e => onSubmit(e)} />
            </div>
            <InputBase
              onChange={e => onChange(e)}
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
          {renderListLink()}
          {renderSearch()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const NavBar2 = ({ value, onChange, onSubmit, handleMyListClick }) => {
  return (
    <div className="nav-bar inline-block">
      <div className="nav-inner">
        <SmallSearch value={value} onChange={onChange} onSubmit={onSubmit} />
        <div
          className="my-list-button inline-block float-right"
          onClick={() => handleMyListClick()}
        >
          My List
        </div>
      </div>
    </div>
  )
}
export default NavBar
