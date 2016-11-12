'use strict';
const Navbar = require('./navbar.jsx');
const React = require('react');

const propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};

class App extends React.Component {
  render() {

    return (
      <div>
        <Navbar location={this.props.location} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

module.exports = App;
