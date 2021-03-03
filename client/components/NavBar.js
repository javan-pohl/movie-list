import React, { useState, Fragment } from 'react'
import SmallSearch from './SmallSearch.js'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
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
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const NavBar = ({
  showList,
  value,
  onChange,
  onSubmit,
  handleMyListClick,
  receivedMovies
}) => {
  const classes = useStyles()
  const linkName = showList ? 'Back to Results' : 'My List'
  console.log('onchange function: ', onChange)
  const renderListLink = () => {
    if (receivedMovies) {
      return (
        <Typography className={classes.title} variant="h6" noWrap>
          <Link
            href="#"
            style={{ color: 'white' }}
            onClick={() => handleMyListClick()}
          >
            {linkName}
          </Link>
        </Typography>
      )
    }
  }
  const renderSearch = () => {
    if (receivedMovies) {
      return (
        <form autoComplete="off" onSubmit={e => onSubmit(e)} noValidate>
          <TextField
            id="outlined-basic"
            size="small"
            style={{ background: 'white', color: 'black' }}
            variant="outlined"
            value={value}
            onChange={e => onChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="small"
            style={{ margin: 2, minWidth: '24px' }}
            onClick={e => onSubmit(e)}
          >
            <SearchIcon />
          </Button>
        </form>
      )
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {renderListLink()}
          <div className={classes.search}>{renderSearch()}</div>
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
