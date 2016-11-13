'use strict';
const Navbar = require('./navbar.jsx');
const React = require('react');

const propTypes = {
  activeTab: React.PropTypes.string,
  children: React.PropTypes.node,
  feet: React.PropTypes.node,
  neck: React.PropTypes.node,
  title: React.PropTypes.string
};



class DefaultLayout extends React.Component {
  render() {

    const year = new Date().getFullYear();

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/public/core.min.css" />
          <link rel="stylesheet" href="/public/layouts/default.min.css" />
          <link rel="shortcut icon" href="/public/media/logo.svg"/>
          <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Titillium+Web" rel="stylesheet"/>
        </head>
        <body style={{fontFamily: '\'Titillium Web\', sans-serif'}}>
          <Navbar activeTab={this.props.activeTab} />
          <div className="page">
            <div className="container">
              {this.props.children}
            </div>
          </div>
          <script src="/public/core.min.js"></script>
          {this.props.feet}
        </body>
      </html>
    );
  }
}

DefaultLayout.propTypes = propTypes;

module.exports = DefaultLayout;
