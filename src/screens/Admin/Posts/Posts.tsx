import React, { Component } from 'react';
import format from 'date-fns/format';

import DataTable from '../../../components/DataTable/DataTable';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { getPosts, deletePostById } from './PostApi';

import './Posts.css';

class Posts extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      columns: [
        { id: 'title', numeric: false, label: 'Post title' },
        { id: 'category', numeric: false, label: 'Category' },
        { id: 'created_at_s', numeric: false, label: 'Date created' }
      ],
      searchTerm: '',
      isloading: true
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    getPosts().then(res => {
      console.log('res', res);
      this.setState({
        posts: res.result.map(e => ({ ...e, created_at_s: format(e.created_at, 'MMMM DD, YYYY') })),
        isloading: false
      });
    });
  }

  onEdit(item) {
    this.props.history.push('/posts/edit/' + item.id);
  }

  onDelete(item) {
    deletePostById(item.id).then(res => {
      console.log('res', res);
      this.initData();
    });
  }

  render() {
    const { history } = this.props;
    const { posts, columns, searchTerm } = this.state;

    return (
      <div>
        <SearchBar onSearch={v => this.setState({ searchTerm: v })} onAdd={() => history.push('/posts/add')} />
        <DataTable
          className="table"
          data={posts}
          columns={columns}
          pageSize={7}
          orderBy="created_at_s"
          order="desc"
          searchTerm={searchTerm}
          renderActions={true}
          onEdit={i => this.onEdit(i)}
          onDelete={i => this.onDelete(i)}
        />
      </div>
    );
  }
}

export default Posts;
