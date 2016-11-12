'use strict';
import Layout from '../layouts/default.jsx';
import React from 'react';
import {Carousel} from 'react-bootstrap';

class AboutPage extends React.Component {
  render() {

    return (
      <Layout
        title="About us"
        activeTab="about">
        <div style={{ marginBottom: 20}} className="footer">
          <div className="container">
            <span className="copyright pull-right">
            &copy; 2016 <a href="https://github.com/drstarry">Starry</a>
            </span>
          </div>
        </div>
      </Layout>
    );
  }
}


module.exports = AboutPage;
