'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');

class DemoPage extends React.Component {
  render() {

    const feet = <script src="/public/pages/demo.min.js"></script>;

    return (
      <Layout
        title="demo"
        feet={feet}
        activeTab="demo">

        <div id="app-mount">
        </div>
      </Layout>
    );
  }
}

module.exports = DemoPage;
