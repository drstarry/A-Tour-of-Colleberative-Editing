'use strict';
import Layout from '../layouts/default.jsx';
import React from 'react';

class HomePage extends React.Component {
 render() {
  const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

  return (
   <Layout
    title="OT/CRDT"
    neck={neck}
    activeTab="home">
   </Layout>
  );
 }
}

module.exports = HomePage;
