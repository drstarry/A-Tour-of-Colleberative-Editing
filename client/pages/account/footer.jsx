'use strict';
const React = require('react');

class Footer extends React.Component {
  render() {

    const year = new Date().getFullYear();

    return (
      <div style={{ marginBottom: 20}} className="footer">
        <div className="container">
          <span className="copyright pull-right">
          &copy; {year} <a href="https://github.com/drstarry/A-Tour-of-Colleberative-Editing">Starry</a>
          </span>
        </div>
      </div>
    );
  }
}

module.exports = Footer;
