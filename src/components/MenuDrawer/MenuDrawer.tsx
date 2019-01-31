import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import logo from '../../assets/logo.svg';
import './MenuDrawer.css';

const NavListItem: any = ListItem;

const drawerWidth = 240;

const styles = theme =>
  ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    },
    logo: {
      width: '40%'
    },
    flex: {
      flex: 1
    }
  } as any);

class MenuDrawer extends React.Component<any, any> {
  state = {
    open: true,
    anchorEl: null
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({ anchorEl: null }, () => {
      this.props.onLogout();
    });
  };

  componentWillReceiveProps() {
    // if (isWidthDown('md', this.props.width) && this.state.open) {
    //   this.setState({ open: false });
    // }
  }

  render() {
    const { classes, menus, title } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters>
            <IconButton color="inherit" aria-label="open drawer" onClick={this.toggleDrawer} className="toolbar-title">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              {title || ''}
            </Typography>
            <div className="profile-btn">
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.logout}>Sign out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <Typography variant="title" color="inherit">
              React-Admin
            </Typography>
            {/* <img className={classes.logo} src={logo} alt="Logo" /> */}
          </div>
          <Divider />
          <List>
            {menus.map((menu, i) => (
              <NavListItem key={i} button component={NavLink} exact={true} to={menu.url} activeClassName="active">
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.title} />
              </NavListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.logout}>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true, withWidth: true })(MenuDrawer);
