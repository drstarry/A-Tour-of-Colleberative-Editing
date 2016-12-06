'use strict';
import React from 'react';

import Editor from './editor';
// import Footer from './footer';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ops: new Array(new Array(0), new Array(0))};
  }

  render() {
    return (
      <section className="section-home container">
        <Editor me={0} peer={1} ops={this.state.ops}/>
        <Editor me={1} peer={0} ops={this.state.ops}/>
      </section>
    );
  }
}

module.exports = HomePage;
