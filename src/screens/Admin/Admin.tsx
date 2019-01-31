import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import Overview from './Overview/Overview';
import Users from './Users/Users';
import Posts from './Posts/Posts';
import PostAdd from './Posts/PostAdd/PostAdd';
import PostEdit from './Posts/PostEdit/PostEdit';

import './Admin.css';

class Admin extends Component<any, any> {
  menus = [
    { title: 'Dashboard', url: '/', icon: <DashboardIcon /> },
    { title: 'Users', url: '/users', icon: <PeopleIcon /> },
    { title: 'Posts', url: '/posts', icon: <ChromeReaderModeIcon /> }
  ];

  render() {
    return (
      <div className="App">
        <MenuDrawer menus={this.menus} onLogout={() => console.log('logout')}>
          <div>
            <Switch>
              <Route exact path="/" component={Overview} />
              <Route path="/users" component={Users} />
              <Route exact path="/posts" component={Posts} />
              <Route path="/posts/add" component={PostAdd} />
              <Route path="/posts/edit/:id" component={PostEdit} />

              <Redirect from="*" to="/" />
            </Switch>
          </div>
        </MenuDrawer>
      </div>
    );
  }
}

export default Admin;
