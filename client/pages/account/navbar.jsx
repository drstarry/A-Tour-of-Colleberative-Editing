'use strict';
import React from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';

const propTypes = {
  location: React.PropTypes.object
};

class Navbar extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      navBarOpen: false
    };
  }

  componentWillReceiveProps() {

    this.setState({ navBarOpen: false });
  }

  isPathActive(path) {

    return ClassNames({
      active: this.props.location.pathname === path
    });
  }

  toggleMenu() {

    this.setState({ navBarOpen: !this.state.navBarOpen });
  }

  render() {

    const navBarCollapse = ClassNames({
      'navbar-collapse': true,
      collapse: !this.state.navBarOpen
    });

    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand">
              <img
                className="navbar-logo"
                src="/public/media/topo.png"
                />
              <span className="navbar-brand-label">OT/CRDS</span>
            </Link>
            <button
              className="navbar-toggle collapsed"
              onClick={this.toggleMenu.bind(this)}>

              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={navBarCollapse}>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/login/logout">Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
