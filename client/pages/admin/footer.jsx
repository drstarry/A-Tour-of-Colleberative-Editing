'use strict';
const React = require('react');


class Footer extends React.Component {
  render() {

    return (
      <div className="footer">
        <div className="container">
          <span className="copyright pull-right">
          &copy; <a href="https://github.com/drstarry">Starry</a>
          </span>
        </div>
      </div>
    );
  }
}


module.exports = Footer;
