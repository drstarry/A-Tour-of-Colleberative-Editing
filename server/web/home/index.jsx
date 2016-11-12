'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class HomePage extends React.Component {
 render() {

  const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

  return (
   <Layout
    title="OT/CRDS"
    neck={neck}
    activeTab="home">
   </Layout>
  );
 }
}


module.exports = HomePage;
