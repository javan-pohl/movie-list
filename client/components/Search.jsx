import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { shadows } from '@material-ui/system'
import SearchIcon from '@material-ui/icons/Search'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
    paper: {
      padding: 5,
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  }
}))

const Search = ({ value, onChange, onSubmit }) => {
  const classes = useStyles()

  return (
    <div className="app">
      <Grid
        container
        spacing={2}
        align="center"
        alignItems="center"
        justify="center"
        direction="column"
        style={{ backgroundColor: 'teal' }}
      >
        <Fade in={true} timeout={1000}>
          <Grid>
            <Box
              className={classes.paper}
              style={{
                padding: 15,
                backgroundColor: 'yellow',
                borderRadius: 6
              }}
              boxShadow={5}
            >
              <h2>Enter the name of a movie or tv show:</h2>
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
                  to="/results"
                >
                  <SearchIcon />
                </Button>
              </form>
            </Box>
          </Grid>
        </Fade>
      </Grid>
    </div>
  )
}

export default Search
