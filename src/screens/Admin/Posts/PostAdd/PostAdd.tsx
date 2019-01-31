import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import format from 'date-fns/format';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import AutoComplete from '../../../../components/AutoComplete/AutoComplete';
import { uploadFile } from '../../../../services/File';
import { postPost } from '../PostApi';
import { getUsers } from '../../Users/UserApi';

import './PostAdd.css';

class PostAdd extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      isloading: false,

      title: '',
      content: '',
      category: ''
    };
  }

  async componentWillMount() {
    try {
      const authors = await getUsers();
    } catch (error) {}
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        picture_file: file,
        picture_preview: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = async () => {
    const state = this.state;

    if (!state.category || !state.title || !state.content) {
      return this.setState({ alert: 'Please fill in required fields!' });
    }

    try {
      this.setState({ isloading: true });

      const data = {
        title: state.title,
        category: state.category,
        content: state.content,
        created_at: new Date().toISOString()
      };

      const post = await postPost(data);
      this.setState({ isloading: false });

      console.log('res', post);
      this.props.history.push('/posts');
    } catch (err) {
      this.setState({ isloading: false });

      console.log('err', err);
    }
  };

  render() {
    return (
      <div>
        <form>
          <Grid container spacing={16} className="submit">
            <Grid item>
              <Button variant="contained" size="medium" color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="medium"
                color="default"
                onClick={() => this.props.history.push('/posts')}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Paper elevation={1} square className="container">
            {this.state.isloading && (
              <div className="progress">
                <LinearProgress />
              </div>
            )}
            {this.state.isloading && <div className="overlay" />}
            <Grid container spacing={24} justify="space-between" className="root">
              <Grid item xs={9}>
                <Grid container spacing={16} justify="space-between" className="root" direction="column">
                  {/* <Grid item>
                    <AutoComplete
                      placeholder="Select Team (Team ID) *"
                      value={this.state.team_id}
                      options={teams.map(x => ({ value: x.id, label: x.name }))}
                      onChange={this.handleTeamChange}
                    />
                  </Grid> */}

                  <Grid item>
                    <TextField
                      label="Title *"
                      className="textfield"
                      value={this.state.title}
                      onChange={this.handleChange('title')}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Description *"
                      className="textfield"
                      multiline
                      value={this.state.content}
                      onChange={this.handleChange('content')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={16} justify="space-between" className="root" direction="column">
                  <Grid item>
                    <FormControl className="select">
                      <InputLabel>Category *</InputLabel>
                      <Select value={this.state.category} onChange={this.handleChange('category')}>
                        <MenuItem value="Rock">Rock</MenuItem>
                        <MenuItem value="Paper">Paper</MenuItem>
                        <MenuItem value="Scissors">Scissors</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Grid container direction="row" spacing={16} alignItems="center" justify="space-between">
                      <Grid item className="image-container">
                        <div className="image-border">
                          {this.state.picture_preview && (
                            <img src={this.state.picture_preview} alt="img" className="image" />
                          )}

                          <input
                            accept="image/*"
                            id="contained-button-file"
                            className="file-input"
                            type="file"
                            onChange={this.handleImageChange}
                          />
                          <label htmlFor="contained-button-file">
                            <Button size="small" component="span">
                              <CloudUploadIcon />
                            </Button>
                          </label>
                          {this.state.picture_preview && (
                            <IconButton
                              className="trash"
                              onClick={() => this.setState({ picture_file: null, picture_preview: null })}
                              aria-label="Delete"
                            >
                              <ClearIcon />
                            </IconButton>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider light className="separator" />
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={this.state.alert !== null}
            message={this.state.alert}
            autoHideDuration={3000}
            onClose={() => this.setState({ alert: null })}
            action={[
              <Button key="close" color="secondary" onClick={() => this.setState({ alert: null })} size="small">
                close
              </Button>
            ]}
          />
        </form>
      </div>
    );
  }
}

export default PostAdd;
