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
      </Layout>
    );
  }
}


module.exports = AboutPage;
