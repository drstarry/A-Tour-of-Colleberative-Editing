'use strict';
import Layout from '../layouts/default.jsx';
import React from 'react';

class HomePage extends React.Component {
 render() {
  const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

  return (
    <Layout
      title="About us"
      activeTab="home">
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-9">
          <h1> Welcome to the tour of collaborate editing! </h1>
          <br/>
          <h2>Spotlight</h2>
          <p><img src='public/media/out.gif' alt="" /></p>
          <br/>
          <h2>Operations</h2>
          <h3>
            * Sync: Pull operations from other replicas.
          </h3>
          <h3>
            * Commit: Commit local operations to other replicas.
          </h3>
          <br/>
          <h2> More information </h2>
          <h3>
           * My source code
            <a href="https://github.com/drstarry/A-Tour-of-Colleberative-Editing"> on github</a>
          </h3>
          <h3>
           * A more comprehensive
            <a href="https://github.com/drstarry/A-Tour-of-Colleberative-Editing"> blog</a>
          </h3>
        </div>
      </div>
      <div style={{ marginBottom: 20}} className="footer">
        <div className="container">
          <span className="copyright pull-right">
          &copy; 2016 <a href="https://github.com/drstarry/A-Tour-of-Colleberative-Editing">Starry</a>
          </span>
        </div>
      </div>
    </Layout>
  );
 }
}

module.exports = HomePage;
