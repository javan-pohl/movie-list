import React from 'react'
import {
  HashRouter,
  Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { render } from 'react-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    paper: {
      padding: 5,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }
}))

const Search = ({ value, onChange, onSubmit }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      align="center"
      alignItems="center"
      justify="center"
      direction="column"
      style={{ backgroundColor: 'teal' }}
    >
      <Grid >
        <Box className={classes.paper} style={{ padding: 15, backgroundColor: 'yellow', borderRadius: 10}} boxShadow={5}>
          <h2>Enter the name of a movie or tv show:</h2>
          <form noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
            <TextField id="outlined-basic" variant="outlined" value={value} onChange={e => onChange(e)} />
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

const Search2 = ({ value, onChange, onSubmit }) => {
  return (
    <div
      id="search"
      className="centered flex-parent flex-wrap-no flex-align-center flex-center"
    >
      <div>
        <form className="center-text" onSubmit={e => onSubmit(e)}>
          <label>
            Enter the name of a film or tv show:
            <br></br>
            <input
              value={value}
              onChange={e => onChange(e)}
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

export default Search
