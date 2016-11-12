'use strict';
const ClassNames = require('classnames');
const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const propTypes = {
  activeTab: React.PropTypes.string
};

class Navbar extends React.Component {
  tabClass(tab) {

    return ClassNames({
      active: this.props.activeTab === tab
    });
  }

  render() {

    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand">
              <span className="navbar-brand-label">OT/CRDS</span>
            </Link>
            </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={this.tabClass('login')}>
                <a href="/login">Sign in</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className={this.tabClass('home')}>
                <a href="/">Introduction</a>
              </li>
              <li className={this.tabClass('about')}>
                <a href="/about">About</a>
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
