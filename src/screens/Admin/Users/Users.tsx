import React, { Component } from 'react';
import format from 'date-fns/format';

import DataTable from '../../../components/DataTable/DataTable';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { getUsers } from './UserApi';

import './Users.css';

class Users extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [
        { id: 'email', numeric: false, label: 'Email address' },
        { id: 'first_name', numeric: false, label: 'First name' },
        { id: 'last_name', numeric: false, label: 'Last name' },
        { id: 'created_at', numeric: false, label: 'Date created' }
      ],
      searchTerm: ''
    };
  }

  componentDidMount() {
    getUsers().then(res => {
      this.setState({
        users: res.result.map(e => ({ ...e, created_at: format(e.created_at, 'MMMM DD, YYYY') }))
      });
    });
  }

  render() {
    const { users, columns, searchTerm } = this.state;

    return (
      <div>
        <SearchBar onSearch={v => this.setState({ searchTerm: v })} disableAdd onAdd={() => console.log('add')} />
        <DataTable
          className="table"
          data={users}
          columns={columns}
          pageSize={9}
          orderBy="email"
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

export default Users;
