import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './SearchBar.css';

class SearchBar extends React.Component<any, any> {
  timeout;

  search(event) {
    const term = event.target.value;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.props.onSearch(term);
    }, 300);
  }

  render() {
    const { onAdd, disableAdd } = this.props;

    return (
      <Grid container spacing={16} justify="space-between" className="root">
        <Grid item className="search">
          <form>
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Search"
              fullWidth
              onChange={e => this.search(e)}
            />
          </form>
        </Grid>
        {!disableAdd && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={onAdd}>
              Add new
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default SearchBar;
